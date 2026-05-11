package com.hiringground.api.payload.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BookSlotRequest {
    @NotNull(message = "Slot ID is required")
    private Long slotId;
}
