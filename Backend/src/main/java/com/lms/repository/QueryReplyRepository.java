package com.lms.repository;

import com.lms.entity.QueryReply;
import com.lms.entity.StudentQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QueryReplyRepository extends JpaRepository<QueryReply, Long> {
    List<QueryReply> findByQueryOrderByCreatedAtAsc(StudentQuery query);
}