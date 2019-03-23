import { IsString } from 'class-validator'

export class CreateLabelDto {
  @IsString()
  readonly name: string
}
