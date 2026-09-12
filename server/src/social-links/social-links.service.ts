import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocialLink } from './entities/social-link.entity.js';
import { CreateSocialLinkDto } from './dto/create-social-link.dto.js';
import { UpdateSocialLinkDto } from './dto/update-social-link.dto.js';

@Injectable()
export class SocialLinksService {
  constructor(
    @InjectRepository(SocialLink)
    private readonly socialLinks: Repository<SocialLink>,
  ) {}

  async findAllPublic(): Promise<SocialLink[]> {
    return this.socialLinks.find({ where: { active: true }, order: { sortOrder: 'ASC' } });
  }

  async findAllAdmin(): Promise<SocialLink[]> {
    return this.socialLinks.find({ order: { sortOrder: 'ASC' } });
  }

  async create(dto: CreateSocialLinkDto): Promise<SocialLink> {
    return this.socialLinks.save(this.socialLinks.create(dto));
  }

  async update(id: number, dto: UpdateSocialLinkDto): Promise<SocialLink> {
    const link = await this.socialLinks.findOne({ where: { id } });
    if (!link) {
      throw new NotFoundException('Social link not found.');
    }
    Object.assign(link, dto);
    return this.socialLinks.save(link);
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const link = await this.socialLinks.findOne({ where: { id } });
    if (!link) {
      throw new NotFoundException('Social link not found.');
    }
    await this.socialLinks.remove(link);
    return { success: true };
  }
}
