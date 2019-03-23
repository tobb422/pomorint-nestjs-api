import { IsString, IsEmail, Length } from 'class-validator'

export class CreateUserDto {
  @IsString()
  readonly name: string

  @IsString()
  @Length(8, 16)
  readonly password: string

  @IsEmail()
  readonly email: string
}
