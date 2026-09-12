import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Category } from '../../categories/entities/category.entity.js';
import { Platform } from '../../common/enums/platform.enum.js';
import { DisplayMode } from '../../common/enums/display-mode.enum.js';

@Entity('content_items')
export class ContentItem extends BaseEntity {
  @Column({ type: 'varchar' })
  platform: Platform;

  @Column()
  externalUrl: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ManyToOne(() => Category, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoryId' })
  category: Category | null;

  @Column({ type: 'int', nullable: true })
  categoryId: number | null;

  // Subset of DisplayMode — an item can live in more than one place
  // (e.g. the content feed and the gallery) without a duplicate record.
  @Column({ type: 'simple-array', default: '' })
  displayModes: DisplayMode[];

  @Column({ type: 'varchar', nullable: true })
  thumbnailUrl: string | null;

  @Column({ type: 'varchar', nullable: true })
  authorCredit: string | null;

  @Column({ default: false })
  featured: boolean;

  @Column({ default: true })
  published: boolean;

  @Column({ default: 0 })
  sortOrder: number;
}
