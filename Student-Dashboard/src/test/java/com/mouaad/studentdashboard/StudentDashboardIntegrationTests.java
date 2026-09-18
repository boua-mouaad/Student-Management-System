package com.mouaad.studentdashboard;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mouaad.studentdashboard.dtos.AuthResponse;
import com.mouaad.studentdashboard.dtos.CourseDtos.CourseRequest;
import com.mouaad.studentdashboard.dtos.EnrollmentDtos.EnrollmentRequest;
import com.mouaad.studentdashboard.dtos.EnrollmentDtos.GradeUpdateRequest;
import com.mouaad.studentdashboard.dtos.LoginRequest;
import com.mouaad.studentdashboard.dtos.RegisterRequest;
import com.mouaad.studentdashboard.dtos.StudentDtos.StudentRequest;
import com.mouaad.studentdashboard.entities.UserRole;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;


import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class StudentDashboardIntegrationTests {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private static String jwtToken;
    private static Long studentId;
    private static Long courseId;
    private static Long enrollmentId;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(SecurityMockMvcConfigurers.springSecurity())
                .build();
    }

    @Test
    @Order(1)
    void testRegisterUser() throws Exception {
        String json = """
                {
                    "email": "testuser@dashboard.com",
                    "password": "password123",
                    "role": "ROLE_ADMIN"
                }
                """;

        // May succeed or conflict if already exists
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(result -> {
                    int status = result.getResponse().getStatus();
                    if (status != 201 && status != 409) {
                        throw new AssertionError("Expected status 201 or 409, got: " + status);
                    }
                });
    }

    @Test
    @Order(2)
    void testLoginSuccess() throws Exception {
        String json = """
                {
                    "email": "admin@dashboard.com",
                    "password": "admin123"
                }
                """;

        MvcResult result = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.email", is("admin@dashboard.com")))
                .andReturn();

        jwtToken = objectMapper.readTree(result.getResponse().getContentAsString()).get("token").asText();
    }

    @Test
    @Order(3)
    void testLoginBadCredentials() throws Exception {
        String json = """
                {
                    "email": "admin@dashboard.com",
                    "password": "wrongpassword"
                }
                """;

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status", is(401)));
    }

    @Test
    @Order(4)
    void testAccessProtectedEndpointWithoutToken() throws Exception {
        mockMvc.perform(get("/api/students"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @Order(5)
    void testAccessProtectedEndpointWithToken() throws Exception {
        mockMvc.perform(get("/api/students")
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    @Order(6)
    void testCreateStudent() throws Exception {
        long ts = System.currentTimeMillis();
        String json = String.format("""
                {
                    "firstName": "Alice",
                    "lastName": "Wonderland",
                    "email": "alice%d@test.com",
                    "dateOfBirth": "2001-05-20",
                    "registrationNumber": "REG-%d"
                }
                """, ts, ts);

        MvcResult result = mockMvc.perform(post("/api/students")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.firstName", is("Alice")))
                .andReturn();

        String responseStr = result.getResponse().getContentAsString();
        studentId = objectMapper.readTree(responseStr).get("id").asLong();
    }

    @Test
    @Order(7)
    void testGetStudentByIdWithEmptyEnrollments() throws Exception {
        // Verifies no NullPointerException when enrollments is empty
        mockMvc.perform(get("/api/students/" + studentId)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(studentId.intValue())))
                .andExpect(jsonPath("$.enrolledCourses", hasSize(0)));
    }

    @Test
    @Order(8)
    void testCreateCourse() throws Exception {
        CourseRequest request = new CourseRequest();
        request.setCourseCode("CS-" + System.currentTimeMillis());
        request.setCourseName("Advanced Algorithms");
        request.setDescription("Deep dive into algorithms");
        request.setCredits(4);

        MvcResult result = mockMvc.perform(post("/api/courses")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.credits", is(4)))
                .andReturn();

        String responseStr = result.getResponse().getContentAsString();
        courseId = objectMapper.readTree(responseStr).get("id").asLong();
    }

    @Test
    @Order(9)
    void testGetCourseByIdWithEmptyEnrollments() throws Exception {
        // Verifies no NullPointerException when enrollments is empty
        mockMvc.perform(get("/api/courses/" + courseId)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(courseId.intValue())))
                .andExpect(jsonPath("$.enrolledStudents", hasSize(0)));
    }

    @Test
    @Order(10)
    void testEnrollStudentInCourse() throws Exception {
        // Verifies fix where studentId was incorrectly read as courseId
        EnrollmentRequest request = new EnrollmentRequest();
        request.setStudentId(studentId);
        request.setCourseId(courseId);

        MvcResult result = mockMvc.perform(post("/api/enrollments")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.studentId", is(studentId.intValue())))
                .andExpect(jsonPath("$.courseId", is(courseId.intValue())))
                .andExpect(jsonPath("$.status", is("ACTIVE")))
                .andReturn();

        String responseStr = result.getResponse().getContentAsString();
        enrollmentId = objectMapper.readTree(responseStr).get("id").asLong();
    }

    @Test
    @Order(11)
    void testDuplicateEnrollmentReturnsConflict() throws Exception {
        EnrollmentRequest request = new EnrollmentRequest();
        request.setStudentId(studentId);
        request.setCourseId(courseId);

        mockMvc.perform(post("/api/enrollments")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.status", is(409)));
    }

    @Test
    @Order(12)
    void testUpdateGrade() throws Exception {
        GradeUpdateRequest gradeRequest = new GradeUpdateRequest();
        gradeRequest.setGrade("A+");

        mockMvc.perform(put("/api/enrollments/" + enrollmentId + "/grade")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(gradeRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.grade", is("A+")))
                .andExpect(jsonPath("$.status", is("COMPLETED")));
    }

    @Test
    @Order(13)
    void testDashboardSummary() throws Exception {
        mockMvc.perform(get("/api/dashboard/summary")
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalStudents", greaterThanOrEqualTo(1)))
                .andExpect(jsonPath("$.totalCourses", greaterThanOrEqualTo(1)))
                .andExpect(jsonPath("$.totalEnrollments", greaterThanOrEqualTo(1)));
    }

    @Test
    @Order(14)
    void testGetNonExistentStudentReturns404() throws Exception {
        mockMvc.perform(get("/api/students/999999")
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)))
                .andExpect(jsonPath("$.error", is("Not Found")));
    }

    @Test
    @Order(15)
    void testValidationFailureReturns400() throws Exception {
        StudentRequest invalidRequest = new StudentRequest();
        // Missing required fields

        mockMvc.perform(post("/api/students")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.validationErrors").isNotEmpty());
    }

    @Test
    @Order(16)
    void testDeleteEnrollmentCourseAndStudent() throws Exception {
        // Delete enrollment
        mockMvc.perform(delete("/api/enrollments/" + enrollmentId)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNoContent());

        // Delete course
        mockMvc.perform(delete("/api/courses/" + courseId)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNoContent());

        // Delete student
        mockMvc.perform(delete("/api/students/" + studentId)
                        .header("Authorization", "Bearer " + jwtToken))
                .andExpect(status().isNoContent());
    }
}
