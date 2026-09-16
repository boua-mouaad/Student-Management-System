package com.mouaad.studentdashboard.services;

import com.mouaad.studentdashboard.dtos.DashboardSummaryResponse;
import com.mouaad.studentdashboard.entities.EnrollmentStatus;
import com.mouaad.studentdashboard.repositories.CourseRepository;
import com.mouaad.studentdashboard.repositories.EnrollmentRepository;
import com.mouaad.studentdashboard.repositories.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final StudentRepository studentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;

    public DashboardSummaryResponse getSummaryStatistics() {
        DashboardSummaryResponse response = new DashboardSummaryResponse();

        response.setTotalStudents(studentRepository.count());
        response.setTotalEnrollments(enrollmentRepository.count());
        response.setTotalCourses(courseRepository.count());

        response.setActiveEnrollments(enrollmentRepository.countByStatus(EnrollmentStatus.ACTIVE));

        return response;
    }
}
