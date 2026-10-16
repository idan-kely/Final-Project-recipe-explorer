import { useParams, Link } from 'react-router-dom';
import type { Recipe } from '../types/recipe';
import { formatInstructions } from '../utils/recipeUtils';

interface RecipeDetailProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function RecipeDetail({ recipes, favorites, onToggleFavorite }: RecipeDetailProps) {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find((item) => item.id === id);

  if (!recipe) {
    return (
      <section className="empty-state">
        <h1 className="page-heading">Recipe not found</h1>
        <p>This link may be invalid or the recipe may no longer be available</p>
        <Link className="action-button action-button-primary" to="/">Back to all recipes</Link>
      </section>
    );
  }

  const isFavorite = favorites.includes(recipe.id);
  const steps = formatInstructions(recipe.instructions);

  return (
    <article className="recipe-detail">
      <img className="recipe-detail-image" src={recipe.thumbnail} alt={recipe.title} />
      <div className="recipe-detail-content">
        <Link className="text-link" to="/">Back to all recipes</Link>
        <h1 className="recipe-detail-title">{recipe.title}</h1>
        <div className="recipe-meta">
          <span className="recipe-meta-item">Category: {recipe.category}</span>
          <span className="recipe-meta-item">Cuisine: {recipe.area}</span>
        </div>
        <button className={`action-button${isFavorite ? ' action-button-danger' : ''}`} type="button" aria-pressed={isFavorite} onClick={() => onToggleFavorite(recipe.id)}>
          {isFavorite ? '♥ Remove from favorites' : '♡ Add to favorites'}
        </button>
        <section className="instructions-section">
          <h2 className="section-heading">Instructions</h2>
          {steps.length > 0 ? (
            <ol className="instruction-list">
              {steps.map((step, index) => <li className="instruction-step" key={`${index}-${step.slice(0, 24)}`}>{step}</li>)}
            </ol>
          ) : <p className="empty-note">No instructions were provided for this recipe</p>}
        </section>
        {recipe.ingredients.length > 0 && (
          <section className="ingredients-section">
            <h2 className="section-heading">Ingredients</h2>
            <ul className="ingredients-list">{recipe.ingredients.map((ingredient, index) => <li key={`${index}-${ingredient}`}>{ingredient}</li>)}</ul>
          </section>
        )}
      </div>
    </article>
  );
}
