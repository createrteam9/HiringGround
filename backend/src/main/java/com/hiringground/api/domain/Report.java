package com.hiringground.api.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "reports")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interview_history_id", referencedColumnName = "id", nullable = false)
    private InterviewHistory interviewHistory;

    @Column(name = "technical_rating")
    private Float technicalRating;

    @Column(name = "technical_review", columnDefinition = "TEXT")
    private String technicalReview;

    @Column(name = "communication_rating")
    private Float communicationRating;

    @Column(name = "communication_review", columnDefinition = "TEXT")
    private String communicationReview;

    @Column(name = "situation_management_rating")
    private Float situationManagementRating;

    @Column(name = "situation_review", columnDefinition = "TEXT")
    private String situationReview;

    @Column(columnDefinition = "TEXT")
    private String strengths;

    @Column(columnDefinition = "TEXT")
    private String weakness;

    @Column(columnDefinition = "TEXT")
    private String suggestions;
}
