import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import PieChart from '../components/PieChart';

const Stats = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    watching: 0,
    completed: 0,
    planToWatch: 0,
    totalEpisodes: 0,
    watchedEpisodes: 0,
    averageRating: 0,
    genreDistribution: {},
    typeDistribution: {},
    statusDistribution: {}
  });
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    fetchWatchlistStats();
  }, []);

  const fetchWatchlistStats = async () => {
    try {
      setLoading(true);
      const response = await axiosPrivate.get('/watchlist/my');
      const data = response.data;
      setWatchlist(data);
      
      // Calculate comprehensive stats
      const stats = calculateStats(data);
      setStats(stats);
    } catch (err) {
      console.error('Error fetching watchlist stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const watching = data.filter(item => item.episodesWatched > 0 && !item.completed).length;
    const completed = data.filter(item => item.completed).length;
    const planToWatch = data.filter(item => item.episodesWatched === 0 && !item.completed).length;
    
    const totalEpisodes = data.reduce((sum, item) => sum + (item.anime?.totalEpisodes || 0), 0);
    const watchedEpisodes = data.reduce((sum, item) => sum + item.episodesWatched, 0);
    
    const ratings = data.filter(item => item.rating > 0).map(item => item.rating);
    const averageRating = ratings.length > 0 ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1) : 0;
    
    // Genre distribution
    const genreDistribution = {};
    data.forEach(item => {
      const genre = item.anime?.genre || 'Unknown';
      genreDistribution[genre] = (genreDistribution[genre] || 0) + 1;
    });
    
    // Type distribution
    const typeDistribution = {};
    data.forEach(item => {
      const type = item.anime?.type || 'Unknown';
      typeDistribution[type] = (typeDistribution[type] || 0) + 1;
    });
    
    // Status distribution
    const statusDistribution = {};
    data.forEach(item => {
      const status = item.anime?.status || 'Unknown';
      statusDistribution[status] = (statusDistribution[status] || 0) + 1;
    });
    
    return {
      total,
      watching,
      completed,
      planToWatch,
      totalEpisodes,
      watchedEpisodes,
      averageRating,
      genreDistribution,
      typeDistribution,
      statusDistribution
    };
  };

  const getProgressPercentage = () => {
    if (stats.totalEpisodes === 0) return 0;
    return Math.round((stats.watchedEpisodes / stats.totalEpisodes) * 100);
  };

  const getCompletionRate = () => {
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
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
        <h1 className="text-3xl font-bold text-white">Statistics</h1>
        <p className="text-gray-400">Detailed analytics of your anime journey</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Total Anime</h3>
          <p className="text-3xl font-bold text-indigo-400">{stats.total}</p>
          <p className="text-gray-400 text-sm">in watchlist</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Episodes Watched</h3>
          <p className="text-3xl font-bold text-blue-400">{stats.watchedEpisodes}</p>
          <p className="text-gray-400 text-sm">of {stats.totalEpisodes} total</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Completion Rate</h3>
          <p className="text-3xl font-bold text-green-400">{getCompletionRate()}%</p>
          <p className="text-gray-400 text-sm">anime completed</p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Average Rating</h3>
          <p className="text-3xl font-bold text-yellow-400">{stats.averageRating}</p>
          <p className="text-gray-400 text-sm">out of 10</p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Progress Overview</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Overall Progress</span>
                <span>{getProgressPercentage()}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-400">{stats.watching}</p>
                <p className="text-sm text-gray-400">Watching</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
                <p className="text-sm text-gray-400">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">{stats.planToWatch}</p>
                <p className="text-sm text-gray-400">Plan to Watch</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Rating Distribution</h3>
          {stats.averageRating > 0 ? (
            <div className="space-y-3">
              {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((rating) => {
                const count = watchlist.filter(item => item.rating === rating).length;
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm text-gray-400 w-6">{rating}</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-400 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400">No ratings yet</p>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Genre Distribution</h3>
          {Object.keys(stats.genreDistribution).length > 0 ? (
            <PieChart 
              data={Object.entries(stats.genreDistribution).map(([genre, count]) => ({
                name: genre,
                value: count
              }))}
              colors={['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']}
            />
          ) : (
            <p className="text-gray-400">No genre data available</p>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Type Distribution</h3>
          {Object.keys(stats.typeDistribution).length > 0 ? (
            <PieChart 
              data={Object.entries(stats.typeDistribution).map(([type, count]) => ({
                name: type,
                value: count
              }))}
              colors={['#10B981', '#3B82F6', '#F59E0B']}
            />
          ) : (
            <p className="text-gray-400">No type data available</p>
          )}
        </div>
      </div>

      {/* Top Rated Anime */}
      {stats.averageRating > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Top Rated Anime</h3>
          <div className="space-y-3">
            {watchlist
              .filter(item => item.rating > 0)
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 5)
              .map((item, index) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-yellow-400">#{index + 1}</span>
                    <div>
                      <p className="text-white font-medium">{item.anime?.title || 'Unknown'}</p>
                      <p className="text-sm text-gray-400">{item.anime?.genre || 'Unknown Genre'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-bold">{item.rating}/10</p>
                    <p className="text-sm text-gray-400">{item.episodesWatched}/{item.anime?.totalEpisodes || '?'} eps</p>
                  </div>
                </div>
              ))}
      </div>
        </div>
      )}
    </div>
  );
};

export default Stats;
