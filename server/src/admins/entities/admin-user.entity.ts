import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity.js';
import { Role } from '../../common/enums/role.enum.js';

@Entity('admin_users')
export class AdminUser extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', default: Role.ADMIN })
  role: Role;

  @Column({ default: true })
  active: boolean;
}
