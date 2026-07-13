package com.lms.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EnrollmentDto {
    private Long id;
    private LocalDateTime enrolledAt;
    private LocalDateTime completedAt;
    private Double progressPercentage;
    private String studentName;
    private String courseName;
    private String courseTitle;
}