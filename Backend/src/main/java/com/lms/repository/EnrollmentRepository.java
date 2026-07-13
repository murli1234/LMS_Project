package com.lms.repository;

import com.lms.entity.Course;
import com.lms.entity.Enrollment;
import com.lms.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    Optional<Enrollment> findByStudentAndCourse(User student, Course course);
    List<Enrollment> findByStudent(User student);
    Page<Enrollment> findByStudent(User student, Pageable pageable);
    List<Enrollment> findByCourse(Course course);
    Page<Enrollment> findByCourse(Course course, Pageable pageable);
    boolean existsByStudentAndCourse(User student, Course course);
}