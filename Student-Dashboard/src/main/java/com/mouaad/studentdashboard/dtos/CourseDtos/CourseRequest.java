package com.mouaad.studentdashboard.dtos.CourseDtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
public class CourseRequest {
    @NotBlank(message = "Course code is required")
    private String courseCode;
    @NotBlank(message = "Course name is required")
    private String courseName;

    private String description;
    @NotNull(message = "Credits are required")
    @Min(value = 1, message = "Course must have at lease 1 credits")
    private Integer credits;
}

