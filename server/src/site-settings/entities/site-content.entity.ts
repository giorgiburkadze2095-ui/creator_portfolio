import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

// Singleton row (id is always 1) holding every editable text block on the
// public site, so admins never need a developer to change copy.
@Entity('site_content')
export class SiteContent {
  @PrimaryColumn({ default: 1 })
  id: number;

  // The creator's public display/brand name — used anywhere the site shows
  // who it belongs to (nav brand, footer, hero fallback, page titles,
  // original-quote attribution) instead of hardcoding a name in the UI.
  @Column({ default: '' })
  creatorName: string;

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

  // Deprecated: the Fitness section (nav link, page, and Admin field) was
  // removed. Kept, like contactUrl below, so existing Site Content rows and
  // the column keep working unchanged; nothing in the app reads or writes
  // this anymore.
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
