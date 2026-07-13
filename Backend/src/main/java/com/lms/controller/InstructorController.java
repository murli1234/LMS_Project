package com.lms.controller;

import com.lms.dto.ApiResponse;
import com.lms.dto.CourseRequest;
import com.lms.dto.SectionRequest;
import com.lms.dto.LessonRequest;
import com.lms.service.CourseService;
import com.lms.service.EnrollmentService;
import com.lms.service.SectionService;
import com.lms.service.LessonService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/instructor")
@PreAuthorize("hasRole('INSTRUCTOR')")
@CrossOrigin(origins = "*", maxAge = 3600)
public class InstructorController {
    
    @Autowired
    private CourseService courseService;
    
    @Autowired
    private SectionService sectionService;
    
    @Autowired
    private LessonService lessonService;
    
    @Autowired
    private EnrollmentService enrollmentService;
    
    @PostMapping("/courses")
    public ResponseEntity<ApiResponse> createCourse(@Valid @RequestBody CourseRequest courseRequest) {
        return ResponseEntity.ok(new ApiResponse(true, "Course created successfully", 
                courseService.createCourse(courseRequest)));
    }
    
    @GetMapping("/courses")
    public ResponseEntity<ApiResponse> getMyCourses(Pageable pageable) {
        return ResponseEntity.ok(new ApiResponse(true, "Courses retrieved successfully", 
                courseService.getInstructorCourses(pageable)));
    }
    
    @GetMapping("/courses/{id}")
    public ResponseEntity<ApiResponse> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse(true, "Course retrieved successfully", 
                courseService.getCourseById(id)));
    }
    
    @PutMapping("/courses/{id}")
    public ResponseEntity<ApiResponse> updateCourse(@PathVariable Long id, 
                                                   @Valid @RequestBody CourseRequest courseRequest) {
        return ResponseEntity.ok(new ApiResponse(true, "Course updated successfully", 
                courseService.updateCourse(id, courseRequest)));
    }
    
    @DeleteMapping("/courses/{id}")
    public ResponseEntity<ApiResponse> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(new ApiResponse(true, "Course deleted successfully"));
    }
    
    @PostMapping("/courses/{courseId}/sections")
    public ResponseEntity<ApiResponse> createSection(@PathVariable Long courseId, 
                                                    @Valid @RequestBody SectionRequest sectionRequest) {
        return ResponseEntity.ok(new ApiResponse(true, "Section created successfully", 
                sectionService.createSection(courseId, sectionRequest)));
    }
    
    @GetMapping("/courses/{courseId}/sections")
    public ResponseEntity<ApiResponse> getCourseSections(@PathVariable Long courseId) {
        return ResponseEntity.ok(new ApiResponse(true, "Sections retrieved successfully", 
                sectionService.getCourseSections(courseId)));
    }
    
    @PutMapping("/sections/{id}")
    public ResponseEntity<ApiResponse> updateSection(@PathVariable Long id, 
                                                    @Valid @RequestBody SectionRequest sectionRequest) {
        return ResponseEntity.ok(new ApiResponse(true, "Section updated successfully", 
                sectionService.updateSection(id, sectionRequest)));
    }
    
    @DeleteMapping("/sections/{id}")
    public ResponseEntity<ApiResponse> deleteSection(@PathVariable Long id) {
        sectionService.deleteSection(id);
        return ResponseEntity.ok(new ApiResponse(true, "Section deleted successfully"));
    }
    
    @PostMapping("/sections/{sectionId}/lessons")
    public ResponseEntity<ApiResponse> createLesson(@PathVariable Long sectionId, 
                                                   @Valid @RequestBody LessonRequest lessonRequest) {
        return ResponseEntity.ok(new ApiResponse(true, "Lesson created successfully", 
                lessonService.createLesson(sectionId, lessonRequest)));
    }
    
    @GetMapping("/sections/{sectionId}/lessons")
    public ResponseEntity<ApiResponse> getSectionLessons(@PathVariable Long sectionId) {
        return ResponseEntity.ok(new ApiResponse(true, "Lessons retrieved successfully", 
                lessonService.getSectionLessons(sectionId)));
    }
    
    @PutMapping("/lessons/{id}")
    public ResponseEntity<ApiResponse> updateLesson(@PathVariable Long id, 
                                                   @Valid @RequestBody LessonRequest lessonRequest) {
        return ResponseEntity.ok(new ApiResponse(true, "Lesson updated successfully", 
                lessonService.updateLesson(id, lessonRequest)));
    }
    
    @DeleteMapping("/lessons/{id}")
    public ResponseEntity<ApiResponse> deleteLesson(@PathVariable Long id) {
        lessonService.deleteLesson(id);
        return ResponseEntity.ok(new ApiResponse(true, "Lesson deleted successfully"));
    }
    
    @GetMapping("/courses/{courseId}/enrollments")
    public ResponseEntity<ApiResponse> getCourseEnrollments(@PathVariable Long courseId, Pageable pageable) {
        return ResponseEntity.ok(new ApiResponse(true, "Enrollments retrieved successfully", 
                enrollmentService.getCourseEnrollments(courseId, pageable)));
    }
}