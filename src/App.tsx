import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import type { Recipe } from './types/recipe';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import './App.css';

// ממשק שמגדיר בדיוק את המבנה הגולמי שחוזר מ-TheMealDB API ללא שימוש ב-any
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

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        
        if (!response.ok) {
          throw new Error(`Server returned status: ${response.status}`);
        }

        const data: MealDBResponse = await response.json();

        if (!data.meals) {
          setRecipes([]);
          return;
        }

        // המרת נתוני ה-API לטיפוס ה-Recipe שהגדרנו באפליקציה
        const mappedRecipes: Recipe[] = data.meals.map((item) => {
          // חילוץ רשימת המצרכים מתוך השדות strIngredient1 עד strIngredient20
          const ingredients: string[] = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = item[`strIngredient${i}`];
            const measure = item[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
              ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`);
            }
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

        setRecipes(mappedRecipes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch recipes from server');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <BrowserRouter>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <Navbar />
        <main>
          {/* מצב 1: טעינה */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '50px 20px', color: '#64748b' }}>
              <h2>Loading recipes...</h2>
              <p>Fetching fresh dishes from TheMealDB API</p>
            </div>
          )}

          {/* מצב 2: שגיאה */}
          {!loading && error && (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              backgroundColor: '#fef2f2',
              borderRadius: '8px',
              border: '1px solid #fecaca',
              color: '#b91c1c'
            }}>
              <h2>Error fetching data</h2>
              <p>{error}</p>
            </div>
          )}

          {/* מצב 3: יש מידע - ניתוב רגיל */}
          {!loading && !error && (
            <Routes>
              <Route path="/" element={<RecipeList recipes={recipes} />} />
              <Route path="/recipe/:id" element={<RecipeDetail recipes={recipes} />} />
            </Routes>
          )}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;