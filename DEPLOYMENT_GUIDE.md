# HiringGround Deployment & Setup Guide

This document provides comprehensive instructions for setting up the HiringGround platform locally and in a production environment.

## 🏗 Project Architecture
- **Frontend**: Next.js 14 (App Router) with Tailwind CSS.
- **Backend**: Spring Boot 3.4 (Java 17) with Spring Security & JWT.
- **Database**: PostgreSQL (Relational Data), Redis (Caching).
- **Services**: Razorpay (Payments), JavaMail (Emails).

---

## 💻 Local Development Setup

### 1. Prerequisites
- **Java**: JDK 17 or higher.
- **Node.js**: v18 or higher.
- **PostgreSQL**: Running locally or a cloud instance.
- **Redis**: Running locally or via Docker.

### 2. Backend Setup
1. Navigate to the `backend` directory.
2. Configure environment variables (create a `.env` file or set in IDE):
   ```env
   PORT=8080
   DB_URL=jdbc:postgresql://localhost:5432/hiringground
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   REDIS_HOST=localhost
   REDIS_PORT=6379
   JWT_SECRET=your_very_long_random_jwt_secret
   MAIL_USERNAME=your_email@domain.com
   MAIL_PASSWORD=your_app_password
   RAZORPAY_KEY_ID=rzp_test_your_id
   RAZORPAY_KEY_SECRET=your_secret
   
   # Social Auth (OAuth2)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   LINKEDIN_CLIENT_ID=your_linkedin_client_id
   LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
   
   # Optional: R2 Storage (for profile images/resumes)
   STORAGE_PROVIDER=local # or r2
   R2_ENDPOINT=https://<accountid>.r2.cloudflarestorage.com
   R2_ACCESS_KEY=your_access_key
   R2_SECRET_KEY=your_secret_key
   R2_BUCKET_NAME=hiringground-assets
   R2_PUBLIC_URL=https://pub-<id>.r2.dev
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   The API will be available at `http://localhost:8080`.

### 3. Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (create `.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

---

## 🚀 Production Deployment (Free Tiers)

### 1. Frontend (Vercel)
- **Host**: [Vercel](https://vercel.com)
- **Steps**:
  1. Push your code to GitHub.
  2. Import the project in Vercel.
  3. Set the `NEXT_PUBLIC_API_URL` to your production backend URL.
  4. Deploy.

### 2. Backend (Render / Railway / Fly.io)
- **Recommended Free Host**: [Render](https://render.com) (Web Service) or [Railway](https://railway.app).
- **Steps**:
  1. Connect your GitHub repository.
  2. Use the `backend` directory as the root.
  3. Set the Build Command: `mvn clean install -DskipTests`.
  4. Set the Start Command: `java -jar target/api-0.0.1-SNAPSHOT.jar`.
  5. Add all Environment Variables (same as local setup).

### 3. Database (Neon / Upstash)
- **PostgreSQL**: [Neon.tech](https://neon.tech) offers a generous free tier for Serverless Postgres.
- **Redis**: [Upstash](https://upstash.com) offers a free serverless Redis tier.

---

## 🗺 API Map (Key Endpoints)

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Authenticate and receive JWT.

### Dashboard (Role-Aware)
- `GET /api/dashboard/stats`: Returns personalized stats for Mentors or Candidates.

### Candidate APIs
- `GET /api/candidate/mentors`: Browse the mentor directory.
- `GET /api/candidate/mentors/{id}/slots`: Get available slots for a specific mentor.
- `POST /api/candidate/book`: Book an interview slot.
- `GET /api/candidate/sessions`: View booking history with mentor details.
- `POST /api/candidate/sessions/{id}/review`: Submit a rating and review for a completed session.

### Mentor APIs
- `POST /api/mentor/slots`: Create bulk interview slots.
- `GET /api/mentor/slots`: View all your slots (booked or available).
- `DELETE /api/mentor/slots/{id}`: Remove an unbooked slot.
- `GET /api/mentor/slots/sessions`: View all candidates who booked your slots.
- `PATCH /api/mentor/slots/sessions/{id}/status`: Update session status (`COMPLETED` or `CANCELLED`).

### Payment APIs
- `POST /api/payment/create-order`: Create a Razorpay order for a paid session.
- `POST /api/payment/verify`: Verify Razorpay payment signature and mark session as paid.

### Resource & Community APIs
- `GET /api/resources`: Fetch all public resources (Workshops, Masterclasses, etc.).
- `GET /api/resources/my`: Fetch resources created by the current mentor.
- `POST /api/resources`: Create a new resource (Mentor only).
- `POST /api/resources/{id}/like`: Like a resource.
- `POST /api/resources/{id}/dislike`: Dislike a resource.

### AI Practice Tracks
- **System Design**: `?track=system-design`
- **Algorithms**: `?track=algorithms`
- **Frontend**: `?track=frontend`
- **Behavioral**: `?track=behavioral`

---

## 📧 Email Templates
The system automatically sends emails for:
1. **Booking Confirmation**: Sent to both Candidate and Mentor upon successful booking.
2. **Status Updates**: Sent to Candidate when a Mentor marks a session as Completed or Cancelled.

---

## 🔐 Security & Production Notes
- **JWT**: Ensure the `JWT_SECRET` is never committed to Git and is at least 64 characters long in production.
- **CORS**: The current backend allows all origins (`@CrossOrigin("*")`). For production, restrict this to your frontend URL in the controllers or `WebSecurityConfig`.
- **SSL**: SMTP settings in `application.yml` are configured for SSL (Port 465). Ensure your mail provider supports this.
- **OAuth2 Redirects**: Ensure your Social Auth providers are configured with the following redirect URIs:
  - Google: `http://localhost:8080/login/oauth2/code/google`
  - LinkedIn: `http://localhost:8080/login/oauth2/code/linkedin`
