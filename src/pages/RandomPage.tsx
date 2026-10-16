import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Recipe } from '../types/recipe';
import { formatInstructions } from '../utils/recipeUtils';

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

export default function RandomPage() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomMeal = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      if (!response.ok) {
        throw new Error(`Server returned error: ${response.status}`);
      }
      const data: MealDBResponse = await response.json();
      if (!data.meals || data.meals.length === 0) {
        throw new Error('No meal found');
      }
      const item = data.meals[0];
      setRecipe({
        id: item.idMeal,
        title: item.strMeal,
        category: item.strCategory,
        area: item.strArea,
        instructions: item.strInstructions,
        thumbnail: item.strMealThumb,
        ingredients: [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch random meal');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>🎲 Surprise Recipe Generator</h2>
        <button
          onClick={fetchRandomMeal}
          disabled={loading}
          style={{
            padding: '10px 18px',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          {loading ? 'Drawing...' : '🔄 Draw Another Meal'}
        </button>
      </div>

      {loading && <p style={{ textAlign: 'center', color: '#64748b' }}>⏳ Fetching a delicious surprise...</p>}
      {error && !loading && (
        <p style={{ color: '#dc2626', background: '#fee2e2', padding: '12px', borderRadius: '8px' }}>
          ⚠️ {error}
        </p>
      )}

      {!loading && !error && recipe && (
        <article style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
          <img src={recipe.thumbnail} alt={recipe.title} style={{ width: '100%', maxHeight: '350px', objectFit: 'cover' }} />
          <div style={{ padding: '20px' }}>
            <h1 style={{ marginTop: 0 }}>{recipe.title}</h1>
            <p style={{ color: '#64748b' }}>
              Category: <strong>{recipe.category}</strong> • Origin: <strong>{recipe.area}</strong>
            </p>
            <h3>Cooking Steps:</h3>
            <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
              {formatInstructions(recipe.instructions).map((step, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>{step}</li>
              ))}
            </ol>
            <Link
              to={`/recipe/${recipe.id}`}
              style={{ display: 'inline-block', marginTop: '16px', color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}
            >
              🔍 View Full Recipe Page →
            </Link>
          </div>
        </article>
      )}
    </div>
  );
}