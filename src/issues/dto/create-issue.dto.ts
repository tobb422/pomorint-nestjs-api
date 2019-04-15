import { IsNumber, IsString } from 'class-validator'
import { Label } from '../../labels/label.entity'
import { IssueBox } from '../../issue-boxes/issue-box.entity'

export class CreateIssueDto {
  @IsString()
  readonly title: string

  @IsString()
  readonly description: string

  readonly issueBox?: IssueBox

  readonly labels?: Label[]

  @IsNumber()
  readonly estimatePoint: number

  readonly archived: boolean = false
}
