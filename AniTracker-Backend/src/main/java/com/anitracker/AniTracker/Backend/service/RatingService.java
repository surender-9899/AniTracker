package com.anitracker.AniTracker.Backend.service;

import com.anitracker.AniTracker.Backend.entity.Rating;
import com.anitracker.AniTracker.Backend.entity.User;
import com.anitracker.AniTracker.Backend.entity.Anime;
import com.anitracker.AniTracker.Backend.repository.RatingRepository;
import com.anitracker.AniTracker.Backend.repository.UserRepository;
import com.anitracker.AniTracker.Backend.repository.AnimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AnimeRepository animeRepository;

    // ✅ Add or update rating (with optional review)
    public Rating addOrUpdateRating(Long userId, Long animeId, int ratingValue, String review) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Anime> anime = animeRepository.findById(animeId);

        if (user.isPresent() && anime.isPresent()) {
            Optional<Rating> existingRating = ratingRepository.findByUserIdAndAnimeId(userId, animeId);

            Rating rating;
            if (existingRating.isPresent()) {
                rating = existingRating.get();
                rating.setScore(ratingValue);   // ✅ FIXED
                rating.setReview(review);
            } else {
                rating = new Rating();
                rating.setUser(user.get());
                rating.setAnime(anime.get());
                rating.setScore(ratingValue);   // ✅ FIXED
                rating.setReview(review);
            }
            return ratingRepository.save(rating);
        }
        throw new RuntimeException("User or Anime not found!");
    }

    // ✅ Get all ratings for an anime
    public List<Rating> getRatingsForAnime(Long animeId) {
        return ratingRepository.findByAnimeId(animeId);
    }

    // ✅ Get average rating for an anime
    public double getAverageRatingForAnime(Long animeId) {
        List<Rating> ratings = ratingRepository.findByAnimeId(animeId);
        return ratings.stream().mapToInt(Rating::getScore).average().orElse(0.0); // ✅ FIXED
    }

    // ✅ Get ratings by user
    public List<Rating> getRatingsByUser(Long userId) {
        return ratingRepository.findByUserId(userId);
    }

    // ✅ Delete a rating by ID
    public void deleteRating(Long ratingId) {
        ratingRepository.deleteById(ratingId);
    }
}
