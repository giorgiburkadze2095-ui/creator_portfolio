import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AdminUser } from './admins/entities/admin-user.entity.js';
import { Category } from './categories/entities/category.entity.js';
import { ContentItem } from './content/entities/content-item.entity.js';
import { Quote } from './quotes/entities/quote.entity.js';
import { Partner } from './partners/entities/partner.entity.js';
import { SocialLink } from './social-links/entities/social-link.entity.js';
import { SiteContent } from './site-settings/entities/site-content.entity.js';
import { AuthModule } from './auth/auth.module.js';
import { AdminsModule } from './admins/admins.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { ContentModule } from './content/content.module.js';
import { QuotesModule } from './quotes/quotes.module.js';
import { PartnersModule } from './partners/partners.module.js';
import { SocialLinksModule } from './social-links/social-links.module.js';
import { SiteSettingsModule } from './site-settings/site-settings.module.js';
import { SeedModule } from './database/seed.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'better-sqlite3',
        database: config.get<string>('DATABASE_PATH', 'data/db.sqlite'),
        entities: [AdminUser, Category, ContentItem, Quote, Partner, SocialLink, SiteContent],
        synchronize: true,
      }),
    }),
    AuthModule,
    AdminsModule,
    CategoriesModule,
    ContentModule,
    QuotesModule,
    PartnersModule,
    SocialLinksModule,
    SiteSettingsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
