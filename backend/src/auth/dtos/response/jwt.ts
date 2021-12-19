import { UserDTO } from "../user"

export class JwtPayload extends UserDTO {
  iat: number
  exp: number
}
