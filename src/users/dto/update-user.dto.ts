import { IsString, IsEmail, Length,  IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly name: string | null;

  @IsString()
  @Length(8, 16)
  @IsOptional()
  readonly password: string | null;

  @IsEmail()
  @IsOptional()
  readonly email: string | null;
}
