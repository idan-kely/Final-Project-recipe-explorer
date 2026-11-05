import { Link } from 'react-router-dom';
import type { Recipe } from '../types/recipe';
import RecipeCard from '../components/RecipeCard';

interface FavoritesPageProps {
  favorites: string[];
  allRecipes: Recipe[];
  onToggleFavorite: (id: string) => void;
}

export default function FavoritesPage({ favorites, allRecipes, onToggleFavorite }: FavoritesPageProps) {
  const favoriteRecipes = allRecipes.filter((recipe) => favorites.includes(recipe.id));

  if (favoriteRecipes.length === 0) {
    return (
      <section className="empty-state">
        <h1 className="page-heading">No favorites yet</h1>
        <p>Save recipes you love and find them here</p>
        <Link className="action-button action-button-primary" to="/">Browse all recipes</Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="page-heading">Your favorite recipes</h1>
      <p className="page-subtitle">{favoriteRecipes.length} saved recipes</p>
      <div className="recipe-grid">
        {favoriteRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} isFavorite={true} onToggleFavorite={onToggleFavorite} />
        ))}
      </div>
    </section>
  );
}
