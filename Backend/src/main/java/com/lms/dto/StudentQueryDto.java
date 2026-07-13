package com.lms.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class StudentQueryDto {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String studentName;
    private String courseName;
    private String lessonName;
    private List<QueryReplyDto> replies;
}