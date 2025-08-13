import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Dashboard = () => {
  const { auth } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    watching: 0,
    completed: 0,
    planToWatch: 0
  });
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    fetchWatchlistStats();
  }, []);

  const fetchWatchlistStats = async () => {
    try {
      setLoading(true);
      const response = await axiosPrivate.get('/watchlist/my');
      const watchlist = response.data;
      
      const stats = {
        total: watchlist.length,
        watching: watchlist.filter(item => item.episodesWatched > 0 && !item.completed).length,
        completed: watchlist.filter(item => item.completed).length,
        planToWatch: watchlist.filter(item => item.episodesWatched === 0 && !item.completed).length
      };
      
      setStats(stats);
    } catch (err) {
      console.error('Error fetching watchlist stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">Welcome back, {auth?.username}!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Total Anime</h3>
          <p className="text-3xl font-bold text-indigo-400">{stats.total}</p>
          <p className="text-gray-400 text-sm">in your watchlist</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Currently Watching</h3>
          <p className="text-3xl font-bold text-blue-400">{stats.watching}</p>
          <p className="text-gray-400 text-sm">anime in progress</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
          <p className="text-gray-400 text-sm">anime finished</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Plan to Watch</h3>
          <p className="text-3xl font-bold text-yellow-400">{stats.planToWatch}</p>
          <p className="text-gray-400 text-sm">anime queued</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors">
              Add New Anime
            </button>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
              View Watchlist
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors">
              Update Progress
            </button>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          {stats.total === 0 ? (
            <p className="text-gray-400">No activity yet. Start by adding anime to your watchlist!</p>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Anime added to watchlist</span>
                <span className="text-gray-400">Just now</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Progress updated</span>
                <span className="text-gray-400">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Rating added</span>
                <span className="text-gray-400">1 day ago</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Progress Overview */}
      {stats.total > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Progress Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Watching</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${stats.total > 0 ? (stats.watching / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400">{stats.watching}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Completed</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400">{stats.completed}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Plan to Watch</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${stats.total > 0 ? (stats.planToWatch / stats.total) * 100 : 0}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400">{stats.planToWatch}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
  