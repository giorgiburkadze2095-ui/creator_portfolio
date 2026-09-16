import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ENTITIES } from './database/entities.js';
import { AuthModule } from './auth/auth.module.js';
import { AdminsModule } from './admins/admins.module.js';
import { ContentModule } from './content/content.module.js';
import { PartnersModule } from './partners/partners.module.js';
import { SocialLinksModule } from './social-links/social-links.module.js';
import { SiteSettingsModule } from './site-settings/site-settings.module.js';
import { MessagesModule } from './messages/messages.module.js';
import { SeedModule } from './database/seed.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.getOrThrow<string>('DATABASE_URL'),
        entities: ENTITIES,
        migrations: ['dist/database/migrations/*.js'],
        migrationsRun: true,
        synchronize: false,
      }),
    }),
    AuthModule,
    AdminsModule,
    ContentModule,
    PartnersModule,
    SocialLinksModule,
    SiteSettingsModule,
    MessagesModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
