'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Button from '@/app/components/ui/Button';
import Card from '@/app/components/ui/Card';
import Badge from '@/app/components/ui/Badge';

export default function PracticeSessionPage() {
  const searchParams = useSearchParams();
  const track = searchParams.get('track') || 'system-design';
  
  const trackInfo: any = {
    'system-design': { title: 'System Design Mock', icon: 'architecture', difficulty: 'Hard', prompt: 'Design a Global Rate Limiter' },
    'algorithms': { title: 'Data Structures & Algo', icon: 'data_object', difficulty: 'Medium', prompt: 'Implement an LRU Cache' },
    'frontend': { title: 'Frontend Architecture', icon: 'web', difficulty: 'Medium', prompt: 'Optimize React Virtual List' },
    'behavioral': { title: 'Behavioral & Leadership', icon: 'psychology', difficulty: 'Easy', prompt: 'Conflict Resolution (STAR Method)' },
  };

  const currentTrack = trackInfo[track] || trackInfo['system-design'];

  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hello! I'm your AI Interview Coach. I'll be conducting your ${currentTrack.title} interview today. Ready to begin?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "That's a good start. When designing a rate limiter for a global scale, how would you handle synchronization between different data centers? Consider using Redis or a similar distributed cache." 
      }]);
    }, 2000);
  };

  if (showFeedback) {
    return (
      <div className="min-h-screen bg-[#F3F2EF] py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <Card variant="elevated" className="p-10">
            <div className="text-center mb-8">
              <span className="material-symbols-outlined text-6xl text-green-500 mb-4 block">analytics</span>
              <h1 className="text-3xl font-headline font-bold text-[#0A2156]">Session Performance Report</h1>
              <p className="text-slate-500">System Design Track · 12 May 2026</p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-2xl font-bold text-primary">84%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accuracy</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-2xl font-bold text-primary">9/10</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Communication</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-2xl font-bold text-primary">High</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Technical Depth</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-3">Key Strengths</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="material-symbols-outlined text-green-500 text-sm mt-0.5">check_circle</span>
                    Excellent understanding of distributed locking mechanisms.
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="material-symbols-outlined text-green-500 text-sm mt-0.5">check_circle</span>
                    Clear explanation of trade-offs between Consistency and Availability.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-3">Areas for Improvement</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="material-symbols-outlined text-amber-500 text-sm mt-0.5">error</span>
                    Could have explored Bloom Filters for reducing database lookups.
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="material-symbols-outlined text-amber-500 text-sm mt-0.5">error</span>
                    Mentioning specific monitoring tools (Prometheus/Grafana) would add realism.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <Link href="/practice" className="flex-1">
                <Button variant="secondary" className="w-full">Back to Practice</Button>
              </Link>
              <Link href="/dashboard" className="flex-1">
                <Button variant="primary" className="w-full">Go to Dashboard</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] bg-[#0F172A] flex overflow-hidden">
      {/* Sidebar: Question & Whiteboard */}
      <div className="w-1/2 flex flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="primary">{currentTrack.title}</Badge>
            <span className="text-slate-500 text-xs font-bold">Time Elapsed: 14:02</span>
          </div>
          <h1 className="text-xl font-bold text-white mb-2">{currentTrack.prompt}</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            {track === 'behavioral' 
              ? 'Tell me about a time you had to resolve a conflict within your team. Use the STAR method to structure your response.'
              : 'Create a system that can handle millions of requests while ensuring data consistency and low latency.'}
          </p>
        </div>
        
        <div className="flex-1 bg-slate-950 p-6 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <span className="material-symbols-outlined text-[120px] text-slate-700">{currentTrack.icon}</span>
          </div>
          <div className="relative h-full border border-slate-800 rounded-xl bg-slate-900/30 flex items-center justify-center text-slate-600">
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl mb-2">{track === 'behavioral' ? 'description' : 'draw'}</span>
              <p className="text-xs uppercase tracking-widest font-bold">
                {track === 'behavioral' ? 'Notetaker Active' : 'Whiteboard Interface Active'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col bg-slate-900">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-lg">smart_toy</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">AI Coach</p>
              <p className="text-[10px] text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Connected & Analyzing
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="!text-slate-400 hover:!bg-white/5" onClick={() => setShowFeedback(true)}>
            End Session
          </Button>
        </div>

        {/* Chat Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-slate-800 text-slate-200 border border-slate-700'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3 flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-slate-900 border-t border-slate-800">
          <div className="relative">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Explain your approach..."
              rows={2}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 pr-14 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
            <button 
              onClick={handleSend}
              className="absolute right-3 bottom-3 p-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              disabled={!input.trim() || isTyping}
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 text-center">
            Shift + Enter for new line · Press Enter to send
          </p>
        </div>
      </div>
    </div>
  );
}
