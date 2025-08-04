package com.anitracker.AniTracker.Backend.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "users") // Database table name
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment ID
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role = "ROLE_USER"; // ✅ Default role

    private LocalDateTime createdAt;

    // ✅ No-argument constructor (Required by Hibernate)
    public User() { }

    // ✅ Constructor with required fields
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.createdAt = LocalDateTime.now();
    }

    // ✅ Getters
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getRole() { return role; } // ✅ Added getter for role
    public LocalDateTime getCreatedAt() { return createdAt; }

    // ✅ Setters
    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setRole(String role) { this.role = role; } // ✅ Added setter for role
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
