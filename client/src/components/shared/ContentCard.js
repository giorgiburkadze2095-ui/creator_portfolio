import { useState } from 'react';
import { PlatformIcon } from './PlatformIcon.js';
import { PLATFORM_LABELS } from '../../constants/enums.js';
import { getYouTubeThumbnail, getYouTubeVideoId } from '../../utils/youtube.js';
import './ContentCard.css';

// A generic external-content card. YouTube gets a real, lazily-loaded embed
// (official iframe, no extra script, click-to-play so nothing loads on
// mount). Every other platform — including when a thumbnail fails to load —
// falls back to a clean card that links out to the original post. This is
// the "gracefully degrade" behavior the platform-restriction rules require.
export function ContentCard({ item, variant = 'grid' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailFailed, setThumbnailFailed] = useState(false);

  const isYouTube = item.platform === 'YOUTUBE';
  const youTubeId = isYouTube ? getYouTubeVideoId(item.externalUrl) : null;
  const thumbnail = item.thumbnailUrl || (isYouTube ? getYouTubeThumbnail(item.externalUrl) : null);
  const platformLabel = PLATFORM_LABELS[item.platform] || 'Web';
  const iconType = item.platform?.toLowerCase();

  return (
    <article className={`content-card content-card--${variant}`}>
      <div className="content-card__media">
        {isPlaying && youTubeId ? (
          <iframe
            className="content-card__iframe"
            src={`https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=1`}
            title={item.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="content-card__media-trigger"
            onClick={youTubeId ? () => setIsPlaying(true) : undefined}
            aria-label={youTubeId ? `Play ${item.title}` : item.title}
            disabled={!youTubeId}
          >
            {thumbnail && !thumbnailFailed ? (
              <img
                src={thumbnail}
                alt=""
                loading="lazy"
                onError={() => setThumbnailFailed(true)}
              />
            ) : (
              <span className="content-card__fallback">
                <PlatformIcon type={iconType} size={32} />
              </span>
            )}
            {youTubeId && <span className="content-card__play">▶</span>}
          </button>
        )}
        {item.featured && <span className="content-card__badge">Featured</span>}
      </div>

      <a
        className="content-card__body"
        href={item.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="content-card__meta">
          <PlatformIcon type={iconType} size={14} />
          <span>{platformLabel}</span>
        </div>
        <h3 className="content-card__title">{item.title}</h3>
        {item.description && <p className="content-card__description">{item.description}</p>}
        {item.authorCredit && <p className="content-card__credit">{item.authorCredit}</p>}
        <span className="content-card__link">View on {platformLabel} ↗</span>
      </a>
    </article>
  );
}
