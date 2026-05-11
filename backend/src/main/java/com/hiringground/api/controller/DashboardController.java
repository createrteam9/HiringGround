package com.hiringground.api.controller;

import com.hiringground.api.domain.InterviewHistory;
import com.hiringground.api.domain.InterviewSlot;
import com.hiringground.api.domain.UserProfile;
import com.hiringground.api.repository.InterviewHistoryRepository;
import com.hiringground.api.repository.InterviewSlotRepository;
import com.hiringground.api.repository.UserProfileRepository;
import com.hiringground.api.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    UserProfileRepository userProfileRepository;

    @Autowired
    InterviewSlotRepository interviewSlotRepository;

    @Autowired
    InterviewHistoryRepository interviewHistoryRepository;

    /**
     * AUTHENTICATED: Returns role-aware dashboard stats.
     * Mentors get: slot counts, booked session counts, upcoming sessions.
     * Candidates get: bookings count, upcoming session, recent sessions.
     */
    @GetMapping("/stats")
    public ResponseEntity<?> getDashboardStats() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        boolean isMentor = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_MENTOR"));

        Map<String, Object> stats = new HashMap<>();

        if (isMentor) {
            // ── Mentor Stats ──
            UserProfile profile = userProfileRepository.findByUserId(userDetails.getId())
                    .orElseThrow(() -> new RuntimeException("Error: Profile not found."));

            List<InterviewSlot> allSlots = interviewSlotRepository
                    .findByUserProfileIdOrderByDateAscStartTimeAsc(profile.getId());

            List<InterviewHistory> allSessions = interviewHistoryRepository
                    .findByMentorProfileId(profile.getId());

            LocalDate today = LocalDate.now();

            long totalSlots = allSlots.size();
            long availableSlots = allSlots.stream().filter(s -> !s.getIsBooked()).count();
            long bookedSlots = allSlots.stream().filter(InterviewSlot::getIsBooked).count();

            long totalSessions = allSessions.size();
            long upcomingSessions = allSessions.stream()
                    .filter(h -> "SCHEDULED".equals(h.getStatus()) &&
                            (h.getInterviewDate() != null && !h.getInterviewDate().isBefore(today)))
                    .count();
            long completedSessions = allSessions.stream()
                    .filter(h -> "COMPLETED".equals(h.getStatus()))
                    .count();

            // Next upcoming session
            Optional<InterviewHistory> nextSession = allSessions.stream()
                    .filter(h -> "SCHEDULED".equals(h.getStatus()) &&
                            h.getInterviewDate() != null && !h.getInterviewDate().isBefore(today))
                    .min(Comparator.comparing(h -> h.getInterviewSlot().getDate()));

            // Average rating
            OptionalDouble avgRating = allSessions.stream()
                    .filter(h -> h.getRating() != null)
                    .mapToDouble(h -> h.getRating())
                    .average();

            // Recent sessions (last 5)
            List<Map<String, Object>> recentSessions = allSessions.stream()
                    .sorted(Comparator.comparing(InterviewHistory::getInterviewDate,
                            Comparator.nullsLast(Comparator.reverseOrder())))
                    .limit(5)
                    .map(h -> {
                        Map<String, Object> s = new HashMap<>();
                        s.put("bookingId", h.getId());
                        s.put("status", h.getStatus());
                        InterviewSlot slot = h.getInterviewSlot();
                        s.put("slotDate", slot.getDate());
                        s.put("slotTime", slot.getStartTime());
                        s.put("duration", slot.getTimeInterval());
                        s.put("price", slot.getPrice());
                        s.put("candidateId", h.getCandidateId());
                        s.put("rating", h.getRating());
                        return s;
                    }).collect(Collectors.toList());

            // Next session details
            if (nextSession.isPresent()) {
                InterviewHistory next = nextSession.get();
                Map<String, Object> nextMap = new HashMap<>();
                nextMap.put("slotDate", next.getInterviewSlot().getDate());
                nextMap.put("slotTime", next.getInterviewSlot().getStartTime());
                nextMap.put("duration", next.getInterviewSlot().getTimeInterval());
                nextMap.put("candidateId", next.getCandidateId());
                stats.put("nextSession", nextMap);
            }

            stats.put("role", "MENTOR");
            stats.put("totalSlots", totalSlots);
            stats.put("availableSlots", availableSlots);
            stats.put("bookedSlots", bookedSlots);
            stats.put("totalSessions", totalSessions);
            stats.put("upcomingSessions", upcomingSessions);
            stats.put("completedSessions", completedSessions);
            stats.put("avgRating", avgRating.isPresent() ? Math.round(avgRating.getAsDouble() * 10.0) / 10.0 : null);
            stats.put("recentSessions", recentSessions);

            // Mentor profile info
            Map<String, Object> profileMap = new HashMap<>();
            profileMap.put("firstName", profile.getFirstName());
            profileMap.put("lastName", profile.getLastName());
            profileMap.put("profileImgUrl", profile.getProfileImgUrl());
            profileMap.put("currentPosition", profile.getCurrentPosition());
            profileMap.put("currentCompany", profile.getCurrentCompany());
            stats.put("profile", profileMap);

        } else {
            // ── Candidate Stats ──
            List<InterviewHistory> allSessions = interviewHistoryRepository
                    .findByCandidateIdOrderByInterviewDateDesc(userDetails.getId());

            LocalDate today = LocalDate.now();

            long totalBookings = allSessions.size();
            long upcomingSessions = allSessions.stream()
                    .filter(h -> "SCHEDULED".equals(h.getStatus()) &&
                            h.getInterviewDate() != null && !h.getInterviewDate().isBefore(today))
                    .count();
            long completedSessions = allSessions.stream()
                    .filter(h -> "COMPLETED".equals(h.getStatus()))
                    .count();

            // Next upcoming session
            Optional<InterviewHistory> nextSession = allSessions.stream()
                    .filter(h -> "SCHEDULED".equals(h.getStatus()) &&
                            h.getInterviewDate() != null && !h.getInterviewDate().isBefore(today))
                    .min(Comparator.comparing(h -> h.getInterviewSlot().getDate()));

            // Recent sessions (last 5) with mentor info
            List<Map<String, Object>> recentSessions = allSessions.stream()
                    .limit(5)
                    .map(h -> {
                        Map<String, Object> s = new HashMap<>();
                        s.put("bookingId", h.getId());
                        s.put("status", h.getStatus());
                        InterviewSlot slot = h.getInterviewSlot();
                        s.put("slotDate", slot.getDate());
                        s.put("slotTime", slot.getStartTime());
                        s.put("duration", slot.getTimeInterval());
                        s.put("price", slot.getPrice());
                        s.put("rating", h.getRating());
                        // Mentor
                        UserProfile mentor = slot.getUserProfile();
                        Map<String, Object> mentorInfo = new HashMap<>();
                        mentorInfo.put("profileId", mentor.getId());
                        mentorInfo.put("firstName", mentor.getFirstName());
                        mentorInfo.put("lastName", mentor.getLastName());
                        mentorInfo.put("currentPosition", mentor.getCurrentPosition());
                        mentorInfo.put("currentCompany", mentor.getCurrentCompany());
                        mentorInfo.put("profileImgUrl", mentor.getProfileImgUrl());
                        s.put("mentor", mentorInfo);
                        return s;
                    }).collect(Collectors.toList());

            // Next session details
            if (nextSession.isPresent()) {
                InterviewHistory next = nextSession.get();
                UserProfile mentor = next.getInterviewSlot().getUserProfile();
                Map<String, Object> nextMap = new HashMap<>();
                nextMap.put("slotDate", next.getInterviewSlot().getDate());
                nextMap.put("slotTime", next.getInterviewSlot().getStartTime());
                nextMap.put("duration", next.getInterviewSlot().getTimeInterval());
                nextMap.put("mentorFirstName", mentor.getFirstName());
                nextMap.put("mentorLastName", mentor.getLastName());
                nextMap.put("mentorProfileId", mentor.getId());
                stats.put("nextSession", nextMap);
            }

            stats.put("role", "CANDIDATE");
            stats.put("totalBookings", totalBookings);
            stats.put("upcomingSessions", upcomingSessions);
            stats.put("completedSessions", completedSessions);
            stats.put("recentSessions", recentSessions);

            // Candidate profile info
            Optional<UserProfile> candidateProfile = userProfileRepository.findByUserId(userDetails.getId());
            candidateProfile.ifPresent(profile -> {
                Map<String, Object> profileMap = new HashMap<>();
                profileMap.put("firstName", profile.getFirstName());
                profileMap.put("lastName", profile.getLastName());
                profileMap.put("profileImgUrl", profile.getProfileImgUrl());
                profileMap.put("currentPosition", profile.getCurrentPosition());
                profileMap.put("currentCompany", profile.getCurrentCompany());
                stats.put("profile", profileMap);
            });
        }

        return ResponseEntity.ok(stats);
    }
}
