import axiosInstance from './axiosConfig';

// Create new course
export const createCourse = async (courseData) => {
  const response = await axiosInstance.post('/instructor/courses', courseData);
  return response.data;
};

// Add section to course
export const addSection = async (courseId, sectionData) => {
  const response = await axiosInstance.post(`/instructor/courses/${courseId}/sections`, sectionData);
  return response.data;
};

// Add lesson to section
export const addLesson = async (sectionId, lessonData) => {
  const response = await axiosInstance.post(`/instructor/sections/${sectionId}/lessons`, lessonData);
  return response.data;
};

// Get instructor's courses
export const getMyCourses = async (page = 0, size = 10) => {
  const response = await axiosInstance.get(`/instructor/courses?page=${page}&size=${size}`);
  return response.data;
};

// Update course
export const updateCourse = async (courseId, courseData) => {
  const response = await axiosInstance.put(`/instructor/courses/${courseId}`, courseData);
  return response.data;
};

// Delete course
export const deleteCourse = async (courseId) => {
  const response = await axiosInstance.delete(`/instructor/courses/${courseId}`);
  return response.data;
};

// Get course details
export const getCourseDetails = async (courseId) => {
  const response = await axiosInstance.get(`/instructor/courses/${courseId}`);
  return response.data;
};
