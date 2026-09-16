import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateSiteContentDto {
  @IsOptional()
  @IsString()
  creatorName?: string;

  @IsOptional()
  @IsString()
  heroTitle?: string;

  @IsOptional()
  @IsString()
  heroSubtitle?: string;

  @IsOptional()
  @IsString()
  heroTagline?: string;

  @IsOptional()
  @IsString()
  personalStatement?: string;

  @IsOptional()
  @IsString()
  workWithMeDescription?: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @IsString()
  ctaTitle?: string;

  @IsOptional()
  @IsString()
  ctaText?: string;

  @IsOptional()
  @IsString()
  footerText?: string;
}
