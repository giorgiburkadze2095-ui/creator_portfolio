import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from '../admins/entities/admin-user.entity.js';
import { SeedService } from './seed.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  providers: [SeedService],
})
export class SeedModule {}
