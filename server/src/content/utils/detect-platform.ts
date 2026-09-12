import { Platform } from '../../common/enums/platform.enum.js';

const HOST_PATTERNS: Array<{ platform: Platform; pattern: RegExp }> = [
  { platform: Platform.INSTAGRAM, pattern: /(^|\.)instagram\.com$/i },
  { platform: Platform.FACEBOOK, pattern: /(^|\.)(facebook\.com|fb\.watch)$/i },
  { platform: Platform.TIKTOK, pattern: /(^|\.)tiktok\.com$/i },
  { platform: Platform.YOUTUBE, pattern: /(^|\.)(youtube\.com|youtu\.be)$/i },
];

// Best-effort detection from the pasted public post URL — used to prefill the
// admin form. Admins can always override it before publishing.
export function detectPlatformFromUrl(url: string): Platform {
  try {
    const hostname = new URL(url).hostname;
    const match = HOST_PATTERNS.find(({ pattern }) => pattern.test(hostname));
    return match?.platform ?? Platform.OTHER;
  } catch {
    return Platform.OTHER;
  }
}
