package com.lms.service.impl;

import com.lms.dto.SectionDto;
import com.lms.dto.SectionRequest;
import com.lms.entity.Course;
import com.lms.entity.Section;
import com.lms.repository.SectionRepository;
import com.lms.service.CourseService;
import com.lms.service.SectionService;
import com.lms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SectionServiceImpl implements SectionService {
    
    @Autowired
    private SectionRepository sectionRepository;
    
    @Autowired
    private CourseService courseService;
    
    @Autowired
    private UserService userService;
    
    @Override
    public SectionDto createSection(Long courseId, SectionRequest sectionRequest) {
        Course course = courseService.getCourseEntityById(courseId);
        
        // Verify instructor owns the course
        if (!course.getInstructor().getId().equals(userService.getCurrentUser().getId())) {
            throw new RuntimeException("You can only add sections to your own courses");
        }
        
        Section section = new Section();
        section.setTitle(sectionRequest.getTitle());
        section.setDescription(sectionRequest.getDescription());
        section.setOrderIndex(sectionRequest.getOrderIndex());
        section.setCourse(course);
        
        Section savedSection = sectionRepository.save(section);
        return convertToDto(savedSection);
    }
    
    @Override
    public SectionDto updateSection(Long id, SectionRequest sectionRequest) {
        Section section = sectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        
        // Verify instructor owns the course
        if (!section.getCourse().getInstructor().getId().equals(userService.getCurrentUser().getId())) {
            throw new RuntimeException("You can only update sections of your own courses");
        }
        
        section.setTitle(sectionRequest.getTitle());
        section.setDescription(sectionRequest.getDescription());
        section.setOrderIndex(sectionRequest.getOrderIndex());
        
        Section savedSection = sectionRepository.save(section);
        return convertToDto(savedSection);
    }
    
    @Override
    public void deleteSection(Long id) {
        Section section = sectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        
        // Verify instructor owns the course
        if (!section.getCourse().getInstructor().getId().equals(userService.getCurrentUser().getId())) {
            throw new RuntimeException("You can only delete sections of your own courses");
        }
        
        sectionRepository.delete(section);
    }
    
    @Override
    public List<SectionDto> getCourseSections(Long courseId) {
        Course course = courseService.getCourseEntityById(courseId);
        return sectionRepository.findByCourseOrderByOrderIndex(course)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    private SectionDto convertToDto(Section section) {
        SectionDto dto = new SectionDto();
        dto.setId(section.getId());
        dto.setTitle(section.getTitle());
        dto.setDescription(section.getDescription());
        dto.setOrderIndex(section.getOrderIndex());
        dto.setCreatedAt(section.getCreatedAt());
        return dto;
    }
}