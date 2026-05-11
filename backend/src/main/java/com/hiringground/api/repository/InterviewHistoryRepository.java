package com.hiringground.api.repository;

import com.hiringground.api.domain.InterviewHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewHistoryRepository extends JpaRepository<InterviewHistory, Long> {
    
    // Find all interviews for a specific candidate
    List<InterviewHistory> findByCandidateIdOrderByInterviewDateDesc(Long candidateId);

    // Find all interviews for a specific mentor
    @Query("SELECT h FROM InterviewHistory h WHERE h.interviewSlot.userProfile.id = :mentorProfileId ORDER BY h.interviewDate DESC")
    List<InterviewHistory> findByMentorProfileId(@Param("mentorProfileId") Long mentorProfileId);
}
