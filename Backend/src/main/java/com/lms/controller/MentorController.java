package com.lms.controller;

import com.lms.dto.ApiResponse;
import com.lms.dto.QueryReplyRequest;
import com.lms.entity.StudentQuery;
import com.lms.service.StudentQueryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mentor")
@PreAuthorize("hasRole('MENTOR')")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MentorController {
    
    @Autowired
    private StudentQueryService studentQueryService;
    
    @GetMapping("/queries")
    public ResponseEntity<ApiResponse> getAssignedQueries(Pageable pageable) {
        return ResponseEntity.ok(new ApiResponse(true, "Queries retrieved successfully", 
                studentQueryService.getQueriesForMentor(pageable)));
    }
    
    @GetMapping("/queries/{id}")
    public ResponseEntity<ApiResponse> getQueryById(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse(true, "Query retrieved successfully", 
                studentQueryService.getQueryById(id)));
    }
    
    @PostMapping("/queries/{id}/reply")
    public ResponseEntity<ApiResponse> replyToQuery(@PathVariable Long id, 
                                                   @Valid @RequestBody QueryReplyRequest request) {
        studentQueryService.replyToQuery(id, request);
        return ResponseEntity.ok(new ApiResponse(true, "Reply added successfully"));
    }
    
    @PutMapping("/queries/{id}/status/open")
    public ResponseEntity<ApiResponse> markQueryAsOpen(@PathVariable Long id) {
        studentQueryService.updateQueryStatus(id, StudentQuery.QueryStatus.OPEN);
        return ResponseEntity.ok(new ApiResponse(true, "Query status updated to OPEN"));
    }
    
    @PutMapping("/queries/{id}/status/in-progress")
    public ResponseEntity<ApiResponse> markQueryAsInProgress(@PathVariable Long id) {
        studentQueryService.updateQueryStatus(id, StudentQuery.QueryStatus.IN_PROGRESS);
        return ResponseEntity.ok(new ApiResponse(true, "Query status updated to IN_PROGRESS"));
    }
    
    @PutMapping("/queries/{id}/status/resolved")
    public ResponseEntity<ApiResponse> markQueryAsResolved(@PathVariable Long id) {
        studentQueryService.updateQueryStatus(id, StudentQuery.QueryStatus.RESOLVED);
        return ResponseEntity.ok(new ApiResponse(true, "Query status updated to RESOLVED"));
    }
}