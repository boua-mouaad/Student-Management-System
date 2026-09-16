package com.mouaad.studentdashboard.dtos.StudentDtos;

import lombok.Data;

@Data
public class StudentSummaryDto {

    private Long studentId;
    private String firstName;
    private String lastName;
    private String registrationNumber;
    private String grade;

}
