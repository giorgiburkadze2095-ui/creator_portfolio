import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './entities/quote.entity.js';
import { CreateQuoteDto } from './dto/create-quote.dto.js';
import { UpdateQuoteDto } from './dto/update-quote.dto.js';
import { QueryQuoteDto } from './dto/query-quote.dto.js';

// A quote can only be original creator content when no external author is
// attached — this is enforced here, not trusted from the request body, so a
// stray client bug can never mislabel someone else's words as original.
function resolveOriginality(author?: string | null): { author: string | null; isOriginal: boolean } {
  const trimmed = author?.trim() || null;
  return { author: trimmed, isOriginal: trimmed === null };
}

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quotes: Repository<Quote>,
  ) {}

  async findPublic(query: QueryQuoteDto): Promise<Quote[]> {
    const qb = this.quotes.createQueryBuilder('quote').where('quote.published = :published', { published: true });

    if (query.featured !== undefined) {
      qb.andWhere('quote.featured = :featured', { featured: query.featured === 'true' });
    }

    qb.orderBy('quote.sortOrder', 'ASC').addOrderBy('quote.createdAt', 'DESC');
    return qb.getMany();
  }

  async findAllAdmin(): Promise<Quote[]> {
    return this.quotes.find({ order: { sortOrder: 'ASC', createdAt: 'DESC' } });
  }

  async create(dto: CreateQuoteDto): Promise<Quote> {
    const { author, isOriginal } = resolveOriginality(dto.author);
    const quote = this.quotes.create({ ...dto, author, isOriginal });
    return this.quotes.save(quote);
  }

  async update(id: number, dto: UpdateQuoteDto): Promise<Quote> {
    const quote = await this.quotes.findOne({ where: { id } });
    if (!quote) {
      throw new NotFoundException('Quote not found.');
    }
    Object.assign(quote, dto);
    if (dto.author !== undefined) {
      const { author, isOriginal } = resolveOriginality(dto.author);
      quote.author = author;
      quote.isOriginal = isOriginal;
    }
    return this.quotes.save(quote);
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const quote = await this.quotes.findOne({ where: { id } });
    if (!quote) {
      throw new NotFoundException('Quote not found.');
    }
    await this.quotes.remove(quote);
    return { success: true };
  }
}
