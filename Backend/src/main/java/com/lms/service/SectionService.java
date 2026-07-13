package com.lms.service;

import com.lms.dto.SectionDto;
import com.lms.dto.SectionRequest;

import java.util.List;

public interface SectionService {
    SectionDto createSection(Long courseId, SectionRequest sectionRequest);
    SectionDto updateSection(Long id, SectionRequest sectionRequest);
    void deleteSection(Long id);
    List<SectionDto> getCourseSections(Long courseId);
}