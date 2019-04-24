import { IsNumber, IsString, IsOptional } from 'class-validator'
import { Label } from '../../labels/label.entity'
import { IssueBox } from '../../issue-boxes/issue-box.entity'

export class UpdateIssueDto {
  @IsString()
  @IsOptional()
  readonly title: string

  @IsString()
  @IsOptional()
  readonly description: string

  @IsOptional()
  readonly labels?: Label[]

  @IsOptional()
  readonly issueBox?: IssueBox

  @IsNumber()
  @IsOptional()
  readonly estimatePoint: number

  @IsNumber()
  @IsOptional()
  readonly resultPoint: number

  @IsOptional()
  readonly archived: boolean
}
