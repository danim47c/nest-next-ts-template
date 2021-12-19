import { Expose, instanceToPlain, Type } from "class-transformer"
import { transformOptions } from "../config"

export class BaseDTO {
  @Expose()
  id: string

  @Expose()
  @Type(() => Date)
  createdAt: Date

  @Expose()
  @Type(() => Date)
  updatedAt: Date

  plain() {
    return instanceToPlain(this, transformOptions)
  }
}
