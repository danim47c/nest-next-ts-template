import { ValidatorOptions } from "@nestjs/common/interfaces/external/validator-options.interface"
import { SetMetadata } from "@nestjs/common"

export const REWRITE_VALIDATION_OPTIONS = "REWRITE_VALIDATION_OPTIONS"

export function RewriteValidationOptions(options: ValidatorOptions) {
  return SetMetadata(REWRITE_VALIDATION_OPTIONS, options)
}
