import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { SocialLinksService } from './social-links.service.js';
import { CreateSocialLinkDto } from './dto/create-social-link.dto.js';
import { UpdateSocialLinkDto } from './dto/update-social-link.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { Role } from '../common/enums/role.enum.js';

@Controller('social-links')
export class SocialLinksController {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @Get()
  findAllPublic() {
    return this.socialLinksService.findAllPublic();
  }
}

@Controller('admin/social-links')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
export class AdminSocialLinksController {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @Get()
  findAll() {
    return this.socialLinksService.findAllAdmin();
  }

  @Post()
  create(@Body() dto: CreateSocialLinkDto) {
    return this.socialLinksService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSocialLinkDto) {
    return this.socialLinksService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.socialLinksService.remove(id);
  }
}
