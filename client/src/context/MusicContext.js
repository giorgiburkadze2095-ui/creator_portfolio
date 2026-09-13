import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// Served from client/public/audio/background.mp3 — a plain root-relative
// path (not process.env.PUBLIC_URL) to match how other static assets are
// referenced from JS elsewhere in the app (see config/seo.js).
const TRACK_SRC = '/audio/background.mp3';
const DEFAULT_VOLUME = 0.5;

const MusicContext = createContext({ isPlaying: false, toggleMusic: () => {} });

// Mounted once in index.js, above <App /> and outside of any <Routes>, so
// the single <audio> element it owns is never unmounted or recreated by
// client-side navigation — playback continues seamlessly across pages,
// including into the admin panel.
export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!audioRef.current && typeof Audio !== 'undefined') {
    const audio = new Audio(TRACK_SRC);
    audio.loop = true;
    audio.volume = DEFAULT_VOLUME;
    audio.preload = 'none';
    audioRef.current = audio;
  }

  // isPlaying always mirrors the audio element's own play/pause events —
  // never set optimistically from a click handler — so the UI can never
  // show "playing" when playback didn't actually start (e.g. the browser
  // rejected the play() call, or the file failed to load). The 'error'
  // listener matters for the same reason: 'play' fires as soon as the
  // element's play/pause intent flips, before the browser has confirmed the
  // source is actually valid, so if background.mp3 is missing and the host
  // falls back to serving index.html for the request (common with SPA
  // rewrite rules, in dev via webpack-dev-server too), the element briefly
  // reports "playing" for a file that will never make sound. The error
  // event corrects that back to false as soon as it's detected.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onPause);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onPause);
    };
  }, []);

  // One real autoplay attempt on mount. Browsers routinely reject
  // unmuted autoplay for a page with no interaction history — that's
  // expected, not an error, so the rejection is just swallowed here and
  // isPlaying simply stays false (it's never told otherwise, since it only
  // ever changes via the real 'play'/'pause' events above). No retries, no
  // timers, no muting to force it through — the Play button covers the
  // case where this attempt is blocked.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().catch(() => {});
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      // play() returns a promise that rejects if the browser refuses it
      // (e.g. the file is missing/unsupported) — swallow it rather than
      // let it surface as an unhandled rejection; isPlaying stays false
      // either way since it only follows the audio element's real events.
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  return <MusicContext.Provider value={{ isPlaying, toggleMusic }}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  return useContext(MusicContext);
}
