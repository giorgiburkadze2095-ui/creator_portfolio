import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Role } from '../../common/enums/role.enum.js';

@Entity('admin_users')
export class AdminUser extends BaseEntity {
  @Column({ unique: true })
  email: string;

  // Null until the admin completes their own account-setup flow — a
  // SUPER_ADMIN creating an account never sets this directly (see
  // AdminsService.create), so there is never a password for them to know.
  @Column({ type: 'varchar', nullable: true })
  passwordHash: string | null;

  @Column()
  name: string;

  @Column({ type: 'varchar', default: Role.ADMIN })
  role: Role;

  @Column({ default: true })
  active: boolean;

  // Hash of a one-time token (never the raw token) used only to let a newly
  // created admin set their own initial password. Cleared once used.
  @Column({ type: 'varchar', nullable: true })
  passwordSetupTokenHash: string | null;

  @Column({ type: 'timestamp', nullable: true })
  passwordSetupTokenExpiresAt: Date | null;
}
