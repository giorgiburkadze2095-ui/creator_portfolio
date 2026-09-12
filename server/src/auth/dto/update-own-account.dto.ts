import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateOwnAccountDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  // Required by the service when `email` is being changed.
  @IsOptional()
  @IsString()
  currentPassword?: string;
}
