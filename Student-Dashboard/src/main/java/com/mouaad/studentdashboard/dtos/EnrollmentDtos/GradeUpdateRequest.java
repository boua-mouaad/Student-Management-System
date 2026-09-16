package com.mouaad.studentdashboard.dtos.EnrollmentDtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GradeUpdateRequest {
    @NotBlank(message = "Grade cannot be empty")
    private String grade;
}