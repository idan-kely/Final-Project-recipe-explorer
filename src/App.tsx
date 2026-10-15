import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import mockData from './mockRecipes.json';
import type { Recipe } from './types/recipe';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import './App.css';

function App() {
  // המרת נתוני ה-JSON למבנה של ממשק ה-Recipe המוגדר
  const initialRecipes: Recipe[] = mockData.map((item) => ({
    id: item.idMeal,
    title: item.strMeal,
    category: item.strCategory,
    area: item.strArea,
    instructions: item.strInstructions,
    thumbnail: item.strMealThumb,
    ingredients: [],
  }));

  const [recipes] = useState<Recipe[]>(initialRecipes);

  return (
    <BrowserRouter>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <Navbar />
        <main>
          <Routes>
            {/* נתיב דף הבית: מציג את רשימת המתכונים */}
            <Route path="/" element={<RecipeList recipes={recipes} />} />

            {/* נתיב דינמי לפרטי מתכון לפי ה-id שלו */}
            <Route path="/recipe/:id" element={<RecipeDetail recipes={recipes} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;