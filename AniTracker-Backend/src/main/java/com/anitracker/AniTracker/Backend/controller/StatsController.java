package com.anitracker.AniTracker.Backend.controller;

import com.anitracker.AniTracker.Backend.dto.AnimeStatsDTO;
import com.anitracker.AniTracker.Backend.service.AnimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api")
public class StatsController {

    @Autowired
    private AnimeService animeService;

    @GetMapping("/stats")
    public ResponseEntity<AnimeStatsDTO> getStats(Principal principal) {
        String username = principal.getName();
        AnimeStatsDTO stats = animeService.getUserStats(username);
        return ResponseEntity.ok(stats);
    }
}

