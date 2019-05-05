import { IsNumber, IsString } from 'class-validator'
import { Label } from '../../labels/label.entity'
import { IssueBox } from '../../issue-boxes/issue-box.entity'
import { ApiModelProperty } from '@nestjs/swagger'

export class CreateIssueDto {
  @IsString()
  @ApiModelProperty()
  readonly title: string

  @IsString()
  @ApiModelProperty()
  readonly description: string

  @ApiModelProperty()
  readonly issueBox: IssueBox

  @ApiModelProperty()
  readonly labels?: Label[]

  @IsNumber()
  @ApiModelProperty()
  readonly estimatePoint: number

  @ApiModelProperty()
  readonly archived: boolean = false
}
