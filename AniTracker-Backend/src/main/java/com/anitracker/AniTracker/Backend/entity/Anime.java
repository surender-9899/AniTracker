package com.anitracker.AniTracker.Backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "anime")
@Data
@NoArgsConstructor
@AllArgsConstructor
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

    // Constructor with required fields
    public Anime(String title, String genre, int totalEpisodes, int totalSeasons, String type,
                 String status, LocalDate startDate, String watchLink) {
        this.title = title;
        this.genre = genre;
        this.totalEpisodes = totalEpisodes;
        this.totalSeasons = totalSeasons;
        this.type = type;
        this.status = status;
        this.startDate = startDate;
        this.watchLink = watchLink;
    }

}
