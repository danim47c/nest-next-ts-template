import { BeforeCreate, Entity, Enum, Index, Property } from "@mikro-orm/core"
import { compare as comparePassword, hash as hashPassword } from "bcryptjs"
import { sign as signJwt } from "jsonwebtoken"
import { BaseEntity } from "../../lib/entity"
import { UserDTO } from "../dtos/user"

export enum UserRole {
  USER,
  ADMIN,
  ROOT_ADMIN
}

@Entity({ collection: "accounts" })
@Index({ properties: ["email"], options: { unique: true } })
export class User extends BaseEntity<UserDTO> {
  DTO = UserDTO

  @Enum({ items: () => UserRole, default: UserRole.USER })
  role: UserRole

  @Property()
  name: string

  @Property({ unique: true })
  email: string

  @Property({ hidden: true })
  password: string

  @BeforeCreate()
  async beforeCreate() {
    await this.changePassword(this.password)
  }

  async changePassword(password: string): Promise<void> {
    this.password = await hashPassword(password, 10)
  }

  signToken(): string {
    return signJwt(this.dto().plain(), process.env.JWT_SECRET, {
      expiresIn: "7d"
    })
  }

  async comparePassword(password: string): Promise<boolean> {
    return await comparePassword(password, this.password)
  }

  static async mockComparePassword(): Promise<void> {
    await comparePassword("password", "notpassword")
  }
}
