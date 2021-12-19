import { Expose } from "class-transformer"
import { BaseDTO } from "../../lib/dto"
import { UserRole } from "../entities/user"

export class UserDTO extends BaseDTO {
  @Expose()
  role: UserRole

  @Expose()
  email: string

  @Expose()
  name: string
}
