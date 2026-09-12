import { IsBooleanString, IsEnum, IsOptional, IsString } from 'class-validator';
import { Platform } from '../../common/enums/platform.enum.js';
import { DisplayMode } from '../../common/enums/display-mode.enum.js';

export class QueryContentDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsEnum(Platform)
  platform?: Platform;

  @IsOptional()
  @IsEnum(DisplayMode)
  displayMode?: DisplayMode;

  @IsOptional()
  @IsBooleanString()
  featured?: string;
}
