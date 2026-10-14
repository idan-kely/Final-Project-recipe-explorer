import { useState } from 'react';
import mockData from './mockRecipes.json';
import type { Recipe } from './types/recipe';
import './App.css';

function App() {
  // המרת ה-JSON המקומי למערך עם ה-type הנקי שהגדרנו (ללא any)
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
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>🍳 Recipe Explorer</h1>
        <p>Task 1: Local Mock Data (TypeScript)</p>
      </header>

      <main>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {recipes.map((recipe) => (
            <div 
              key={recipe.id} 
              style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', textAlign: 'center', background: '#fff' }}
            >
              <img 
                src={recipe.thumbnail} 
                alt={recipe.title} 
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} 
              />
              <h3 style={{ margin: '10px 0 5px', color: '#333' }}>{recipe.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                {recipe.category} | {recipe.area}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;