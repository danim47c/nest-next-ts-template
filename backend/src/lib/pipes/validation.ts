import {
  ArgumentMetadata,
  Injectable,
  ValidationPipe as BaseValidationPipe
} from "@nestjs/common"
import { ValidatorOptions } from "class-validator"
import { REWRITE_VALIDATION_OPTIONS } from "../decorators/validation"

@Injectable()
export class ValidationPipe extends BaseValidationPipe {
  async transform(value: unknown, metadata: ArgumentMetadata) {
    const options = Reflect.getMetadata(
      REWRITE_VALIDATION_OPTIONS,
      metadata.metatype
    ) as ValidatorOptions

    let originOptions: ValidatorOptions
    if (options) {
      originOptions = Object.assign({}, this.validatorOptions)
      this.validatorOptions = Object.assign(this.validatorOptions, options)
    }

    const result = super.transform(value, metadata)

    if (originOptions) {
      this.validatorOptions = originOptions
    }

    return result
  }
}
