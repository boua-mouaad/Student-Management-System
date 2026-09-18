package com.mouaad.studentdashboard.config;

import com.mouaad.studentdashboard.entities.AppUser;
import com.mouaad.studentdashboard.entities.UserRole;
import com.mouaad.studentdashboard.repositories.AppUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (appUserRepository.count() == 0) {
            AppUser defaultAdmin = new AppUser();
            defaultAdmin.setEmail("admin@dashboard.com");
            defaultAdmin.setPassword(passwordEncoder.encode("admin123"));
            defaultAdmin.setRole(UserRole.ROLE_ADMIN);
            appUserRepository.save(defaultAdmin);
            log.info("Initialized default admin user: admin@dashboard.com");
        }
    }
}
