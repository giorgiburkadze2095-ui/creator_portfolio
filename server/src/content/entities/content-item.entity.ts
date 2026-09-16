import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
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

  // Replaces the old admin-manageable "category" relation, which was
  // removed entirely — Music is the only remaining topic that content needs
  // to be distinguished by, so this is a plain flag rather than a lookup
  // table admins would otherwise have to curate.
  @Column({ default: false })
  isMusic: boolean;

  // Subset of DisplayMode — an item can live in more than one place
  // (e.g. the content feed and the homepage) without a duplicate record.
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
