import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'All recipes', end: true },
  { to: '/favorites', label: 'Favorites', end: false },
  { to: '/random', label: 'Random recipe', end: false },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand" aria-label="Home - Recipes from around the world">
        <span className="brand-mark" aria-hidden="true">🍲</span>
        <span>Recipes Around the World</span>
      </NavLink>
      <nav className="site-nav" aria-label="Main navigation">
        {links.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
