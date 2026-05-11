package com.hiringground.api.controller;

import com.hiringground.api.domain.InterviewSlot;
import com.hiringground.api.domain.UserProfile;
import com.hiringground.api.payload.request.CreateSlotRequest;
import com.hiringground.api.payload.response.MessageResponse;
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
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.hiringground.api.domain.InterviewHistory;
import com.hiringground.api.repository.InterviewHistoryRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/mentor/slots")
@PreAuthorize("hasRole('MENTOR')")
public class MentorSlotController {

    @Autowired
    InterviewSlotRepository interviewSlotRepository;

    @Autowired
    UserProfileRepository userProfileRepository;

    @Autowired
    InterviewHistoryRepository interviewHistoryRepository;

    @Autowired
    com.hiringground.api.service.EmailService emailService;

    @Autowired
    com.hiringground.api.repository.UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createSlots(@Valid @RequestBody CreateSlotRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UserProfile profile = userProfileRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: Profile is not found."));

        LocalDate maxAllowedDate = LocalDate.now().plusDays(3);
        List<InterviewSlot> createdSlots = new ArrayList<>();

        for (LocalDate date : request.getDates()) {
            if (date.isAfter(maxAllowedDate)) {
                return ResponseEntity.badRequest().body(new MessageResponse("Error: You can only schedule slots up to 3 days in advance. Date " + date + " is invalid."));
            }

            LocalTime currentTime = request.getStartTime();
            while (currentTime.isBefore(request.getEndTime())) {
                LocalTime slotEndTime = currentTime.plusMinutes(request.getDurationMinutes());
                if (slotEndTime.isAfter(request.getEndTime()) && !slotEndTime.equals(request.getEndTime())) {
                    break; // Prevent slot from overflowing past end time
                }

                InterviewSlot slot = InterviewSlot.builder()
                        .userProfile(profile)
                        .date(date)
                        .startTime(currentTime)
                        .timeInterval(request.getDurationMinutes())
                        .price(request.getPrice())
                        .isBooked(false)
                        .isDefault(false)
                        .build();

                createdSlots.add(slot);
                currentTime = slotEndTime;
            }
        }

        interviewSlotRepository.saveAll(createdSlots);
        return ResponseEntity.ok(new MessageResponse("Successfully created " + createdSlots.size() + " slots."));
    }

    @GetMapping
    public ResponseEntity<?> getMySlots() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UserProfile profile = userProfileRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: Profile is not found."));

        List<InterviewSlot> slots = interviewSlotRepository.findByUserProfileIdOrderByDateAscStartTimeAsc(profile.getId());
        return ResponseEntity.ok(slots);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSlot(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UserProfile profile = userProfileRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: Profile is not found."));

        InterviewSlot slot = interviewSlotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Slot not found."));

        if (!slot.getUserProfile().getId().equals(profile.getId())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: You do not have permission to delete this slot."));
        }

        if (slot.getIsBooked()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Cannot delete a booked slot."));
        }

        interviewSlotRepository.delete(slot);
        return ResponseEntity.ok(new MessageResponse("Slot deleted successfully."));
    }

    /**
     * AUTHENTICATED (MENTOR): Get all booked sessions for this mentor.
     */
    @GetMapping("/sessions")
    public ResponseEntity<?> getMySessions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UserProfile profile = userProfileRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: Profile is not found."));

        List<InterviewHistory> histories = interviewHistoryRepository.findByMentorProfileId(profile.getId());

        List<Map<String, Object>> sessions = histories.stream().map(h -> {
            Map<String, Object> session = new HashMap<>();
            session.put("bookingId", h.getId());
            session.put("status", h.getStatus());
            session.put("interviewDate", h.getInterviewDate());
            session.put("isPaid", h.getIsPaid());
            session.put("rating", h.getRating());
            session.put("review", h.getReview());
            // Slot info
            InterviewSlot slot = h.getInterviewSlot();
            session.put("slotDate", slot.getDate());
            session.put("slotTime", slot.getStartTime());
            session.put("duration", slot.getTimeInterval());
            session.put("price", slot.getPrice());
            session.put("candidateId", h.getCandidateId());
            return session;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(sessions);
    }
    /**
     * AUTHENTICATED (MENTOR): Update the status of a booked session.
     * Allowed statuses: COMPLETED, CANCELLED.
     */
    @PatchMapping("/sessions/{bookingId}/status")
    public ResponseEntity<?> updateSessionStatus(
            @PathVariable Long bookingId,
            @RequestParam String status) {
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UserProfile mentorProfile = userProfileRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: Mentor profile not found."));

        InterviewHistory history = interviewHistoryRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Error: Session not found."));

        // Verify ownership: slot belongs to this mentor
        if (!history.getInterviewSlot().getUserProfile().getId().equals(mentorProfile.getId())) {
            return ResponseEntity.status(403).body(new MessageResponse("Error: Not authorized."));
        }

        String newStatus = status.toUpperCase();
        if (!List.of("COMPLETED", "CANCELLED").contains(newStatus)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Invalid status. Use COMPLETED or CANCELLED."));
        }

        history.setStatus(newStatus);
        interviewHistoryRepository.save(history);

        // Notify Candidate
        try {
            com.hiringground.api.domain.User candidate = userRepository.findById(history.getCandidateId()).orElse(null);
            if (candidate != null) {
                String subject = "Session Status Update: " + newStatus;
                String content = "<h1>Session Update</h1>" +
                        "<p>Hi,</p>" +
                        "<p>Your mock interview session with <strong>" + mentorProfile.getFirstName() + "</strong> has been marked as <strong>" + newStatus + "</strong>.</p>";
                
                if (newStatus.equals("COMPLETED")) {
                    content += "<p>Please visit the dashboard to provide a rating and review for your mentor.</p>";
                }
                
                content += "<p>Best regards,<br>HiringGround Team</p>";
                emailService.sendEmail(candidate.getEmail(), subject, content);
            }
        } catch (Exception e) {
            System.err.println("Failed to send status update email: " + e.getMessage());
        }

        return ResponseEntity.ok(new MessageResponse("Session status updated to " + newStatus));
    }
}
