import { useParams, Link } from 'react-router-dom';
import type { Recipe } from '../types/recipe';
import { formatInstructions } from '../utils/recipeUtils';

interface RecipeDetailProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function RecipeDetail({ recipes, favorites, onToggleFavorite }: RecipeDetailProps) {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find((item) => item.id === id);

  if (!recipe) {
    return (
      <section className="empty-state">
        <h1 className="page-heading">המתכון לא נמצא</h1>
        <p>ייתכן שהקישור אינו תקין או שהמתכון כבר לא זמין.</p>
        <Link className="action-button action-button-primary" to="/">חזרה לכל המתכונים</Link>
      </section>
    );
  }

  const isFavorite = favorites.includes(recipe.id);
  const steps = formatInstructions(recipe.instructions);

  return (
    <article className="recipe-detail">
      <img className="recipe-detail-image" src={recipe.thumbnail} alt={recipe.title} />
      <div className="recipe-detail-content">
        <Link className="text-link" to="/">חזרה לכל המתכונים</Link>
        <h1 className="recipe-detail-title">{recipe.title}</h1>
        <div className="recipe-meta">
          <span className="recipe-meta-item">קטגוריה: {recipe.category}</span>
          <span className="recipe-meta-item">מטבח: {recipe.area}</span>
        </div>
        <button className={`action-button${isFavorite ? ' action-button-danger' : ''}`} type="button" aria-pressed={isFavorite} onClick={() => onToggleFavorite(recipe.id)}>
          {isFavorite ? '♥ הסרה מהמועדפים' : '♡ הוספה למועדפים'}
        </button>
        <section className="instructions-section">
          <h2 className="section-heading">אופן ההכנה</h2>
          {steps.length > 0 ? (
            <div className="instruction-list">
              {steps.map((step, index) => <p className="instruction-step" key={`${index}-${step.slice(0, 24)}`}>{step}</p>)}
            </div>
          ) : <p className="empty-note">לא צורפו הוראות הכנה למתכון הזה.</p>}
        </section>
        {recipe.ingredients.length > 0 && (
          <section className="ingredients-section">
            <h2 className="section-heading">מצרכים</h2>
            <ul className="ingredients-list">{recipe.ingredients.map((ingredient, index) => <li key={`${index}-${ingredient}`}>{ingredient}</li>)}</ul>
          </section>
        )}
      </div>
    </article>
  );
}
