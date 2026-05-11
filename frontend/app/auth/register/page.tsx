'use client';

import React, { useState } from 'react';
import ProgressIndicator from '@/app/components/auth/ProgressIndicator';
import FormField from '@/app/components/auth/FormField';
import Button from '@/app/components/ui/Button';
import Container from '@/app/components/layout/Container';
import Card from '@/app/components/ui/Card';

const steps = [
  'Profile Basics',
  'Work Experience',
  'Skills & Expertise',
  'Preferences',
  'Verification',
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  currentCompany: string;
  currentRole: string;
  yearsExperience: string;
  skills: string[];
  mentorshipPreferences: string;
  agreeToTerms: boolean;
}

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bio: '',
    currentCompany: '',
    currentRole: '',
    yearsExperience: '',
    skills: [],
    mentorshipPreferences: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        break;
      case 2:
        if (!formData.currentCompany) newErrors.currentCompany = 'Company is required';
        if (!formData.currentRole) newErrors.currentRole = 'Role is required';
        break;
      case 3:
        if (formData.skills.length === 0) newErrors.skills = 'Select at least one skill';
        break;
      case 4:
        if (!formData.mentorshipPreferences) newErrors.mentorshipPreferences = 'Please select a preference';
        break;
      case 5:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      setSubmitError(null);
      
      try {
        // Import dynamic api to avoid build issues if env is missing during static phase
        const { fetchApi } = await import('@/lib/api');
        
        // Transform the frontend data structure into the SignupRequest expected by Spring Boot
        const signupPayload = {
          email: formData.email,
          password: formData.password,
          // 0: Candidate, 1: Mentor (based on some logic or fixed for now, let's assume Candidate for this general form)
          role: 0 
        };

        const response = await fetchApi('/auth/register', {
          data: signupPayload
        });

        console.log('Registration Successful:', response);
        // Redirect to login or show success screen
        window.location.href = '/login?registered=true';
        
      } catch (error: any) {
        setSubmitError(error.message || 'Registration failed. Please try again.');
        console.error('Registration error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar Progress */}
      <ProgressIndicator currentStep={currentStep} totalSteps={steps.length} steps={steps} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 py-12 px-6">
        <Container size="md">
          {/* Step 1: Profile Basics */}
          {currentStep === 1 && (
            <Card variant="elevated">
              <div className="mb-8">
                <h2 className="text-headline-lg font-bold text-on-surface mb-2">
                  Let's Start with Your Profile
                </h2>
                <p className="text-body-md text-on-surface-variant">
                  Help us know you better. This information will be visible to mentors.
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                    required
                  />
                  <FormField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                    required
                  />
                </div>

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  required
                />

                <FormField
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  hint="Minimum 8 characters with uppercase, lowercase, and number"
                  required
                />

                <FormField
                  label="Bio"
                  name="bio"
                  type="textarea"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={handleInputChange}
                />
              </div>
            </Card>
          )}

          {/* Step 2: Work Experience */}
          {currentStep === 2 && (
            <Card variant="elevated">
              <div className="mb-8">
                <h2 className="text-headline-lg font-bold text-on-surface mb-2">
                  Work Experience
                </h2>
                <p className="text-body-md text-on-surface-variant">
                  Share your professional background.
                </p>
              </div>

              <div className="space-y-6">
                <FormField
                  label="Current Company"
                  name="currentCompany"
                  value={formData.currentCompany}
                  onChange={handleInputChange}
                  error={errors.currentCompany}
                  required
                />

                <FormField
                  label="Current Role"
                  name="currentRole"
                  value={formData.currentRole}
                  onChange={handleInputChange}
                  error={errors.currentRole}
                  required
                />

                <FormField
                  label="Years of Experience"
                  name="yearsExperience"
                  type="text"
                  value={formData.yearsExperience}
                  onChange={handleInputChange}
                />
              </div>
            </Card>
          )}

          {/* Step 3: Skills & Expertise */}
          {currentStep === 3 && (
            <Card variant="elevated">
              <div className="mb-8">
                <h2 className="text-headline-lg font-bold text-on-surface mb-2">
                  Skills & Expertise
                </h2>
                <p className="text-body-md text-on-surface-variant">
                  Select your top skills.
                </p>
              </div>

              <div className="space-y-4">
                {['JavaScript', 'Python', 'React', 'System Design', 'Problem Solving', 'Communication', 'Leadership', 'Data Structures'].map((skill) => (
                  <label key={skill} className="flex items-center gap-3 p-3 rounded-sm hover:bg-surface-container-low cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({
                            ...prev,
                            skills: [...prev.skills, skill],
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            skills: prev.skills.filter(s => s !== skill),
                          }));
                        }
                      }}
                      className="w-5 h-5 rounded"
                    />
                    <span className="text-body-md font-medium">{skill}</span>
                  </label>
                ))}
                {errors.skills && <p className="text-label-sm text-error mt-2">{errors.skills}</p>}
              </div>
            </Card>
          )}

          {/* Step 4: Mentorship Preferences */}
          {currentStep === 4 && (
            <Card variant="elevated">
              <div className="mb-8">
                <h2 className="text-headline-lg font-bold text-on-surface mb-2">
                  Mentorship Preferences
                </h2>
                <p className="text-body-md text-on-surface-variant">
                  What would you like from a mentor?
                </p>
              </div>

              <FormField
                label="What are you looking for?"
                name="mentorshipPreferences"
                type="textarea"
                placeholder="e.g., Help with system design, interview preparation, career guidance..."
                value={formData.mentorshipPreferences}
                onChange={handleInputChange}
                error={errors.mentorshipPreferences}
              />
            </Card>
          )}

          {/* Step 5: Verification */}
          {currentStep === 5 && (
            <Card variant="elevated">
              <div className="mb-8">
                <h2 className="text-headline-lg font-bold text-on-surface mb-2">
                  Verify & Complete
                </h2>
                <p className="text-body-md text-on-surface-variant">
                  Review your information before submitting.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-label-md font-bold text-on-surface">Name</p>
                  <p className="text-body-md text-on-surface-variant">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p className="text-label-md font-bold text-on-surface">Email</p>
                  <p className="text-body-md text-on-surface-variant">{formData.email}</p>
                </div>
                <div>
                  <p className="text-label-md font-bold text-on-surface">Current Role</p>
                  <p className="text-body-md text-on-surface-variant">{formData.currentRole} at {formData.currentCompany}</p>
                </div>
                <div>
                  <p className="text-label-md font-bold text-on-surface">Skills</p>
                  <p className="text-body-md text-on-surface-variant">{formData.skills.join(', ')}</p>
                </div>
              </div>

              <div>
                <label className="flex items-start gap-3 mb-2">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      agreeToTerms: e.target.checked,
                    }))}
                    className="w-5 h-5 mt-1"
                  />
                  <span className="text-body-sm">
                    I agree to the Terms of Service and Privacy Policy. I understand that HiringGround will use my information to match me with mentors and improve the platform.
                  </span>
                </label>
                {errors.agreeToTerms && <p className="text-label-sm text-error mb-2">{errors.agreeToTerms}</p>}
                {submitError && (
                  <div className="p-3 bg-error/10 text-error text-body-sm rounded-md border border-error/20 mb-6">
                    {submitError}
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4 mt-8">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
            >
              Back
            </Button>

            {currentStep === steps.length ? (
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Complete Registration'}
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
              >
                Continue
              </Button>
            )}
          </div>

          {/* Mobile Step Indicator */}
          <div className="lg:hidden mt-8 text-center">
            <p className="text-label-md text-on-surface-variant">
              Step {currentStep} of {steps.length}
            </p>
            <div className="flex gap-1 justify-center mt-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 ${i + 1 <= currentStep ? 'bg-primary' : 'bg-surface-container-high'}`}
                  style={{ width: `${100 / steps.length}%` }}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
