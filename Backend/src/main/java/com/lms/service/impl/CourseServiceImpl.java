package com.lms.service.impl;

import com.lms.dto.CourseDto;
import com.lms.dto.CourseRequest;
import com.lms.entity.Category;
import com.lms.entity.Course;
import com.lms.entity.User;
import com.lms.repository.CategoryRepository;
import com.lms.repository.CourseRepository;
import com.lms.service.CourseService;
import com.lms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CourseServiceImpl implements CourseService {
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private UserService userService;
    
    @Override
    public CourseDto createCourse(CourseRequest courseRequest) {
        User instructor = userService.getCurrentUser();
        Category category = categoryRepository.findById(courseRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        Course course = new Course();
        course.setTitle(courseRequest.getTitle());
        course.setDescription(courseRequest.getDescription());
        course.setPrice(courseRequest.getPrice());
        course.setThumbnailUrl(courseRequest.getThumbnailUrl());
        course.setInstructor(instructor);
        course.setCategory(category);
        course.setStatus(Course.CourseStatus.PENDING_APPROVAL);
        
        Course savedCourse = courseRepository.save(course);
        return convertToDto(savedCourse);
    }
    
    @Override
    public CourseDto updateCourse(Long id, CourseRequest courseRequest) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        
        // Admin can update any course, instructor can only update their own
        User currentUser = userService.getCurrentUser();
        boolean isAdmin = currentUser.getRoles().stream()
                .anyMatch(role -> "ADMIN".equals(role.getName()));
        
        if (!isAdmin && !course.getInstructor().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You can only update your own courses");
        }
        
        Category category = categoryRepository.findById(courseRequest.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        course.setTitle(courseRequest.getTitle());
        course.setDescription(courseRequest.getDescription());
        course.setPrice(courseRequest.getPrice());
        course.setThumbnailUrl(courseRequest.getThumbnailUrl());
        course.setCategory(category);
        course.setUpdatedAt(LocalDateTime.now());
        
        Course savedCourse = courseRepository.save(course);
        return convertToDto(savedCourse);
    }
    
    @Override
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        
        // Admin can delete any course, instructor can only delete their own
        User currentUser = userService.getCurrentUser();
        boolean isAdmin = currentUser.getRoles().stream()
                .anyMatch(role -> "ADMIN".equals(role.getName()));
        
        if (!isAdmin && !course.getInstructor().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You can only delete your own courses");
        }
        
        courseRepository.delete(course);
    }
    
    @Override
    public CourseDto getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return convertToDto(course);
    }
    
    @Override
    public Page<CourseDto> getAllCourses(Pageable pageable) {
        return courseRepository.findAll(pageable).map(this::convertToDto);
    }
    
    @Override
    public Page<CourseDto> getInstructorCourses(Pageable pageable) {
        User instructor = userService.getCurrentUser();
        return courseRepository.findByInstructor(instructor, pageable).map(this::convertToDto);
    }
    
    @Override
    public Page<CourseDto> getApprovedCourses(Pageable pageable) {
        return courseRepository.findApprovedCourses(pageable).map(this::convertToDto);
    }
    
    @Override
    public Page<CourseDto> getPendingApprovalCourses(Pageable pageable) {
        return courseRepository.findPendingApprovalCourses(pageable).map(this::convertToDto);
    }
    
    @Override
    public void approveCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setStatus(Course.CourseStatus.APPROVED);
        courseRepository.save(course);
    }
    
    @Override
    public void rejectCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setStatus(Course.CourseStatus.REJECTED);
        courseRepository.save(course);
    }
    
    @Override
    public Course getCourseEntityById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }
    
    @Override
    public Long getTotalCourses() {
        return courseRepository.count();
    }
    
    @Override
    public Long getPendingCoursesCount() {
        return courseRepository.countByStatus(Course.CourseStatus.PENDING_APPROVAL);
    }
    
    private CourseDto convertToDto(Course course) {
        CourseDto dto = new CourseDto();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setPrice(course.getPrice());
        dto.setThumbnailUrl(course.getThumbnailUrl());
        dto.setStatus(course.getStatus().name());
        dto.setCreatedAt(course.getCreatedAt());
        dto.setInstructorName(course.getInstructor().getFirstName() + " " + course.getInstructor().getLastName());
        dto.setCategoryName(course.getCategory().getName());
        dto.setTotalSections(course.getSections() != null ? course.getSections().size() : 0);
        dto.setEnrolledStudents(course.getEnrollments() != null ? course.getEnrollments().size() : 0);
        return dto;
    }
}