import { ClassTransformOptions } from "class-transformer"

export const transformOptions: ClassTransformOptions = {
  enableCircularCheck: true,
  excludeExtraneousValues: true
}
