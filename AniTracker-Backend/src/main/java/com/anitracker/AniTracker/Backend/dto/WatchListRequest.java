package com.anitracker.AniTracker.Backend.dto;

public class WatchListRequest {

    private Long userId;
    private Long animeId;
    private int episodesWatched;
    private boolean completed;
    private int rating;

    // ✅ No-args constructor (needed for Spring's deserialization)
    public WatchListRequest() {
    }

    // ✅ All-args constructor (optional, but useful)
    public WatchListRequest(Long userId, Long animeId, int episodesWatched, boolean completed, int rating) {
        this.userId = userId;
        this.animeId = animeId;
        this.episodesWatched = episodesWatched;
        this.completed = completed;
        this.rating = rating;
    }

    // ✅ Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

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
