package com.lms.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class QueryReplyRequest {
    @NotBlank(message = "Message is required")
    private String message;
}