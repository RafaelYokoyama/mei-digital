import { AuthUser } from "@/src/domain/auth/AuthUser";
import { IAuthRepo } from "@/src/domain/auth/IAuthRepo";
import { Platform } from 'react-native';


const API_BASE_URL = Platform.select({
  android: 'http://10.0.2.2:3001',
  default: 'http://192.168.1.10:3001'
});

export class JsonServerAuthRepo implements IAuthRepo {
  async signIn(email: string, password: string): Promise<AuthUser> {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error("Erro ao conectar com o servidor. Verifique sua internet.");
      }

      const users: AuthUser[] = await response.json();
      const user = users.find((user) => user.email === email);

      if (!user) {
        const availableEmails = users.map(u => u.email).join(' ou ');
        throw new Error(`Email não encontrado. Use ${availableEmails}`);
      }
      
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro ao fazer login. Tente novamente.");
    }
  }

  async signOut(): Promise<void> {
   
    return;
  }
} 