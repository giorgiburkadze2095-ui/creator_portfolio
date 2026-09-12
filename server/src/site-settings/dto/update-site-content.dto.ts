import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

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

  // Deprecated: the public Collaborate page now has an embedded contact form
  // instead of linking out to an external one. Kept (rather than removed)
  // so existing Site Content rows and the column keep working unchanged;
  // the Admin UI no longer exposes this field for editing.
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
