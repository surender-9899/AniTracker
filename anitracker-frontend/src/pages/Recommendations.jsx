import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';

const Recommendations = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    fetchWatchlist();
  }, []);

  useEffect(() => {
    if (watchlist.length > 0) {
      generateRecommendations();
    }
  }, [watchlist, selectedGenre]);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      const response = await axiosPrivate.get('/watchlist/my');
      setWatchlist(response.data);
    } catch (err) {
      console.error('Error fetching watchlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = async () => {
    try {
      // Get user's favorite genres based on ratings
      const favoriteGenres = getFavoriteGenres();
      
      // Search for anime in favorite genres
      const genreToSearch = selectedGenre === 'all' ? favoriteGenres[0] : selectedGenre;
      
      if (genreToSearch) {
        const response = await axiosPrivate.get(`/anime/search?genre=${encodeURIComponent(genreToSearch)}`);
        const allAnime = response.data || [];
        
        // Filter out anime already in watchlist
        const filteredAnime = allAnime.filter(anime => 
          !watchlist.some(item => item.anime?.id === anime.id)
        );
        
        // Sort by relevance (you can implement more sophisticated ranking)
        const sortedAnime = filteredAnime.sort((a, b) => {
          // Prioritize completed anime
          if (a.status === 'Completed' && b.status !== 'Completed') return -1;
          if (a.status !== 'Completed' && b.status === 'Completed') return 1;
          
          // Then by total episodes (shorter series first)
          return (a.totalEpisodes || 0) - (b.totalEpisodes || 0);
        });
        
        setRecommendations(sortedAnime.slice(0, 12)); // Show top 12 recommendations
      }
    } catch (err) {
      console.error('Error generating recommendations:', err);
      setRecommendations([]);
    }
  };

  const getFavoriteGenres = () => {
    const genreRatings = {};
    
    watchlist.forEach(item => {
      if (item.rating > 0 && item.anime?.genre) {
        const genre = item.anime.genre;
        if (!genreRatings[genre]) {
          genreRatings[genre] = { total: 0, count: 0 };
        }
        genreRatings[genre].total += item.rating;
        genreRatings[genre].count += 1;
      }
    });
    
    // Sort genres by average rating
    return Object.entries(genreRatings)
      .sort(([, a], [, b]) => (b.total / b.count) - (a.total / a.count))
      .map(([genre]) => genre);
  };

  const getAvailableGenres = () => {
    const genres = new Set();
    watchlist.forEach(item => {
      if (item.anime?.genre) {
        genres.add(item.anime.genre);
      }
    });
    return Array.from(genres);
  };

  const handleAddToWatchlist = async (anime) => {
    try {
      await axiosPrivate.post('/watchlist/add', {
        animeId: anime.id,
        episodesWatched: 0,
        completed: false,
        rating: 0
      });
      
      // Refresh watchlist and recommendations
      await fetchWatchlist();
    } catch (err) {
      console.error('Error adding to watchlist:', err);
      alert('Failed to add anime to watchlist. Please try again.');
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
        <h1 className="text-3xl font-bold text-white">Recommendations</h1>
        <p className="text-gray-400">Personalized anime suggestions based on your taste</p>
      </div>

      {/* Genre Filter */}
      {getAvailableGenres().length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Filter by Genre</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGenre('all')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedGenre === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Genres
            </button>
            {getAvailableGenres().map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedGenre === genre
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Watchlist Analysis */}
      {watchlist.length > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Your Taste Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-400">{watchlist.length}</p>
              <p className="text-sm text-gray-400">Anime in Watchlist</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">
                {getFavoriteGenres().length > 0 ? getFavoriteGenres()[0] : 'None'}
              </p>
              <p className="text-sm text-gray-400">Favorite Genre</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">
                {watchlist.filter(item => item.rating > 0).length}
              </p>
              <p className="text-sm text-gray-400">Rated Anime</p>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {watchlist.length === 0 ? (
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-gray-400 text-lg mb-4">No recommendations yet</p>
          <p className="text-gray-500">Add some anime to your watchlist to get personalized recommendations!</p>
        </div>
      ) : recommendations.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Recommended for You ({recommendations.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((anime) => (
              <div key={anime.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-indigo-500 transition-colors">
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

                  {/* Why Recommended */}
                  <div className="mb-4">
                    <span className="inline-block bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                      💡 Recommended
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAddToWatchlist(anime)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                    >
                      Add to Watchlist
                    </button>
                    
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
      ) : (
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-gray-400 text-lg mb-4">No recommendations found</p>
          <p className="text-gray-500">Try changing the genre filter or add more anime to your watchlist.</p>
        </div>
      )}

      {/* Tips */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">How Recommendations Work</h3>
        <ul className="text-gray-400 space-y-2">
          <li>• Recommendations are based on your watchlist and ratings</li>
          <li>• Anime you've rated highly influence genre preferences</li>
          <li>• We prioritize completed series and shorter anime</li>
          <li>• Filter by genre to discover specific types of anime</li>
          <li>• Add more anime and rate them for better suggestions</li>
        </ul>
      </div>
      </div>
    );
  };
  
  export default Recommendations;
  