package com.anitracker.AniTracker.Backend.controller;


import com.anitracker.AniTracker.Backend.entity.Rating;
import com.anitracker.AniTracker.Backend.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    // ✅ Add or Update Rating (with optional review)
    @PostMapping("/add")
    public Rating addOrUpdateRating(
            @RequestParam Long userId,
            @RequestParam Long animeId,
            @RequestParam int ratingValue,
            @RequestParam(required = false) String review) {

        return ratingService.addOrUpdateRating(userId, animeId, ratingValue, review);
    }

    // ✅ Get All Ratings for a Specific Anime
    @GetMapping("/anime/{animeId}")
    public List<Rating> getRatingsForAnime(@PathVariable Long animeId) {
        return ratingService.getRatingsForAnime(animeId);
    }

    // ✅ Get Average Rating for an Anime
    @GetMapping("/anime/{animeId}/average")
    public double getAverageRating(@PathVariable Long animeId) {
        return ratingService.getAverageRatingForAnime(animeId);
    }

    // ✅ Get All Ratings by a Specific User
    @GetMapping("/user/{userId}")
    public List<Rating> getRatingsByUser(@PathVariable Long userId) {
        return ratingService.getRatingsByUser(userId);
    }

    // ✅ Delete a Rating by ID
    @DeleteMapping("/{ratingId}")
    public String deleteRating(@PathVariable Long ratingId) {
        ratingService.deleteRating(ratingId);
        return "Rating deleted successfully.";
    }
}

