package com.anitracker.AniTracker.Backend.dto;

public class AnimeStatsDTO {

    private int watching;
    private int completed;
    private int onHold;
    private int dropped;

    public AnimeStatsDTO() {}

    public AnimeStatsDTO(int watching, int completed, int onHold, int dropped) {
        this.watching = watching;
        this.completed = completed;
        this.onHold = onHold;
        this.dropped = dropped;
    }

    public int getWatching() {
        return watching;
    }

    public void setWatching(int watching) {
        this.watching = watching;
    }

    public int getCompleted() {
        return completed;
    }

    public void setCompleted(int completed) {
        this.completed = completed;
    }

    public int getOnHold() {
        return onHold;
    }

    public void setOnHold(int onHold) {
        this.onHold = onHold;
    }

    public int getDropped() {
        return dropped;
    }

    public void setDropped(int dropped) {
        this.dropped = dropped;
    }
}
