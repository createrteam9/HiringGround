package com.hiringground.api.controller;

import com.hiringground.api.domain.InterviewHistory;
import com.hiringground.api.domain.InterviewSlot;
import com.hiringground.api.domain.UserProfile;
import com.hiringground.api.payload.request.BookSlotRequest;
import com.hiringground.api.payload.response.MessageResponse;
import com.hiringground.api.repository.InterviewHistoryRepository;
import com.hiringground.api.repository.InterviewSlotRepository;
import com.hiringground.api.repository.UserProfileRepository;
import com.hiringground.api.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/candidate")
public class CandidateBookingController {

    @Autowired
    UserProfileRepository userProfileRepository;

    @Autowired
    InterviewSlotRepository interviewSlotRepository;

    @Autowired
    InterviewHistoryRepository interviewHistoryRepository;

    @Autowired
    com.hiringground.api.repository.UserRepository userRepository;

    @Autowired
    com.hiringground.api.service.EmailService emailService;

    /**
     * PUBLIC: Browse all active mentors.
     * Returns a list of mentor profiles with essential info for the directory page.
     */
    @GetMapping("/mentors")
    public ResponseEntity<?> getAllMentors() {
        // Role 1 = Mentor
        List<UserProfile> mentorProfiles = userProfileRepository.findAllActiveByRole(1);

        // Map to a safe DTO to avoid exposing sensitive user data
        List<Map<String, Object>> mentorList = mentorProfiles.stream().map(profile -> {
            Map<String, Object> mentor = new HashMap<>();
            mentor.put("profileId", profile.getId());
            mentor.put("firstName", profile.getFirstName());
            mentor.put("lastName", profile.getLastName());
            mentor.put("profileImgUrl", profile.getProfileImgUrl());
            mentor.put("bio", profile.getBio());
            mentor.put("currentCompany", profile.getCurrentCompany());
            mentor.put("currentPosition", profile.getCurrentPosition());
            mentor.put("yearsOfExperience", profile.getYearsOfExperience());
            mentor.put("interestsTags", profile.getInterestsTags());
            mentor.put("linkedinUrl", profile.getLinkedinUrl());
            mentor.put("githubUrl", profile.getGithubUrl());
            return mentor;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(mentorList);
    }

    /**
     * PUBLIC: Get available (unbooked) slots for a specific mentor.
     * Returns slots for the next 3 days.
     */
    @GetMapping("/mentors/{profileId}/slots")
    public ResponseEntity<?> getMentorSlots(@PathVariable Long profileId) {
        // Verify mentor profile exists
        UserProfile mentorProfile = userProfileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Error: Mentor profile not found."));

        LocalDate today = LocalDate.now();
        LocalDate maxDate = today.plusDays(3);

        List<InterviewSlot> availableSlots = interviewSlotRepository
                .findAvailableSlotsForMentor(profileId, today, maxDate);

        // Build response with mentor info + slots
        Map<String, Object> response = new HashMap<>();

        Map<String, Object> mentorInfo = new HashMap<>();
        mentorInfo.put("profileId", mentorProfile.getId());
        mentorInfo.put("firstName", mentorProfile.getFirstName());
        mentorInfo.put("lastName", mentorProfile.getLastName());
        mentorInfo.put("profileImgUrl", mentorProfile.getProfileImgUrl());
        mentorInfo.put("bio", mentorProfile.getBio());
        mentorInfo.put("currentCompany", mentorProfile.getCurrentCompany());
        mentorInfo.put("currentPosition", mentorProfile.getCurrentPosition());
        mentorInfo.put("yearsOfExperience", mentorProfile.getYearsOfExperience());
        mentorInfo.put("interestsTags", mentorProfile.getInterestsTags());
        mentorInfo.put("linkedinUrl", mentorProfile.getLinkedinUrl());
        mentorInfo.put("githubUrl", mentorProfile.getGithubUrl());

        response.put("mentor", mentorInfo);
        response.put("slots", availableSlots);

        return ResponseEntity.ok(response);
    }

    /**
     * AUTHENTICATED (CANDIDATE only): Book a specific slot.
     * Marks the slot as booked and creates an InterviewHistory record.
     */
    @PostMapping("/book")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<?> bookSlot(@Valid @RequestBody BookSlotRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        InterviewSlot slot = interviewSlotRepository.findById(request.getSlotId())
                .orElseThrow(() -> new RuntimeException("Error: Slot not found."));

        if (slot.getIsBooked()) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: This slot is already booked."));
        }

        // Prevent mentors from booking their own slots
        UserProfile candidateProfile = userProfileRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: Candidate profile not found."));

        if (slot.getUserProfile().getId().equals(candidateProfile.getId())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: You cannot book your own slot."));
        }

        // Mark the slot as booked
        slot.setIsBooked(true);
        interviewSlotRepository.save(slot);

        // Create the interview history record
        InterviewHistory history = InterviewHistory.builder()
                .interviewSlot(slot)
                .candidateId(userDetails.getId())
                .interviewDate(slot.getDate())
                .status("SCHEDULED")
                .isPaid(false)
                .build();

        interviewHistoryRepository.save(history);

        // ── EMAIL NOTIFICATIONS ──────────────────────────────────────────
        try {
            String candidateEmail = userDetails.getEmail();
            UserProfile mentorProfile = slot.getUserProfile();
            String mentorEmail = mentorProfile.getUser().getEmail();

            String mentorName = mentorProfile.getFirstName() + " " + mentorProfile.getLastName();
            String candidateName = candidateProfile.getFirstName() + " " + candidateProfile.getLastName();
            String dateStr = slot.getDate().toString();
            String timeStr = slot.getStartTime().toString();

            // Notify Candidate
            emailService.sendBookingConfirmationToCandidate(candidateEmail, mentorName, dateStr, timeStr, slot.getTimeInterval());

            // Notify Mentor
            emailService.sendBookingNotificationToMentor(mentorEmail, candidateName, dateStr, timeStr, slot.getTimeInterval());
        } catch (Exception e) {
            System.err.println("Email notification failed: " + e.getMessage());
        }
        // ──────────────────────────────────────────────────────────────────

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Slot booked successfully!");
        response.put("bookingId", history.getId());
        response.put("slotDate", slot.getDate());
        response.put("slotTime", slot.getStartTime());
        response.put("duration", slot.getTimeInterval());

        return ResponseEntity.ok(response);
    }

    /**
     * AUTHENTICATED (CANDIDATE): Get this candidate's booking history.
     */
    @GetMapping("/sessions")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<?> getMySessions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<InterviewHistory> histories = interviewHistoryRepository
                .findByCandidateIdOrderByInterviewDateDesc(userDetails.getId());

        List<Map<String, Object>> sessions = histories.stream().map(h -> {
            Map<String, Object> session = new HashMap<>();
            session.put("bookingId", h.getId());
            session.put("status", h.getStatus());
            session.put("interviewDate", h.getInterviewDate());
            session.put("isPaid", h.getIsPaid());
            session.put("rating", h.getRating());
            session.put("review", h.getReview());
            // Slot + mentor info
            InterviewSlot slot = h.getInterviewSlot();
            session.put("slotDate", slot.getDate());
            session.put("slotTime", slot.getStartTime());
            session.put("duration", slot.getTimeInterval());
            session.put("price", slot.getPrice());
            // Mentor info
            UserProfile mentor = slot.getUserProfile();
            Map<String, Object> mentorInfo = new HashMap<>();
            mentorInfo.put("profileId", mentor.getId());
            mentorInfo.put("firstName", mentor.getFirstName());
            mentorInfo.put("lastName", mentor.getLastName());
            mentorInfo.put("currentPosition", mentor.getCurrentPosition());
            mentorInfo.put("currentCompany", mentor.getCurrentCompany());
            mentorInfo.put("profileImgUrl", mentor.getProfileImgUrl());
            session.put("mentor", mentorInfo);
            return session;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(sessions);
    }
}
