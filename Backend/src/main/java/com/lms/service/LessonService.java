package com.lms.service;

import com.lms.dto.LessonDto;
import com.lms.dto.LessonRequest;

import java.util.List;

public interface LessonService {
    LessonDto createLesson(Long sectionId, LessonRequest lessonRequest);
    LessonDto updateLesson(Long id, LessonRequest lessonRequest);
    void deleteLesson(Long id);
    List<LessonDto> getSectionLessons(Long sectionId);
}