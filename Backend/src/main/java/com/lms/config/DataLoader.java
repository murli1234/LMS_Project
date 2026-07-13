package com.lms.config;

import com.lms.entity.Category;
import com.lms.entity.Role;
import com.lms.entity.User;
import com.lms.repository.CategoryRepository;
import com.lms.repository.RoleRepository;
import com.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        loadRoles();
        loadAdminUser();
        loadCategories();
    }
    
    private void loadRoles() {
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role("ADMIN", "Administrator"));
            roleRepository.save(new Role("INSTRUCTOR", "Course Instructor"));
            roleRepository.save(new Role("MENTOR", "Student Mentor"));
            roleRepository.save(new Role("STUDENT", "Student"));
        }
    }
    
    private void loadAdminUser() {
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@lms.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFirstName("System");
            admin.setLastName("Administrator");
            
            Set<Role> roles = new HashSet<>();
            Role adminRole = roleRepository.findByName("ADMIN").orElseThrow();
            roles.add(adminRole);
            admin.setRoles(roles);
            
            userRepository.save(admin);
        }
    }
    
    private void loadCategories() {
        if (categoryRepository.count() == 0) {
            categoryRepository.save(new Category(null, "Programming", "Programming and Software Development", null, null));
            categoryRepository.save(new Category(null, "Data Science", "Data Science and Analytics", null, null));
            categoryRepository.save(new Category(null, "Web Development", "Web Development Technologies", null, null));
            categoryRepository.save(new Category(null, "Mobile Development", "Mobile App Development", null, null));
            categoryRepository.save(new Category(null, "DevOps", "DevOps and Cloud Technologies", null, null));
        }
    }
}