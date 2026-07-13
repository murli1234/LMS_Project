package com.lms.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private List<String> roles;
}