import { PLATFORMS, PLATFORM_LABELS } from '../../constants/enums.js';
import './ContentFilters.css';

export function ContentFilters({ categories, category, platform, featuredOnly, onChange }) {
  return (
    <div className="content-filters">
      <div className="content-filters__group" role="group" aria-label="Filter by category">
        <button
          type="button"
          className={`content-filters__pill ${!category ? 'content-filters__pill--active' : ''}`}
          onClick={() => onChange({ category: '' })}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`content-filters__pill ${category === cat.slug ? 'content-filters__pill--active' : ''}`}
            onClick={() => onChange({ category: cat.slug })}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="content-filters__row">
        <select
          className="content-filters__select"
          value={platform}
          onChange={(event) => onChange({ platform: event.target.value })}
          aria-label="Filter by platform"
        >
          <option value="">All platforms</option>
          {PLATFORMS.map((platformValue) => (
            <option key={platformValue} value={platformValue}>
              {PLATFORM_LABELS[platformValue]}
            </option>
          ))}
        </select>

        <label className="content-filters__checkbox">
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={(event) => onChange({ featured: event.target.checked })}
          />
          Featured only
        </label>
      </div>
    </div>
  );
}
