import { useFeedbackService } from "@/src/infra/feedbackService/FeedbackProvider";
import { useAppMutation } from "@/src/infra/operations/useAppMutation";
import { useRepository } from "@/src/infra/repositories/RepositoryProvider";
import { AuthUser } from "../AuthUser";

export function useAuthSignIn() {
  const { auth } = useRepository();
  const feedbackService = useFeedbackService();

  return useAppMutation<AuthUser, { email: string; password: string }>({
    mutateFn: ({ email, password }) => auth.signIn(email, password),
    onSuccess: (authUser) => {
      feedbackService.send({
        type: "success",
        message: `Bem-vindo ${authUser.name}!`,
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        feedbackService.send({ 
          type: "error", 
          message: error.message || "Erro ao fazer login" 
        });
      } else {
        feedbackService.send({ 
          type: "error", 
          message: "Erro ao fazer login" 
        });
      }
    },
  });
}
