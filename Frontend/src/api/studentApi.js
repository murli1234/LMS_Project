import axiosInstance from './axiosConfig';

// Get available courses
export const getCourses = async (page = 0, size = 10) => {
  const response = await axiosInstance.get(`/student/courses?page=${page}&size=${size}`);
  return response.data;
};

// Enroll in course
export const enrollInCourse = async (courseId) => {
  const response = await axiosInstance.post(`/student/courses/${courseId}/enroll`);
  return response.data;
};

// Submit query
export const submitQuery = async (queryData) => {
  const response = await axiosInstance.post('/student/queries', queryData);
  return response.data;
};

// Complete lesson
export const completeLesson = async (lessonId) => {
  const response = await axiosInstance.post(`/student/lessons/${lessonId}/complete`);
  return response.data;
};

// Get my enrollments
export const getMyEnrollments = async (page = 0, size = 10) => {
  const response = await axiosInstance.get(`/student/enrollments?page=${page}&size=${size}`);
  return response.data;
};

// Get my queries
export const getMyQueries = async (page = 0, size = 10) => {
  const response = await axiosInstance.get(`/student/queries?page=${page}&size=${size}`);
  return response.data;
};
