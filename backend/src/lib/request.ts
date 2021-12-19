import { Request as BaseRequest } from "express"
import { UserDTO } from "../auth/dtos/user"

export type Request = BaseRequest & {
  user: UserDTO
}
