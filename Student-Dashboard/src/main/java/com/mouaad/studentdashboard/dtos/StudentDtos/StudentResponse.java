package com.mouaad.studentdashboard.dtos.StudentDtos;

import lombok.Data;

@Data
public class StudentResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String registrationNumber;
}
