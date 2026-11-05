import { Link } from 'react-router-dom';
import type { Recipe } from '../types/recipe';
import FavoriteButton from './FavoriteButton';

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
      <FavoriteButton className="recipe-card-action" isFavorite={isFavorite} onToggle={() => onToggleFavorite(recipe.id)} />
    </article>
  );
}
