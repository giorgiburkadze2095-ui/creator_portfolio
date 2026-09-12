import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from './entities/partner.entity.js';
import { CreatePartnerDto } from './dto/create-partner.dto.js';
import { UpdatePartnerDto } from './dto/update-partner.dto.js';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private readonly partners: Repository<Partner>,
  ) {}

  async findAllPublic(): Promise<Partner[]> {
    return this.partners.find({ where: { active: true }, order: { sortOrder: 'ASC', createdAt: 'ASC' } });
  }

  async findAllAdmin(): Promise<Partner[]> {
    return this.partners.find({ order: { sortOrder: 'ASC', createdAt: 'ASC' } });
  }

  async create(dto: CreatePartnerDto): Promise<Partner> {
    return this.partners.save(this.partners.create(dto));
  }

  async update(id: number, dto: UpdatePartnerDto): Promise<Partner> {
    const partner = await this.partners.findOne({ where: { id } });
    if (!partner) {
      throw new NotFoundException('Partner not found.');
    }
    Object.assign(partner, dto);
    return this.partners.save(partner);
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const partner = await this.partners.findOne({ where: { id } });
    if (!partner) {
      throw new NotFoundException('Partner not found.');
    }
    await this.partners.remove(partner);
    return { success: true };
  }
}
