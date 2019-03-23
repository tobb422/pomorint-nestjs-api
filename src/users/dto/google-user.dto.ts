import { IsString, IsEmail } from 'class-validator';

export class GoogleUserDto {
  @IsString()
  readonly googleId: string;

  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly image: string;
}
