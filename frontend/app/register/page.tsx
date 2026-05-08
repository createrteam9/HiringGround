'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

type Role = 'candidate' | 'mentor' | 'enterprise' | null;

export default function RegistrationFlow() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<Role>(null);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '',
    company: '', jobTitle: '', experience: '3', linkedIn: '',
    goals: '',
    agreeToTerms: false,
    // KYC for Mentors
    aadhaarNumber: '', panNumber: ''
  });

  const updateForm = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) nextStep();
    else alert('Registration Complete! Welcome to ' + siteConfig.name);
  };

  const labelClass = "block text-sm text-slate-800 mb-1.5";
  const inputClass = "w-full bg-white border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-3 py-2.5 text-sm text-slate-900 transition-all outline-none";

  return (
    <div className="h-[calc(100vh-64px)] bg-[#F3F2EF] relative flex flex-col justify-center py-4 px-4 sm:px-6 lg:px-8 selection:bg-primary/20 overflow-hidden antialiased">
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-3xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-headline text-slate-900 tracking-tight">
            {step === 1 && "Join the Network"}
            {step === 2 && "Personal Details"}
            {step === 3 && "Professional Background"}
            {step === 4 && (role === 'mentor' ? "Verification & Goals" : "Your Goals")}
            {step === 5 && "Review & Complete"}
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 font-body">
            {step === 1 && "Choose how you want to experience " + siteConfig.name + "."}
            {step === 2 && "Let's start with the basics."}
            {step === 3 && "Tell us about your career trajectory."}
            {step === 4 && (role === 'mentor' ? "Upload necessary documents for authenticity." : "Customize your experience.")}
            {step === 5 && "Almost there! Verify your information."}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-2xl py-6 px-6 sm:px-10 shadow-lg shadow-slate-200/50 rounded-2xl border border-slate-200 max-h-[80vh] overflow-y-auto">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center gap-2">
              {[1, 2, 3, 4, 5].map((idx) => (
                <div key={idx} className="flex flex-col items-center w-full">
                  <div className={`h-1.5 w-full rounded-full transition-colors duration-500 ${step >= idx ? 'bg-gradient-to-r from-primary to-primary-container' : 'bg-slate-200'}`}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span className={step >= 1 ? 'text-slate-900 font-medium' : ''}>Role</span>
              <span className={step >= 2 ? 'text-slate-900 font-medium' : ''}>Basics</span>
              <span className={step >= 3 ? 'text-slate-900 font-medium' : ''}>Career</span>
              <span className={step >= 4 ? 'text-slate-900 font-medium' : ''}>{role === 'mentor' ? 'Verify' : 'Goals'}</span>
              <span className={step >= 5 ? 'text-slate-900 font-medium' : ''}>Review</span>
            </div>
          </div>

          <form onSubmit={submitForm} className="space-y-6">
            
            {/* STEP 1 */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  onClick={() => setRole('candidate')}
                  className={`cursor-pointer p-5 border rounded-xl flex flex-col items-center text-center gap-3 transition-all duration-300 ${role === 'candidate' ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                >
                  <div className={`p-3 rounded-full flex items-center justify-center shrink-0 transition-colors ${role === 'candidate' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <span className="material-symbols-outlined text-2xl">school</span>
                  </div>
                  <div>
                    <h3 className="text-base text-slate-900 font-medium">Candidate</h3>
                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">Practice real interviews with industry experts.</p>
                  </div>
                </div>

                <div 
                  onClick={() => setRole('mentor')}
                  className={`cursor-pointer p-5 border rounded-xl flex flex-col items-center text-center gap-3 transition-all duration-300 ${role === 'mentor' ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                >
                  <div className={`p-3 rounded-full flex items-center justify-center shrink-0 transition-colors ${role === 'mentor' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                  </div>
                  <div>
                    <h3 className="text-base text-slate-900 font-medium">Mentor</h3>
                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">Conduct mock interviews and get paid for your expertise.</p>
                  </div>
                </div>

                <div 
                  onClick={() => setRole('enterprise')}
                  className={`cursor-pointer p-5 border rounded-xl flex flex-col items-center text-center gap-3 transition-all duration-300 ${role === 'enterprise' ? 'border-primary bg-primary/5 ring-1 ring-primary/20 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                >
                  <div className={`p-3 rounded-full flex items-center justify-center shrink-0 transition-colors ${role === 'enterprise' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <span className="material-symbols-outlined text-2xl">business</span>
                  </div>
                  <div>
                    <h3 className="text-base text-slate-900 font-medium">Enterprise</h3>
                    <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">Upskill your engineering team or streamline your hiring pipeline.</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input required value={formData.firstName} onChange={(e) => updateForm('firstName', e.target.value)} type="text" className={inputClass} placeholder="Jane" />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input required value={formData.lastName} onChange={(e) => updateForm('lastName', e.target.value)} type="text" className={inputClass} placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input required value={formData.email} onChange={(e) => updateForm('email', e.target.value)} type="email" className={inputClass} placeholder="jane@example.com" />
                </div>
                <div>
                  <label className={labelClass}>Password</label>
                  <input required value={formData.password} onChange={(e) => updateForm('password', e.target.value)} type="password" className={inputClass} placeholder="••••••••" />
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Current Company</label>
                  <input required value={formData.company} onChange={(e) => updateForm('company', e.target.value)} type="text" className={inputClass} placeholder="e.g. Acme Corp" />
                </div>
                <div>
                  <label className={labelClass}>Job Title</label>
                  <input required value={formData.jobTitle} onChange={(e) => updateForm('jobTitle', e.target.value)} type="text" className={inputClass} placeholder="e.g. Senior Software Engineer" />
                </div>
                <div className="pt-2">
                  <div className="flex justify-between items-end mb-2">
                    <label className={labelClass} style={{marginBottom: 0}}>Years of Experience</label>
                    <span className="text-base text-slate-900">{formData.experience} Years</span>
                  </div>
                  <input value={formData.experience} onChange={(e) => updateForm('experience', e.target.value)} type="range" min="0" max="20" className="w-full accent-primary h-1.5" />
                </div>
                <div className="pt-2">
                  <label className={labelClass}>LinkedIn URL <span className="text-slate-500">(Optional)</span></label>
                  <input value={formData.linkedIn} onChange={(e) => updateForm('linkedIn', e.target.value)} type="url" className={inputClass} placeholder="https://linkedin.com/in/username" />
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>
                    {role === 'candidate' ? 'What do you want to practice the most?' : role === 'mentor' ? 'What domains can you interview candidates in?' : 'What are your hiring/upskilling goals?'}
                  </label>
                  <textarea required value={formData.goals} onChange={(e) => updateForm('goals', e.target.value)} rows={3} className={`${inputClass} resize-none leading-relaxed`} placeholder={role === 'candidate' ? "e.g. Distributed Systems, Frontend Architecture, React Native..." : "e.g. Backend System Design, Algorithmic Problem Solving..."}></textarea>
                </div>
                
                {role === 'mentor' && (
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-sm text-slate-900 font-medium mb-4">Mandatory KYC (Indian Document Authenticity)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Aadhaar Number / Upload</label>
                        <div className="flex items-center gap-2">
                          <input required value={formData.aadhaarNumber} onChange={(e) => updateForm('aadhaarNumber', e.target.value)} type="text" className={inputClass} placeholder="1234 5678 9012" />
                          <button type="button" className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg border border-slate-200 shrink-0 transition-colors" title="Upload Aadhaar">
                            <span className="material-symbols-outlined text-xl block">upload_file</span>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>PAN Number / Upload</label>
                        <div className="flex items-center gap-2">
                          <input required value={formData.panNumber} onChange={(e) => updateForm('panNumber', e.target.value)} type="text" className={inputClass} placeholder="ABCDE1234F" />
                          <button type="button" className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg border border-slate-200 shrink-0 transition-colors" title="Upload PAN">
                            <span className="material-symbols-outlined text-xl block">upload_file</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div className="space-y-5">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-sm text-slate-600">Account Type</span>
                    <span className="text-sm text-slate-900 capitalize bg-white px-2.5 py-1 rounded shadow-sm border border-slate-200">{role}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-sm text-slate-600">Name</span>
                    <span className="text-sm text-slate-900">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-sm text-slate-600">Email</span>
                    <span className="text-sm text-slate-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Current Role</span>
                    <span className="text-sm text-slate-900 text-right">{formData.jobTitle} <span className="text-slate-500">at</span> {formData.company}</span>
                  </div>
                  
                  {role === 'mentor' && (
                    <div className="flex justify-between items-center border-t border-slate-200 pt-3 mt-3">
                      <span className="text-sm text-slate-600">KYC Status</span>
                      <span className="text-sm text-green-700 flex items-center gap-1 font-medium"><span className="material-symbols-outlined text-base">verified</span> Documents Attached</span>
                    </div>
                  )}
                </div>

                <label className="flex items-start gap-3 cursor-pointer bg-white p-4 rounded-xl border border-slate-200">
                  <input required checked={formData.agreeToTerms} onChange={(e) => updateForm('agreeToTerms', e.target.checked)} type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-1 focus:ring-primary mt-0.5" />
                  <span className="text-sm text-slate-700 leading-relaxed">
                    I agree to the Terms of Service. I understand that {siteConfig.name} will use my information to match me with {role === 'mentor' ? 'candidates' : 'mentors'}.
                  </span>
                </label>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="pt-5 flex items-center justify-between border-t border-slate-200 mt-6">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-lg">arrow_back</span>
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              <button type="submit" disabled={step === 1 && !role} className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm shadow-sm hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 group">
                {step === 5 ? 'Complete Setup' : 'Continue'}
                {step < 5 && <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                {step === 5 && <span className="material-symbols-outlined text-lg">check_circle</span>}
              </button>
            </div>
            
            {step === 1 && (
              <p className="text-center text-sm text-slate-500 mt-5">
                Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in here</Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
