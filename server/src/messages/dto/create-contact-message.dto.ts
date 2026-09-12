import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

export class CreateContactMessageDto {
  @Transform(trim)
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  name: string;

  @Transform(trim)
  @IsEmail()
  @MaxLength(254)
  email: string;

  @Transform(trim)
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  message: string;

  // Honeypot: a real visitor never sees or fills this field (hidden off-screen
  // in the form). If it arrives non-empty, the submission is silently
  // dropped — see MessagesService.create.
  @IsOptional()
  @IsString()
  company?: string;
}
