import { MikroOrmModule } from "@mikro-orm/nestjs"
import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { User } from "./entities/user"

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
