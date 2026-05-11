package com.hiringground.api.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendEmail(String to, String subject, String content) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true); // true for HTML

            mailSender.send(message);
        } catch (MessagingException e) {
            // Log error but don't crash the booking flow
            System.err.println("Failed to send email to " + to + ": " + e.getMessage());
        }
    }

    public void sendBookingConfirmationToCandidate(String to, String mentorName, String date, String time, int duration) {
        String subject = "Booking Confirmed: Mock Interview with " + mentorName;
        String content = "<h1>Interview Scheduled</h1>" +
                "<p>Hi there,</p>" +
                "<p>Your mock interview with <strong>" + mentorName + "</strong> has been confirmed.</p>" +
                "<ul>" +
                "<li><strong>Date:</strong> " + date + "</li>" +
                "<li><strong>Time:</strong> " + time + "</li>" +
                "<li><strong>Duration:</strong> " + duration + " minutes</li>" +
                "</ul>" +
                "<p>Good luck with your preparation!</p>" +
                "<p>Best regards,<br>HiringGround Team</p>";
        sendEmail(to, subject, content);
    }

    public void sendBookingNotificationToMentor(String to, String candidateName, String date, String time, int duration) {
        String subject = "New Booking: Mock Interview with " + candidateName;
        String content = "<h1>New Interview Booking</h1>" +
                "<p>Hi,</p>" +
                "<p>You have a new mock interview booking from <strong>" + candidateName + "</strong>.</p>" +
                "<ul>" +
                "<li><strong>Date:</strong> " + date + "</li>" +
                "<li><strong>Time:</strong> " + time + "</li>" +
                "<li><strong>Duration:</strong> " + duration + " minutes</li>" +
                "</ul>" +
                "<p>Please be available on time. You can view your sessions in the dashboard.</p>" +
                "<p>Best regards,<br>HiringGround Team</p>";
        sendEmail(to, subject, content);
    }
}
