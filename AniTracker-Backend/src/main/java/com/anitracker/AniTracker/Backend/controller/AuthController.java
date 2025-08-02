package com.anitracker.AniTracker.Backend.controller;


import com.anitracker.AniTracker.Backend.entity.User;
import com.anitracker.AniTracker.Backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // User Registration
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        userService.registerUser(user);
        return ResponseEntity.ok("✅ User registered successfully!");
    }

    // User Login (JWT will be added later)
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        boolean isValid = userService.validateUser(user.getUsername(), user.getPassword());
        if (isValid) {
            return ResponseEntity.ok("✅ Login successful (JWT to be added later)");
        }
        return ResponseEntity.status(401).body(" Invalid username or password");
    }
}

