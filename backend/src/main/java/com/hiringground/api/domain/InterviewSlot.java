package com.hiringground.api.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "interview_slots")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_profile_id", referencedColumnName = "id", nullable = false)
    private UserProfile userProfile;

    @Column(name = "slot_date", nullable = false)
    private LocalDate date;

    @Column(name = "time_interval")
    private Integer timeInterval;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "is_default")
    private Boolean isDefault;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "is_booked")
    private Boolean isBooked = false;
}
