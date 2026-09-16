import { IsBooleanString, IsOptional } from 'class-validator';

export class QueryQuoteDto {
  @IsOptional()
  @IsBooleanString()
  featured?: string;
}
