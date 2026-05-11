package com.hiringground.api.payload.request;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
public class CreateSlotRequest {
    
    @NotNull(message = "At least one date must be provided")
    private List<@FutureOrPresent(message = "Date must be today or in the future") LocalDate> dates;
    
    @NotNull(message = "Start time is required")
    private LocalTime startTime;
    
    @NotNull(message = "End time is required")
    private LocalTime endTime;
    
    @NotNull(message = "Duration in minutes is required")
    @Min(value = 15, message = "Minimum duration is 15 minutes")
    private Integer durationMinutes; // e.g., 30, 45, 60, custom
    
    private BigDecimal price; // Optional pricing for the slot
}
