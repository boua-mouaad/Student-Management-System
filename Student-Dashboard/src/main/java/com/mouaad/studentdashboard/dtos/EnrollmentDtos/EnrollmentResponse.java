package com.mouaad.studentdashboard.dtos.EnrollmentDtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EnrollmentResponse {
    private Long id;
    private Long studentId;
    private String studentName; // We combine first and last name
    private Long courseId;
    private String courseName;
    private LocalDate enrollmentDate;
    private String grade;
    private String status;
}