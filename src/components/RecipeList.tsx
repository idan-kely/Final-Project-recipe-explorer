import { useMemo, useState } from 'react';
import RecipeCard from './RecipeCard';
import type { Recipe } from '../types/recipe';
import { filterRecipes } from '../utils/recipeUtils';

interface RecipeListProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function RecipeList({ recipes, favorites, onToggleFavorite }: RecipeListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredRecipes = useMemo(() => filterRecipes(recipes, searchQuery), [recipes, searchQuery]);

  if (recipes.length === 0) {
    return <div className="empty-state"><h2>No recipes found</h2><p>Try again later</p></div>;
  }

  return (
    <section>
      <h1 className="page-heading">What would you like to cook?</h1>
      <p className="page-subtitle">Delicious recipes from around the world</p>
      <label className="recipe-search-label" htmlFor="recipe-search">Search recipes</label>
      <input
        id="recipe-search"
        className="recipe-search-input"
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search by recipe name or category"
      />
      {filteredRecipes.length === 0 ? (
        <div className="empty-state search-empty-state"><h2>No matching recipes</h2><p>Try a different name or category</p></div>
      ) : (
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} isFavorite={favorites.includes(recipe.id)} onToggleFavorite={onToggleFavorite} />
          ))}
        </div>
      )}
    </section>
  );
}
