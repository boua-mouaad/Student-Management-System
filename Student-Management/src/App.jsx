import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Students from './pages/students/Students';
import AddStudent from './pages/students/AddStudent';
import ViewStudent from './pages/students/ViewStudent';
import Courses from './pages/courses/Courses';
import AddCourse from './pages/courses/AddCourse';
import ViewCourse from './pages/courses/ViewCourse';
import Enrollments from './pages/enrollments/Enrollments';
import AddEnrollment from './pages/enrollments/AddEnrollment';
import ViewEnrollment from './pages/enrollments/ViewEnrollment';
import NotFound404 from './pages/errors/NotFound404';
import ServerError500 from './pages/errors/ServerError500';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/500" element={<ServerError500 />} />
          <Route path="*" element={<NotFound404 />} />

          <Route path="students" element={<Students />} />
          <Route path="students/new" element={<AddStudent />} />
          <Route path="students/:id" element={<ViewStudent />} />

          <Route path="courses" element={<Courses />} />
          <Route path="courses/new" element={<AddCourse />} />
          <Route path="courses/:id" element={<ViewCourse />} />


          <Route path="enrollments" element={<Enrollments />} />
          <Route path="enrollments/new" element={<AddEnrollment />} />
          <Route path="enrollments/:id" element={<ViewEnrollment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}