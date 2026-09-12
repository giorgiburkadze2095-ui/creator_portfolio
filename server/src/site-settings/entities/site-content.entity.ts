import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

// Singleton row (id is always 1) holding every editable text block on the
// public site, so admins never need a developer to change copy.
@Entity('site_content')
export class SiteContent {
  @PrimaryColumn({ default: 1 })
  id: number;

  @Column({ default: '' })
  heroTitle: string;

  @Column({ default: '' })
  heroSubtitle: string;

  @Column({ default: '' })
  heroTagline: string;

  @Column({ type: 'text', default: '' })
  personalStatement: string;

  @Column({ type: 'text', default: '' })
  aboutIntro: string;

  @Column({ type: 'text', default: '' })
  aboutStory: string;

  @Column({ type: 'text', default: '' })
  aboutInterests: string;

  @Column({ type: 'text', default: '' })
  aboutFitnessJourney: string;

  @Column({ type: 'text', default: '' })
  aboutMusicJourney: string;

  @Column({ type: 'text', default: '' })
  aboutPhilosophy: string;

  @Column({ type: 'text', default: '' })
  collaborationInfo: string;

  @Column({ type: 'text', default: '' })
  workWithMeDescription: string;

  @Column({ type: 'varchar', nullable: true })
  contactEmail: string | null;

  @Column({ type: 'varchar', nullable: true })
  contactUrl: string | null;

  @Column({ type: 'text', default: '' })
  ctaTitle: string;

  @Column({ type: 'text', default: '' })
  ctaText: string;

  @Column({ type: 'text', default: '' })
  footerText: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
