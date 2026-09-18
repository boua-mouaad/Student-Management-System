package com.mouaad.studentdashboard.controllers;

import com.mouaad.studentdashboard.dtos.StudentDtos.StudentDetailsResponse;
import com.mouaad.studentdashboard.dtos.StudentDtos.StudentRequest;
import com.mouaad.studentdashboard.dtos.StudentDtos.StudentResponse;
import com.mouaad.studentdashboard.services.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    //1. Fetch all students
    @GetMapping
    public ResponseEntity<List<StudentResponse>> getAllStudents() {
        List<StudentResponse> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    //2. Fetch a single student's details
    @GetMapping("/{id}")
    public ResponseEntity<StudentDetailsResponse> getStudentById(@PathVariable Long id) {
        StudentDetailsResponse student = studentService.getStudentById(id);
        return ResponseEntity.ok(student);
    }

    //3. Update an existing student
    @PutMapping("/{id}")
    public ResponseEntity<StudentResponse> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentRequest request) {
        StudentResponse updatedStudent = studentService.updateStudent(id, request);
        return ResponseEntity.ok(updatedStudent);
    }

    //4. Add a new student
    @PostMapping
    public ResponseEntity<StudentResponse> addStudent(@Valid @RequestBody StudentRequest request) {
        StudentResponse newStudent = studentService.addStudent(request);
        return new ResponseEntity<>(newStudent, HttpStatus.CREATED);
    }

    //5. Delete a student
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
