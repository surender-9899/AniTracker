import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    fetchWatchlist();
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const delayDebounceFn = setTimeout(() => {
        searchAnime();
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const fetchWatchlist = async () => {
    try {
      const response = await axiosPrivate.get('/watchlist/my');
      setWatchlist(response.data);
    } catch (err) {
      console.error('Error fetching watchlist:', err);
    }
  };

  const searchAnime = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      const response = await axiosPrivate.get(`/anime/search?title=${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data);
    } catch (err) {
      console.error('Error searching anime:', err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const isInWatchlist = (animeId) => {
    return watchlist.some(item => item.anime?.id === animeId);
  };

  const getWatchlistStatus = (animeId) => {
    const item = watchlist.find(item => item.anime?.id === animeId);
    if (!item) return null;
    
    if (item.completed) return 'Completed';
    if (item.episodesWatched > 0) return `Watching (${item.episodesWatched}/${item.anime?.totalEpisodes || '?'})`;
    return 'Plan to Watch';
  };

  const handleAddToWatchlist = async (anime) => {
    setSelectedAnime(anime);
    setShowAddForm(true);
  };

  const handleAddSuccess = async (newWatchlistItem) => {
    await fetchWatchlist();
    setShowAddForm(false);
    setSelectedAnime(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Search Anime</h1>
        <p className="text-gray-400">Discover and add anime to your watchlist</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for anime by title..."
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
          </div>
        )}
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Search Results ({searchResults.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((anime) => (
              <div key={anime.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{anime.title}</h3>
                  
                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <p><span className="text-gray-300">Genre:</span> {anime.genre || 'Unknown'}</p>
                    <p><span className="text-gray-300">Type:</span> {anime.type || 'Unknown'}</p>
                    <p><span className="text-gray-300">Episodes:</span> {anime.totalEpisodes || 'Unknown'}</p>
                    <p><span className="text-gray-300">Status:</span> {anime.status || 'Unknown'}</p>
                    {anime.startDate && (
                      <p><span className="text-gray-300">Started:</span> {new Date(anime.startDate).getFullYear()}</p>
                    )}
                  </div>

                  {/* Watchlist Status */}
                  {isInWatchlist(anime.id) ? (
                    <div className="mb-4">
                      <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                        ✓ {getWatchlistStatus(anime.id)}
                      </span>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <span className="inline-block bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-sm">
                        Not in watchlist
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {!isInWatchlist(anime.id) && (
                      <button
                        onClick={() => handleAddToWatchlist(anime)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                      >
                        Add to Watchlist
                      </button>
                    )}
                    
                    {anime.watchLink && (
                      <a
                        href={anime.watchLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors text-center block"
                      >
                        Watch Online
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchQuery.trim().length > 2 && searchResults.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-2">No anime found</p>
          <p className="text-gray-500">Try searching with different keywords</p>
        </div>
      )}

      {/* Add to Watchlist Form */}
      {showAddForm && selectedAnime && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">
              Add "{selectedAnime.title}" to Watchlist
            </h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              // This will be handled by the AddToWatchlistForm component
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Episodes Watched
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={selectedAnime.totalEpisodes || 999}
                    defaultValue="0"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rating
                  </label>
                  <select
                    defaultValue="0"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="0">No Rating</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((r) => (
                      <option key={r} value={r}>{r}/10</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="completed"
                    className="rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="completed" className="text-sm text-gray-300">
                    Mark as completed
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setSelectedAnime(null);
                  }}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  Add to Watchlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search Tips */}
      {searchResults.length === 0 && searchQuery.trim().length === 0 && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Search Tips</h3>
          <ul className="text-gray-400 space-y-2">
            <li>• Type at least 3 characters to start searching</li>
            <li>• Search by anime title (e.g., "Naruto", "Attack on Titan")</li>
            <li>• Use partial names for better results</li>
            <li>• Add found anime to your watchlist to track progress</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;