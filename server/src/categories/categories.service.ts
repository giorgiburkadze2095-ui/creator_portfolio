import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
  ) {}

  async findAllPublic(): Promise<Category[]> {
    return this.categories.find({ where: { active: true }, order: { sortOrder: 'ASC', label: 'ASC' } });
  }

  async findAllAdmin(): Promise<Category[]> {
    return this.categories.find({ order: { sortOrder: 'ASC', label: 'ASC' } });
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const existing = await this.categories.findOne({ where: { slug: dto.slug } });
    if (existing) {
      throw new ConflictException('A category with this slug already exists.');
    }
    return this.categories.save(this.categories.create(dto));
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categories.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found.');
    }
    Object.assign(category, dto);
    return this.categories.save(category);
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const category = await this.categories.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found.');
    }
    await this.categories.remove(category);
    return { success: true };
  }
}
