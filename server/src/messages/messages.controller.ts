import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service.js';
import { CreateContactMessageDto } from './dto/create-contact-message.dto.js';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto.js';
import { QueryMessagesDto } from './dto/query-messages.dto.js';
import { ContactRateLimitGuard } from './guards/contact-rate-limit.guard.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Role } from '../common/enums/role.enum.js';

// Public — no admin data is ever readable here, only writable, and only a
// generic success response is returned (never the stored row or its id).
@Controller('contact')
export class ContactController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(ContactRateLimitGuard)
  @HttpCode(HttpStatus.OK)
  async submit(@Body() dto: CreateContactMessageDto): Promise<{ success: boolean }> {
    await this.messagesService.create(dto);
    return { success: true };
  }
}

// Admin-only inbox. Both ADMIN and SUPER_ADMIN have equal access here, per
// the existing authorization model used by every other content domain.
@Controller('admin/messages')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
export class AdminMessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll(@Query() query: QueryMessagesDto) {
    return this.messagesService.findAll(query.status);
  }

  @Get('unread-count')
  async unreadCount() {
    return { count: await this.messagesService.getUnreadCount() };
  }

  // Opening a message marks it read as a side effect — see MessagesService.
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.findOneAndMarkRead(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMessageStatusDto) {
    return this.messagesService.updateStatus(id, dto);
  }
}
