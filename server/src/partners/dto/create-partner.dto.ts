import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { CollaborationType } from '../../common/enums/collaboration-type.enum.js';

export class CreatePartnerDto {
  @IsString()
  @MaxLength(120)
  name: string;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  logoUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  websiteUrl?: string;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  socialUrl?: string;

  @IsOptional()
  @IsEnum(CollaborationType)
  collaborationType?: CollaborationType;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
