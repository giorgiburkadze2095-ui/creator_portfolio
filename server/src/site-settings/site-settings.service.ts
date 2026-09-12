import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteContent } from './entities/site-content.entity.js';
import { UpdateSiteContentDto } from './dto/update-site-content.dto.js';

const SINGLETON_ID = 1;

@Injectable()
export class SiteSettingsService {
  constructor(
    @InjectRepository(SiteContent)
    private readonly siteContent: Repository<SiteContent>,
  ) {}

  async get(): Promise<SiteContent> {
    let content = await this.siteContent.findOne({ where: { id: SINGLETON_ID } });
    if (!content) {
      content = await this.siteContent.save(this.siteContent.create({ id: SINGLETON_ID }));
    }
    return content;
  }

  async update(dto: UpdateSiteContentDto): Promise<SiteContent> {
    const content = await this.get();
    Object.assign(content, dto);
    return this.siteContent.save(content);
  }
}
