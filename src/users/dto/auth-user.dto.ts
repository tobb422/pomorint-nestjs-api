import { IsString, IsEmail, Length } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class AuthUserDto {
  @IsString()
  @Length(8, 16)
  @ApiModelProperty()
  readonly password: string

  @IsEmail()
  @ApiModelProperty()
  readonly email: string
}
