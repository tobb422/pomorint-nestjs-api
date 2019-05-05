import { IsNumber, IsString, IsOptional } from 'class-validator'
import { Label } from '../../labels/label.entity'
import { IssueBox } from '../../issue-boxes/issue-box.entity'
import { ApiModelProperty } from '@nestjs/swagger'

export class UpdateIssueDto {
  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly title: string

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly description: string

  @IsOptional()
  @ApiModelProperty()
  readonly labels?: Label[]

  @IsOptional()
  @ApiModelProperty()
  readonly issueBox?: IssueBox

  @IsNumber()
  @IsOptional()
  @ApiModelProperty()
  readonly estimatePoint: number

  @IsNumber()
  @IsOptional()
  @ApiModelProperty()
  readonly resultPoint: number

  @IsOptional()
  @ApiModelProperty()
  readonly archived: boolean
}
