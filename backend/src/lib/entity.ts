import { PrimaryKey, Property, SerializedPrimaryKey } from "@mikro-orm/core"
import { ObjectId } from "@mikro-orm/mongodb"
import { plainToInstance } from "class-transformer"
import { transformOptions } from "../config"
import { BaseDTO } from "./dto"

export class BaseEntity<DTO extends BaseDTO> {
  @PrimaryKey()
  readonly _id!: ObjectId

  @SerializedPrimaryKey()
  readonly id!: string

  readonly DTO: new () => DTO
  dto() {
    return this.DTO && plainToInstance(this.DTO, this, transformOptions)
  }

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date()
}
