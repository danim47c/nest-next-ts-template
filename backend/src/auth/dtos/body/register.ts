import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class RegisterDTO {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  password: string

  @IsString()
  @MinLength(2)
  @MaxLength(128)
  name: string
}
