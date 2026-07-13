package com.lms.service.impl;

import com.lms.dto.EnrollmentDto;
import com.lms.entity.*;
import com.lms.repository.*;
import com.lms.service.EnrollmentService;
import com.lms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {
    
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private LessonRepository lessonRepository;
    
    @Autowired
    private LessonProgressRepository lessonProgressRepository;
    
    @Autowired
    private UserService userService;
    
    @Override
    public EnrollmentDto enrollInCourse(Long courseId) {
        User student = userService.getCurrentUser();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        
        if (enrollmentRepository.existsByStudentAndCourse(student, course)) {
            throw new RuntimeException("Already enrolled in this course");
        }
        
        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        
        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
        return convertToDto(savedEnrollment);
    }
    
    @Override
    public Page<EnrollmentDto> getMyEnrollments(Pageable pageable) {
        User student = userService.getCurrentUser();
        return enrollmentRepository.findByStudent(student, pageable).map(this::convertToDto);
    }
    
    @Override
    public Page<EnrollmentDto> getCourseEnrollments(Long courseId, Pageable pageable) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return enrollmentRepository.findByCourse(course, pageable).map(this::convertToDto);
    }
    
    @Override
    public void markLessonComplete(Long lessonId) {
        User student = userService.getCurrentUser();
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
        
        Enrollment enrollment = enrollmentRepository.findByStudentAndCourse(student, lesson.getSection().getCourse())
                .orElseThrow(() -> new RuntimeException("Not enrolled in this course"));
        
        LessonProgress progress = lessonProgressRepository.findByEnrollmentAndLesson(enrollment, lesson)
                .orElse(new LessonProgress());
        
        progress.setEnrollment(enrollment);
        progress.setLesson(lesson);
        progress.setIsCompleted(true);
        progress.setCompletedAt(LocalDateTime.now());
        
        lessonProgressRepository.save(progress);
        
        // Update enrollment progress
        updateEnrollmentProgress(enrollment);
    }
    
    @Override
    public Double getCourseProgress(Long courseId) {
        User student = userService.getCurrentUser();
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        
        Enrollment enrollment = enrollmentRepository.findByStudentAndCourse(student, course)
                .orElseThrow(() -> new RuntimeException("Not enrolled in this course"));
        
        return enrollment.getProgressPercentage();
    }
    
    private void updateEnrollmentProgress(Enrollment enrollment) {
        Course course = enrollment.getCourse();
        int totalLessons = course.getSections().stream()
                .mapToInt(section -> section.getLessons().size())
                .sum();
        
        if (totalLessons == 0) {
            enrollment.setProgressPercentage(0.0);
        } else {
            List<LessonProgress> completedLessons = lessonProgressRepository
                    .findByEnrollmentAndIsCompleted(enrollment, true);
            double progress = (double) completedLessons.size() / totalLessons * 100;
            enrollment.setProgressPercentage(progress);
            
            if (progress == 100.0) {
                enrollment.setCompletedAt(LocalDateTime.now());
            }
        }
        
        enrollmentRepository.save(enrollment);
    }
    
    private EnrollmentDto convertToDto(Enrollment enrollment) {
        EnrollmentDto dto = new EnrollmentDto();
        dto.setId(enrollment.getId());
        dto.setEnrolledAt(enrollment.getEnrolledAt());
        dto.setCompletedAt(enrollment.getCompletedAt());
        dto.setProgressPercentage(enrollment.getProgressPercentage());
        dto.setStudentName(enrollment.getStudent().getFirstName() + " " + enrollment.getStudent().getLastName());
        dto.setCourseName(enrollment.getCourse().getTitle());
        dto.setCourseTitle(enrollment.getCourse().getTitle());
        return dto;
    }
}