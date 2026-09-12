import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class QueryQuoteDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsBooleanString()
  featured?: string;
}
