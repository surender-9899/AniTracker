import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import AddToWatchlistForm from '../components/AddToWatchlistForm';

// Helper functions moved outside components for accessibility
const getStatusColor = (completed, episodesWatched, totalEpisodes) => {
  if (completed) return 'bg-green-500';
  if (episodesWatched > 0) return 'bg-blue-500';
  return 'bg-gray-500';
};

const getStatusText = (completed, episodesWatched, totalEpisodes) => {
  if (completed) return 'Completed';
  if (episodesWatched > 0) return 'Watching';
  return 'Plan to Watch';
};

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  console.log('Watchlist component rendering, auth:', auth);

  useEffect(() => {
    console.log('Watchlist useEffect triggered');
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      console.log('Fetching watchlist...');
      setLoading(true);
      const response = await axiosPrivate.get('/watchlist/my');
      console.log('Watchlist response:', response);
      
      // Ensure the response data is valid
      if (response.data && Array.isArray(response.data)) {
        console.log('Setting watchlist data:', response.data);
        setWatchlist(response.data);
        setError('');
      } else {
        console.log('Invalid response data:', response.data);
        setWatchlist([]);
        setError('Invalid data received from server');
      }
    } catch (err) {
      console.error('Error fetching watchlist:', err);
      setWatchlist([]);
      if (err.response?.status === 401) {
        setError('Please log in to view your watchlist');
      } else if (err.response?.status === 404) {
        setError('Watchlist not found');
      } else {
        setError('Failed to fetch watchlist. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProgressUpdate = async (watchlistId, episodesWatched, completed) => {
    try {
      const response = await axiosPrivate.put(`/watchlist/${watchlistId}/progress`, {
        episodesWatched,
        completed
      });
      
      setWatchlist(prevList =>
        prevList.map(item =>
          item.id === watchlistId ? { ...item, ...response.data } : item
        )
      );
    } catch (err) {
      console.error('Failed to update progress:', err);
      setError('Failed to update progress');
    }
  };

  const handleDelete = async (watchlistId) => {
    if (window.confirm('Are you sure you want to remove this anime from your watchlist?')) {
      try {
        await axiosPrivate.delete(`/watchlist/${watchlistId}`);
        setWatchlist(prevList => prevList.filter(item => item.id !== watchlistId));
        setError('');
      } catch (err) {
        console.error('Failed to delete anime:', err);
        setError('Failed to delete anime');
      }
    }
  };

  const handleRatingUpdate = async (watchlistId, rating) => {
    try {
      const response = await axiosPrivate.put(`/watchlist/${watchlistId}/rating`, {
        rating
      });
      
      setWatchlist(prevList =>
        prevList.map(item =>
          item.id === watchlistId ? { ...item, rating: response.data.rating } : item
        )
      );
      
      setError('Rating updated successfully!');
      setTimeout(() => setError(''), 3000);
    } catch (err) {
      console.error('Failed to update rating:', err);
      setError('Failed to update rating');
    }
  };

  // Error boundary - if something goes wrong, show error message
  if (error && error.includes('crash') || error.includes('undefined')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-900 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
          <p className="text-red-200 mb-4">The watchlist encountered an error. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
          <p className="text-gray-400">Track your anime progress</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          {showAddForm ? 'Cancel' : 'Add Anime'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {showAddForm && (
        <AddToWatchlistForm
          onAdd={(newAnime) => {
            setWatchlist([...watchlist, newAnime]);
            setShowAddForm(false);
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {watchlist.length === 0 ? (
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-gray-400 text-lg mb-4">Your watchlist is empty</p>
          <p className="text-gray-500 mb-4">Start by adding some anime to track!</p>
          
          {/* Test button for development */}
          <button
            onClick={async () => {
              try {
                console.log('Adding test anime...');
                const response = await axiosPrivate.post('/watchlist/add', {
                  animeId: 1, // Assuming anime with ID 1 exists
                  episodesWatched: 0,
                  completed: false,
                  rating: 0
                });
                console.log('Test anime added:', response.data);
                await fetchWatchlist(); // Refresh the list
              } catch (err) {
                console.error('Failed to add test anime:', err);
                setError('Failed to add test anime: ' + err.message);
              }
            }}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Add Test Anime (Dev)
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {watchlist.map((item) => (
            <WatchlistItem
              key={item.id}
              item={item}
              onProgressUpdate={handleProgressUpdate}
              onDelete={handleDelete}
              onRatingUpdate={handleRatingUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const WatchlistItem = ({ item, onProgressUpdate, onDelete, onRatingUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [episodesWatched, setEpisodesWatched] = useState(item?.episodesWatched || 0);
  const [rating, setRating] = useState(item?.rating || 0);

  // Safety check - if item is invalid, don't render
  if (!item || !item.id) {
    return null;
  }

  const handleSave = () => {
    if (item.id) {
      onProgressUpdate(item.id, episodesWatched, item.completed);
      if (rating !== item.rating) {
        onRatingUpdate(item.id, rating);
      }
      setIsEditing(false);
    }
  };

  const progressPercentage = item.anime?.totalEpisodes 
    ? Math.round((episodesWatched / item.anime.totalEpisodes) * 100)
    : 0;

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">
            {item.anime?.title || 'Unknown Anime'}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
            <span>{item.anime?.genre || 'Unknown Genre'}</span>
            <span>•</span>
            <span>{item.anime?.totalEpisodes || '?'} episodes</span>
            <span>•</span>
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.completed, item.episodesWatched, item.anime?.totalEpisodes)}`}>
              {getStatusText(item.completed, item.episodesWatched, item.anime?.totalEpisodes)}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Progress: {episodesWatched} / {item.anime?.totalEpisodes || '?'}</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Rating:</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <button
                  key={star}
                  onClick={() => onRatingUpdate(item.id, star)}
                  className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-600'} hover:text-yellow-300 transition-colors`}
                >
                  ★
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-400 ml-2">({rating}/10)</span>
          </div>
        </div>

        <div className="flex space-x-2 ml-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEpisodesWatched(item.episodesWatched || 0);
                  setRating(item.rating || 0);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                Remove
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Episodes Watched
              </label>
              <input
                type="number"
                min="0"
                max={item.anime?.totalEpisodes || 999}
                value={episodesWatched}
                onChange={(e) => setEpisodesWatched(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={0}>No Rating</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((r) => (
                  <option key={r} value={r}>{r}/10</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
