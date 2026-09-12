import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteContent } from './entities/site-content.entity.js';
import { SiteSettingsService } from './site-settings.service.js';
import { AdminSiteSettingsController, SiteSettingsController } from './site-settings.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([SiteContent]), AuthModule],
  controllers: [SiteSettingsController, AdminSiteSettingsController],
  providers: [SiteSettingsService],
})
export class SiteSettingsModule {}
