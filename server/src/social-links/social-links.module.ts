import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialLink } from './entities/social-link.entity.js';
import { SocialLinksService } from './social-links.service.js';
import { AdminSocialLinksController, SocialLinksController } from './social-links.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([SocialLink]), AuthModule],
  controllers: [SocialLinksController, AdminSocialLinksController],
  providers: [SocialLinksService],
})
export class SocialLinksModule {}
