package com.anitracker.AniTracker.Backend.dto;

public class ProgressUpdateRequest {
    private int episodesWatched;
    private boolean completed;

    // Getters & Setters
    public int getEpisodesWatched() { return episodesWatched; }
    public void setEpisodesWatched(int episodesWatched) { this.episodesWatched = episodesWatched; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}
