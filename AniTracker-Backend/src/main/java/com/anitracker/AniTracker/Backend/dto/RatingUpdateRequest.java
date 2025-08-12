package com.anitracker.AniTracker.Backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public class RatingUpdateRequest {

    @Min(value = 0, message = "Rating must be between 0 and 10")
    @Max(value = 10, message = "Rating must be between 0 and 10")
    private int rating;

    // No-args constructor
    public RatingUpdateRequest() { }

    // All-args constructor
    public RatingUpdateRequest(int rating) {
        this.rating = rating;
    }

    // Getters and setters
    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
