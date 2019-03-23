import { IsString, IsEmail } from 'class-validator';

export class GoogleUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly image: string;
}
