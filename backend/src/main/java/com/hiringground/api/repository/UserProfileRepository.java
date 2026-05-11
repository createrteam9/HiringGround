package com.hiringground.api.repository;

import com.hiringground.api.domain.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUserId(Long userId);

    // Find all active profiles by role (e.g., role=1 for Mentors)
    @Query("SELECT p FROM UserProfile p JOIN p.user u WHERE u.role = :role AND u.status = 1")
    List<UserProfile> findAllActiveByRole(@Param("role") Integer role);
}
