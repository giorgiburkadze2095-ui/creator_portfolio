import { useMusic } from '../../context/MusicContext.js';
import './MusicToggle.css';

// Purely a UI redesign — same useMusic() hook, same toggleMusic() call, same
// isPlaying-driven state as the old icon button. No audio/context logic here.
export function MusicToggle({ className = '' }) {
  const { isPlaying, toggleMusic } = useMusic();

  return (
    <button
      type="button"
      className={`music-toggle ${isPlaying ? 'music-toggle--active' : ''} ${className}`}
      onClick={toggleMusic}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      aria-pressed={isPlaying}
      title={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? 'Silence' : 'Break the silence'}
    </button>
  );
}
