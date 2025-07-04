import { IAuthRepo } from "./auth/IAuthRepo";
import { IServiceRepo } from "./service/IServiceRepo";

export type Repositories = {
  auth: IAuthRepo;
  service: IServiceRepo;
};
