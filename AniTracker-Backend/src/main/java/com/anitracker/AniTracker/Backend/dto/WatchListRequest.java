package com.anitracker.AniTracker.Backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class WatchListRequest {

    // Remove userId, get user from authentication context instead

    @NotNull(message = "Anime ID is required")
    private Long animeId;

    @Min(value = 0, message = "Episodes watched must be zero or positive")
    private int episodesWatched;

    private boolean completed;

    @Min(value = 0, message = "Rating must be between 0 and 10")
    @Max(value = 10, message = "Rating must be between 0 and 10")
    private int rating;

    // No-args constructor
    public WatchListRequest() { }

    // All-args constructor
    public WatchListRequest(Long animeId, int episodesWatched, boolean completed, int rating) {
        this.animeId = animeId;
        this.episodesWatched = episodesWatched;
        this.completed = completed;
        this.rating = rating;
    }

    // Getters and setters
    public Long getAnimeId() {
        return animeId;
    }

    public void setAnimeId(Long animeId) {
        this.animeId = animeId;
    }

    public int getEpisodesWatched() {
        return episodesWatched;
    }

    public void setEpisodesWatched(int episodesWatched) {
        this.episodesWatched = episodesWatched;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
