package com.lms.service.impl;

import com.lms.dto.LessonDto;
import com.lms.dto.LessonRequest;
import com.lms.entity.Lesson;
import com.lms.entity.Section;
import com.lms.repository.LessonRepository;
import com.lms.repository.SectionRepository;
import com.lms.service.LessonService;
import com.lms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonServiceImpl implements LessonService {
    
    @Autowired
    private LessonRepository lessonRepository;
    
    @Autowired
    private SectionRepository sectionRepository;
    
    @Autowired
    private UserService userService;
    
    @Override
    public LessonDto createLesson(Long sectionId, LessonRequest lessonRequest) {
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        
        // Verify instructor owns the course
        if (!section.getCourse().getInstructor().getId().equals(userService.getCurrentUser().getId())) {
            throw new RuntimeException("You can only add lessons to your own courses");
        }
        
        Lesson lesson = new Lesson();
        lesson.setTitle(lessonRequest.getTitle());
        lesson.setDescription(lessonRequest.getDescription());
        lesson.setVideoUrl(lessonRequest.getVideoUrl());
        lesson.setPdfUrl(lessonRequest.getPdfUrl());
        lesson.setOrderIndex(lessonRequest.getOrderIndex());
        lesson.setDurationMinutes(lessonRequest.getDurationMinutes());
        lesson.setSection(section);
        
        Lesson savedLesson = lessonRepository.save(lesson);
        return convertToDto(savedLesson);
    }
    
    @Override
    public LessonDto updateLesson(Long id, LessonRequest lessonRequest) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
        
        // Verify instructor owns the course
        if (!lesson.getSection().getCourse().getInstructor().getId().equals(userService.getCurrentUser().getId())) {
            throw new RuntimeException("You can only update lessons of your own courses");
        }
        
        lesson.setTitle(lessonRequest.getTitle());
        lesson.setDescription(lessonRequest.getDescription());
        lesson.setVideoUrl(lessonRequest.getVideoUrl());
        lesson.setPdfUrl(lessonRequest.getPdfUrl());
        lesson.setOrderIndex(lessonRequest.getOrderIndex());
        lesson.setDurationMinutes(lessonRequest.getDurationMinutes());
        
        Lesson savedLesson = lessonRepository.save(lesson);
        return convertToDto(savedLesson);
    }
    
    @Override
    public void deleteLesson(Long id) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
        
        // Verify instructor owns the course
        if (!lesson.getSection().getCourse().getInstructor().getId().equals(userService.getCurrentUser().getId())) {
            throw new RuntimeException("You can only delete lessons of your own courses");
        }
        
        lessonRepository.delete(lesson);
    }
    
    @Override
    public List<LessonDto> getSectionLessons(Long sectionId) {
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        
        return lessonRepository.findBySectionOrderByOrderIndex(section)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    private LessonDto convertToDto(Lesson lesson) {
        LessonDto dto = new LessonDto();
        dto.setId(lesson.getId());
        dto.setTitle(lesson.getTitle());
        dto.setDescription(lesson.getDescription());
        dto.setVideoUrl(lesson.getVideoUrl());
        dto.setPdfUrl(lesson.getPdfUrl());
        dto.setOrderIndex(lesson.getOrderIndex());
        dto.setDurationMinutes(lesson.getDurationMinutes());
        dto.setCreatedAt(lesson.getCreatedAt());
        return dto;
    }
}