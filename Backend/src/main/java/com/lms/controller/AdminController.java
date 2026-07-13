package com.lms.controller;

import com.lms.dto.ApiResponse;
import com.lms.dto.CourseRequest;
import com.lms.dto.UserDto;
import jakarta.validation.Valid;
import com.lms.service.CourseService;
import com.lms.service.EnrollmentService;
import com.lms.service.StudentQueryService;
import com.lms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private CourseService courseService;
    
    @Autowired
    private StudentQueryService studentQueryService;
    
    @Autowired
    private EnrollmentService enrollmentService;
    
    @GetMapping("/users")
    public ResponseEntity<ApiResponse> getAllUsers(Pageable pageable) {
        return ResponseEntity.ok(new ApiResponse(true, "Users retrieved successfully", 
                userService.getAllUsers(pageable)));
    }
    
    @GetMapping("/users/{id}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse(true, "User retrieved successfully", 
                userService.getUserById(id)));
    }
    
    @PutMapping("/users/{id}")
    public ResponseEntity<ApiResponse> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        return ResponseEntity.ok(new ApiResponse(true, "User updated successfully", 
                userService.updateUser(id, userDto)));
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(new ApiResponse(true, "User deleted successfully"));
    }
    
    @PutMapping("/users/{id}/toggle-status")
    public ResponseEntity<ApiResponse> toggleUserStatus(@PathVariable Long id) {
        userService.toggleUserStatus(id);
        return ResponseEntity.ok(new ApiResponse(true, "User status updated successfully"));
    }
    
    @GetMapping("/courses")
    public ResponseEntity<ApiResponse> getAllCourses(Pageable pageable) {
        return ResponseEntity.ok(new ApiResponse(true, "All courses retrieved successfully", 
                courseService.getAllCourses(pageable)));
    }
    
    @GetMapping("/courses/pending")
    public ResponseEntity<ApiResponse> getPendingCourses(Pageable pageable) {
        return ResponseEntity.ok(new ApiResponse(true, "Pending courses retrieved successfully", 
                courseService.getPendingApprovalCourses(pageable)));
    }
    
    @PutMapping("/courses/{id}/approve")
    public ResponseEntity<ApiResponse> approveCourse(@PathVariable Long id) {
        courseService.approveCourse(id);
        return ResponseEntity.ok(new ApiResponse(true, "Course approved successfully"));
    }
    
    @PutMapping("/courses/{id}/reject")
    public ResponseEntity<ApiResponse> rejectCourse(@PathVariable Long id) {
        courseService.rejectCourse(id);
        return ResponseEntity.ok(new ApiResponse(true, "Course rejected successfully"));
    }
    
    @GetMapping("/courses/{id}")
    public ResponseEntity<ApiResponse> getCourseDetails(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse(true, "Course details retrieved successfully", 
                courseService.getCourseById(id)));
    }
    
    @DeleteMapping("/courses/{id}")
    public ResponseEntity<ApiResponse> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(new ApiResponse(true, "Course deleted successfully"));
    }
    
    @PutMapping("/courses/{id}")
    public ResponseEntity<ApiResponse> updateCourse(@PathVariable Long id, @Valid @RequestBody CourseRequest courseRequest) {
        return ResponseEntity.ok(new ApiResponse(true, "Course updated successfully", 
                courseService.updateCourse(id, courseRequest)));
    }
    
    @GetMapping("/courses/{id}/enrollments")
    public ResponseEntity<ApiResponse> getCourseEnrollments(@PathVariable Long id, Pageable pageable) {
        return ResponseEntity.ok(new ApiResponse(true, "Course enrollments retrieved successfully", 
                enrollmentService.getCourseEnrollments(id, pageable)));
    }
    
    @GetMapping("/queries")
    public ResponseEntity<ApiResponse> getAllQueries(Pageable pageable) {
        return ResponseEntity.ok(new ApiResponse(true, "Queries retrieved successfully", 
                studentQueryService.getAllQueries(pageable)));
    }
    
    @GetMapping("/instructors")
    public ResponseEntity<ApiResponse> getInstructors() {
        return ResponseEntity.ok(new ApiResponse(true, "Instructors retrieved successfully", 
                userService.getUsersByRole("INSTRUCTOR")));
    }
    
    @GetMapping("/mentors")
    public ResponseEntity<ApiResponse> getMentors() {
        return ResponseEntity.ok(new ApiResponse(true, "Mentors retrieved successfully", 
                userService.getUsersByRole("MENTOR")));
    }
    
    @GetMapping("/dashboard/stats")
    public ResponseEntity<ApiResponse> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userService.getTotalUsers());
        stats.put("totalCourses", courseService.getTotalCourses());
        stats.put("pendingCourses", courseService.getPendingCoursesCount());
        stats.put("totalQueries", studentQueryService.getTotalQueries());
        stats.put("totalStudents", userService.getUsersByRole("STUDENT").size());
        stats.put("totalInstructors", userService.getUsersByRole("INSTRUCTOR").size());
        stats.put("totalMentors", userService.getUsersByRole("MENTOR").size());
        
        return ResponseEntity.ok(new ApiResponse(true, "Dashboard stats retrieved successfully", stats));
    }
    
    @GetMapping("/students")
    public ResponseEntity<ApiResponse> getStudents() {
        return ResponseEntity.ok(new ApiResponse(true, "Students retrieved successfully", 
                userService.getUsersByRole("STUDENT")));
    }
}