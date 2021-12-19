import { MikroOrmModuleSyncOptions } from "@mikro-orm/nestjs"
import { ClassTransformOptions } from "class-transformer"
import { config as dotenvConfig } from "dotenv"
import { User } from "./auth/entities/user"

dotenvConfig()

export const transformOptions: ClassTransformOptions = {
  enableCircularCheck: true,
  excludeExtraneousValues: true
}

export const mikroOrmConfig: MikroOrmModuleSyncOptions = {
  entities: [User],
  type: "mongo",
  clientUrl: process.env.DATABASE_URL,
  ensureIndexes: true
}
