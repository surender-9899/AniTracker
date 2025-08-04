package com.anitracker.AniTracker.Backend.service;

import com.anitracker.AniTracker.Backend.entity.WatchList;
import com.anitracker.AniTracker.Backend.entity.User;
import com.anitracker.AniTracker.Backend.entity.Anime;
import com.anitracker.AniTracker.Backend.exception.ResourceNotFoundException;
import com.anitracker.AniTracker.Backend.exception.UnauthorizedException;
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

    // ✅ Add anime to user's watchlist
    public WatchList addToWatchList(Long userId, Long animeId, int episodesWatched, boolean completed, int rating) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        Anime anime = animeRepository.findById(animeId)
                .orElseThrow(() -> new ResourceNotFoundException("Anime not found with ID: " + animeId));

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
                .orElseThrow(() -> new ResourceNotFoundException("Watchlist entry not found"));

        watchList.setEpisodesWatched(episodesWatched);
        watchList.setCompleted(completed);

        return watchlistRepository.save(watchList);
    }

    // ✅ Update Progress (Ownership check)
    public WatchList updateProgressForUser(Long watchListId, Long userId, int episodesWatched, boolean completed) {
        WatchList watchList = watchlistRepository.findById(watchListId)
                .orElseThrow(() -> new ResourceNotFoundException("Watchlist entry not found"));

        if (!watchList.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You cannot update another user's watchlist!");
        }

        watchList.setEpisodesWatched(episodesWatched);
        watchList.setCompleted(completed);
        return watchlistRepository.save(watchList);
    }

    // ✅ Remove from Watchlist (Ownership check)
    public void removeFromWatchListForUser(Long watchListId, Long userId) {
        WatchList watchList = watchlistRepository.findById(watchListId)
                .orElseThrow(() -> new ResourceNotFoundException("Watchlist entry not found"));

        if (!watchList.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You cannot delete another user's watchlist entry!");
        }

        watchlistRepository.delete(watchList);
    }
}
