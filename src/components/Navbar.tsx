import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'כל המתכונים', end: true },
  { to: '/favorites', label: 'המועדפים', end: false },
  { to: '/random', label: 'מתכון אקראי', end: false },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand" aria-label="עמוד הבית - מתכונים מהעולם">
        <span className="brand-mark" aria-hidden="true">🍲</span>
        <span>מתכונים מהעולם</span>
      </NavLink>
      <nav className="site-nav" aria-label="ניווט ראשי">
        {links.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
