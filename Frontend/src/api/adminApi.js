import axiosInstance from './axiosConfig';

// Get dashboard stats
export const getDashboardStats = async () => {
  const response = await axiosInstance.get('/admin/dashboard/stats');
  return response.data;
};

// Get all courses (admin only)
export const getAllCourses = async (page = 0, size = 10) => {
  const response = await axiosInstance.get(`/admin/courses?page=${page}&size=${size}`);
  return response.data;
};

// Get all users with pagination
export const getUsers = async (page = 0, size = 10) => {
  const response = await axiosInstance.get(`/admin/users?page=${page}&size=${size}`);
  return response.data;
};

// Toggle user status (active/inactive)
export const toggleUserStatus = async (userId) => {
  const response = await axiosInstance.put(`/admin/users/${userId}/toggle-status`);
  return response.data;
};

// Get pending courses
export const getPendingCourses = async (page = 0, size = 10) => {
  const response = await axiosInstance.get(`/admin/courses/pending?page=${page}&size=${size}`);
  return response.data;
};

// Approve course
export const approveCourse = async (courseId) => {
  const response = await axiosInstance.put(`/admin/courses/${courseId}/approve`);
  return response.data;
};

// Reject course
export const rejectCourse = async (courseId) => {
  const response = await axiosInstance.put(`/admin/courses/${courseId}/reject`);
  return response.data;
};

// Delete course
export const deleteCourse = async (courseId) => {
  const response = await axiosInstance.delete(`/admin/courses/${courseId}`);
  return response.data;
};

// Get course details
export const getCourseDetails = async (courseId) => {
  const response = await axiosInstance.get(`/admin/courses/${courseId}`);
  return response.data;
};

// Get course enrollments
export const getCourseEnrollments = async (courseId, page = 0, size = 10) => {
  const response = await axiosInstance.get(`/admin/courses/${courseId}/enrollments?page=${page}&size=${size}`);
  return response.data;
};

// Update course
export const updateCourse = async (courseId, courseData) => {
  const response = await axiosInstance.put(`/admin/courses/${courseId}`, courseData);
  return response.data;
};
