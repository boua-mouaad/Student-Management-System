package com.mouaad.studentdashboard.controllers;

import com.mouaad.studentdashboard.dtos.CourseDtos.CourseDetailsResponse;
import com.mouaad.studentdashboard.dtos.CourseDtos.CourseRequest;
import com.mouaad.studentdashboard.dtos.CourseDtos.CourseResponse;
import com.mouaad.studentdashboard.services.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;
    //1.Fetch all courses
    @GetMapping
    public ResponseEntity<List<CourseResponse>> getAllCourses() {
        List<CourseResponse> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }
    //2.Fetch a single course's details
    @GetMapping("/{id}")
    public ResponseEntity<CourseDetailsResponse> getCourseById(@PathVariable Long id) {
        CourseDetailsResponse course = courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }
    //3.Update an existing course
    @PutMapping("/{id}")
    public ResponseEntity<CourseResponse> updateCourse(
            @PathVariable Long id,
            @Valid @RequestBody CourseRequest request
            ){
        CourseResponse newCourse = courseService.updateCourse(id, request);
        return ResponseEntity.ok(newCourse);
    }
    //4. Add a new course
    @PostMapping
    public ResponseEntity<CourseResponse> addCourse(@Valid @RequestBody CourseRequest request){
        CourseResponse newCourse = courseService.addCourse(request);
        return new ResponseEntity<>(newCourse, HttpStatus.CREATED);
    }

    //5. Delete a course
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.noContent().build();
    }
}
