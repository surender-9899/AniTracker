package com.anitracker.AniTracker.Backend.service;

import com.anitracker.AniTracker.Backend.entity.Anime;
import com.anitracker.AniTracker.Backend.repository.AnimeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnimeService {

    private final AnimeRepository animeRepository;

    public AnimeService(AnimeRepository animeRepository) {
        this.animeRepository = animeRepository;
    }

    // Create or Update Anime
    public Anime saveAnime(Anime anime) {
        return animeRepository.save(anime);
    }

    // Get all anime
    public List<Anime> getAllAnime() {
        return animeRepository.findAll();
    }

    // Get anime by ID
    public Optional<Anime> getAnimeById(Long id) {
        return animeRepository.findById(id);
    }

    // Delete anime by ID
    public void deleteAnime(Long id) {
        animeRepository.deleteById(id);
    }

    // Search anime by title (exact match)
    public Optional<Anime> findByTitle(String title) {
        return animeRepository.findByTitle(title);
    }

    // Search anime by title (partial, case-insensitive)
    public List<Anime> searchAnimeByTitle(String title) {
        return animeRepository.findByTitleContainingIgnoreCase(title);
    }

    // Search anime by genre
    public List<Anime> getAnimeByGenre(String genre) {
        return animeRepository.findByGenreContainingIgnoreCase(genre);
    }

    // Search anime by status (e.g., Airing, Completed)
    public List<Anime> getAnimeByStatus(String status) {
        return animeRepository.findByStatusIgnoreCase(status);
    }
}
