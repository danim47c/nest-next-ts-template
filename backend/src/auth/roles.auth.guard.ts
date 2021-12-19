import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Request } from "../lib/request"

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<number>(
      "role",
      context.getHandler()
    )

    if (!requiredRole) return true

    const { user } = context.switchToHttp().getRequest<Request>()

    return user.role >= requiredRole
  }
}
