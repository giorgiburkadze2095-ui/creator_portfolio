// Extracts a YouTube video id from watch/share/shorts URL shapes so we can
// lazily build an embed src only once the viewer opts in to play it.
export function getYouTubeVideoId(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.slice(1).split('/')[0] || null;
    }
    if (parsed.searchParams.has('v')) {
      return parsed.searchParams.get('v');
    }
    const shortsMatch = parsed.pathname.match(/\/shorts\/([^/]+)/);
    if (shortsMatch) {
      return shortsMatch[1];
    }
    const embedMatch = parsed.pathname.match(/\/embed\/([^/]+)/);
    if (embedMatch) {
      return embedMatch[1];
    }
    return null;
  } catch {
    return null;
  }
}

export function getYouTubeThumbnail(url) {
  const id = getYouTubeVideoId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}
