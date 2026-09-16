package com.mouaad.studentdashboard.controllers;

import com.mouaad.studentdashboard.dtos.DashboardSummaryResponse;
import com.mouaad.studentdashboard.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryResponse> getDashboardSummary(){
        DashboardSummaryResponse dashboardSummaryResponse = dashboardService.getSummaryStatistics();
        return ResponseEntity.ok(dashboardSummaryResponse);
    }
}
