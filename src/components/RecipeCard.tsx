import { Link } from 'react-router-dom';
import type { Recipe } from '../types/recipe';

// הגדרת ה-Props שהכרטיס מקבל: אובייקט מתכון מסוג Recipe
interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '12px',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        cursor: 'pointer'
      }}
    >
      <img
        src={recipe.thumbnail}
        alt={recipe.title}
        style={{
          width: '100%',
          height: '160px',
          objectFit: 'cover',
          borderRadius: '6px'
        }}
      />
      <h3 style={{ margin: '12px 0 4px 0', fontSize: '18px', color: '#0f172a' }}>
        {recipe.title}
      </h3>
      <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
        {recipe.category} • {recipe.area}
      </p>
    </Link>
  );
}