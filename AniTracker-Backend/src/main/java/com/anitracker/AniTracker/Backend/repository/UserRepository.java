package com.anitracker.AniTracker.Backend.repository;

import com.anitracker.AniTracker.Backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email (useful for login)
    Optional<User> findByEmail(String email);

    // Check if email already exists (for registration)
    boolean existsByEmail(String email);

    Optional<User> findByUsername(String username);
}