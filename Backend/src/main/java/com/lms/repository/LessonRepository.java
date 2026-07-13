package com.lms.repository;

import com.lms.entity.Lesson;
import com.lms.entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findBySectionOrderByOrderIndex(Section section);
}