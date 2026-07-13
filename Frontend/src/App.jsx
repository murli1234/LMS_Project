import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';
import DashboardLayout from './components/DashboardLayout';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Unauthorized from './pages/Unauthorized';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import AllCourses from './pages/admin/AllCourses';
import PendingCourses from './pages/admin/PendingCourses';

// Instructor pages
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import CreateCourse from './pages/instructor/CreateCourse';
import MyCourses from './pages/instructor/MyCourses';

// Mentor pages
import MentorDashboard from './pages/mentor/MentorDashboard';
import StudentQueries from './pages/mentor/StudentQueries';

// Student pages
import StudentDashboard from './pages/student/StudentDashboard';
import BrowseCourses from './pages/student/BrowseCourses';
import MyEnrollments from './pages/student/MyEnrollments';
import AskQuery from './pages/student/AskQuery';
import MyQueries from './pages/student/MyQueries';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['ADMIN']}>
                  <DashboardLayout />
                </RoleRoute>
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="courses" element={<AllCourses />} />
            <Route path="pending-courses" element={<PendingCourses />} />
          </Route>

          {/* Instructor routes */}
          <Route
            path="/instructor"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['INSTRUCTOR']}>
                  <DashboardLayout />
                </RoleRoute>
              </ProtectedRoute>
            }
          >
            <Route index element={<InstructorDashboard />} />
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="my-courses" element={<MyCourses />} />
          </Route>

          {/* Mentor routes */}
          <Route
            path="/mentor"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['MENTOR']}>
                  <DashboardLayout />
                </RoleRoute>
              </ProtectedRoute>
            }
          >
            <Route index element={<MentorDashboard />} />
            <Route path="queries" element={<StudentQueries />} />
          </Route>

          {/* Student routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['STUDENT']}>
                  <DashboardLayout />
                </RoleRoute>
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="browse-courses" element={<BrowseCourses />} />
            <Route path="my-enrollments" element={<MyEnrollments />} />
            <Route path="ask-query" element={<AskQuery />} />
            <Route path="my-queries" element={<MyQueries />} />
          </Route>

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Catch all - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
