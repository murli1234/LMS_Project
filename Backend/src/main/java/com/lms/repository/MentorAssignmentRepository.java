package com.lms.repository;

import com.lms.entity.Course;
import com.lms.entity.MentorAssignment;
import com.lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MentorAssignmentRepository extends JpaRepository<MentorAssignment, Long> {
    List<MentorAssignment> findByMentor(User mentor);
    List<MentorAssignment> findByCourse(Course course);
    Optional<MentorAssignment> findByMentorAndCourse(User mentor, Course course);
    boolean existsByMentorAndCourse(User mentor, Course course);
}