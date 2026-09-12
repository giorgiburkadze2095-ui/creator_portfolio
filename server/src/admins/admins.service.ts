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
import { AuthService } from '../auth/auth.service.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../auth/types/authenticated-user.type.js';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUsers: Repository<AdminUser>,
  ) {}

  async findAll(): Promise<AdminUser[]> {
    return this.adminUsers.find({ order: { createdAt: 'ASC' } });
  }

  async create(dto: CreateAdminDto): Promise<AdminUser> {
    const email = dto.email.toLowerCase();
    const existing = await this.adminUsers.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('An admin with this email already exists.');
    }

    const admin = this.adminUsers.create({
      email,
      name: dto.name,
      role: dto.role,
      active: dto.active ?? true,
      passwordHash: await AuthService.hashPassword(dto.password),
    });

    return this.adminUsers.save(admin);
  }

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

    if (dto.name !== undefined) admin.name = dto.name;
    if (dto.role !== undefined) admin.role = dto.role;
    if (dto.active !== undefined) admin.active = dto.active;
    if (dto.password) admin.passwordHash = await AuthService.hashPassword(dto.password);

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
