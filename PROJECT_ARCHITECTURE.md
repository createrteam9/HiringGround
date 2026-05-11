# HiringGround | High-Level Architecture & Module Guide

This document provides a human-readable explanation of how HiringGround is built, organized, and how its different modules interact. It is designed for new developers to understand the project structure within minutes.

---

## 🌟 1. Project Vision
HiringGround is a professional-grade mentorship ecosystem. Its primary goal is to bridge the gap between candidates and industry experts through structured mock interviews, shared resources, and AI-driven practice tracks.

---

## 🧩 2. Core Modules (Business Logic)

The backend is structured as a **Modular Monolith**. This means that while it is a single application, the code is organized into distinct "Business Domains."

### A. Identity & Access Module (`com.hiringground.api.security`)
- **What it does**: Handles who you are (Authentication) and what you can do (Authorization).
- **How it works**: Uses **JWT (JSON Web Tokens)** for stateless authentication. It supports traditional Login/Register and **OAuth2 Social Logins** (Google/LinkedIn).
- **Roles**: 
  - `ROLE_CANDIDATE`: Can browse mentors and book sessions.
  - `ROLE_MENTOR`: Can manage availability and create resources.

### B. Mentorship Scheduling Module
- **What it does**: Manages the "Inventory" of the platform—mentor time.
- **Key Concepts**:
  - **Slots**: Discrete blocks of time (e.g., 45 mins) offered by mentors.
  - **Bookings**: When a candidate pays/claims a slot, it creates a `BookingHistory` record.
- **Rules**: Enforces a 3-day lead time to prevent last-minute scheduling issues.

### C. Resource & Community Module
- **What it does**: Powers the knowledge-sharing aspect of the site.
- **Content Types**: Workshops, Masterclasses, Cheatsheets, and Recordings.
- **Engagement**: Users can **Like/Dislike** content and leave **Ratings/Reviews** after their sessions to build a reputation system for mentors.

### D. Payment Engine (`com.hiringground.api.controller.PaymentController`)
- **What it does**: Monetizes the mentorship.
- **Integration**: Uses **Razorpay**. 
- **Flow**: Frontend gets an Order ID → User pays → Backend verifies the Payment Signature → Session is marked as 'PAID'.

### E. Notification Engine (`com.hiringground.api.service.EmailService`)
- **What it does**: Keeps the loop closed via Email.
- **Triggers**: Sends automated, branded HTML emails for every major event (Booking, Cancellation, Completion).

---

## 🏗 3. Technical Layers (The "How")

### Backend (Spring Boot)
1. **Domain (`domain`)**: The "Blueprints" (Java Classes mapped to Database Tables).
2. **Repository (`repository`)**: The "Waiters" (They fetch and save data to the Database).
3. **Controller (`controller`)**: The "Receptionists" (They receive API requests and send back responses).
4. **Security (`security`)**: The "Guards" (They check if you have a valid token before letting you in).

### Frontend (Next.js 14)
1. **App Router**: Uses file-based routing.
   - `(public)`: Shared layout with the main Navigation.
   - `dashboard`: Specific layouts for logged-in users with a Sidebar.
2. **Design System (`components/ui`)**: Pre-built, premium-styled UI elements (Buttons, Cards, Badges) to ensure the site looks consistent.
3. **Contexts (`contexts`)**: Global states like `AuthContext` so the app "remembers" who you are across different pages.

---

## 💾 4. Data Relationships
- A **User** has one **UserProfile**.
- A **Mentor** (User) can have many **InterviewSlots**.
- A **Slot** can be linked to one **BookingHistory** if it's booked.
- A **Mentor** can create many **Resources**.
- A **Candidate** can leave one **Review** per session.

---

## 🛠 5. Developer Philosophy
- **Premium UI**: Every new feature must follow the glassmorphic, modern theme.
- **Type Safety**: Use TypeScript interfaces and Java DTOs to catch errors early.
- **Simplicity**: Prefer clear, readable code over complex "clever" abstractions.
