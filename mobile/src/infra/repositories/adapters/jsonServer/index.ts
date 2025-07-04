import { Repositories } from "@/src/domain/Repositories";
import { JsonServerAuthRepo } from "./JsonServerAuthRepo";
import { JsonServerServiceRepo } from "./JsonServerServiceRepo";

export const JsonServerRepository: Repositories = {
  auth: new JsonServerAuthRepo(),
  service: new JsonServerServiceRepo(),
}; 