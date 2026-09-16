package com.mouaad.studentdashboard.controllers;

import com.mouaad.studentdashboard.dtos.EnrollmentDtos.EnrollmentRequest;
import com.mouaad.studentdashboard.dtos.EnrollmentDtos.EnrollmentResponse;
import com.mouaad.studentdashboard.dtos.EnrollmentDtos.GradeUpdateRequest;
import com.mouaad.studentdashboard.services.EnrollmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    //1.Enroll a student in a course
    @PostMapping
    public ResponseEntity<EnrollmentResponse> enrollStudent(@Valid @RequestBody EnrollmentRequest request){
        EnrollmentResponse response = enrollmentService.enrollStudent(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    //2.Updatze a student's grade
    @PutMapping("/{id}/grade")
    public ResponseEntity<EnrollmentResponse> updateGrade(
            @PathVariable Long id,
            @Valid @RequestBody GradeUpdateRequest request
    ){
        EnrollmentResponse response = enrollmentService.updateGrade(id, request);
        return ResponseEntity.ok(response);
    }
}
