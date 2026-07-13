package com.lms.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class SectionDto {
    private Long id;
    private String title;
    private String description;
    private Integer orderIndex;
    private LocalDateTime createdAt;
    private List<LessonDto> lessons;
}