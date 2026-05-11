package com.hiringground.api.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "meeting_details")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MeetingDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interview_history_id", referencedColumnName = "id", nullable = false)
    private InterviewHistory interviewHistory;

    @Column(name = "problem_statement", columnDefinition = "TEXT")
    private String problemStatement;

    @Column(name = "solution", columnDefinition = "TEXT")
    private String solution;
}
