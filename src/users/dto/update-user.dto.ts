import { IsString, IsEmail, Length, IsOptional } from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly name: string | null

  @IsString()
  @Length(8, 16)
  @IsOptional()
  @ApiModelProperty()
  readonly password: string | null

  @IsEmail()
  @IsOptional()
  @ApiModelProperty()
  readonly email: string | null
}
