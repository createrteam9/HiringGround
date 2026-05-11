package com.hiringground.api.repository;

import com.hiringground.api.domain.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByMentorId(Long mentorId);
    List<Resource> findAllByOrderByCreatedAtDesc();
}
