import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const AddToWatchlistForm = ({ onAdd, onCancel }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [episodesWatched, setEpisodesWatched] = useState(0);
  const [rating, setRating] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const axiosPrivate = useAxiosPrivate();

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

  const handleAnimeSelect = (anime) => {
    setSelectedAnime(anime);
    setEpisodesWatched(0);
    setRating(0);
    setCompleted(false);
    setSearchResults([]);
    setSearchQuery(anime.title);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAnime) return;

    try {
      setSubmitting(true);
      const response = await axiosPrivate.post('/watchlist/add', {
        animeId: selectedAnime.id,
        episodesWatched,
        completed,
        rating
      });

      onAdd(response.data);
    } catch (err) {
      console.error('Error adding to watchlist:', err);
      alert('Failed to add anime to watchlist. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedAnime(null);
    setEpisodesWatched(0);
    setRating(0);
    setCompleted(false);
    onCancel();
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">Add Anime to Watchlist</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Search Anime
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for anime..."
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && !selectedAnime && (
          <div className="bg-gray-700 rounded-lg max-h-60 overflow-y-auto">
            {searchResults.map((anime) => (
              <button
                key={anime.id}
                type="button"
                onClick={() => handleAnimeSelect(anime)}
                className="w-full text-left p-3 hover:bg-gray-600 transition-colors border-b border-gray-600 last:border-b-0"
              >
                <div className="text-white font-medium">{anime.title}</div>
                <div className="text-sm text-gray-400">
                  {anime.genre} • {anime.totalEpisodes} episodes • {anime.status}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Searching...</p>
          </div>
        )}

        {/* Selected Anime Info */}
        {selectedAnime && (
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-2">{selectedAnime.title}</h4>
            <div className="text-sm text-gray-400 mb-3">
              {selectedAnime.genre} • {selectedAnime.totalEpisodes} episodes • {selectedAnime.status}
            </div>
            
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Episodes Watched
                </label>
                <input
                  type="number"
                  min="0"
                  max={selectedAnime.totalEpisodes}
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
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <div className="flex items-center space-x-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={completed}
                      onChange={(e) => setCompleted(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-300">Completed</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!selectedAnime || submitting}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            {submitting ? 'Adding...' : 'Add to Watchlist'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddToWatchlistForm;
