import { useParams, Link } from 'react-router-dom';
import type { Recipe } from '../types/recipe';

interface RecipeDetailProps {
  recipes: Recipe[];
}

export default function RecipeDetail({ recipes }: RecipeDetailProps) {
  // 1. קריאת ה-id מתוך שורת הכתובת ב-URL באמצעות ההוק useParams
  const { id } = useParams<{ id: string }>();

  // 2. איתור המתכון הספציפי במערך הנתונים לפי ה-id שנשלף
  const recipe = recipes.find((item) => item.id === id);

  // 3. טיפול במצב שבו המזהה שגוי או שהמתכון לא קיים (Defensive Programming)
  if (!recipe) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Recipe not found</h2>
        <p style={{ color: '#64748b' }}>The recipe you are looking for does not exist.</p>
        <Link to="/" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
          ← Back to all recipes
        </Link>
      </div>
    );
  }

  // 4. רינדור הפרטים המלאים של המתכון
  return (
    <article style={{
      background: '#ffffff',
      padding: '24px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      maxWidth: '700px',
      margin: '0 auto',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <Link
        to="/"
        style={{
          color: '#2563eb',
          textDecoration: 'none',
          fontWeight: 600,
          display: 'inline-block',
          marginBottom: '16px'
        }}
      >
        ← Back to all recipes
      </Link>

      <h2 style={{ marginTop: 0, color: '#0f172a' }}>{recipe.title}</h2>

      <img
        src={recipe.thumbnail}
        alt={recipe.title}
        style={{
          width: '100%',
          maxHeight: '350px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '16px'
        }}
      />

      <div style={{ marginBottom: '16px', color: '#475569' }}>
        <p><strong>Category:</strong> {recipe.category}</p>
        <p><strong>Cuisine / Area:</strong> {recipe.area}</p>
      </div>

      <h3 style={{ color: '#0f172a' }}>Instructions</h3>
      <p style={{ lineHeight: '1.6', color: '#334155', whiteSpace: 'pre-line' }}>
        {recipe.instructions}
      </p>
    </article>
  );
}