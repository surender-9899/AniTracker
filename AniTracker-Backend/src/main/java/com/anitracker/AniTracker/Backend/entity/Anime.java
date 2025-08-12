package com.anitracker.AniTracker.Backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "anime")
public class Anime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    private Long id;

    @Column(nullable = false, unique = true)
    private String title;  // Anime name

    private String genre;  // e.g., Action, Romance

    private int totalEpisodes; // Total number of episodes

    private int totalSeasons; // Total seasons

    @Column(nullable = false)
    private String type; // "Series" or "Movie"

    private String status; // e.g., "Airing", "Completed", "Upcoming"

    private LocalDate startDate; // Anime release date

    private String watchLink; // URL to watch (optional)

    @Column(nullable = false)
    private String username; // Username of the user who added this anime

    public Anime() { }

    // Constructor with all required fields
    public Anime(String title, String genre, int totalEpisodes, int totalSeasons, String type,
                 String status, LocalDate startDate, String watchLink, String username) {
        this.title = title;
        this.genre = genre;
        this.totalEpisodes = totalEpisodes;
        this.totalSeasons = totalSeasons;
        this.type = type;
        this.status = status;
        this.startDate = startDate;
        this.watchLink = watchLink;
        this.username = username;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public int getTotalEpisodes() {
        return totalEpisodes;
    }

    public void setTotalEpisodes(int totalEpisodes) {
        this.totalEpisodes = totalEpisodes;
    }

    public int getTotalSeasons() {
        return totalSeasons;
    }

    public void setTotalSeasons(int totalSeasons) {
        this.totalSeasons = totalSeasons;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getWatchLink() {
        return watchLink;
    }

    public void setWatchLink(String watchLink) {
        this.watchLink = watchLink;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
