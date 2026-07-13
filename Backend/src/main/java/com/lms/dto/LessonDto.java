package com.lms.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LessonDto {
    private Long id;
    private String title;
    private String description;
    private String videoUrl;
    private String pdfUrl;
    private Integer orderIndex;
    private Integer durationMinutes;
    private LocalDateTime createdAt;
    private Boolean isCompleted;
}