-- ====================================================================
-- DATABASE SEED SCRIPT: Student Management System
-- Database: student_dashboard_db
-- ====================================================================

-- 1. Clean existing records and reset ID sequences
TRUNCATE TABLE enrollments, courses, students, users RESTART IDENTITY CASCADE;

-- ====================================================================
-- 2. USERS (Authentication credentials)
-- Passwords:
--   admin123   -> $2a$10$5VwWml3rSkLEbn2cyfdjiOsPnEUayMoReAiBQi42ay6VIHSv5Dl/e
--   student123 -> $2a$10$m2ogNqPxZHn5anGkMNqetu.B4hZco83VK5Erjh.Q3syPJFiPeWkNO
-- ====================================================================

INSERT INTO users (email, password, role) VALUES
-- Admin Accounts (Password: admin123)
('admin@university.edu', '$2a$10$5VwWml3rSkLEbn2cyfdjiOsPnEUayMoReAiBQi42ay6VIHSv5Dl/e', 'ROLE_ADMIN'),
('sarah.jenkins@university.edu', '$2a$10$5VwWml3rSkLEbn2cyfdjiOsPnEUayMoReAiBQi42ay6VIHSv5Dl/e', 'ROLE_ADMIN'),
('admin@dashboard.com', '$2a$10$5VwWml3rSkLEbn2cyfdjiOsPnEUayMoReAiBQi42ay6VIHSv5Dl/e', 'ROLE_ADMIN'),

-- Student Accounts (Password: student123)
('alex.smith@student.edu', '$2a$10$m2ogNqPxZHn5anGkMNqetu.B4hZco83VK5Erjh.Q3syPJFiPeWkNO', 'ROLE_STUDENT'),
('emma.watson@student.edu', '$2a$10$m2ogNqPxZHn5anGkMNqetu.B4hZco83VK5Erjh.Q3syPJFiPeWkNO', 'ROLE_STUDENT'),
('liam.chen@student.edu', '$2a$10$m2ogNqPxZHn5anGkMNqetu.B4hZco83VK5Erjh.Q3syPJFiPeWkNO', 'ROLE_STUDENT'),
('sophia.rodriguez@student.edu', '$2a$10$m2ogNqPxZHn5anGkMNqetu.B4hZco83VK5Erjh.Q3syPJFiPeWkNO', 'ROLE_STUDENT'),
('lucas.moreau@student.edu', '$2a$10$m2ogNqPxZHn5anGkMNqetu.B4hZco83VK5Erjh.Q3syPJFiPeWkNO', 'ROLE_STUDENT'),
('aisha.khan@student.edu', '$2a$10$m2ogNqPxZHn5anGkMNqetu.B4hZco83VK5Erjh.Q3syPJFiPeWkNO', 'ROLE_STUDENT'),
('david.kim@student.edu', '$2a$10$m2ogNqPxZHn5anGkMNqetu.B4hZco83VK5Erjh.Q3syPJFiPeWkNO', 'ROLE_STUDENT'),
('elena.rostova@student.edu', '$2a$10$m2ogNqPxZHn5anGkMNqetu.B4hZco83VK5Erjh.Q3syPJFiPeWkNO', 'ROLE_STUDENT'),
('marcus.j@student.edu', '$2a$10$m2ogNqPxZHn5anGkMNqetu.B4hZco83VK5Erjh.Q3syPJFiPeWkNO', 'ROLE_STUDENT'),
('chloe.dubois@student.edu', '$2a$10$m2ogNqPxZHn5anGkMNqetu.B4hZco83VK5Erjh.Q3syPJFiPeWkNO', 'ROLE_STUDENT'),
('noah.wilson@student.edu', '$2a$10$m2ogNqPxZHn5anGkMNqetu.B4hZco83VK5Erjh.Q3syPJFiPeWkNO', 'ROLE_STUDENT'),
('olivia.martinez@student.edu', '$2a$10$m2ogNqPxZHn5anGkMNqetu.B4hZco83VK5Erjh.Q3syPJFiPeWkNO', 'ROLE_STUDENT'),
('student@dashboard.com', '$2a$10$m2ogNqPxZHn5anGkMNqetu.B4hZco83VK5Erjh.Q3syPJFiPeWkNO', 'ROLE_STUDENT');

-- ====================================================================
-- 3. STUDENTS (Student profiles)
-- ====================================================================

INSERT INTO students (first_name, last_name, email, date_of_birth, registration_number) VALUES
('Alex', 'Smith', 'alex.smith@student.edu', '2003-04-12', 'REG-2024-001'),
('Emma', 'Watson', 'emma.watson@student.edu', '2002-09-18', 'REG-2024-002'),
('Liam', 'Chen', 'liam.chen@student.edu', '2003-01-25', 'REG-2024-003'),
('Sophia', 'Rodriguez', 'sophia.rodriguez@student.edu', '2002-11-30', 'REG-2024-004'),
('Lucas', 'Moreau', 'lucas.moreau@student.edu', '2003-07-14', 'REG-2024-005'),
('Aisha', 'Khan', 'aisha.khan@student.edu', '2004-02-20', 'REG-2024-006'),
('David', 'Kim', 'david.kim@student.edu', '2002-06-08', 'REG-2024-007'),
('Elena', 'Rostova', 'elena.rostova@student.edu', '2003-10-05', 'REG-2024-008'),
('Marcus', 'Johnson', 'marcus.j@student.edu', '2003-03-19', 'REG-2024-009'),
('Chloe', 'Dubois', 'chloe.dubois@student.edu', '2004-05-22', 'REG-2024-010'),
('Noah', 'Wilson', 'noah.wilson@student.edu', '2003-08-14', 'REG-2024-011'),
('Olivia', 'Martinez', 'olivia.martinez@student.edu', '2004-01-09', 'REG-2024-012'),
('Alex', 'Smith', 'student@dashboard.com', '2002-05-15', 'REG-2025-001');

-- ====================================================================
-- 4. COURSES
-- ====================================================================

INSERT INTO courses (course_code, course_name, credits, description) VALUES
('CS-101', 'Introduction to Computer Science', 4, 'Fundamental programming concepts, control structures, and object-oriented programming.'),
('CS-201', 'Data Structures & Algorithms', 4, 'Analysis of arrays, linked lists, trees, graphs, sorting algorithms, and time complexities.'),
('CS-305', 'Database Management Systems', 3, 'Relational model, SQL querying, normal forms, transactions, and indexing strategies.'),
('CS-420', 'Artificial Intelligence & Machine Learning', 4, 'Machine learning principles, supervised and unsupervised learning, and neural network architectures.'),
('SWE-301', 'Software Engineering Principles', 3, 'Software lifecycles, Agile development, architectural design patterns, and test-driven engineering.'),
('MATH-151', 'Calculus I for Engineers', 4, 'Differential and integral calculus, functions, derivatives, applications, and series approximations.'),
('MATH-210', 'Linear Algebra & Matrix Analysis', 3, 'Vector spaces, linear transformations, matrices, determinants, eigenvalues, and eigenvectors.'),
('CYBER-200', 'Foundations of Cybersecurity', 3, 'Core security principles, cryptographic algorithms, vulnerability scanning, and secure systems.'),
('WEB-220', 'Modern Web Application Development', 3, 'Client-server architecture, modern JavaScript frameworks, state management, and REST APIs.'),
('ENG-102', 'Technical Writing & Academic Research', 2, 'Effective technical communication, engineering project documentation, and peer presentation skills.');

-- ====================================================================
-- 5. ENROLLMENTS
-- Status: 'ACTIVE', 'COMPLETED', 'DROPPED'
-- ====================================================================

INSERT INTO enrollments (student_id, course_id, enrollment_date, status, grade) VALUES
-- Alex Smith (student_id: 1)
(1, 1, '2023-09-01', 'COMPLETED', 'A'),
(1, 2, '2024-01-15', 'COMPLETED', 'A-'),
(1, 3, '2024-09-01', 'ACTIVE', NULL),
(1, 5, '2024-09-01', 'ACTIVE', NULL),

-- Emma Watson (student_id: 2)
(2, 1, '2023-09-01', 'COMPLETED', 'A'),
(2, 3, '2024-01-15', 'COMPLETED', 'B+'),
(2, 5, '2024-09-01', 'ACTIVE', NULL),
(2, 8, '2024-09-01', 'ACTIVE', NULL),

-- Liam Chen (student_id: 3)
(3, 1, '2023-09-01', 'COMPLETED', 'B+'),
(3, 4, '2024-01-15', 'ACTIVE', NULL),
(3, 7, '2024-01-15', 'COMPLETED', 'A'),
(3, 9, '2024-09-01', 'ACTIVE', NULL),

-- Sophia Rodriguez (student_id: 4)
(4, 1, '2023-09-01', 'COMPLETED', 'A'),
(4, 2, '2024-01-15', 'COMPLETED', 'B'),
(4, 6, '2023-09-01', 'COMPLETED', 'B+'),
(4, 3, '2024-09-01', 'ACTIVE', NULL),

-- Lucas Moreau (student_id: 5)
(5, 1, '2023-09-01', 'COMPLETED', 'B-'),
(5, 8, '2024-01-15', 'COMPLETED', 'A-'),
(5, 5, '2024-09-01', 'ACTIVE', NULL),
(5, 9, '2024-09-01', 'ACTIVE', NULL),

-- Aisha Khan (student_id: 6)
(6, 1, '2024-01-15', 'COMPLETED', 'A'),
(6, 6, '2024-01-15', 'COMPLETED', 'A'),
(6, 2, '2024-09-01', 'ACTIVE', NULL),
(6, 7, '2024-09-01', 'ACTIVE', NULL),

-- David Kim (student_id: 7)
(7, 6, '2023-09-01', 'COMPLETED', 'B+'),
(7, 7, '2024-01-15', 'COMPLETED', 'B'),
(7, 1, '2023-09-01', 'COMPLETED', 'B+'),
(7, 8, '2024-09-01', 'ACTIVE', NULL),

-- Elena Rostova (student_id: 8)
(8, 6, '2023-09-01', 'COMPLETED', 'A'),
(8, 7, '2024-01-15', 'COMPLETED', 'A'),
(8, 4, '2024-09-01', 'ACTIVE', NULL),
(8, 10, '2024-09-01', 'ACTIVE', NULL),

-- Marcus Johnson (student_id: 9)
(9, 1, '2023-09-01', 'COMPLETED', 'C+'),
(9, 2, '2024-01-15', 'DROPPED', NULL),
(9, 3, '2024-09-01', 'ACTIVE', NULL),
(9, 10, '2024-09-01', 'COMPLETED', 'B'),

-- Chloe Dubois (student_id: 10)
(10, 1, '2024-01-15', 'COMPLETED', 'A-'),
(10, 3, '2024-09-01', 'ACTIVE', NULL),
(10, 9, '2024-09-01', 'ACTIVE', NULL),
(10, 10, '2024-01-15', 'COMPLETED', 'A'),

-- Noah Wilson (student_id: 11)
(11, 1, '2023-09-01', 'COMPLETED', 'B'),
(11, 2, '2024-01-15', 'COMPLETED', 'B+'),
(11, 4, '2024-09-01', 'ACTIVE', NULL),
(11, 5, '2024-09-01', 'ACTIVE', NULL),

-- Olivia Martinez (student_id: 12)
(12, 1, '2024-01-15', 'COMPLETED', 'A'),
(12, 6, '2024-01-15', 'COMPLETED', 'A-'),
(12, 2, '2024-09-01', 'ACTIVE', NULL),
(12, 8, '2024-09-01', 'ACTIVE', NULL),

-- Alex Smith Demo (student_id: 13, email: student@dashboard.com)
(13, 1, '2024-01-15', 'COMPLETED', 'A'),
(13, 2, '2024-01-15', 'COMPLETED', 'B+'),
(13, 3, '2024-09-01', 'ACTIVE', NULL),
(13, 5, '2024-09-01', 'ACTIVE', NULL);
