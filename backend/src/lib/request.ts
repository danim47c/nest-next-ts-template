import { FastifyRequest } from "fastify"
import { UserDTO } from "../auth/dtos/user"

export type Request = FastifyRequest & {
  user: UserDTO
}
