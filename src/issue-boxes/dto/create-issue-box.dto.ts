import { IsString } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class CreateIssueBoxDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string
}
