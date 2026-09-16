package com.mouaad.studentdashboard.repositories;

import com.mouaad.studentdashboard.entities.Enrollment;
import com.mouaad.studentdashboard.entities.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findByStudentId(Long studentId);

    long countByStatus(EnrollmentStatus status);

}
