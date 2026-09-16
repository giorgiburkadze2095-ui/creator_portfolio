import { IsBooleanString, IsEnum, IsOptional } from 'class-validator';
import { Platform } from '../../common/enums/platform.enum.js';

export class QueryContentDto {
  @IsOptional()
  @IsEnum(Platform)
  platform?: Platform;

  @IsOptional()
  @IsBooleanString()
  featured?: string;

  @IsOptional()
  @IsBooleanString()
  music?: string;
}
