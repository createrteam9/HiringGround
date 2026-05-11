package com.hiringground.api.repository;

import com.hiringground.api.domain.InterviewSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface InterviewSlotRepository extends JpaRepository<InterviewSlot, Long> {
    
    // Find all slots for a specific mentor profile
    List<InterviewSlot> findByUserProfileIdOrderByDateAscStartTimeAsc(Long userProfileId);

    // Find all unbooked slots for a mentor within a date range
    @Query("SELECT s FROM InterviewSlot s WHERE s.userProfile.id = :profileId AND s.isBooked = false AND s.date >= :startDate AND s.date <= :endDate ORDER BY s.date ASC, s.startTime ASC")
    List<InterviewSlot> findAvailableSlotsForMentor(
            @Param("profileId") Long profileId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);
}
