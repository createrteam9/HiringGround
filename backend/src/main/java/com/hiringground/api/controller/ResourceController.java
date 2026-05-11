package com.hiringground.api.controller;

import com.hiringground.api.domain.Resource;
import com.hiringground.api.domain.UserProfile;
import com.hiringground.api.payload.response.MessageResponse;
import com.hiringground.api.repository.ResourceRepository;
import com.hiringground.api.repository.UserProfileRepository;
import com.hiringground.api.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    @Autowired
    ResourceRepository resourceRepository;

    @Autowired
    UserProfileRepository userProfileRepository;

    @GetMapping("/my")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<?> getMyResources() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UserProfile mentorProfile = userProfileRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: Mentor profile not found."));

        List<Resource> resources = resourceRepository.findByMentorId(mentorProfile.getId());
        return ResponseEntity.ok(resources.stream().map(this::mapToResponse).collect(Collectors.toList()));
    }

    @GetMapping
    public ResponseEntity<?> getAllResources() {
        List<Resource> resources = resourceRepository.findAllByOrderByCreatedAtDesc();
        return ResponseEntity.ok(resources.stream().map(this::mapToResponse).collect(Collectors.toList()));
    }

    @PostMapping
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<?> createResource(@RequestBody Map<String, Object> request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UserProfile mentorProfile = userProfileRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: Mentor profile not found."));

        Resource resource = Resource.builder()
                .title((String) request.get("title"))
                .description((String) request.get("description"))
                .type(Resource.ResourceType.valueOf(((String) request.get("type")).toUpperCase()))
                .contentUrl((String) request.get("contentUrl"))
                .thumbnailUrl((String) request.get("thumbnailUrl"))
                .mentor(mentorProfile)
                .likesCount(0)
                .dislikesCount(0)
                .build();

        resourceRepository.save(resource);
        return ResponseEntity.ok(new MessageResponse("Resource created successfully!"));
    }

    @PostMapping("/{id}/like")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> likeResource(@PathVariable Long id) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Resource not found."));
        resource.setLikesCount(resource.getLikesCount() + 1);
        resourceRepository.save(resource);
        return ResponseEntity.ok(new MessageResponse("Liked!"));
    }

    @PostMapping("/{id}/dislike")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> dislikeResource(@PathVariable Long id) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Resource not found."));
        resource.setDislikesCount(resource.getDislikesCount() + 1);
        resourceRepository.save(resource);
        return ResponseEntity.ok(new MessageResponse("Disliked!"));
    }

    private Map<String, Object> mapToResponse(Resource r) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", r.getId());
        map.put("title", r.getTitle());
        map.put("description", r.getDescription());
        map.put("type", r.getType());
        map.put("contentUrl", r.getContentUrl());
        map.put("thumbnailUrl", r.getThumbnailUrl());
        map.put("likes", r.getLikesCount());
        map.put("dislikes", r.getDislikesCount());
        map.put("createdAt", r.getCreatedAt());

        Map<String, Object> mentor = new HashMap<>();
        mentor.put("id", r.getMentor().getId());
        mentor.put("name", r.getMentor().getFirstName() + " " + r.getMentor().getLastName());
        mentor.put("profileImgUrl", r.getMentor().getProfileImgUrl());
        map.put("mentor", mentor);

        return map;
    }
}
