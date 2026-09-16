import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';

@Entity('quotes')
export class Quote extends BaseEntity {
  @Column({ type: 'text' })
  text: string;

  // Null author => original creator content.
  @Column({ type: 'varchar', nullable: true })
  author: string | null;

  @Column({ default: true })
  isOriginal: boolean;

  @Column({ type: 'varchar', nullable: true })
  attributionSource: string | null;

  @Column({ type: 'varchar', nullable: true })
  sourceUrl: string | null;

  @Column({ default: false })
  featured: boolean;

  @Column({ default: true })
  published: boolean;

  @Column({ default: 0 })
  sortOrder: number;
}
