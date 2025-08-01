package com.anitracker.AniTracker.Backend.repository;

import com.anitracker.AniTracker.Backend.entity.Anime;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AnimeRepository extends JpaRepository<Anime, Long> {

    // Search anime by title (case-insensitive)
    List<Anime> findByTitleContainingIgnoreCase(String title);

    // Find all anime by genre (field is "genre", not "genres")
    List<Anime> findByGenreContainingIgnoreCase(String genre);

    // Find anime by status (field is "status", not "airingStatus")
    List<Anime> findByStatusIgnoreCase(String status);

    // Find anime by exact title
    Optional<Anime> findByTitle(String title);
}
