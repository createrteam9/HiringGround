package com.hiringground.api.controller;

import com.hiringground.api.domain.InterviewHistory;
import com.hiringground.api.payload.response.MessageResponse;
import com.hiringground.api.repository.InterviewHistoryRepository;
import com.hiringground.api.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Inline DTO to avoid creating a separate file for a small request body.
 */
class ReviewRequest {
    @NotNull(message = "Rating is required")
    @DecimalMin(value = "1.0", message = "Rating must be at least 1")
    @DecimalMax(value = "5.0", message = "Rating cannot exceed 5")
    private Float rating;

    @Size(max = 1000, message = "Review cannot exceed 1000 characters")
    private String review;

    public Float getRating() { return rating; }
    public void setRating(Float rating) { this.rating = rating; }
    public String getReview() { return review; }
    public void setReview(String review) { this.review = review; }
}

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/candidate/sessions")
public class ReviewController {

    @Autowired
    InterviewHistoryRepository interviewHistoryRepository;

    /**
     * AUTHENTICATED (CANDIDATE): Submit a rating and optional review for a completed session.
     * Only the candidate who booked the session can submit a review.
     * Only COMPLETED sessions can be reviewed.
     * A session can only be reviewed once.
     */
    @PostMapping("/{bookingId}/review")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<?> submitReview(
            @PathVariable Long bookingId,
            @Valid @RequestBody ReviewRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        InterviewHistory history = interviewHistoryRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Error: Session not found."));

        // Ownership check — only the candidate who booked can review
        if (!history.getCandidateId().equals(userDetails.getId())) {
            return ResponseEntity.status(403)
                    .body(new MessageResponse("Error: You are not authorized to review this session."));
        }

        // Status check — only completed sessions can be reviewed
        if (!"COMPLETED".equalsIgnoreCase(history.getStatus())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Only completed sessions can be reviewed."));
        }

        // Idempotency — prevent double reviews
        if (history.getRating() != null) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: You have already submitted a review for this session."));
        }

        history.setRating(request.getRating());
        if (request.getReview() != null && !request.getReview().isBlank()) {
            history.setReview(request.getReview().trim());
        }
        interviewHistoryRepository.save(history);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Review submitted successfully!");
        response.put("rating", history.getRating());
        response.put("review", history.getReview());

        return ResponseEntity.ok(response);
    }
}
