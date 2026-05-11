package com.hiringground.api.controller;

import com.hiringground.api.domain.UserProfile;
import com.hiringground.api.repository.UserProfileRepository;
import com.hiringground.api.security.services.UserDetailsImpl;
import com.hiringground.api.service.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/profile")
public class UserProfileController {

    @Autowired
    UserProfileRepository userProfileRepository;

    @Autowired
    StorageService storageService;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UserProfile profile = userProfileRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: Profile is not found."));

        return ResponseEntity.ok(profile);
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(@RequestBody UserProfile updatedProfile) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UserProfile existingProfile = userProfileRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: Profile is not found."));

        existingProfile.setFirstName(updatedProfile.getFirstName());
        existingProfile.setLastName(updatedProfile.getLastName());
        existingProfile.setBio(updatedProfile.getBio());
        existingProfile.setClgName(updatedProfile.getClgName());
        existingProfile.setCurrentCompany(updatedProfile.getCurrentCompany());
        existingProfile.setPreviousCompany(updatedProfile.getPreviousCompany());
        existingProfile.setCurrentPosition(updatedProfile.getCurrentPosition());
        existingProfile.setYearsOfExperience(updatedProfile.getYearsOfExperience());
        existingProfile.setTargetRole(updatedProfile.getTargetRole());
        existingProfile.setLinkedinUrl(updatedProfile.getLinkedinUrl());
        existingProfile.setGithubUrl(updatedProfile.getGithubUrl());
        existingProfile.setInterestsTags(updatedProfile.getInterestsTags());

        userProfileRepository.save(existingProfile);

        return ResponseEntity.ok(existingProfile);
    }

    @PostMapping("/me/upload/picture")
    public ResponseEntity<?> uploadProfilePicture(@RequestParam("file") MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UserProfile profile = userProfileRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: Profile is not found."));

        // Delete old picture if exists
        if (profile.getProfileImgUrl() != null && !profile.getProfileImgUrl().isEmpty()) {
            storageService.deleteFile(profile.getProfileImgUrl());
        }

        String fileUrl = storageService.uploadFile(file, "profiles");
        profile.setProfileImgUrl(fileUrl);
        userProfileRepository.save(profile);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Profile picture uploaded successfully");
        response.put("fileUrl", fileUrl);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/me/upload/resume")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UserProfile profile = userProfileRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: Profile is not found."));

        // Delete old resume if exists
        if (profile.getResumeUrl() != null && !profile.getResumeUrl().isEmpty()) {
            storageService.deleteFile(profile.getResumeUrl());
        }

        String fileUrl = storageService.uploadFile(file, "resumes");
        profile.setResumeUrl(fileUrl);
        userProfileRepository.save(profile);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Resume uploaded successfully");
        response.put("fileUrl", fileUrl);

        return ResponseEntity.ok(response);
    }
}
