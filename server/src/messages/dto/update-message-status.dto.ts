import { IsBoolean, IsOptional } from 'class-validator';

// Each flag is independent and optional — a request only touches the
// field(s) it sends (see MessagesService.updateStatus), so e.g. marking a
// message unread never affects its starred/archived state.
export class UpdateMessageStatusDto {
  @IsOptional()
  @IsBoolean()
  read?: boolean;

  @IsOptional()
  @IsBoolean()
  starred?: boolean;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;
}
