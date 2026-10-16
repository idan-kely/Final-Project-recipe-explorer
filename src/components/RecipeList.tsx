import RecipeCard from './RecipeCard';
import type { Recipe } from '../types/recipe';

interface RecipeListProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function RecipeList({ recipes, favorites, onToggleFavorite }: RecipeListProps) {
  if (recipes.length === 0) {
    return <div className="empty-state"><h2>לא נמצאו מתכונים</h2><p>נסו לחפש שוב מאוחר יותר.</p></div>;
  }

  return (
    <section>
      <h1 className="page-heading">מה מתחשק לכם לבשל?</h1>
      <p className="page-subtitle">מתכונים טעימים מכל העולם, במקום אחד.</p>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} isFavorite={favorites.includes(recipe.id)} onToggleFavorite={onToggleFavorite} />
        ))}
      </div>
    </section>
  );
}
