import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { Recipe } from './types/recipe';
import Navbar from './components/Navbar';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import FavoritesPage from './pages/FavoritesPage';
import RandomPage from './pages/RandomPage';
import StatusMessage from './components/StatusMessage';
import './App.css';

interface MealDBItem {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  [key: string]: string | undefined;
}

interface MealDBResponse {
  meals: MealDBItem[] | null;
}

const FAVORITES_STORAGE_KEY = 'recipe-explorer-favorites';

function readSavedFavorites(): string[] {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!savedFavorites) return [];
    const parsedFavorites: unknown = JSON.parse(savedFavorites);
    if (Array.isArray(parsedFavorites) && parsedFavorites.every((id) => typeof id === 'string')) return parsedFavorites;
  } catch {
    // Invalid or unavailable storage falls back to an empty favorites list.
  }
  return [];
}

const RANDOM_STORAGE_KEY = 'recipe-explorer-random';

function readSavedRandomRecipes(): Recipe[] {
  try {
    const savedRandomRecipes = localStorage.getItem(RANDOM_STORAGE_KEY);
    if (!savedRandomRecipes) return [];
    const parsedRandomRecipes: unknown = JSON.parse(savedRandomRecipes);
    if (Array.isArray(parsedRandomRecipes)) return parsedRandomRecipes as Recipe[];
  } catch {
    // Invalid or unavailable storage falls back to an empty list.
  }
  return [];
}

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<string[]>(readSavedFavorites);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        if (!response.ok) throw new Error(`Server error (${response.status})`);
        const data: MealDBResponse = await response.json();
        if (!data.meals) {
          setRecipes([]);
          return;
        }

        const mappedRecipes: Recipe[] = data.meals.map((item) => {
          const ingredients: string[] = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = item[`strIngredient${i}`];
            const measure = item[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) ingredients.push(`${measure ? `${measure.trim()} ` : ''}${ingredient.trim()}`);
          }
          return {
            id: item.idMeal,
            title: item.strMeal,
            category: item.strCategory,
            area: item.strArea,
            instructions: item.strInstructions,
            thumbnail: item.strMealThumb,
            ingredients,
          };
        });
        const savedRandomRecipes = readSavedRandomRecipes().filter(
          (savedRecipe) => !mappedRecipes.some((recipe) => recipe.id === savedRecipe.id),
        );
        setRecipes([...mappedRecipes, ...savedRandomRecipes]);
      } catch {
        setError('Could not load recipes. Please check your internet connection and try again');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // The app remains usable if browser storage is unavailable.
    }
  }, [favorites]);

  const toggleFavorite = (recipeId: string) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(recipeId)
        ? currentFavorites.filter((id) => id !== recipeId)
        : [...currentFavorites, recipeId],
    );
  };

  // useCallback keeps the same function between renders, so RandomPage does not fetch again on every App render.
  const addRandomRecipeToList = useCallback((randomRecipe: Recipe) => {
    setRecipes((currentRecipes) =>
      currentRecipes.some((recipe) => recipe.id === randomRecipe.id)
        ? currentRecipes
        : [...currentRecipes, randomRecipe],
    );
    setRandomRecipe(randomRecipe);

    const savedRandomRecipes = readSavedRandomRecipes();
    if (!savedRandomRecipes.some((recipe) => recipe.id === randomRecipe.id)) {
      try {
        localStorage.setItem(RANDOM_STORAGE_KEY, JSON.stringify([...savedRandomRecipes, randomRecipe]));
      } catch {
        // The app remains usable if browser storage is unavailable.
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/" element={loading
              ? <StatusMessage title="Loading recipes…" text="Getting fresh recipes from around the world" />
              : error
                ? <StatusMessage isError title="Could not load recipes" text={error} />
                : <RecipeList recipes={recipes} favorites={favorites} onToggleFavorite={toggleFavorite} />
            } />
            <Route path="/recipe/:id" element={<RecipeDetail recipes={randomRecipe ? [...recipes, randomRecipe] : recipes} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
            <Route path="/favorites" element={loading
              ? <StatusMessage text="Loading favorite recipes…" />
              : error
                ? <StatusMessage isError title="Could not load recipes" text={error} />
                : <FavoritesPage favorites={favorites} allRecipes={recipes} onToggleFavorite={toggleFavorite} />
            } />
            <Route path="/random" element={<RandomPage onRecipeLoaded={addRandomRecipeToList} />} />
            <Route path="*" element={<section className="empty-state"><h1 className="page-heading">Page not found</h1><p>The address you entered does not exist</p></section>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

