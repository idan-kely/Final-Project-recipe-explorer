import RecipeCard from './RecipeCard';
import type { Recipe } from '../types/recipe';

interface RecipeListProps {
  recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
        <p>No recipes found.</p>
      </div>
    );
  }

  return (
    <section>
      <h2 style={{ color: '#1e293b', marginBottom: '8px' }}>All Recipes</h2>
      <p style={{ color: '#64748b', marginTop: 0, marginBottom: '24px' }}>
        Explore our collection of delicious dishes
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px'
      }}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}