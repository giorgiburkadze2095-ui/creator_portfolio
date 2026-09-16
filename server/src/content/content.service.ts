import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContentItem } from './entities/content-item.entity.js';
import { CreateContentDto } from './dto/create-content.dto.js';
import { UpdateContentDto } from './dto/update-content.dto.js';
import { QueryContentDto } from './dto/query-content.dto.js';
import { detectPlatformFromUrl } from './utils/detect-platform.js';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentItem)
    private readonly contentItems: Repository<ContentItem>,
  ) {}

  async findPublic(query: QueryContentDto): Promise<ContentItem[]> {
    const qb = this.contentItems.createQueryBuilder('item').where('item.published = :published', { published: true });

    if (query.music !== undefined) {
      qb.andWhere('item.isMusic = :isMusic', { isMusic: query.music === 'true' });
    }
    if (query.platform) {
      qb.andWhere('item.platform = :platform', { platform: query.platform });
    }
    if (query.featured !== undefined) {
      qb.andWhere('item.featured = :featured', { featured: query.featured === 'true' });
    }

    qb.orderBy('item.sortOrder', 'ASC').addOrderBy('item.createdAt', 'DESC');

    return qb.getMany();
  }

  async findAllAdmin(): Promise<ContentItem[]> {
    return this.contentItems.find({
      order: { sortOrder: 'ASC', createdAt: 'DESC' },
    });
  }

  async create(dto: CreateContentDto): Promise<ContentItem> {
    const item = this.contentItems.create({
      ...dto,
      platform: dto.platform ?? detectPlatformFromUrl(dto.externalUrl),
      displayModes: dto.displayModes ?? [],
    });
    return this.contentItems.save(item);
  }

  async update(id: number, dto: UpdateContentDto): Promise<ContentItem> {
    const item = await this.contentItems.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Content item not found.');
    }
    Object.assign(item, dto);
    return this.contentItems.save(item);
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const item = await this.contentItems.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Content item not found.');
    }
    await this.contentItems.remove(item);
    return { success: true };
  }
}
