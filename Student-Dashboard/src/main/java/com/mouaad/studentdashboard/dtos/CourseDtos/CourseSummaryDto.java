package com.mouaad.studentdashboard.dtos.CourseDtos;

import lombok.Data;

@Data
public class CourseSummaryDto {
    private Long courseId;
    private String courseName;
    private String courseCode;
    private String grade;
    private String status;
}
