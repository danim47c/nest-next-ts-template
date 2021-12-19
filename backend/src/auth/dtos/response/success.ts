import { Exclude, Expose, Type } from "class-transformer"
import { UserDTO } from "../user"

@Exclude()
export class SuccessDTO {
  @Expose()
  token: string

  @Expose()
  @Type(() => UserDTO)
  user: UserDTO
}
