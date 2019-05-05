import { IsString, IsEmail, Length } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsString()
  @ApiModelProperty()
  readonly name: string

  @IsString()
  @Length(8, 16)
  @ApiModelProperty()
  readonly password: string

  @IsEmail()
  @ApiModelProperty()
  readonly email: string
}
