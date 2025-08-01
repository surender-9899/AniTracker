package com.anitracker.AniTracker.Backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "watchlist")
@Data
@NoArgsConstructor
@AllArgsConstructor
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

    private boolean completed; // Mark if anime is completed

    private int rating; // Optional user rating (1–10 scale)

    // Constructor with required fields
    public WatchList(User user, Anime anime, int episodesWatched, boolean completed, int rating) {
        this.user = user;
        this.anime = anime;
        this.episodesWatched = episodesWatched;
        this.completed = completed;
        this.rating = rating;
    }

}
