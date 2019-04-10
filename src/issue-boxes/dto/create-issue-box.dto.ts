import { IsString } from 'class-validator'

export class CreateIssueBoxDto {
  @IsString()
  readonly name: string
}
