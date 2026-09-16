import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

// Singleton row (id is always 1) holding every editable text block on the
// public site, so admins never need a developer to change copy.
@Entity('site_content')
export class SiteContent {
  @PrimaryColumn({ default: 1 })
  id: number;

  // The creator's public display/brand name — used anywhere the site shows
  // who it belongs to (nav brand, footer, hero fallback, page titles)
  // instead of hardcoding a name in the UI.
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

  // Each About page section now has both a body and a heading column, so the
  // section's whole identity — not just its text — is admin-editable. The
  // default matches what used to be hardcoded in AboutPage.js, so existing
  // sites keep the same headings until an admin changes them.
  @Column({ type: 'text', default: '' })
  aboutIntro: string;

  @Column({ default: 'Who I am' })
  aboutIntroTitle: string;

  // Deprecated: the "My story" and "What I care about" About page sections
  // were removed in favor of a shorter page (intro, music journey,
  // philosophy, collaboration). Kept, like contactUrl below, so existing
  // Site Content rows and the columns keep working unchanged; nothing in the
  // app reads or writes these anymore.
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

  @Column({ default: 'The music journey' })
  aboutMusicJourneyTitle: string;

  @Column({ type: 'text', default: '' })
  aboutPhilosophy: string;

  @Column({ default: 'How I think about it' })
  aboutPhilosophyTitle: string;

  @Column({ type: 'text', default: '' })
  collaborationInfo: string;

  @Column({ default: 'Collaboration' })
  collaborationInfoTitle: string;

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
