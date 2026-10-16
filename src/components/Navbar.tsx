import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: 'none',
    color: isActive ? '#2563eb' : '#475569',
    fontWeight: isActive ? 700 : 500,
    borderBottom: isActive ? '2px solid #2563eb' : 'none',
    paddingBottom: '4px',
  });

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#ffffff',
        padding: '16px 24px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
        🍳 Recipe Explorer
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <NavLink to="/" style={getLinkStyle}>
          Home
        </NavLink>
        <NavLink to="/favorites" style={getLinkStyle}>
          Favorites
        </NavLink>
        <NavLink to="/random" style={getLinkStyle}>
          Random Meal
        </NavLink>
      </div>
    </nav>
  );
}