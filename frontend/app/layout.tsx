import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Navigation from "@/app/components/layout/Navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "HiringGround | Master Real Interviews with Experts",
    template: "%s | HiringGround",
  },
  description: "Accelerate your career with HiringGround. Practice technical, behavioral, and system design interviews with industry mentors from top tech companies.",
  keywords: ["mock interviews", "tech interviews", "software engineering", "coding practice", "FAANG mentors", "interview prep"],
  authors: [{ name: "HiringGround Team" }],
  creator: "HiringGround",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hiringground.com",
    siteName: "HiringGround",
    title: "HiringGround | Master Real Interviews with Experts",
    description: "Accelerate your career with HiringGround. Practice technical, behavioral, and system design interviews with industry mentors from top tech companies.",
    images: [
      {
        url: "https://hiringground.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "HiringGround Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HiringGround | Master Real Interviews with Experts",
    description: "Practice technical, behavioral, and system design interviews with industry mentors.",
    images: ["https://hiringground.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-surface pt-16">
        <AuthProvider>
          <Navigation />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
