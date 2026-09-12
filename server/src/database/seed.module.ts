import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from '../admins/entities/admin-user.entity.js';
import { Category } from '../categories/entities/category.entity.js';
import { SeedService } from './seed.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser, Category])],
  providers: [SeedService],
})
export class SeedModule {}
