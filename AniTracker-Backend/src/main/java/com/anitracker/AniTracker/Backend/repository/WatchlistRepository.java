package com.anitracker.AniTracker.Backend.repository;

import com.anitracker.AniTracker.Backend.entity.WatchList;
import com.anitracker.AniTracker.Backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface WatchlistRepository extends JpaRepository<WatchList, Long> {

    // Find all watchlist entries for a specific user
    List<WatchList> findByUser(User user);

    // Check if a specific anime is already in a user's watchlist
    boolean existsByUserAndAnimeId(User user, Long animeId);

    List<WatchList> findByUserId(Long userId);

    Optional<WatchList> findByUserIdAndAnimeId(Long userId, Long animeId);
}
