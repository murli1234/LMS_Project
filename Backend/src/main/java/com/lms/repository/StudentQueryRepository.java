package com.lms.repository;

import com.lms.entity.Course;
import com.lms.entity.Lesson;
import com.lms.entity.StudentQuery;
import com.lms.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentQueryRepository extends JpaRepository<StudentQuery, Long> {
    List<StudentQuery> findByStudent(User student);
    Page<StudentQuery> findByStudent(User student, Pageable pageable);
    List<StudentQuery> findByCourse(Course course);
    Page<StudentQuery> findByCourse(Course course, Pageable pageable);
    List<StudentQuery> findByLesson(Lesson lesson);
    Page<StudentQuery> findByStatus(StudentQuery.QueryStatus status, Pageable pageable);
    
    @Query("SELECT q FROM StudentQuery q JOIN q.course c JOIN c.mentorAssignments ma WHERE ma.mentor = :mentor")
    Page<StudentQuery> findQueriesForMentor(User mentor, Pageable pageable);
}