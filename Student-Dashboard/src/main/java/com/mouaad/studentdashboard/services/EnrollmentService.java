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

@Service
@RequiredArgsConstructor
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    //1. Enroll a student in a course
    public EnrollmentResponse enrollStudent(EnrollmentRequest request) {
        //Step A : find the course and the student
        Student student = studentRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        //Step B: check if already enrolled to prevent duplicates
        List<Enrollment> existingEnrollments = enrollmentRepository.findByStudentId(student.getId());
        boolean isAlreadyEnrolled = existingEnrollments.stream()
                .anyMatch(enrollment -> enrollment.getCourse().getId().equals(course.getId()));

        if (isAlreadyEnrolled) {
            throw new RuntimeException("Student is already enrolled in this course");
        }
        //Step C: create and save the new enrollment
        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(LocalDate.now());

        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
        return mapToResponse(savedEnrollment);
    }

    //2.Save and update a grade
    public EnrollmentResponse updateGrade(Long enrollmentId, GradeUpdateRequest request) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with id " + enrollmentId));
        enrollment.setGrade(request.getGrade());
    //if a grade is assigned , the status becomes COMPLETED
        enrollment.setStatus(EnrollmentStatus.COMPLETED);

        Enrollment updatedEnrollment = enrollmentRepository.save(enrollment);
        return mapToResponse(updatedEnrollment);
    }


    // --- Helper Mapping Method ---
    private EnrollmentResponse mapToResponse(Enrollment enrollment) {
        EnrollmentResponse response = new EnrollmentResponse();
        response.setId(enrollment.getId());

        // Pull data from the connected Student entity
        response.setStudentId(enrollment.getStudent().getId());
        response.setStudentName(enrollment.getStudent().getFirstName() + " " + enrollment.getStudent().getLastName());

        // Pull data from the connected Course entity
        response.setCourseId(enrollment.getCourse().getId());
        response.setCourseName(enrollment.getCourse().getCourseName());

        // Pull data from the Enrollment itself
        response.setEnrollmentDate(enrollment.getEnrollmentDate());
        response.setGrade(enrollment.getGrade());
        response.setStatus(enrollment.getStatus().name());

        return response;
    }
}
