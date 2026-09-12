import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from './entities/admin-user.entity.js';
import { CreateAdminDto } from './dto/create-admin.dto.js';
import { UpdateAdminDto } from './dto/update-admin.dto.js';
import { Role } from '../common/enums/role.enum.js';
import { generateSetupToken, type GeneratedSetupToken } from '../auth/utils/setup-token.util.js';
import type { AuthenticatedUser } from '../auth/types/authenticated-user.type.js';

export interface CreatedAdmin {
  admin: AdminUser;
  setupToken: string;
}

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUsers: Repository<AdminUser>,
  ) {}

  async findAll(): Promise<AdminUser[]> {
    return this.adminUsers.find({ order: { createdAt: 'ASC' } });
  }

  // SUPER_ADMIN supplies only identity + role; a password is never set here
  // — the raw setup token is returned exactly once so it can be handed to
  // the new admin out-of-band, and only its hash is ever persisted.
  async create(dto: CreateAdminDto): Promise<CreatedAdmin> {
    const email = dto.email.toLowerCase();
    const existing = await this.adminUsers.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('An admin with this email already exists.');
    }

    const { rawToken, tokenHash, expiresAt }: GeneratedSetupToken = generateSetupToken();

    const admin = this.adminUsers.create({
      email,
      name: dto.name,
      role: dto.role,
      active: dto.active ?? true,
      passwordHash: null,
      passwordSetupTokenHash: tokenHash,
      passwordSetupTokenExpiresAt: expiresAt,
    });

    const saved = await this.adminUsers.save(admin);
    return { admin: saved, setupToken: rawToken };
  }

  // Re-issues a fresh setup link for an admin who never completed onboarding
  // (lost the link, it expired, etc). Refuses once a password exists —
  // SUPER_ADMIN cannot use this as a backdoor password reset for an admin
  // who already controls their own credentials.
  async resendSetup(id: number): Promise<CreatedAdmin> {
    const admin = await this.adminUsers.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException('Admin not found.');
    }
    if (admin.passwordHash) {
      throw new BadRequestException(
        'This admin has already set up their own password. Only they can change it.',
      );
    }

    const { rawToken, tokenHash, expiresAt }: GeneratedSetupToken = generateSetupToken();
    admin.passwordSetupTokenHash = tokenHash;
    admin.passwordSetupTokenExpiresAt = expiresAt;

    const saved = await this.adminUsers.save(admin);
    return { admin: saved, setupToken: rawToken };
  }

  // SUPER_ADMIN may only change role/active here — see UpdateAdminDto for why
  // name/email/password are not accepted at all in this codepath.
  async update(id: number, dto: UpdateAdminDto, actingUser: AuthenticatedUser): Promise<AdminUser> {
    const admin = await this.adminUsers.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException('Admin not found.');
    }

    if (admin.id === actingUser.id) {
      if (dto.role && dto.role !== admin.role) {
        throw new BadRequestException('You cannot change your own role.');
      }
      if (dto.active === false) {
        throw new BadRequestException('You cannot deactivate your own account.');
      }
    }

    if (dto.role !== undefined) admin.role = dto.role;
    if (dto.active !== undefined) admin.active = dto.active;

    return this.adminUsers.save(admin);
  }

  async remove(id: number, actingUser: AuthenticatedUser): Promise<{ success: boolean }> {
    if (id === actingUser.id) {
      throw new BadRequestException('You cannot delete your own account.');
    }

    const admin = await this.adminUsers.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException('Admin not found.');
    }

    if (admin.role === Role.SUPER_ADMIN) {
      const superAdminCount = await this.adminUsers.count({ where: { role: Role.SUPER_ADMIN } });
      if (superAdminCount <= 1) {
        throw new BadRequestException('At least one SUPER_ADMIN must remain.');
      }
    }

    await this.adminUsers.remove(admin);
    return { success: true };
  }
}
