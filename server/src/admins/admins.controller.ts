import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service.js';
import { CreateAdminDto } from './dto/create-admin.dto.js';
import { UpdateAdminDto } from './dto/update-admin.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import type { AdminUser } from './entities/admin-user.entity.js';
import type { AuthenticatedUser } from '../auth/types/authenticated-user.type.js';

// Strips both credential fields (the hash itself, and the setup-token hash)
// and replaces them with a plain `hasPassword` flag so the Admin UI can show
// setup status without ever seeing anything usable as a credential.
function toSafeAdmin(admin: AdminUser) {
  const { passwordHash, passwordSetupTokenHash: _tokenHash, ...safe } = admin;
  return { ...safe, hasPassword: passwordHash !== null };
}

@Controller('admin/admins')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  async findAll() {
    const admins = await this.adminsService.findAll();
    return admins.map(toSafeAdmin);
  }

  @Post()
  async create(@Body() dto: CreateAdminDto) {
    const { admin, setupToken } = await this.adminsService.create(dto);
    return { ...toSafeAdmin(admin), setupToken };
  }

  // Re-issues a setup link for an admin who never finished onboarding.
  // AdminsService refuses this once the admin has a password of their own.
  @Post(':id/resend-setup')
  async resendSetup(@Param('id', ParseIntPipe) id: number) {
    const { admin, setupToken } = await this.adminsService.resendSetup(id);
    return { ...toSafeAdmin(admin), setupToken };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAdminDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const admin = await this.adminsService.update(id, dto, user);
    return toSafeAdmin(admin);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser) {
    return this.adminsService.remove(id, user);
  }
}
