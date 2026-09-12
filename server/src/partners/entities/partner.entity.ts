import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { CollaborationType } from '../../common/enums/collaboration-type.enum.js';

@Entity('partners')
export class Partner extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  logoUrl: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: true })
  websiteUrl: string | null;

  @Column({ type: 'varchar', nullable: true })
  socialUrl: string | null;

  @Column({ type: 'varchar', default: CollaborationType.OTHER })
  collaborationType: CollaborationType;

  @Column({ default: false })
  featured: boolean;

  @Column({ default: true })
  active: boolean;

  @Column({ default: 0 })
  sortOrder: number;
}
