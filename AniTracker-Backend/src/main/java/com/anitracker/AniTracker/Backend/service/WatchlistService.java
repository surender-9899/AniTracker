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
import java.util.Optional;

@Service
public class WatchlistService {

    @Autowired
    private WatchlistRepository watchlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AnimeRepository animeRepository;

    // ✅ Add anime to user's watchlist (Prevents duplicates)
    public WatchList addToWatchList(Long userId, Long animeId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<Anime> animeOpt = animeRepository.findById(animeId);

        if (userOpt.isPresent() && animeOpt.isPresent()) {
            if (watchlistRepository.findByUserIdAndAnimeId(userId, animeId).isPresent()) {
                throw new RuntimeException("Anime already in watchlist");
            }

            WatchList watchList = new WatchList();
            watchList.setUser(userOpt.get());
            watchList.setAnime(animeOpt.get());
            return watchlistRepository.save(watchList);
        }
        throw new RuntimeException("User or Anime not found");
    }

    // ✅ Get all anime in user's watchlist
    public List<WatchList> getWatchListByUserId(Long userId) {
        return watchlistRepository.findByUserId(userId);
    }

    // ✅ Remove anime from watchlist
    public void removeFromWatchList(Long userId, Long animeId) {
        Optional<WatchList> watchlist = watchlistRepository.findByUserIdAndAnimeId(userId, animeId);
        watchlist.ifPresent(watchlistRepository::delete);
    }
}
