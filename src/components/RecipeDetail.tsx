import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Recipe } from '../types/recipe';
import { formatInstructions } from '../utils/recipeUtils';

interface MealDBDetailItem {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  [key: string]: string | null | undefined;
}

interface MealDBDetailResponse {
  meals: MealDBDetailItem[] | null;
}

interface RecipeDetailProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function RecipeDetail({ recipes, favorites, onToggleFavorite }: RecipeDetailProps) {
  const { id } = useParams<{ id: string }>();
  const knownRecipe = recipes.find((item) => item.id === id);
  const [fetchedRecipe, setFetchedRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || knownRecipe) return;

    const fetchRecipeById = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`);
        if (!response.ok) throw new Error(`Server error (${response.status})`);
        const data: MealDBDetailResponse = await response.json();
        const item = data.meals?.[0];
        if (!item) {
          setFetchedRecipe(null);
          setError('This recipe could not be found');
          return;
        }

        const ingredients: string[] = [];
        for (let index = 1; index <= 20; index++) {
          const ingredient = item[`strIngredient${index}`];
          const measure = item[`strMeasure${index}`];
          if (ingredient?.trim()) ingredients.push(`${measure?.trim() ? `${measure.trim()} ` : ''}${ingredient.trim()}`);
        }

        setFetchedRecipe({
          id: item.idMeal,
          title: item.strMeal,
          category: item.strCategory,
          area: item.strArea,
          instructions: item.strInstructions,
          thumbnail: item.strMealThumb,
          ingredients,
        });
      } catch {
        setFetchedRecipe(null);
        setError('Could not load this recipe. Please check your internet connection and try again');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeById();
  }, [id, knownRecipe]);

  const recipe = knownRecipe ?? fetchedRecipe;

  if (!recipe && loading) {
    return <div className="status-message" role="status">Loading recipe details…</div>;
  }

  if (!recipe) {
    return (
      <section className="empty-state">
        <h1 className="page-heading">{error ? 'Could not load recipe' : 'Recipe not found'}</h1>
        <p>{error ?? 'This link may be invalid or the recipe may no longer be available'}</p>
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
          {recipe.area?.trim() && <span className="recipe-meta-item">Cuisine: {recipe.area}</span>}
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
