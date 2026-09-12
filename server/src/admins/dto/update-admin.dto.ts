import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../../common/enums/role.enum.js';

// SUPER_ADMIN may only manage another admin's role and active status here —
// name, email and password belong exclusively to that admin (see
// AuthController's /auth/me endpoints for self-service account management).
export class UpdateAdminDto {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
