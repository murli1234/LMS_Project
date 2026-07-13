package com.lms.service;

import com.lms.dto.JwtResponse;
import com.lms.dto.LoginRequest;
import com.lms.dto.RegisterRequest;

public interface AuthService {
    JwtResponse login(LoginRequest loginRequest);
    String register(RegisterRequest registerRequest);
}