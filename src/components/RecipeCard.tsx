import { Link } from 'react-router-dom';
import type { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite }: RecipeCardProps) {
  return (
    <article className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
        <img className="recipe-card-image" src={recipe.thumbnail} alt={recipe.title} />
        <div className="recipe-card-body">
          <h2 className="recipe-card-title">{recipe.title}</h2>
          <p className="recipe-card-meta">
            {recipe.area ? `${recipe.category} · ${recipe.area}` : recipe.category}
          </p>
        </div>
      </Link>
      <button className={`action-button recipe-card-action${isFavorite ? ' action-button-danger' : ''}`} type="button" aria-pressed={isFavorite} onClick={() => onToggleFavorite(recipe.id)}>
        {isFavorite ? '♥ Remove from favorites' : '♡ Add to favorites'}
      </button>
    </article>
  );
}
