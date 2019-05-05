import { IsString } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class CreateLabelDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string
}
