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
      <section className="empty-state">
        <h1 className="page-heading">עדיין אין כאן מועדפים</h1>
        <p>שמרו מתכונים שאהבתם, והם יחכו לכם כאן.</p>
        <Link className="action-button action-button-primary" to="/">לכל המתכונים</Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="page-heading">המתכונים שאהבתם</h1>
      <p className="page-subtitle">{favoriteRecipes.length} מתכונים שמורים</p>
      <div className="recipe-grid">
        {favoriteRecipes.map((recipe) => (
          <article className="recipe-card" key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
              <img className="recipe-card-image" src={recipe.thumbnail} alt={recipe.title} />
              <div className="recipe-card-body">
                <h2 className="recipe-card-title">{recipe.title}</h2>
                <p className="recipe-card-meta">{recipe.category} · {recipe.area}</p>
              </div>
            </Link>
            <button className="action-button action-button-danger recipe-card-action" type="button" onClick={() => onToggleFavorite(recipe.id)}>
              ♥ הסרה מהמועדפים
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
