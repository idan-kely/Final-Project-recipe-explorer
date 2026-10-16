import { Link } from 'react-router-dom';
import type { Recipe } from '../types/recipe';

interface FavoritesPageProps {
  favorites: string[];
  allRecipes: Recipe[];
  onToggleFavorite: (id: string) => void;
}

export default function FavoritesPage({ favorites, allRecipes, onToggleFavorite }: FavoritesPageProps) {
  const favoriteRecipes = allRecipes.filter((recipe) => favorites.includes(recipe.id));

  if (favoriteRecipes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px', background: '#f8fafc', borderRadius: '12px' }}>
        <h2>❤️ No Favorites Yet</h2>
        <p style={{ color: '#64748b' }}>Explore delicious recipes on the home page and save your favorites!</p>
        <Link to="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Back to Recipes
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>⭐ Your Favorite Recipes ({favoriteRecipes.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', background: '#fff' }}>
            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={recipe.thumbnail} alt={recipe.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '12px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{recipe.title}</h3>
                <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>{recipe.category} • {recipe.area}</p>
              </div>
            </Link>
            <div style={{ padding: '0 12px 12px 12px' }}>
              <button
                onClick={() => onToggleFavorite(recipe.id)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ef4444',
                  background: '#fef2f2',
                  color: '#dc2626',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                💔 Remove from Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}