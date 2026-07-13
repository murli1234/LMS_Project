package com.lms.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CourseDto {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private String thumbnailUrl;
    private String status;
    private LocalDateTime createdAt;
    private String instructorName;
    private String categoryName;
    private Integer totalSections;
    private Integer totalLessons;
    private Integer enrolledStudents;
}