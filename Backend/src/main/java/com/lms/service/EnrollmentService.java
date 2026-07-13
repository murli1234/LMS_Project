package com.lms.service;

import com.lms.dto.EnrollmentDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EnrollmentService {
    EnrollmentDto enrollInCourse(Long courseId);
    Page<EnrollmentDto> getMyEnrollments(Pageable pageable);
    Page<EnrollmentDto> getCourseEnrollments(Long courseId, Pageable pageable);
    void markLessonComplete(Long lessonId);
    Double getCourseProgress(Long courseId);
}