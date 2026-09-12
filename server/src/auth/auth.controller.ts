import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { UpdateOwnAccountDto } from './dto/update-own-account.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { SetupPasswordDto } from './dto/setup-password.dto.js';
import { ACCESS_TOKEN_COOKIE } from './auth.constants.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import type { AuthenticatedUser } from './types/authenticated-user.type.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: AuthenticatedUser }> {
    const user = await this.authService.validateCredentials(dto.email, dto.password);
    this.setAuthCookie(res, this.authService.issueToken(user));
    return { user: this.authService.toAuthenticatedUser(user) };
  }

  // Public — reached via the one-time setup link a SUPER_ADMIN hands a new
  // admin after creating their account (see AdminsController.create). Sets
  // the admin's first password and signs them straight in.
  @Post('setup-password')
  @HttpCode(HttpStatus.OK)
  async setupPassword(
    @Body() dto: SetupPasswordDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ user: AuthenticatedUser }> {
    const user = await this.authService.completeAccountSetup(dto.token, dto.password);
    this.setAuthCookie(res, this.authService.issueToken(user));
    return { user: this.authService.toAuthenticatedUser(user) };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response): { success: boolean } {
    res.clearCookie(ACCESS_TOKEN_COOKIE, this.cookieOptions());
    return { success: true };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: AuthenticatedUser): AuthenticatedUser {
    return user;
  }

  // Self-service only: there is no id in this route, so an admin can only
  // ever update their own row, never another account's.
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateMe(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateOwnAccountDto,
  ): Promise<AuthenticatedUser> {
    const updated = await this.authService.updateOwnProfile(user.id, dto);
    return this.authService.toAuthenticatedUser(updated);
  }

  @Patch('me/password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async changeMyPassword(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ChangePasswordDto,
  ): Promise<{ success: boolean }> {
    await this.authService.changeOwnPassword(user.id, dto.currentPassword, dto.newPassword);
    return { success: true };
  }

  private setAuthCookie(res: Response, token: string): void {
    res.cookie(ACCESS_TOKEN_COOKIE, token, {
      ...this.cookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  // The frontend (Vercel) and this API are separate domains in production,
  // so every request is cross-site — a cookie only travels on cross-site
  // fetch/XHR calls (not just top-level navigations) when it's
  // SameSite=None, and browsers only honor SameSite=None on a Secure
  // cookie. Locally, frontend and backend share the "localhost" site (just
  // different ports), where Lax already works and Secure would block the
  // cookie over plain HTTP — so both attributes flip together on the same
  // NODE_ENV signal `secure` already used.
  private cookieOptions(): { httpOnly: true; sameSite: 'none' | 'lax'; secure: boolean; path: string } {
    const isProduction = this.config.get('NODE_ENV') === 'production';
    return {
      httpOnly: true,
      sameSite: isProduction ? 'none' : 'lax',
      secure: isProduction,
      path: '/',
    };
  }
}
