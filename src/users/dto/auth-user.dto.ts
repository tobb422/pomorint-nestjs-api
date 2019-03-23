import { IsString, IsEmail, Length } from 'class-validator';

export class AuthUserDto {
  @IsString()
  @Length(8, 16)
  readonly password: string;

  @IsEmail()
  readonly email: string;
}
