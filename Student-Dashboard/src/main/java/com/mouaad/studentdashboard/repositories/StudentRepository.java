package com.mouaad.studentdashboard.repositories;

import com.mouaad.studentdashboard.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<Student> findByEmail(String email);
    Optional<Student> findByRegistrationNumber(String registrationNumber);
    boolean existsByEmail(String email);
    boolean existsByRegistrationNumber(String registrationNumber);
}
