package com.hiringground.api.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "transactions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interview_history_id", referencedColumnName = "id", nullable = false)
    private InterviewHistory interviewHistory;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(precision = 10, scale = 2)
    private BigDecimal amount;
    
    // e.g., PENDING, SUCCESS, FAILED
    @Column(name = "status")
    private String status;
}
