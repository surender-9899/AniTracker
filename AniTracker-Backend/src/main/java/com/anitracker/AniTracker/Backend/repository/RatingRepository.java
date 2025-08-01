package com.anitracker.AniTracker.Backend.repository;

import com.anitracker.AniTracker.Backend.entity.Rating;
import com.anitracker.AniTracker.Backend.entity.User;
import com.anitracker.AniTracker.Backend.entity.Anime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    // Get all ratings for a specific anime
    List<Rating> findByAnime(Anime anime);

    // Get a user's rating for a specific anime
    Optional<Rating> findByUserAndAnime(User user, Anime anime);

    // Calculate average rating for an anime (will be done using service layer logic)
    long countByAnime(Anime anime);

    Optional<Rating> findByUserIdAndAnimeId(Long userId, Long animeId);

    List<Rating> findByAnimeId(Long animeId);

    List<Rating> findByUserId(Long userId);
}

