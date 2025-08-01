package com.anitracker.AniTracker.Backend.controller;

import com.anitracker.AniTracker.Backend.entity.WatchList;
import com.anitracker.AniTracker.Backend.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;

    // ✅ Add Anime to Watchlist
    @PostMapping("/add")
    public WatchList addToWatchList(@RequestParam Long userId, @RequestParam Long animeId) {
        return watchlistService.addToWatchList(userId, animeId);
    }

    // ✅ Get User's Watchlist
    @GetMapping("/{userId}")
    public List<WatchList> getUserWatchList(@PathVariable Long userId) {
        return watchlistService.getWatchListByUserId(userId);
    }

    // ✅ Remove Anime from Watchlist
    @DeleteMapping("/remove")
    public String removeFromWatchList(@RequestParam Long userId, @RequestParam Long animeId) {
        watchlistService.removeFromWatchList(userId, animeId);
        return "Anime removed from watchlist successfully.";
    }
}
