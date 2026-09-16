package com.mouaad.studentdashboard.dtos.StudentDtos;

import com.mouaad.studentdashboard.dtos.CourseDtos.CourseSummaryDto;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class StudentDetailsResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate dateOfBirth;
    private String registrationNumber;

    private List<CourseSummaryDto> enrolledCourses;
}
