import './LoadingState.css';

export function LoadingState({ label = 'Loading' }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <span className="loading-state__dot" />
      <span className="loading-state__dot" />
      <span className="loading-state__dot" />
      <span className="visually-hidden">{label}</span>
    </div>
  );
}
