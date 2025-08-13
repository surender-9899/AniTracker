// src/api/watchlistService.js
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const useWatchlistService = () => {
  const axiosPrivate = useAxiosPrivate();
  const WATCHLIST_API = "/watchlist";

  // Get all anime from the user's watchlist
  const getWatchlist = () => axiosPrivate.get(WATCHLIST_API);

  // Add a new anime to the watchlist
  const addToWatchlist = (anime) => axiosPrivate.post(WATCHLIST_API, anime);

  // Update progress of an anime by incrementing one episode
  const updateProgress = (animeId) =>
    axiosPrivate.put(`${WATCHLIST_API}/${animeId}/progress`);

  // Delete an anime from the watchlist
  const deleteAnime = (animeId) =>
    axiosPrivate.delete(`${WATCHLIST_API}/${animeId}`);

  return {
    getWatchlist,
    addToWatchlist,
    updateProgress,
    deleteAnime
  };
};

export default useWatchlistService;
