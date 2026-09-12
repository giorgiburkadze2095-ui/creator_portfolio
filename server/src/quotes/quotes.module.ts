import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity.js';
import { QuotesService } from './quotes.service.js';
import { AdminQuotesController, QuotesController } from './quotes.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Quote]), AuthModule],
  controllers: [QuotesController, AdminQuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
