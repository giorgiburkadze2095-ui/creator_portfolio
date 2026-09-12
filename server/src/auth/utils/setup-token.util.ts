import { createHash, randomBytes } from 'node:crypto';

const SETUP_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface GeneratedSetupToken {
  rawToken: string;
  tokenHash: string;
  expiresAt: Date;
}

// The raw token is returned to the caller exactly once (at creation time)
// and only its hash is ever persisted — so nobody, including a SUPER_ADMIN
// who created the account, can retrieve a usable token from the database
// afterward.
export function generateSetupToken(): GeneratedSetupToken {
  const rawToken = randomBytes(32).toString('hex');
  return {
    rawToken,
    tokenHash: hashSetupToken(rawToken),
    expiresAt: new Date(Date.now() + SETUP_TOKEN_TTL_MS),
  };
}

export function hashSetupToken(rawToken: string): string {
  return createHash('sha256').update(rawToken).digest('hex');
}
