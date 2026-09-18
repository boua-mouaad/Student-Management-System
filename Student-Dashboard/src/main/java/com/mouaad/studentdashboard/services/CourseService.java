package com.mouaad.studentdashboard.services;

import com.mouaad.studentdashboard.dtos.CourseDtos.CourseDetailsResponse;
import com.mouaad.studentdashboard.dtos.CourseDtos.CourseRequest;
import com.mouaad.studentdashboard.dtos.CourseDtos.CourseResponse;
import com.mouaad.studentdashboard.dtos.StudentDtos.StudentSummaryDto;
import com.mouaad.studentdashboard.entities.Course;
import com.mouaad.studentdashboard.repositories.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.mouaad.studentdashboard.exceptions.DuplicateResourceException;
import com.mouaad.studentdashboard.exceptions.ResourceNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CourseService {
    private final CourseRepository courseRepository;

    //1.Get all courses
    @Transactional(readOnly = true)
    public List<CourseResponse> getAllCourses() {
        return courseRepository.findAll()
                .stream().map(this::mapToCourseResponse)
                .collect(Collectors.toList());
    }

    //2.Get a single course
    @Transactional(readOnly = true)
    public CourseDetailsResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        return mapToCourseDetailsResponse(course);
    }

    //3. Add a new course
    public CourseResponse addCourse(CourseRequest request) {
        if (courseRepository.existsByCourseCode(request.getCourseCode())) {
            throw new DuplicateResourceException("A course with code '" + request.getCourseCode() + "' already exists");
        }

        Course course = new Course();
        course.setCourseCode(request.getCourseCode());
        course.setCourseName(request.getCourseName());
        course.setDescription(request.getDescription());
        course.setCredits(request.getCredits());

        Course savedCourse = courseRepository.save(course);
        return mapToCourseResponse(savedCourse);
    }

    //4. Update an existing course
    public CourseResponse updateCourse(Long id, CourseRequest request) {
        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        if (!existingCourse.getCourseCode().equalsIgnoreCase(request.getCourseCode()) &&
                courseRepository.existsByCourseCode(request.getCourseCode())) {
            throw new DuplicateResourceException("A course with code '" + request.getCourseCode() + "' already exists");
        }

        existingCourse.setCourseCode(request.getCourseCode());
        existingCourse.setCourseName(request.getCourseName());
        existingCourse.setDescription(request.getDescription());
        existingCourse.setCredits(request.getCredits());

        Course updatedCourse = courseRepository.save(existingCourse);
        return mapToCourseResponse(updatedCourse);
    }

    //5. Delete a course
    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Course not found with id: " + id);
        }
        courseRepository.deleteById(id);
    }

    // --- Private Helper Mapping Methods ---

    private CourseResponse mapToCourseResponse(Course course) {
        CourseResponse response = new CourseResponse();
        response.setId(course.getId());
        response.setCourseCode(course.getCourseCode());
        response.setCourseName(course.getCourseName());
        response.setCredits(course.getCredits());
        return response;
    }

    private CourseDetailsResponse mapToCourseDetailsResponse(Course course) {
        CourseDetailsResponse response = new CourseDetailsResponse();
        response.setId(course.getId());
        response.setCourseCode(course.getCourseCode());
        response.setCourseName(course.getCourseName());
        response.setDescription(course.getDescription());
        response.setCredits(course.getCredits());

        List<StudentSummaryDto> studentSummaries = (course.getEnrollments() == null)
                ? Collections.emptyList()
                : course.getEnrollments().stream()
                .map(enrollment -> {
                    StudentSummaryDto dto = new StudentSummaryDto();
                    dto.setStudentId(enrollment.getStudent().getId());
                    dto.setFirstName(enrollment.getStudent().getFirstName());
                    dto.setLastName(enrollment.getStudent().getLastName());
                    dto.setRegistrationNumber(enrollment.getStudent().getRegistrationNumber());
                    dto.setGrade(enrollment.getGrade());
                    return dto;
                })
                .collect(Collectors.toList());

        response.setEnrolledStudents(studentSummaries);

        return response;
    }
}
