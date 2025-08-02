package com.anitracker.AniTracker.Backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "watchlist")
public class WatchList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link to User (Many WatchList entries for one user)
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Link to Anime (Many WatchList entries for one anime)
    @ManyToOne
    @JoinColumn(name = "anime_id", nullable = false)
    private Anime anime;

    private int episodesWatched; // Track progress
    private boolean completed;   // Mark if anime is completed
    private int rating;          // Optional user rating (1–10 scale)

    // ✅ No-arg constructor (Required by Hibernate)
    public WatchList() { }

    // ✅ Constructor with required fields
    public WatchList(User user, Anime anime, int episodesWatched, boolean completed, int rating) {
        this.user = user;
        this.anime = anime;
        this.episodesWatched = episodesWatched;
        this.completed = completed;
        this.rating = rating;
    }

    // ✅ Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Anime getAnime() { return anime; }
    public void setAnime(Anime anime) { this.anime = anime; }

    public int getEpisodesWatched() { return episodesWatched; }
    public void setEpisodesWatched(int episodesWatched) { this.episodesWatched = episodesWatched; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
}
