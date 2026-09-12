import type { Role } from '../common/enums/role.enum.js';

export interface JwtPayload {
  sub: number;
  email: string;
  name: string;
  role: Role;
}
