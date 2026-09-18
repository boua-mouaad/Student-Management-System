package com.mouaad.studentdashboard.controllers;

import com.mouaad.studentdashboard.dtos.AuthResponse;
import com.mouaad.studentdashboard.dtos.LoginRequest;
import com.mouaad.studentdashboard.entities.AppUser;
import com.mouaad.studentdashboard.repositories.AppUserRepository;
import com.mouaad.studentdashboard.services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.mouaad.studentdashboard.dtos.RegisterRequest;
import com.mouaad.studentdashboard.entities.UserRole;
import com.mouaad.studentdashboard.exceptions.DuplicateResourceException;
import com.mouaad.studentdashboard.exceptions.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AppUserRepository appUserRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {

        // 1. Verify the email and password are correct
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // 2. If the code reaches here, the password was correct. Fetch the user.
        AppUser user = appUserRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        // 3. Create the Spring Security User object with proper role authority
        UserDetails userDetails = new User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole().name()))
        );

        // 4. Generate the JWT keycard
        String jwtToken = jwtService.generateToken(userDetails);

        // 5. Send it back
        return ResponseEntity.ok(new AuthResponse(jwtToken, user.getEmail(), user.getRole().name()));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        if (appUserRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("User with this email already exists: " + request.getEmail());
        }

        AppUser user = new AppUser();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() != null ? request.getRole() : UserRole.ROLE_STAFF);

        AppUser savedUser = appUserRepository.save(user);

        UserDetails userDetails = new User(
                savedUser.getEmail(),
                savedUser.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(savedUser.getRole().name()))
        );

        String jwtToken = jwtService.generateToken(userDetails);
        return new ResponseEntity<>(new AuthResponse(jwtToken, savedUser.getEmail(), savedUser.getRole().name()), HttpStatus.CREATED);
    }
}