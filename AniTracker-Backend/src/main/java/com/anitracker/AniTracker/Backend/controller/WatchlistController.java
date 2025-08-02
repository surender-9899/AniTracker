package com.anitracker.AniTracker.Backend.controller;

import com.anitracker.AniTracker.Backend.dto.ProgressUpdateRequest;
import com.anitracker.AniTracker.Backend.dto.WatchListRequest;
import com.anitracker.AniTracker.Backend.entity.WatchList;
import com.anitracker.AniTracker.Backend.service.WatchlistService; // ✅ small 'l' in import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService; // ✅ variable also uses small 'l'

    // ✅ Add Anime to Watchlist
    @PostMapping("/add")
    public WatchList addToWatchList(@RequestBody WatchListRequest watchListRequest) {
        return watchlistService.addToWatchList(
                watchListRequest.getUserId(),
                watchListRequest.getAnimeId(),
                watchListRequest.getEpisodesWatched(),
                watchListRequest.isCompleted(),
                watchListRequest.getRating()
        );
    }

    // ✅ Get Watchlist by User ID
    @GetMapping("/user/{userId}")
    public List<WatchList> getWatchListByUser(@PathVariable Long userId) {
        return watchlistService.getWatchListByUser(userId);
    }

    // ✅ Update Progress in Watchlist
    @PutMapping("/{watchListId}/progress")
    public WatchList updateProgress(
            @PathVariable Long watchListId,
            @RequestBody ProgressUpdateRequest progressUpdate) {
        return watchlistService.updateProgress(
                watchListId,
                progressUpdate.getEpisodesWatched(),
                progressUpdate.isCompleted()
        );
    }

    // ✅ Delete from Watchlist
    @DeleteMapping("/{watchListId}")
    public String removeFromWatchList(@PathVariable Long watchListId) {
        watchlistService.removeFromWatchList(watchListId);
        return "Anime removed from watchlist.";
    }
}
