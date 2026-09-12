import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/enums/role.enum.js';

// No password field: SUPER_ADMIN provides only identity + role. The new
// admin sets their own password via the one-time setup link returned from
// this creation call (see AdminsService.create / AuthController.setupPassword).
export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
