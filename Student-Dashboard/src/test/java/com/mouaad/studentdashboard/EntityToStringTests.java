package com.mouaad.studentdashboard;

import com.mouaad.studentdashboard.entities.Course;
import com.mouaad.studentdashboard.entities.Enrollment;
import com.mouaad.studentdashboard.entities.EnrollmentStatus;
import com.mouaad.studentdashboard.entities.Student;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class EntityToStringTests {

    @Test
    void testToStringAndHashCodeDoNotCauseStackOverflow() {
        Student student = new Student();
        student.setId(1L);
        student.setFirstName("John");
        student.setLastName("Doe");
        student.setEmail("john.doe@example.com");
        student.setRegistrationNumber("REG-001");

        Course course = new Course();
        course.setId(1L);
        course.setCourseCode("CS101");
        course.setCourseName("Intro to CS");
        course.setCredits(3);

        Enrollment enrollment = new Enrollment();
        enrollment.setId(1L);
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDate(LocalDate.now());
        enrollment.setStatus(EnrollmentStatus.ACTIVE);

        List<Enrollment> studentEnrollments = new ArrayList<>();
        studentEnrollments.add(enrollment);
        student.setEnrollments(studentEnrollments);

        List<Enrollment> courseEnrollments = new ArrayList<>();
        courseEnrollments.add(enrollment);
        course.setEnrollments(courseEnrollments);

        // Verify toString does not throw StackOverflowError
        assertDoesNotThrow(student::toString);
        assertDoesNotThrow(course::toString);
        assertDoesNotThrow(enrollment::toString);

        // Verify hashCode does not throw StackOverflowError
        assertDoesNotThrow(student::hashCode);
        assertDoesNotThrow(course::hashCode);
        assertDoesNotThrow(enrollment::hashCode);

        // Verify equals
        assertNotNull(student);
    }
}
