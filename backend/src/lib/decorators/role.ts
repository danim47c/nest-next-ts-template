import { SetMetadata } from "@nestjs/common"
import { UserRole } from "../../auth/entities/user"

export const ROLES_KEY = "roles"
export const Role = (role: UserRole) => SetMetadata(ROLES_KEY, role)
