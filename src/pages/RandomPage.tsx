import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Recipe } from '../types/recipe';

interface MealDBItem {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  [key: string]: string | null | undefined;
}

interface MealDBResponse {
  meals: MealDBItem[] | null;
}

interface RandomPageProps {
  onRecipeLoaded: (recipe: Recipe) => void;
}

export default function RandomPage({ onRecipeLoaded }: RandomPageProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);
  const MIN_LOADING_MS = 500;

  const fetchRandomMeal = async () => {
    const currentRequestId = ++requestId.current;
    const startedAt = Date.now();
    try {
      setLoading(true);
      setError(null);
      setRecipe(null);
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      if (!response.ok) throw new Error(`Server error (${response.status})`);
      const data: MealDBResponse = await response.json();
      if (!data.meals || data.meals.length === 0) throw new Error('No recipe found right now');
      if (currentRequestId !== requestId.current) return;

      const item = data.meals[0];
      const ingredients: string[] = [];
      for (let index = 1; index <= 20; index++) {
        const ingredient = item[`strIngredient${index}`];
        const measure = item[`strMeasure${index}`];
        if (ingredient && ingredient.trim()) {
          ingredients.push(`${measure && measure.trim() ? `${measure.trim()} ` : ''}${ingredient.trim()}`);
        }
      }

      const mappedRecipe: Recipe = {
        id: item.idMeal,
        title: item.strMeal,
        category: item.strCategory,
        area: item.strArea,
        instructions: item.strInstructions,
        thumbnail: item.strMealThumb,
        ingredients,
      };
      const imageLoaded = new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = () => resolve();
        image.src = mappedRecipe.thumbnail;
        if (image.complete) resolve();
      });
      setRecipe(mappedRecipe);
      await imageLoaded;
      onRecipeLoaded(mappedRecipe);
    } catch {
      if (currentRequestId === requestId.current) {
        setError('Could not load a recipe. Check your internet connection and try again');
      }
    } finally {
      const remainingLoadingTime = Math.max(0, MIN_LOADING_MS - (Date.now() - startedAt));
      await new Promise((resolve) => window.setTimeout(resolve, remainingLoadingTime));
      if (currentRequestId === requestId.current) setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  return (
    <section>
      <div className="random-header">
        <div>
          <h1 className="page-heading">Need an idea for a meal?</h1>
          <p className="page-subtitle">We will pick a random recipe for you</p>
        </div>
        <button className="action-button action-button-primary" type="button" onClick={fetchRandomMeal} disabled={loading}>
          {loading ? 'Loading recipe…' : '🎲 Pick another recipe'}
        </button>
      </div>

      {loading && <div className="status-message" role="status">Finding something delicious…</div>}
      {error && !loading && <div className="status-message status-error" role="alert"><p>{error}</p><button className="action-button" type="button" onClick={fetchRandomMeal}>Try again</button></div>}

      {!loading && !error && recipe && (
        <article className="random-recipe">
          <img key={recipe.id} className="random-recipe-image" src={recipe.thumbnail} alt={recipe.title} />
          <div className="random-recipe-content">
            <h2 className="random-recipe-title">{recipe.title}</h2>
            <div className="recipe-meta">
              <span className="recipe-meta-item">Category: {recipe.category}</span>
              {recipe.area?.trim() && <span className="recipe-meta-item">Cuisine: {recipe.area}</span>}
            </div>
            <Link className="action-button action-button-primary" to={`/recipe/${recipe.id}`}>View full recipe</Link>
          </div>
        </article>
      )}
    </section>
  );
}
