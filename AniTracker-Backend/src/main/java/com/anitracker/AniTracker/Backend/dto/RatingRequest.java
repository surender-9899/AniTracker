package com.anitracker.AniTracker.Backend.dto;


public class RatingRequest {
    private Long userId;
    private Long animeId;
    private int ratingValue;
    private String review;

    // Getters & Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getAnimeId() { return animeId; }
    public void setAnimeId(Long animeId) { this.animeId = animeId; }

    public int getRatingValue() { return ratingValue; }
    public void setRatingValue(int ratingValue) { this.ratingValue = ratingValue; }

    public String getReview() { return review; }
    public void setReview(String review) { this.review = review; }
}

