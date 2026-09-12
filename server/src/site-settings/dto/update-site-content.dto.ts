import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateSiteContentDto {
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
  aboutIntro?: string;

  @IsOptional()
  @IsString()
  aboutStory?: string;

  @IsOptional()
  @IsString()
  aboutInterests?: string;

  @IsOptional()
  @IsString()
  aboutFitnessJourney?: string;

  @IsOptional()
  @IsString()
  aboutMusicJourney?: string;

  @IsOptional()
  @IsString()
  aboutPhilosophy?: string;

  @IsOptional()
  @IsString()
  collaborationInfo?: string;

  @IsOptional()
  @IsString()
  workWithMeDescription?: string;

  @IsOptional()
  @IsEmail()
  contactEmail?: string;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  contactUrl?: string;

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
