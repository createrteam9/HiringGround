package com.hiringground.api.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_profiles")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "profile_img_url")
    private String profileImgUrl;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "clg_name")
    private String clgName;

    @Column(name = "current_company")
    private String currentCompany;

    @Column(name = "previous_company")
    private String previousCompany;

    @Column(name = "current_position")
    private String currentPosition;

    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Column(name = "target_role")
    private String targetRole;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "resume_url")
    private String resumeUrl;

    @Column(name = "interests_tags")
    private String interestsTags;
}
