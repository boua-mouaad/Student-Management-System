package com.mouaad.studentdashboard.services;

import com.mouaad.studentdashboard.dtos.EnrollmentDtos.EnrollmentRequest;
import com.mouaad.studentdashboard.dtos.EnrollmentDtos.EnrollmentResponse;
import com.mouaad.studentdashboard.dtos.EnrollmentDtos.GradeUpdateRequest;
import com.mouaad.studentdashboard.entities.Course;
import com.mouaad.studentdashboard.entities.Enrollment;
import com.mouaad.studentdashboard.entities.EnrollmentStatus;
import com.mouaad.studentdashboard.entities.Student;
import com.mouaad.studentdashboard.repositories.CourseRepository;
import com.mouaad.studentdashboard.repositories.EnrollmentRepository;
import com.mouaad.studentdashboard.repositories.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.mouaad.studentdashboard.exceptions.DuplicateResourceException;
import com.mouaad.studentdashboard.exceptions.ResourceNotFoundException;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    //1. Enroll a student in a course
    public EnrollmentResponse enrollStudent(EnrollmentRequest request) {
        //Step A : find the course and the student
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + request.getStudentId()));
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + request.getCourseId()));

        //Step B: check if already enrolled to prevent duplicates
        if (enrollmentRepository.existsByStudentIdAndCourseId(student.getId(), course.getId())) {
            throw new DuplicateResourceException("Student is already enrolled in this course");
        }

        //Step C: create and save the new enrollment
        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(LocalDate.now());
        enrollment.setStatus(EnrollmentStatus.ACTIVE);

        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
        return mapToResponse(savedEnrollment);
    }

    //2.Save and update a grade
    public EnrollmentResponse updateGrade(Long enrollmentId, GradeUpdateRequest request) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with id: " + enrollmentId));
        enrollment.setGrade(request.getGrade());
        //if a grade is assigned , the status becomes COMPLETED
        enrollment.setStatus(EnrollmentStatus.COMPLETED);

        Enrollment updatedEnrollment = enrollmentRepository.save(enrollment);
        return mapToResponse(updatedEnrollment);
    }

    @Transactional(readOnly = true)
    public List<EnrollmentResponse> getAllEnrollments() {
        return enrollmentRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EnrollmentResponse getEnrollmentById(Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found with id: " + id));
        return mapToResponse(enrollment);
    }

    public void deleteEnrollment(Long id) {
        if (!enrollmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Enrollment not found with id: " + id);
        }
        enrollmentRepository.deleteById(id);
    }


    // --- Helper Mapping Method ---
    private EnrollmentResponse mapToResponse(Enrollment enrollment) {
        EnrollmentResponse response = new EnrollmentResponse();
        response.setId(enrollment.getId());

        // Pull data from the connected Student entity
        response.setStudentId(enrollment.getStudent().getId());
        response.setStudentName(enrollment.getStudent().getFirstName() + " " + enrollment.getStudent().getLastName());
        response.setRegistrationNumber(enrollment.getStudent().getRegistrationNumber());

        // Pull data from the connected Course entity
        response.setCourseId(enrollment.getCourse().getId());
        response.setCourseName(enrollment.getCourse().getCourseName());
        response.setCourseCode(enrollment.getCourse().getCourseCode());
        response.setCredits(enrollment.getCourse().getCredits());

        // Pull data from the Enrollment itself
        response.setEnrollmentDate(enrollment.getEnrollmentDate());
        response.setGrade(enrollment.getGrade());
        response.setStatus(enrollment.getStatus().name());

        return response;
    }
}
