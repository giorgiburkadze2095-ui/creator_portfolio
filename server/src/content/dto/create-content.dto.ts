import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { Platform } from '../../common/enums/platform.enum.js';
import { DisplayMode } from '../../common/enums/display-mode.enum.js';

export class CreateContentDto {
  @IsUrl({ require_protocol: true })
  externalUrl: string;

  @IsOptional()
  @IsEnum(Platform)
  platform?: Platform;

  @IsString()
  @MaxLength(150)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsEnum(DisplayMode, { each: true })
  displayModes?: DisplayMode[];

  @IsOptional()
  @IsUrl({ require_protocol: true })
  thumbnailUrl?: string;

  @IsOptional()
  @IsString()
  authorCredit?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsInt()
  sortOrder?: number;
}
