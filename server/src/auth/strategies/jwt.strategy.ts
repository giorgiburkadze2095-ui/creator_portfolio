import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, type StrategyOptionsWithoutRequest } from 'passport-jwt';
import type { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from '../../admins/entities/admin-user.entity.js';
import type { JwtPayload } from '../jwt-payload.type.js';
import type { AuthenticatedUser } from '../types/authenticated-user.type.js';
import { ACCESS_TOKEN_COOKIE } from '../auth.constants.js';

function cookieExtractor(req: Request): string | null {
  return req?.cookies?.[ACCESS_TOKEN_COOKIE] ?? null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    @InjectRepository(AdminUser)
    private readonly adminUsers: Repository<AdminUser>,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET', 'dev-secret-change-me'),
    } satisfies StrategyOptionsWithoutRequest);
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const user = await this.adminUsers.findOne({ where: { id: payload.sub } });
    if (!user || !user.active) {
      throw new UnauthorizedException('Account is no longer active.');
    }
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }
}
