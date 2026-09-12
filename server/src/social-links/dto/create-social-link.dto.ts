import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { Platform } from '../../common/enums/platform.enum.js';

export class CreateSocialLinkDto {
  @IsEnum(Platform)
  platform: Platform;

  @IsUrl({ require_protocol: true })
  url: string;

  @IsString()
  @MaxLength(60)
  label: string;

  @IsString()
  @MaxLength(40)
  iconType: string;

  @IsOptional()
  @IsInt()
  sortOrder?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
