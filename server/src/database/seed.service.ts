import { Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../admins/entities/admin-user.entity.js';
import { Role } from '../common/enums/role.enum.js';
import { AuthService } from '../auth/auth.service.js';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(AdminUser) private readonly adminUsers: Repository<AdminUser>,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedSuperAdmin();
  }

  private async seedSuperAdmin(): Promise<void> {
    const existingSuperAdmin = await this.adminUsers.findOne({ where: { role: Role.SUPER_ADMIN } });
    if (existingSuperAdmin) {
      return;
    }

    const email = this.config.get<string>('SUPER_ADMIN_EMAIL');
    const password = this.config.get<string>('SUPER_ADMIN_PASSWORD');
    const name = this.config.get<string>('SUPER_ADMIN_NAME', 'Site Owner');

    if (!email || !password) {
      this.logger.warn(
        'No SUPER_ADMIN exists and SUPER_ADMIN_EMAIL/SUPER_ADMIN_PASSWORD are not set — set them in .env and restart to create one.',
      );
      return;
    }

    await this.adminUsers.save(
      this.adminUsers.create({
        email: email.toLowerCase(),
        name,
        role: Role.SUPER_ADMIN,
        active: true,
        passwordHash: await AuthService.hashPassword(password),
      }),
    );
    this.logger.log(`Created initial SUPER_ADMIN account for ${email}.`);
  }
}
