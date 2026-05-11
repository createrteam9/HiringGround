package com.hiringground.api.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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

    // Razorpay Order ID (set on order creation)
    @Column(name = "razorpay_order_id")
    private String razorpayOrderId;

    // Razorpay Payment ID (set on payment success)
    @Column(name = "transaction_id")
    private String transactionId;

    @Column(precision = 10, scale = 2)
    private BigDecimal amount;

    // e.g., PENDING, SUCCESS, FAILED
    @Column(name = "status")
    private String status;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}

