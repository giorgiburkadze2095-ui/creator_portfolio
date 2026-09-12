import { AdminUser } from '../admins/entities/admin-user.entity.js';
import { Category } from '../categories/entities/category.entity.js';
import { ContentItem } from '../content/entities/content-item.entity.js';
import { Quote } from '../quotes/entities/quote.entity.js';
import { Partner } from '../partners/entities/partner.entity.js';
import { SocialLink } from '../social-links/entities/social-link.entity.js';
import { SiteContent } from '../site-settings/entities/site-content.entity.js';
import { ContactMessage } from '../messages/entities/contact-message.entity.js';

// Shared between the Nest app (app.module.ts) and the standalone TypeORM
// CLI DataSource (data-source.ts) so both always see the same entity set.
export const ENTITIES = [
  AdminUser,
  Category,
  ContentItem,
  Quote,
  Partner,
  SocialLink,
  SiteContent,
  ContactMessage,
];
