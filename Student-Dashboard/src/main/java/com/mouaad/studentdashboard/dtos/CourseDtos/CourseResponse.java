package com.mouaad.studentdashboard.dtos.CourseDtos;

import lombok.Data;

@Data
public class CourseResponse {
    private Long id;
    private String courseCode;
    private String courseName;
    private Integer credits;
}
