package com.anitracker.AniTracker.Backend.service;

import com.anitracker.AniTracker.Backend.entity.WatchList;
import com.anitracker.AniTracker.Backend.entity.User;
import com.anitracker.AniTracker.Backend.entity.Anime;
import com.anitracker.AniTracker.Backend.repository.WatchlistRepository;
import com.anitracker.AniTracker.Backend.repository.UserRepository;
import com.anitracker.AniTracker.Backend.repository.AnimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchlistService {

    @Autowired
    private WatchlistRepository watchlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AnimeRepository animeRepository;

    // ✅ Add anime to user's watchlist (Supports episodesWatched, completed, rating)
    public WatchList addToWatchList(Long userId, Long animeId, int episodesWatched, boolean completed, int rating) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new RuntimeException("Anime not found"));

        // Prevent duplicate entry
        if (watchlistRepository.findByUserIdAndAnimeId(userId, animeId).isPresent()) {
            throw new RuntimeException("Anime already in watchlist");
        }

        WatchList watchList = new WatchList();
        watchList.setUser(user);
        watchList.setAnime(anime);
        watchList.setEpisodesWatched(episodesWatched);
        watchList.setCompleted(completed);
        watchList.setRating(rating);

        return watchlistRepository.save(watchList);
    }

    // ✅ Get Watchlist by User ID
    public List<WatchList> getWatchListByUser(Long userId) {
        return watchlistRepository.findByUserId(userId);
    }

    // ✅ Update Progress in Watchlist
    public WatchList updateProgress(Long watchListId, int episodesWatched, boolean completed) {
        WatchList watchList = watchlistRepository.findById(watchListId)
                .orElseThrow(() -> new RuntimeException("Watchlist entry not found"));

        watchList.setEpisodesWatched(episodesWatched);
        watchList.setCompleted(completed);

        return watchlistRepository.save(watchList);
    }

    // ✅ Remove anime from watchlist by WatchList ID
    public void removeFromWatchList(Long watchListId) {
        WatchList watchList = watchlistRepository.findById(watchListId)
                .orElseThrow(() -> new RuntimeException("Watchlist entry not found"));

        watchlistRepository.delete(watchList);
    }
}
