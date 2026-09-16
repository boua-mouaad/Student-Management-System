package com.mouaad.studentdashboard.dtos.CourseDtos;

import com.mouaad.studentdashboard.dtos.StudentDtos.StudentSummaryDto;
import lombok.Data;

import java.util.List;

@Data
public class CourseDetailsResponse {
    private Long id;
    private String courseCode;
    private String courseName;
    private String description;
    private Integer credits;

    private List<StudentSummaryDto> enrolledStudents;
}
