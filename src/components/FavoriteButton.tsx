interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  className?: string;
}

export default function FavoriteButton({ isFavorite, onToggle, className = '' }: FavoriteButtonProps) {
  return (
    <button
      className={`action-button ${className} ${isFavorite ? 'action-button-danger' : ''}`}
      type="button"
      aria-pressed={isFavorite}
      onClick={onToggle}
    >
      {isFavorite ? '♥ Remove from favorites' : '♡ Add to favorites'}
    </button>
  );
}
