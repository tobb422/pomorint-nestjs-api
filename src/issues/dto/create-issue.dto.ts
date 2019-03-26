import { IsNumber, IsString } from 'class-validator'
import { Label } from '../../labels/label.entity'

export class CreateIssueDto {
  @IsString()
  readonly title: string

  @IsString()
  readonly description: string

  readonly labels?: Promise<Label[]>

  @IsNumber()
  readonly pomo: number

  readonly archived: boolean = false
}
