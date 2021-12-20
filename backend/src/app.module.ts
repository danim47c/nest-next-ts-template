import { MikroOrmModule } from "@mikro-orm/nestjs"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_GUARD } from "@nestjs/core"
import { AuthModule } from "./auth/auth.module"
import { User } from "./auth/entities/user"
import { JwtAuthGuard } from "./auth/jwt.auth.guard"
import { JwtAuthStrategy } from "./auth/jwt.auth.strategy"
import { RoleAuthGuard } from "./auth/roles.auth.guard"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot({
      entities: [User],
      type: "mongo",
      clientUrl: process.env.DATABASE_URL,
      ensureIndexes: true
    }),
    AuthModule
  ],
  controllers: [],
  providers: [
    JwtAuthStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleAuthGuard
    }
  ]
})
export class AppModule {}
