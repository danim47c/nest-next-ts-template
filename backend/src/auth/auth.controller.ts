import { UniqueConstraintViolationException } from "@mikro-orm/core"
import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LoginDTO } from "./dtos/body/login"
import { RegisterDTO } from "./dtos/body/register"
import { SuccessDTO } from "./dtos/response/success"
import { User } from "./entities/user"

@Controller("/auth")
export class AuthController {
  constructor(@Inject(AuthService) readonly authService: AuthService) {}

  @Post("/register")
  async register(@Body() body: RegisterDTO): Promise<SuccessDTO> {
    let user: User
    try {
      user = await this.authService.registerUser(body)
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new BadRequestException("Email taken")
      }

      throw e
    }

    return {
      token: user.signToken(),
      user: user.dto()
    }
  }

  @Post("/login")
  async login(@Body() body: LoginDTO): Promise<SuccessDTO> {
    const account = await this.authService.getUser(body.email)

    const invalidCredentialsException = new BadRequestException(
      "Invalid email or password"
    )

    if (!account) {
      await User.mockComparePassword()

      throw invalidCredentialsException
    }

    const validPassword = await account.comparePassword(body.password)

    if (!validPassword) {
      throw invalidCredentialsException
    }

    return {
      token: account.signToken(),
      user: account.dto()
    }
  }
}
