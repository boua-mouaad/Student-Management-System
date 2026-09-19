package com.mouaad.studentdashboard.dtos.StudentDtos;

import lombok.Data;
import java.time.LocalDate;

@Data
public class StudentResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate dateOfBirth;
    private String registrationNumber;
}
