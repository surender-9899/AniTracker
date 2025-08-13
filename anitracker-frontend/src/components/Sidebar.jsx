import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Search', path: '/search' },
    { label: 'Watchlist', path: '/watchlist' },
    { label: 'Stats', path: '/stats' },
    { label: 'Recommendations', path: '/recommendations' },
  ];

  return (
    <aside className="w-64 bg-gray-800 min-h-screen p-6">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;