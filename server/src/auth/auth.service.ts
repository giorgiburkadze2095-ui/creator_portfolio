import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AdminUser } from '../admins/entities/admin-user.entity.js';
import type { JwtPayload } from './jwt-payload.type.js';
import type { AuthenticatedUser } from './types/authenticated-user.type.js';
import type { UpdateOwnAccountDto } from './dto/update-own-account.dto.js';
import { hashSetupToken } from './utils/setup-token.util.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUsers: Repository<AdminUser>,
    private readonly jwtService: JwtService,
  ) {}

  async validateCredentials(email: string, password: string): Promise<AdminUser> {
    const user = await this.adminUsers.findOne({ where: { email: email.toLowerCase() } });

    if (!user || !user.active || !user.passwordHash) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    return user;
  }

  // Lets a newly created admin (see AdminsService.create) set their own
  // first password using the one-time token they were given out-of-band —
  // SUPER_ADMIN never sees or chooses this value.
  async completeAccountSetup(rawToken: string, password: string): Promise<AdminUser> {
    const user = await this.adminUsers.findOne({
      where: { passwordSetupTokenHash: hashSetupToken(rawToken) },
    });

    if (!user || !user.passwordSetupTokenExpiresAt || user.passwordSetupTokenExpiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('This setup link is invalid or has expired.');
    }

    user.passwordHash = await AuthService.hashPassword(password);
    user.passwordSetupTokenHash = null;
    user.passwordSetupTokenExpiresAt = null;
    return this.adminUsers.save(user);
  }

  // Self-service profile update. Only ever touches the caller's own row —
  // there is no id parameter, so this can never be pointed at another
  // account. Email changes require the current password since there is no
  // email-verification link to send in this architecture.
  async updateOwnProfile(userId: number, dto: UpdateOwnAccountDto): Promise<AdminUser> {
    const user = await this.adminUsers.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Account not found.');
    }

    const nextEmail = dto.email?.toLowerCase();
    if (nextEmail !== undefined && nextEmail !== user.email) {
      if (!dto.currentPassword) {
        throw new BadRequestException('Current password is required to change your email.');
      }
      await this.assertPasswordMatches(user, dto.currentPassword);

      const existing = await this.adminUsers.findOne({ where: { email: nextEmail } });
      if (existing && existing.id !== user.id) {
        throw new ConflictException('Another account already uses this email.');
      }
      user.email = nextEmail;
    }

    if (dto.name !== undefined) {
      user.name = dto.name;
    }

    return this.adminUsers.save(user);
  }

  async changeOwnPassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
    const user = await this.adminUsers.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Account not found.');
    }

    await this.assertPasswordMatches(user, currentPassword);
    user.passwordHash = await AuthService.hashPassword(newPassword);
    await this.adminUsers.save(user);
  }

  private async assertPasswordMatches(user: AdminUser, password: string): Promise<void> {
    if (!user.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Current password is incorrect.');
    }
  }

  issueToken(user: AdminUser): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  toAuthenticatedUser(user: AdminUser): AuthenticatedUser {
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
}
