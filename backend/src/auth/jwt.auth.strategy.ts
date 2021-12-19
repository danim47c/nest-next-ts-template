import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { plainToClass } from "class-transformer"
import { ExtractJwt, Strategy } from "passport-jwt"
import { JwtPayload } from "./dtos/response/jwt"
import { UserDTO } from "./dtos/user"

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    })
  }

  validate(payload: JwtPayload) {
    return plainToClass(UserDTO, payload)
  }
}
