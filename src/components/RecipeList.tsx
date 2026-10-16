import RecipeCard from './RecipeCard';
import type { Recipe } from '../types/recipe';

interface RecipeListProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function RecipeList({ recipes, favorites, onToggleFavorite }: RecipeListProps) {
  if (recipes.length === 0) {
    return <div className="empty-state"><h2>No recipes found</h2><p>Try again later</p></div>;
  }

  return (
    <section>
      <h1 className="page-heading">What would you like to cook?</h1>
      <p className="page-subtitle">Delicious recipes from around the world</p>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} isFavorite={favorites.includes(recipe.id)} onToggleFavorite={onToggleFavorite} />
        ))}
      </div>
    </section>
  );
}
