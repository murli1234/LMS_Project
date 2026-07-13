package com.lms.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LessonRequest {
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    private String videoUrl;
    private String pdfUrl;
    
    @NotNull(message = "Order index is required")
    private Integer orderIndex;
    
    private Integer durationMinutes;
}