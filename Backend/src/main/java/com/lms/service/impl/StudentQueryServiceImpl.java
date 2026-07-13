package com.lms.service.impl;

import com.lms.dto.QueryReplyDto;
import com.lms.dto.QueryReplyRequest;
import com.lms.dto.StudentQueryDto;
import com.lms.dto.StudentQueryRequest;
import com.lms.entity.*;
import com.lms.repository.*;
import com.lms.service.StudentQueryService;
import com.lms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentQueryServiceImpl implements StudentQueryService {
    
    @Autowired
    private StudentQueryRepository studentQueryRepository;
    
    @Autowired
    private QueryReplyRepository queryReplyRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private LessonRepository lessonRepository;
    
    @Autowired
    private UserService userService;
    
    @Override
    public StudentQueryDto createQuery(StudentQueryRequest request) {
        User student = userService.getCurrentUser();
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        
        StudentQuery query = new StudentQuery();
        query.setTitle(request.getTitle());
        query.setDescription(request.getDescription());
        query.setImageUrl(request.getImageUrl());
        query.setStudent(student);
        query.setCourse(course);
        
        if (request.getLessonId() != null) {
            Lesson lesson = lessonRepository.findById(request.getLessonId())
                    .orElseThrow(() -> new RuntimeException("Lesson not found"));
            query.setLesson(lesson);
        }
        
        StudentQuery savedQuery = studentQueryRepository.save(query);
        return convertToDto(savedQuery);
    }
    
    @Override
    public StudentQueryDto getQueryById(Long id) {
        StudentQuery query = studentQueryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Query not found"));
        return convertToDto(query);
    }
    
    @Override
    public Page<StudentQueryDto> getMyQueries(Pageable pageable) {
        User student = userService.getCurrentUser();
        return studentQueryRepository.findByStudent(student, pageable).map(this::convertToDto);
    }
    
    @Override
    public Page<StudentQueryDto> getQueriesForMentor(Pageable pageable) {
        User mentor = userService.getCurrentUser();
        return studentQueryRepository.findQueriesForMentor(mentor, pageable).map(this::convertToDto);
    }
    
    @Override
    public Page<StudentQueryDto> getAllQueries(Pageable pageable) {
        return studentQueryRepository.findAll(pageable).map(this::convertToDto);
    }
    
    @Override
    public void replyToQuery(Long queryId, QueryReplyRequest request) {
        User user = userService.getCurrentUser();
        StudentQuery query = studentQueryRepository.findById(queryId)
                .orElseThrow(() -> new RuntimeException("Query not found"));
        
        QueryReply reply = new QueryReply();
        reply.setMessage(request.getMessage());
        reply.setQuery(query);
        reply.setUser(user);
        
        queryReplyRepository.save(reply);
        
        // Update query status to IN_PROGRESS if it was OPEN
        if (query.getStatus() == StudentQuery.QueryStatus.OPEN) {
            query.setStatus(StudentQuery.QueryStatus.IN_PROGRESS);
            query.setUpdatedAt(LocalDateTime.now());
            studentQueryRepository.save(query);
        }
    }
    
    @Override
    public void updateQueryStatus(Long queryId, StudentQuery.QueryStatus status) {
        StudentQuery query = studentQueryRepository.findById(queryId)
                .orElseThrow(() -> new RuntimeException("Query not found"));
        
        query.setStatus(status);
        query.setUpdatedAt(LocalDateTime.now());
        studentQueryRepository.save(query);
    }
    
    @Override
    public Long getTotalQueries() {
        return studentQueryRepository.count();
    }
    
    private StudentQueryDto convertToDto(StudentQuery query) {
        StudentQueryDto dto = new StudentQueryDto();
        dto.setId(query.getId());
        dto.setTitle(query.getTitle());
        dto.setDescription(query.getDescription());
        dto.setImageUrl(query.getImageUrl());
        dto.setStatus(query.getStatus().name());
        dto.setCreatedAt(query.getCreatedAt());
        dto.setUpdatedAt(query.getUpdatedAt());
        dto.setStudentName(query.getStudent().getFirstName() + " " + query.getStudent().getLastName());
        dto.setCourseName(query.getCourse().getTitle());
        
        if (query.getLesson() != null) {
            dto.setLessonName(query.getLesson().getTitle());
        }
        
        List<QueryReplyDto> replies = queryReplyRepository.findByQueryOrderByCreatedAtAsc(query)
                .stream()
                .map(this::convertReplyToDto)
                .collect(Collectors.toList());
        dto.setReplies(replies);
        
        return dto;
    }
    
    private QueryReplyDto convertReplyToDto(QueryReply reply) {
        QueryReplyDto dto = new QueryReplyDto();
        dto.setId(reply.getId());
        dto.setMessage(reply.getMessage());
        dto.setCreatedAt(reply.getCreatedAt());
        dto.setUserName(reply.getUser().getFirstName() + " " + reply.getUser().getLastName());
        dto.setUserRole(reply.getUser().getRoles().iterator().next().getName());
        return dto;
    }
}