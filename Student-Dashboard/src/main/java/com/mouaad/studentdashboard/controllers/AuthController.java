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

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AppUserRepository appUserRepository;
    private final JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {

        // 1. Verify the email and password are correct
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // 2. If the code reaches here, the password was correct. Fetch the user.
        AppUser user = appUserRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3. Create the Spring Security User object
        UserDetails userDetails = new User(
                user.getEmail(),
                user.getPassword(),
                Collections.emptyList()
        );

        // 4. Generate the JWT keycard
        String jwtToken = jwtService.generateToken(userDetails);

        // 5. Send it back to React
        return ResponseEntity.ok(new AuthResponse(jwtToken, user.getEmail(), user.getRole().name()));
    }
}