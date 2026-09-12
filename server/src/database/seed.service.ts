import { Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../admins/entities/admin-user.entity.js';
import { Category } from '../categories/entities/category.entity.js';
import { Role } from '../common/enums/role.enum.js';
import { AuthService } from '../auth/auth.service.js';

const DEFAULT_CATEGORIES: Array<{ slug: string; label: string }> = [
  { slug: 'fitness', label: 'Fitness' },
  { slug: 'motivation', label: 'Motivation' },
  { slug: 'music', label: 'Music' },
  { slug: 'quotes', label: 'Quotes' },
  { slug: 'thoughts', label: 'Thoughts' },
  { slug: 'silence', label: 'Silence' },
  { slug: 'lifestyle', label: 'Lifestyle' },
];

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(AdminUser) private readonly adminUsers: Repository<AdminUser>,
    @InjectRepository(Category) private readonly categories: Repository<Category>,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.seedSuperAdmin();
    await this.seedCategories();
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

  private async seedCategories(): Promise<void> {
    const count = await this.categories.count();
    if (count > 0) {
      return;
    }

    await this.categories.save(
      DEFAULT_CATEGORIES.map((category, index) =>
        this.categories.create({ ...category, sortOrder: index }),
      ),
    );
    this.logger.log('Seeded default content categories.');
  }
}
