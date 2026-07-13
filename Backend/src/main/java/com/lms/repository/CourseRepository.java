package com.lms.repository;

import com.lms.entity.Course;
import com.lms.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByInstructor(User instructor);
    Page<Course> findByInstructor(User instructor, Pageable pageable);
    Page<Course> findByStatus(Course.CourseStatus status, Pageable pageable);
    Long countByStatus(Course.CourseStatus status);
    
    default Page<Course> findApprovedCourses(Pageable pageable) {
        return findByStatus(Course.CourseStatus.APPROVED, pageable);
    }
    
    default Page<Course> findPendingApprovalCourses(Pageable pageable) {
        return findByStatus(Course.CourseStatus.PENDING_APPROVAL, pageable);
    }
}