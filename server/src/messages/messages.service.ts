import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './entities/contact-message.entity.js';
import { CreateContactMessageDto } from './dto/create-contact-message.dto.js';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto.js';
import type { MessageStatusFilter } from './dto/query-messages.dto.js';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);

  constructor(
    @InjectRepository(ContactMessage)
    private readonly messages: Repository<ContactMessage>,
  ) {}

  async create(dto: CreateContactMessageDto): Promise<void> {
    if (dto.company) {
      // Honeypot tripped — pretend success to the caller without storing
      // anything, so the bot has no signal it was caught.
      this.logger.debug('Dropped contact submission with a filled honeypot field.');
      return;
    }

    await this.messages.save(
      this.messages.create({
        name: dto.name,
        email: dto.email,
        message: dto.message,
      }),
    );
  }

  async findAll(status: MessageStatusFilter = 'all'): Promise<ContactMessage[]> {
    const where: Partial<Record<'read' | 'starred' | 'archived', boolean>> = {
      unread: { read: false },
      read: { read: true },
      starred: { starred: true },
      archived: { archived: true },
      all: {},
    }[status];

    return this.messages.find({ where, order: { createdAt: 'DESC' } });
  }

  async getUnreadCount(): Promise<number> {
    return this.messages.count({ where: { read: false, archived: false } });
  }

  // Fetching a message is how the admin "opens" it — marking it read is a
  // side effect of that, exactly like an email client, and never touches
  // `starred` or `archived`.
  async findOneAndMarkRead(id: number): Promise<ContactMessage> {
    const message = await this.findOneOrThrow(id);
    if (!message.read) {
      message.read = true;
      await this.messages.save(message);
    }
    return message;
  }

  async updateStatus(id: number, dto: UpdateMessageStatusDto): Promise<ContactMessage> {
    const message = await this.findOneOrThrow(id);
    if (dto.read !== undefined) message.read = dto.read;
    if (dto.starred !== undefined) message.starred = dto.starred;
    if (dto.archived !== undefined) message.archived = dto.archived;
    return this.messages.save(message);
  }

  private async findOneOrThrow(id: number): Promise<ContactMessage> {
    const message = await this.messages.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException('Message not found.');
    }
    return message;
  }
}
