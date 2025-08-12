package com.anitracker.AniTracker.Backend.controller;

import com.anitracker.AniTracker.Backend.dto.ProgressUpdateRequest;
import com.anitracker.AniTracker.Backend.dto.RatingUpdateRequest;
import com.anitracker.AniTracker.Backend.dto.WatchListRequest;
import com.anitracker.AniTracker.Backend.entity.WatchList;
import com.anitracker.AniTracker.Backend.entity.User;
import com.anitracker.AniTracker.Backend.exception.ResourceNotFoundException;
import com.anitracker.AniTracker.Backend.repository.UserRepository;
import com.anitracker.AniTracker.Backend.service.WatchlistService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;

    @Autowired
    private UserRepository userRepository;

    // ✅ Add Anime to Watchlist (User ID from JWT)
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/add")
    public WatchList addToWatchList(@Valid @RequestBody WatchListRequest watchListRequest, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        return watchlistService.addToWatchList(
                user.getId(),
                watchListRequest.getAnimeId(),
                watchListRequest.getEpisodesWatched(),
                watchListRequest.isCompleted(),
                watchListRequest.getRating()
        );
    }

    // ✅ Get Watchlist for Logged-in User
    @GetMapping("/my")
    public List<WatchList> getMyWatchList(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        return watchlistService.getWatchListByUser(user.getId());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/user/{userId}")
    public List<WatchList> getWatchListByUserId(@PathVariable Long userId) {
        return watchlistService.getWatchListByUser(userId);
    }

    // ✅ Update Progress (Ownership check in Service Layer)
    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{watchListId}/progress")
    public WatchList updateProgress(@PathVariable Long watchListId,
                                    @Valid @RequestBody ProgressUpdateRequest progressUpdate,
                                    Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        return watchlistService.updateProgressForUser(
                watchListId,
                user.getId(),
                progressUpdate.getEpisodesWatched(),
                progressUpdate.isCompleted()
        );
    }

    // ✅ Update Rating (New endpoint)
    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{watchListId}/rating")
    public WatchList updateRating(@PathVariable Long watchListId,
                                  @Valid @RequestBody RatingUpdateRequest ratingUpdate,
                                  Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        return watchlistService.updateRatingForUser(
                watchListId,
                user.getId(),
                ratingUpdate.getRating()
        );
    }

    // ✅ Remove from Watchlist (Ownership check in Service Layer)
    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/{watchListId}")
    public String removeFromWatchList(@PathVariable Long watchListId, Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));

        watchlistService.removeFromWatchListForUser(watchListId, user.getId());
        return "Anime removed from watchlist.";
    }
}
