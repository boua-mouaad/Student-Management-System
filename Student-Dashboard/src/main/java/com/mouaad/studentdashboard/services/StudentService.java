package com.mouaad.studentdashboard.services;

import com.mouaad.studentdashboard.dtos.CourseDtos.CourseSummaryDto;
import com.mouaad.studentdashboard.dtos.StudentDtos.StudentDetailsResponse;
import com.mouaad.studentdashboard.dtos.StudentDtos.StudentRequest;
import com.mouaad.studentdashboard.dtos.StudentDtos.StudentResponse;
import com.mouaad.studentdashboard.entities.Student;
import com.mouaad.studentdashboard.repositories.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;

    //1. Get all students
    public List<StudentResponse> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .map(this::mapToStudentResponse)
                .collect(Collectors.toList());
    }

    //2.Get a single student
    public StudentDetailsResponse getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        return mapToStudentDetailsResponse(student);
    }

    //3.Add a new student
    public StudentResponse addStudent(StudentRequest request) {
        if (studentRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Student with this email is already registered");
        }
        if (studentRepository.findByRegistrationNumber(request.getRegistrationNumber()).isPresent()) {
            throw new RuntimeException("This registration number is already in use.");
        }
        Student student = new Student();
        student.setFirstName(request.getFirstName());
        student.setLastName(request.getLastName());
        student.setEmail(request.getEmail());
        student.setDateOfBirth(request.getDateOfBirth());
        student.setRegistrationNumber(request.getRegistrationNumber());

        Student saved = studentRepository.save(student);

        return mapToStudentResponse(saved);
    }

    //4.Update an existing student
    public StudentResponse upadateStudent(Long id, StudentRequest request) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        existingStudent.setFirstName(request.getFirstName());
        existingStudent.setLastName(request.getLastName());
        existingStudent.setDateOfBirth(request.getDateOfBirth());

        Student updated = studentRepository.save(existingStudent);
        return mapToStudentResponse(updated);
    }

    // --- Private Helper Mapping Methods ---

    private StudentResponse mapToStudentResponse(Student student) {
        StudentResponse response = new StudentResponse();
        response.setId(student.getId());
        response.setFirstName(student.getFirstName());
        response.setLastName(student.getLastName());
        response.setEmail(student.getEmail());
        response.setRegistrationNumber(student.getRegistrationNumber());
        return response;
    }

    private StudentDetailsResponse mapToStudentDetailsResponse(Student student) {
        StudentDetailsResponse response = new StudentDetailsResponse();
        response.setId(student.getId());
        response.setFirstName(student.getFirstName());
        response.setLastName(student.getLastName());
        response.setEmail(student.getEmail());
        response.setDateOfBirth(student.getDateOfBirth());
        response.setRegistrationNumber(student.getRegistrationNumber());

        List<CourseSummaryDto> courseSummaries = student.getEnrollments().stream()
                .map(enrollment -> {
                    CourseSummaryDto dto = new CourseSummaryDto();
                    dto.setCourseId(enrollment.getCourse().getId());
                    dto.setCourseCode(enrollment.getCourse().getCourseCode());
                    dto.setCourseName(enrollment.getCourse().getCourseName());
                    dto.setGrade(enrollment.getGrade());
                    dto.setStatus(enrollment.getStatus().name());
                    return dto;
                })
                .collect(Collectors.toList());

        response.setEnrolledCourses(courseSummaries);

        return response;
    }
}
