package com.hiringground.api.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "interview_history")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interview_slot_id", referencedColumnName = "id", nullable = false)
    private InterviewSlot interviewSlot;

    @Column(name = "candidate_id", nullable = false)
    private Long candidateId;

    @Column(name = "interview_date")
    private LocalDate interviewDate;

    // e.g., Scheduled, Completed, Cancelled
    @Column(name = "status")
    private String status;

    private Float rating;

    @Column(columnDefinition = "TEXT")
    private String review;

    @Column(name = "is_paid")
    private Boolean isPaid = false;
}
