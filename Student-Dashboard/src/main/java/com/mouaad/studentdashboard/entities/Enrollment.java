package com.mouaad.studentdashboard.entities;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "enrollments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    private LocalDate enrollmentDate;

    // Can be a Float (e.g., 85.5) or String (e.g., "A", "B+")
    private String grade;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EnrollmentStatus status; // ACTIVE, COMPLETED, DROPPED
}