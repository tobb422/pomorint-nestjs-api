import { IsString, IsEmail } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class GoogleUserDto {
  @IsString()
  @ApiModelProperty()
  readonly name?: string

  @IsEmail()
  @ApiModelProperty()
  readonly email: string

  @IsString()
  @ApiModelProperty()
  readonly image?: string
}
