package com.lms.service;

import com.lms.dto.UserDto;
import com.lms.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    Page<UserDto> getAllUsers(Pageable pageable);
    UserDto getUserById(Long id);
    UserDto updateUser(Long id, UserDto userDto);
    void deleteUser(Long id);
    void toggleUserStatus(Long id);
    List<UserDto> getUsersByRole(String roleName);
    User getCurrentUser();
    Long getTotalUsers();
}