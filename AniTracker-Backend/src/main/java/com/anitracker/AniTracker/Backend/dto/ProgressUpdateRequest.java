package com.anitracker.AniTracker.Backend.dto;

import jakarta.validation.constraints.Min;

public class ProgressUpdateRequest {

    @Min(value = 0, message = "Episodes watched must be zero or positive")
    private int episodesWatched;

    private boolean completed;

    // Getters and setters
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
}
