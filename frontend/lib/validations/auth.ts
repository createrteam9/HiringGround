import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerProfileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  bio: z.string().optional(),
});

export const registerWorkSchema = z.object({
  currentCompany: z.string().min(2, 'Company is required'),
  currentRole: z.string().min(2, 'Role is required'),
  yearsExperience: z.string().optional(),
});

export const registerSkillsSchema = z.object({
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
});

export const registerPreferencesSchema = z.object({
  mentorshipPreferences: z.string().min(10, 'Please provide more detail about your preferences'),
});

export const registerTermsSchema = z.object({
  agreeToTerms: z.literal(true, { message: 'You must agree to the terms and conditions' }),
});

// Complete registration schema combining all steps
export const registerCompleteSchema = z.object({
  ...registerProfileSchema.shape,
  ...registerWorkSchema.shape,
  ...registerSkillsSchema.shape,
  ...registerPreferencesSchema.shape,
  ...registerTermsSchema.shape,
});

export type RegisterFormData = z.infer<typeof registerCompleteSchema>;
