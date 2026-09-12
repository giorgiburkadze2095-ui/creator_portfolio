import { IsIn, IsOptional } from 'class-validator';

export const MESSAGE_STATUS_FILTERS = ['all', 'unread', 'read', 'starred', 'archived'] as const;
export type MessageStatusFilter = (typeof MESSAGE_STATUS_FILTERS)[number];

export class QueryMessagesDto {
  @IsOptional()
  @IsIn(MESSAGE_STATUS_FILTERS)
  status?: MessageStatusFilter;
}
