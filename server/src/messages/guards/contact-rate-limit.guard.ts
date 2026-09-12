import { HttpException, HttpStatus, Injectable, type CanActivate, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;

// A minimal in-memory, per-IP limiter for the public contact endpoint — no
// external service needed for a single-instance personal site. Not meant to
// stop a determined attacker, only casual/bot spam.
@Injectable()
export class ContactRateLimitGuard implements CanActivate {
  private readonly submissionsByIp = new Map<string, number[]>();

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const key = request.ip ?? 'unknown';
    const now = Date.now();

    const recent = (this.submissionsByIp.get(key) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);

    if (recent.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      throw new HttpException('Too many messages sent. Please try again later.', HttpStatus.TOO_MANY_REQUESTS);
    }

    recent.push(now);
    this.submissionsByIp.set(key, recent);
    return true;
  }
}
