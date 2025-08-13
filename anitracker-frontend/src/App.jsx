import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.jsx';

import Login from './Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import Stats from './pages/Stats';
import Recommendations from './pages/Recommendations';
import Unauthorized from './pages/Unauthorized';
import Layout from './components/Layout';
import RequireAuth from './routes/RequireAuth.jsx';

function App() {
  console.log('App component rendering - simplified version');
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center pt-8">AniTracker App</h1>
      <p className="text-center mt-4">App is working!</p>
      
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route index element={<Dashboard />} />
            <Route path="search" element={<Search />} />
            <Route path="watchlist" element={<Watchlist />} />
            <Route path="stats" element={<Stats />} />
            <Route path="recommendations" element={<Recommendations />} />
          </Route>
          
          {/* Redirect root to login if not authenticated */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
