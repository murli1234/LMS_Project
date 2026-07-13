package com.lms.service;

import com.lms.dto.StudentQueryDto;
import com.lms.dto.StudentQueryRequest;
import com.lms.dto.QueryReplyRequest;
import com.lms.entity.StudentQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudentQueryService {
    StudentQueryDto createQuery(StudentQueryRequest request);
    StudentQueryDto getQueryById(Long id);
    Page<StudentQueryDto> getMyQueries(Pageable pageable);
    Page<StudentQueryDto> getQueriesForMentor(Pageable pageable);
    Page<StudentQueryDto> getAllQueries(Pageable pageable);
    void replyToQuery(Long queryId, QueryReplyRequest request);
    void updateQueryStatus(Long queryId, StudentQuery.QueryStatus status);
    Long getTotalQueries();
}