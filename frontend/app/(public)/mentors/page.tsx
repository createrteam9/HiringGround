'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Container from '@/app/components/layout/Container';
import Badge from '@/app/components/ui/Badge';
import Avatar from '@/app/components/ui/Avatar';
import Button from '@/app/components/ui/Button';
import { fetchApi } from '@/lib/api';

interface Mentor {
  profileId: number;
  firstName: string;
  lastName: string;
  profileImgUrl: string | null;
  bio: string | null;
  currentCompany: string | null;
  currentPosition: string | null;
  yearsOfExperience: number | null;
  interestsTags: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
}

export default function MentorNetworkPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadMentors();
  }, []);

  const loadMentors = async () => {
    setIsLoading(true);
    try {
      const data = await fetchApi<Mentor[]>('/candidate/mentors');
      setMentors(data);
    } catch (err) {
      console.error('Failed to load mentors', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMentors = useMemo(() => {
    if (!searchQuery.trim()) return mentors;
    const q = searchQuery.toLowerCase();
    return mentors.filter(
      (m) =>
        (m.firstName?.toLowerCase() || '').includes(q) ||
        (m.lastName?.toLowerCase() || '').includes(q) ||
        (m.currentCompany?.toLowerCase() || '').includes(q) ||
        (m.currentPosition?.toLowerCase() || '').includes(q) ||
        (m.interestsTags?.toLowerCase() || '').includes(q)
    );
  }, [mentors, searchQuery]);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-container/10" />
        <div className="relative py-16 px-6">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-4">
                Find Your{' '}
                <span className="text-gradient">Perfect Mentor</span>
              </h1>
              <p className="text-lg text-on-surface-variant mb-8 max-w-2xl mx-auto">
                Connect with industry experts from top tech companies for personalized mock interviews and career guidance.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, company, or expertise..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface-container-lowest shadow-lg border border-outline-variant/10 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all text-base"
                />
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="py-12 px-6">
        <Container>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-on-surface-variant font-medium">Discovering mentors...</p>
            </div>
          ) : filteredMentors.length === 0 ? (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4 block">
                person_search
              </span>
              <h2 className="text-xl font-bold text-on-surface mb-2">No Mentors Found</h2>
              <p className="text-on-surface-variant">
                {searchQuery
                  ? 'Try adjusting your search query.'
                  : 'No mentors have registered yet. Check back soon!'}
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm text-on-surface-variant">
                  <span className="font-bold text-on-surface">{filteredMentors.length}</span> mentor{filteredMentors.length !== 1 ? 's' : ''} available
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMentors.map((mentor) => {
                  const tags = mentor.interestsTags?.split(',').map((t) => t.trim()).filter(Boolean) || [];
                  const initials = `${mentor.firstName?.charAt(0) || ''}${mentor.lastName?.charAt(0) || ''}`;

                  return (
                    <div
                      key={mentor.profileId}
                      className="group glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar
                          src={mentor.profileImgUrl || undefined}
                          alt={`${mentor.firstName} ${mentor.lastName}`}
                          size="lg"
                          fallback={initials}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-headline font-bold text-on-surface truncate">
                            {mentor.firstName} {mentor.lastName}
                          </h3>
                          {mentor.currentPosition && (
                            <p className="text-sm text-on-surface-variant truncate">
                              {mentor.currentPosition}
                            </p>
                          )}
                          {mentor.currentCompany && (
                            <p className="text-sm font-medium text-primary truncate">
                              {mentor.currentCompany}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Bio */}
                      {mentor.bio && (
                        <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">
                          {mentor.bio}
                        </p>
                      )}

                      {/* Experience */}
                      {mentor.yearsOfExperience && (
                        <div className="flex items-center gap-1.5 mb-4 text-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-base">work</span>
                          <span>{mentor.yearsOfExperience}+ years experience</span>
                        </div>
                      )}

                      {/* Tags */}
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {tags.slice(0, 4).map((tag, i) => (
                            <span
                              key={i}
                              className="inline-block px-2.5 py-1 rounded-full bg-primary/8 text-primary text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {tags.length > 4 && (
                            <span className="inline-block px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-xs">
                              +{tags.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Social Links + CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-outline-variant/15">
                        <div className="flex items-center gap-2">
                          {mentor.linkedinUrl && (
                            <a
                              href={mentor.linkedinUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors"
                              title="LinkedIn"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                            </a>
                          )}
                          {mentor.githubUrl && (
                            <a
                              href={mentor.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
                              title="GitHub"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                        <Link href={`/mentors/${mentor.profileId}`}>
                          <Button variant="primary" size="sm">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Container>
      </div>
    </div>
  );
}
