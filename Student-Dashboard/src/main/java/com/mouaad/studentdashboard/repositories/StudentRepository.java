package com.mouaad.studentdashboard.repositories;

import com.mouaad.studentdashboard.entities.Student;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByEmail(String email);
    Optional<Object> findByRegistrationNumber(String registrationNumber);
}
