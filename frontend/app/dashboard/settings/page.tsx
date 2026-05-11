'use client';
import React, { useState, useEffect } from 'react';
import Container from '@/app/components/layout/Container';
import Card from '@/app/components/ui/Card';
import Button from '@/app/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { fetchApi, uploadFileApi } from '@/lib/api';

export default function SettingsPage() {
  const { token } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  // File upload states
  const [isUploadingPic, setIsUploadingPic] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  useEffect(() => {
    if (token) {
      loadProfile();
    }
  }, [token]);

  const loadProfile = async () => {
    try {
      const data = await fetchApi<any>('/profile/me', { token: token! });
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile', error);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');
    try {
      await fetchApi('/profile/me', {
        method: 'PUT',
        token: token!,
        data: profile,
      });
      setSaveMessage('Profile updated successfully!');
    } catch (error) {
      setSaveMessage('Failed to update profile.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'picture' | 'resume') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const isPic = type === 'picture';
    isPic ? setIsUploadingPic(true) : setIsUploadingResume(true);

    try {
      const endpoint = `/profile/me/upload/${type}`;
      const response = await uploadFileApi<any>(endpoint, formData, token!);
      
      // Update local profile state to reflect new file URL
      if (isPic) {
        setProfile((prev: any) => ({ ...prev, profileImgUrl: response.fileUrl }));
      } else {
        setProfile((prev: any) => ({ ...prev, resumeUrl: response.fileUrl }));
      }
    } catch (error) {
      console.error(`Failed to upload ${type}`, error);
      alert(`Failed to upload ${type}`);
    } finally {
      isPic ? setIsUploadingPic(false) : setIsUploadingResume(false);
    }
  };

  if (!profile) return <div className="p-8">Loading profile...</div>;

  const labelClass = "block text-sm text-slate-800 mb-1.5 font-medium";
  const inputClass = "w-full bg-white border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-3 py-2.5 text-sm text-slate-900 outline-none";

  return (
    <div className="bg-surface py-12 px-6">
      <Container>
        <div className="mb-8">
          <h1 className="text-display-md font-bold text-on-surface mb-2">Account Settings</h1>
          <p className="text-body-lg text-on-surface-variant">Manage your profile information and documents.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Picture & Resume */}
          <div className="space-y-6">
            <Card variant="elevated">
              <h3 className="text-lg font-bold mb-4">Profile Picture</h3>
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
                  {profile.profileImgUrl ? (
                    <img src={profile.profileImgUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                <div>
                  <input 
                    type="file" 
                    id="profilePic" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'picture')} 
                  />
                  <label htmlFor="profilePic">
                    <Button variant="secondary" size="sm" as="span" disabled={isUploadingPic} className="cursor-pointer">
                      {isUploadingPic ? 'Uploading...' : 'Change Picture'}
                    </Button>
                  </label>
                </div>
              </div>
            </Card>

            <Card variant="elevated">
              <h3 className="text-lg font-bold mb-4">Resume</h3>
              <div className="flex flex-col items-start gap-3">
                {profile.resumeUrl ? (
                  <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">description</span>
                    View Current Resume
                  </a>
                ) : (
                  <p className="text-sm text-gray-500">No resume uploaded yet.</p>
                )}
                <div className="mt-2">
                  <input 
                    type="file" 
                    id="resume" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'resume')} 
                  />
                  <label htmlFor="resume">
                    <Button variant="outline" size="sm" as="span" disabled={isUploadingResume} className="cursor-pointer">
                      {isUploadingResume ? 'Uploading...' : 'Upload New Resume'}
                    </Button>
                  </label>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Profile Form */}
          <div className="lg:col-span-2">
            <Card variant="elevated">
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input 
                      type="text" 
                      className={inputClass}
                      value={profile.firstName || ''}
                      onChange={e => setProfile({...profile, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input 
                      type="text" 
                      className={inputClass}
                      value={profile.lastName || ''}
                      onChange={e => setProfile({...profile, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Bio</label>
                  <textarea 
                    className={`${inputClass} min-h-[100px] resize-y`}
                    value={profile.bio || ''}
                    onChange={e => setProfile({...profile, bio: e.target.value})}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Current Company</label>
                    <input 
                      type="text" 
                      className={inputClass}
                      value={profile.currentCompany || ''}
                      onChange={e => setProfile({...profile, currentCompany: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Current Position</label>
                    <input 
                      type="text" 
                      className={inputClass}
                      value={profile.currentPosition || ''}
                      onChange={e => setProfile({...profile, currentPosition: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>College / University</label>
                  <input 
                    type="text" 
                    className={inputClass}
                    value={profile.clgName || ''}
                    onChange={e => setProfile({...profile, clgName: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>LinkedIn URL</label>
                    <input 
                      type="url" 
                      className={inputClass}
                      value={profile.linkedinUrl || ''}
                      onChange={e => setProfile({...profile, linkedinUrl: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>GitHub URL</label>
                    <input 
                      type="url" 
                      className={inputClass}
                      value={profile.githubUrl || ''}
                      onChange={e => setProfile({...profile, githubUrl: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                  <span className={`text-sm ${saveMessage.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                    {saveMessage}
                  </span>
                  <Button type="submit" variant="primary" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Profile'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
