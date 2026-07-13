package com.lms.service;

import com.lms.dto.CourseDto;
import com.lms.dto.CourseRequest;
import com.lms.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CourseService {
    CourseDto createCourse(CourseRequest courseRequest);
    CourseDto updateCourse(Long id, CourseRequest courseRequest);
    void deleteCourse(Long id);
    CourseDto getCourseById(Long id);
    Page<CourseDto> getAllCourses(Pageable pageable);
    Page<CourseDto> getInstructorCourses(Pageable pageable);
    Page<CourseDto> getApprovedCourses(Pageable pageable);
    Page<CourseDto> getPendingApprovalCourses(Pageable pageable);
    void approveCourse(Long id);
    void rejectCourse(Long id);
    Course getCourseEntityById(Long id);
    Long getTotalCourses();
    Long getPendingCoursesCount();
}