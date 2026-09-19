package com.mouaad.studentdashboard.services;

import com.mouaad.studentdashboard.dtos.CourseDtos.CourseSummaryDto;
import com.mouaad.studentdashboard.dtos.StudentDtos.StudentDetailsResponse;
import com.mouaad.studentdashboard.dtos.StudentDtos.StudentRequest;
import com.mouaad.studentdashboard.dtos.StudentDtos.StudentResponse;
import com.mouaad.studentdashboard.entities.Student;
import com.mouaad.studentdashboard.repositories.StudentRepository;
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
public class StudentService {
    private final StudentRepository studentRepository;

    //1. Get all students
    @Transactional(readOnly = true)
    public List<StudentResponse> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .map(this::mapToStudentResponse)
                .collect(Collectors.toList());
    }

    //2.Get a single student
    @Transactional(readOnly = true)
    public StudentDetailsResponse getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        return mapToStudentDetailsResponse(student);
    }

    //3.Add a new student
    public StudentResponse addStudent(StudentRequest request) {
        if (studentRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Student with this email is already registered");
        }
        if (studentRepository.existsByRegistrationNumber(request.getRegistrationNumber())) {
            throw new DuplicateResourceException("This registration number is already in use.");
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
    public StudentResponse updateStudent(Long id, StudentRequest request) {
        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        if (!existingStudent.getEmail().equalsIgnoreCase(request.getEmail()) &&
                studentRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Student with this email is already registered: " + request.getEmail());
        }

        if (!existingStudent.getRegistrationNumber().equals(request.getRegistrationNumber()) &&
                studentRepository.existsByRegistrationNumber(request.getRegistrationNumber())) {
            throw new DuplicateResourceException("This registration number is already in use: " + request.getRegistrationNumber());
        }

        existingStudent.setFirstName(request.getFirstName());
        existingStudent.setLastName(request.getLastName());
        existingStudent.setEmail(request.getEmail());
        existingStudent.setDateOfBirth(request.getDateOfBirth());
        existingStudent.setRegistrationNumber(request.getRegistrationNumber());

        Student updated = studentRepository.save(existingStudent);
        return mapToStudentResponse(updated);
    }

    //5. Delete a student
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }

    // --- Private Helper Mapping Methods ---

    private StudentResponse mapToStudentResponse(Student student) {
        StudentResponse response = new StudentResponse();
        response.setId(student.getId());
        response.setFirstName(student.getFirstName());
        response.setLastName(student.getLastName());
        response.setEmail(student.getEmail());
        response.setDateOfBirth(student.getDateOfBirth());
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

        List<CourseSummaryDto> courseSummaries = (student.getEnrollments() == null)
                ? Collections.emptyList()
                : student.getEnrollments().stream()
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
