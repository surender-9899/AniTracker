package com.anitracker.AniTracker.Backend.controller;

import com.anitracker.AniTracker.Backend.entity.Anime;
import com.anitracker.AniTracker.Backend.exception.ResourceNotFoundException;
import com.anitracker.AniTracker.Backend.service.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/anime")
public class AnimeController {

    @Autowired
    private AnimeService animeService;

    // ✅ Create Anime (Admin feature - can add Role check later)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public Anime addAnime(@RequestBody Anime anime) {
        return animeService.saveAnime(anime);
    }

    // ✅ Get All Anime
    @GetMapping("/all")
    public List<Anime> getAllAnime() {
        return animeService.getAllAnime();
    }

    // ✅ Get Anime by ID
    @GetMapping("/{id}")
    public Anime getAnimeById(@PathVariable Long id) {
        return animeService.getAnimeById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Anime not found with ID: " + id));
    }

    // ✅ Get Anime by Exact Title
    @GetMapping("/title")
    public Anime getAnimeByTitle(@RequestParam String title) {
        return animeService.findByTitle(title)
                .orElseThrow(() -> new ResourceNotFoundException("Anime not found with title: " + title));
    }

    // ✅ Search Anime by Partial Title
    @GetMapping("/search")
    public List<Anime> searchAnimeByTitle(@RequestParam String title) {
        return animeService.searchAnimeByTitle(title);
    }

    // ✅ Get Anime by Genre
    @GetMapping("/genre")
    public List<Anime> getAnimeByGenre(@RequestParam String genre) {
        return animeService.getAnimeByGenre(genre);
    }

    // ✅ Get Anime by Status
    @GetMapping("/status")
    public List<Anime> getAnimeByStatus(@RequestParam String status) {
        return animeService.getAnimeByStatus(status);
    }

    // ✅ Delete Anime (Admin feature)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteAnime(@PathVariable Long id) {
        if (!animeService.getAnimeById(id).isPresent()) {
            throw new ResourceNotFoundException("Anime not found with ID: " + id);
        }
        animeService.deleteAnime(id);
        return "Anime deleted successfully.";
    }
}
