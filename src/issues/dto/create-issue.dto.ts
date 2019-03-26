import { IsNumber, IsString } from 'class-validator';
import { Label } from '../../labels/label.entity'

export class CreateIssueDto {
  @IsString()
  readonly title: string

  @IsString()
  readonly description: string

  readonly labels?: Label[]

  @IsNumber()
  readonly estimatePoint: number

  readonly archived: boolean = false
}
