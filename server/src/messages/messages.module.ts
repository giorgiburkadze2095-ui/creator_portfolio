import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactMessage } from './entities/contact-message.entity.js';
import { MessagesService } from './messages.service.js';
import { AdminMessagesController, ContactController } from './messages.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([ContactMessage]), AuthModule],
  controllers: [ContactController, AdminMessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
