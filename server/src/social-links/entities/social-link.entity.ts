import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Platform } from '../../common/enums/platform.enum.js';

@Entity('social_links')
export class SocialLink extends BaseEntity {
  @Column({ type: 'varchar' })
  platform: Platform;

  @Column()
  url: string;

  @Column()
  label: string;

  // Icon identifier the frontend maps to a rendered icon (e.g. "instagram").
  @Column()
  iconType: string;

  @Column({ default: 0 })
  sortOrder: number;

  @Column({ default: true })
  active: boolean;
}
