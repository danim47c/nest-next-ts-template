import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { Request } from "../request"

export const ReqUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest<Request>()

    return user
  }
)
