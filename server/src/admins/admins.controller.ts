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

function toSafeAdmin(admin: AdminUser) {
  const { passwordHash: _passwordHash, ...safe } = admin;
  return safe;
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
    const admin = await this.adminsService.create(dto);
    return toSafeAdmin(admin);
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
