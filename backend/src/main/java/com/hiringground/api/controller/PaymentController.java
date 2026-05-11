package com.hiringground.api.controller;

import com.hiringground.api.domain.InterviewHistory;
import com.hiringground.api.domain.Transaction;
import com.hiringground.api.payload.response.MessageResponse;
import com.hiringground.api.repository.InterviewHistoryRepository;
import com.hiringground.api.repository.TransactionRepository;
import com.hiringground.api.security.services.UserDetailsImpl;
import jakarta.crypto.Mac;
import jakarta.crypto.spec.SecretKeySpec;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.HexFormat;
import java.util.Map;
import java.util.Optional;

// ── Inline DTOs ──────────────────────────────────────────
class CreateOrderRequest {
    @NotNull(message = "bookingId is required")
    private Long bookingId;
    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }
}

class VerifyPaymentRequest {
    @NotBlank private String razorpayOrderId;
    @NotBlank private String razorpayPaymentId;
    @NotBlank private String razorpaySignature;

    public String getRazorpayOrderId() { return razorpayOrderId; }
    public void setRazorpayOrderId(String v) { this.razorpayOrderId = v; }
    public String getRazorpayPaymentId() { return razorpayPaymentId; }
    public void setRazorpayPaymentId(String v) { this.razorpayPaymentId = v; }
    public String getRazorpaySignature() { return razorpaySignature; }
    public void setRazorpaySignature(String v) { this.razorpaySignature = v; }
}

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Value("${razorpay.key.id:rzp_test_placeholder}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret:secret_placeholder}")
    private String razorpayKeySecret;

    @Autowired
    InterviewHistoryRepository interviewHistoryRepository;

    @Autowired
    TransactionRepository transactionRepository;

    /**
     * AUTHENTICATED (CANDIDATE): Initiate a Razorpay order for a booked session.
     * Returns the Razorpay order details needed by the frontend SDK.
     * 
     * Note: In production, integrate the official com.razorpay:razorpay-java SDK.
     * This endpoint currently generates a mock order for development/testing.
     */
    @PostMapping("/create-order")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<?> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();

        InterviewHistory history = interviewHistoryRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Error: Booking not found."));

        // Ownership check
        if (!history.getCandidateId().equals(userDetails.getId())) {
            return ResponseEntity.status(403).body(new MessageResponse("Error: Not authorized."));
        }

        // Check if slot has a price
        BigDecimal price = history.getInterviewSlot().getPrice();
        if (price == null || price.compareTo(BigDecimal.ZERO) <= 0) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: This session is free and does not require payment."));
        }

        // Check if already paid
        if (Boolean.TRUE.equals(history.getIsPaid())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: This session is already paid."));
        }

        // Check for existing pending transaction
        Optional<Transaction> existing = transactionRepository.findByInterviewHistoryId(history.getId());
        if (existing.isPresent() && "PENDING".equals(existing.get().getStatus())) {
            // Return existing order
            Map<String, Object> resp = new HashMap<>();
            resp.put("orderId", existing.get().getRazorpayOrderId());
            resp.put("amount", price.multiply(BigDecimal.valueOf(100)).longValue()); // paise
            resp.put("currency", "INR");
            resp.put("keyId", razorpayKeyId);
            resp.put("bookingId", history.getId());
            return ResponseEntity.ok(resp);
        }

        // ── Production: Use Razorpay SDK ──────────────────────────────────
        // RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
        // JSONObject orderRequest = new JSONObject();
        // orderRequest.put("amount", price.multiply(BigDecimal.valueOf(100)).longValue());
        // orderRequest.put("currency", "INR");
        // orderRequest.put("receipt", "booking_" + history.getId());
        // Order order = client.orders.create(orderRequest);
        // String razorpayOrderId = order.get("id");
        // ─────────────────────────────────────────────────────────────────

        // Mock order ID for development
        String mockOrderId = "order_" + System.currentTimeMillis();

        // Save transaction with PENDING status
        Transaction txn = Transaction.builder()
                .interviewHistory(history)
                .razorpayOrderId(mockOrderId)
                .amount(price)
                .status("PENDING")
                .build();
        transactionRepository.save(txn);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", mockOrderId);
        response.put("amount", price.multiply(BigDecimal.valueOf(100)).longValue()); // paise
        response.put("currency", "INR");
        response.put("keyId", razorpayKeyId);
        response.put("bookingId", history.getId());
        response.put("mentorName", history.getInterviewSlot().getUserProfile().getFirstName() + " "
                + history.getInterviewSlot().getUserProfile().getLastName());

        return ResponseEntity.ok(response);
    }

    /**
     * AUTHENTICATED (CANDIDATE): Verify a Razorpay payment after frontend checkout.
     * Validates the HMAC-SHA256 signature, then marks the session as paid.
     */
    @PostMapping("/verify")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<?> verifyPayment(@Valid @RequestBody VerifyPaymentRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();

        // ── HMAC-SHA256 Signature Verification ──────────────────────────
        boolean isValid = verifySignature(
                request.getRazorpayOrderId(),
                request.getRazorpayPaymentId(),
                request.getRazorpaySignature()
        );

        if (!isValid) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Payment signature verification failed."));
        }

        // Find the transaction by orderId
        Transaction txn = transactionRepository.findAll().stream()
                .filter(t -> request.getRazorpayOrderId().equals(t.getRazorpayOrderId()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Error: Transaction not found for order: "
                        + request.getRazorpayOrderId()));

        // Ownership check
        if (!txn.getInterviewHistory().getCandidateId().equals(userDetails.getId())) {
            return ResponseEntity.status(403).body(new MessageResponse("Error: Not authorized."));
        }

        // Update transaction
        txn.setTransactionId(request.getRazorpayPaymentId());
        txn.setStatus("SUCCESS");
        transactionRepository.save(txn);

        // Mark booking as paid
        InterviewHistory history = txn.getInterviewHistory();
        history.setIsPaid(true);
        interviewHistoryRepository.save(history);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Payment verified and recorded successfully!");
        response.put("paymentId", request.getRazorpayPaymentId());
        response.put("bookingId", history.getId());

        return ResponseEntity.ok(response);
    }

    /**
     * Verifies Razorpay payment signature:
     * HMAC-SHA256(razorpay_order_id + "|" + razorpay_payment_id, key_secret)
     */
    private boolean verifySignature(String orderId, String paymentId, String signature) {
        try {
            String message = orderId + "|" + paymentId;
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec keySpec = new SecretKeySpec(
                    razorpayKeySecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(keySpec);
            byte[] hmacBytes = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));
            String computed = HexFormat.of().formatHex(hmacBytes);
            return computed.equals(signature);
        } catch (Exception e) {
            // In dev mode with placeholder secret, skip signature check
            return razorpayKeySecret.equals("secret_placeholder");
        }
    }
}
