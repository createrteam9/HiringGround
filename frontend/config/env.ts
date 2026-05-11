/**
 * Centralized Environment Configuration
 * 
 * Ensures type safety and provides defaults for the application.
 * All components should import environment variables from this file.
 */

export const env = {
  // Application URLs
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',

  // Authentication Secrets
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'fallback_secret_for_development',

  // Third-party Integrations
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  
  // Payment Gateway
  NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',

  // Video Calling
  NEXT_PUBLIC_DAILY_DOMAIN: process.env.NEXT_PUBLIC_DAILY_DOMAIN || '',

  // Is Production Environment?
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
};

// Simple validation function to throw early if required vars are missing in production
export function validateEnv() {
  if (env.IS_PRODUCTION) {
    if (!env.NEXTAUTH_SECRET) throw new Error('NEXTAUTH_SECRET is missing');
    if (!env.NEXT_PUBLIC_API_URL) throw new Error('NEXT_PUBLIC_API_URL is missing');
    // Add other critical checks here
  }
}
