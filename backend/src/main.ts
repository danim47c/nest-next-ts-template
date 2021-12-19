import { ClassSerializerInterceptor } from "@nestjs/common"
import { NestFactory, Reflector } from "@nestjs/core"
import {
  FastifyAdapter,
  NestFastifyApplication
} from "@nestjs/platform-fastify"
import { config as dotenvConfig } from "dotenv"
import { AppModule } from "./app.module"
import { transformOptions } from "./config"
import { ValidationPipe } from "./lib/pipes/validation"

dotenvConfig()

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  app.enableCors({
    origin:
      process.env.NODE_ENV === "development" ? "*" : process.env.PUBLIC_URL
  })

  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), transformOptions)
  )

  await app.listen(3001)
}
void bootstrap()
