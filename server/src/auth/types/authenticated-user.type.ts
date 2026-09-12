import type { Role } from '../../common/enums/role.enum.js';

export interface AuthenticatedUser {
  id: number;
  email: string;
  name: string;
  role: Role;
}
