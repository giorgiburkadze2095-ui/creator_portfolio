import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';

// Incoming submissions from the public contact form. `read` and `starred`
// are intentionally independent flags (not a single status enum) so a
// message can be read+starred, or unread+starred, without one clobbering
// the other — see MessagesService.updateStatus.
@Entity('contact_messages')
export class ContactMessage extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ default: false })
  read: boolean;

  @Column({ default: false })
  starred: boolean;

  @Column({ default: false })
  archived: boolean;
}
