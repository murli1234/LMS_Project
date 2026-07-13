package com.lms.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QueryReplyDto {
    private Long id;
    private String message;
    private LocalDateTime createdAt;
    private String userName;
    private String userRole;
}