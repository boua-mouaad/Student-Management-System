package com.mouaad.studentdashboard.config;

import com.mouaad.studentdashboard.entities.*;
import com.mouaad.studentdashboard.repositories.AppUserRepository;
import com.mouaad.studentdashboard.repositories.CourseRepository;
import com.mouaad.studentdashboard.repositories.EnrollmentRepository;
import com.mouaad.studentdashboard.repositories.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final AppUserRepository appUserRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // 1. Seed admin and student users
        if (!appUserRepository.existsByEmail("admin@dashboard.com")) {
            AppUser defaultAdmin = new AppUser();
            defaultAdmin.setEmail("admin@dashboard.com");
            defaultAdmin.setPassword(passwordEncoder.encode("admin123"));
            defaultAdmin.setRole(UserRole.ROLE_ADMIN);
            appUserRepository.save(defaultAdmin);
            log.info("Initialized default admin user: admin@dashboard.com");
        }

        if (!appUserRepository.existsByEmail("student@dashboard.com")) {
            AppUser defaultStudent = new AppUser();
            defaultStudent.setEmail("student@dashboard.com");
            defaultStudent.setPassword(passwordEncoder.encode("student123"));
            defaultStudent.setRole(UserRole.ROLE_STUDENT);
            appUserRepository.save(defaultStudent);
            log.info("Initialized default student user: student@dashboard.com");
        }

        // 2. Seed demo student record
        Student student = null;
        if (!studentRepository.existsByEmail("student@dashboard.com")) {
            student = new Student();
            student.setFirstName("Alex");
            student.setLastName("Smith");
            student.setEmail("student@dashboard.com");
            student.setDateOfBirth(LocalDate.of(2002, 5, 15));
            student.setRegistrationNumber("REG-2025-001");
            student = studentRepository.save(student);
            log.info("Initialized default student record for Alex Smith");
        } else {
            student = studentRepository.findByEmail("student@dashboard.com").orElse(null);
        }

        // 3. Seed demo courses
        Course csCourse = null;
        Course mathCourse = null;
        if (courseRepository.count() == 0) {
            csCourse = new Course();
            csCourse.setCourseCode("CS101");
            csCourse.setCourseName("Introduction to Computer Science");
            csCourse.setDescription("Foundations of computing, data structures, and algorithms.");
            csCourse.setCredits(4);
            csCourse = courseRepository.save(csCourse);

            mathCourse = new Course();
            mathCourse.setCourseCode("MATH201");
            mathCourse.setCourseName("Linear Algebra & Calculus");
            mathCourse.setDescription("Vector spaces, matrices, linear transformations, and multivariable calculus.");
            mathCourse.setCredits(3);
            mathCourse = courseRepository.save(mathCourse);

            Course engCourse = new Course();
            engCourse.setCourseCode("ENG105");
            engCourse.setCourseName("Technical Communication");
            engCourse.setDescription("Professional and technical writing for engineering and software development.");
            engCourse.setCredits(2);
            courseRepository.save(engCourse);

            log.info("Initialized demo courses (CS101, MATH201, ENG105)");
        } else {
            csCourse = courseRepository.findByCourseCode("CS101").orElse(null);
            mathCourse = courseRepository.findByCourseCode("MATH201").orElse(null);
        }

        // 4. Seed demo enrollments
        if (student != null && csCourse != null && enrollmentRepository.count() == 0) {
            Enrollment e1 = new Enrollment();
            e1.setStudent(student);
            e1.setCourse(csCourse);
            e1.setEnrollmentDate(LocalDate.now());
            e1.setStatus(EnrollmentStatus.ACTIVE);
            enrollmentRepository.save(e1);

            if (mathCourse != null) {
                Enrollment e2 = new Enrollment();
                e2.setStudent(student);
                e2.setCourse(mathCourse);
                e2.setEnrollmentDate(LocalDate.now().minusMonths(3));
                e2.setGrade("A");
                e2.setStatus(EnrollmentStatus.COMPLETED);
                enrollmentRepository.save(e2);
            }
            log.info("Initialized demo enrollments for student");
        }
    }
}
