package com.mouaad.studentdashboard.dtos;

import lombok.Data;

@Data
public class DashboardSummaryResponse {
    private long totalStudents;
    private long totalCourses;
    private long totalEnrollments;
    private long activeEnrollments;
}
