package com.lms.controller;

import com.lms.dto.ApiResponse;
import com.lms.dto.StudentQueryRequest;
import com.lms.dto.QueryReplyRequest;
import com.lms.entity.StudentQuery;
import com.lms.service.CourseService;
import com.lms.service.EnrollmentService;
import com.lms.service.StudentQueryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
@PreAuthorize("hasRole('STUDENT')")
@CrossOrigin(origins = "*", maxAge = 3600)
public class StudentController {
    
    @Autowired
    private CourseService courseService;
    
    @Autowired
    private EnrollmentService enrollmentService;
    
    @Autowired
    private StudentQueryService studentQueryService;
    
    @GetMapping("/courses")
    public ResponseEntity<ApiResponse> getApprovedCourses(Pageable pageable) {
        return ResponseEntity.ok(new ApiResponse(true, "Courses retrieved successfully", 
                courseService.getApprovedCourses(pageable)));
    }
    
    @GetMapping("/courses/{id}")
    public ResponseEntity<ApiResponse> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse(true, "Course retrieved successfully", 
                courseService.getCourseById(id)));
    }
    
    @PostMapping("/courses/{id}/enroll")
    public ResponseEntity<ApiResponse> enrollInCourse(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse(true, "Enrolled successfully", 
                enrollmentService.enrollInCourse(id)));
    }
    
    @GetMapping("/enrollments")
    public ResponseEntity<ApiResponse> getMyEnrollments(Pageable pageable) {
        return ResponseEntity.ok(new ApiResponse(true, "Enrollments retrieved successfully", 
                enrollmentService.getMyEnrollments(pageable)));
    }
    
    @PostMapping("/lessons/{id}/complete")
    public ResponseEntity<ApiResponse> markLessonComplete(@PathVariable Long id) {
        enrollmentService.markLessonComplete(id);
        return ResponseEntity.ok(new ApiResponse(true, "Lesson marked as complete"));
    }
    
    @GetMapping("/courses/{id}/progress")
    public ResponseEntity<ApiResponse> getCourseProgress(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse(true, "Progress retrieved successfully", 
                enrollmentService.getCourseProgress(id)));
    }
    
    @PostMapping("/queries")
    public ResponseEntity<ApiResponse> createQuery(@Valid @RequestBody StudentQueryRequest request) {
        return ResponseEntity.ok(new ApiResponse(true, "Query created successfully", 
                studentQueryService.createQuery(request)));
    }
    
    @GetMapping("/queries")
    public ResponseEntity<ApiResponse> getMyQueries(Pageable pageable) {
        return ResponseEntity.ok(new ApiResponse(true, "Queries retrieved successfully", 
                studentQueryService.getMyQueries(pageable)));
    }
    
    @GetMapping("/queries/{id}")
    public ResponseEntity<ApiResponse> getQueryById(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse(true, "Query retrieved successfully", 
                studentQueryService.getQueryById(id)));
    }
    
    @PostMapping("/queries/{id}/reply")
    public ResponseEntity<ApiResponse> replyToQuery(@PathVariable Long id, 
                                                   @Valid @RequestBody QueryReplyRequest request) {
        studentQueryService.replyToQuery(id, request);
        return ResponseEntity.ok(new ApiResponse(true, "Reply added successfully"));
    }
    
    @PutMapping("/queries/{id}/reopen")
    public ResponseEntity<ApiResponse> reopenQuery(@PathVariable Long id) {
        studentQueryService.updateQueryStatus(id, StudentQuery.QueryStatus.OPEN);
        return ResponseEntity.ok(new ApiResponse(true, "Query reopened successfully"));
    }
    
    @PutMapping("/queries/{id}/resolve")
    public ResponseEntity<ApiResponse> resolveQuery(@PathVariable Long id) {
        studentQueryService.updateQueryStatus(id, StudentQuery.QueryStatus.RESOLVED);
        return ResponseEntity.ok(new ApiResponse(true, "Query resolved successfully"));
    }
}