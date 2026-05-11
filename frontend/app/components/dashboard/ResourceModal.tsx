'use client';
import React, { useState } from 'react';
import Button from '@/app/components/ui/Button';
import { resourceApi } from '@/lib/api';

interface ResourceModalProps {
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ResourceModal({ token, onClose, onSuccess }: ResourceModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'WORKSHOP',
    contentUrl: '',
    thumbnailUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const types = ['WORKSHOP', 'MASTERCLASS', 'CHEATSHEET', 'RECORDING'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.contentUrl) {
      setError('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      await resourceApi.create(formData, token);
      onSuccess();
      onClose();
    } catch (e: any) {
      setError(e.message || 'Failed to create resource.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-primary-container" />
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-headline font-bold text-[#0A2156]">Create New Resource</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Title *</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Advanced System Design Masterclass"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Type *</label>
            <div className="grid grid-cols-2 gap-2">
              {types.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormData({...formData, type: t})}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    formData.type === t 
                    ? 'bg-primary text-white border-primary shadow-md' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-primary/30'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Description *</label>
            <textarea 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Provide a brief overview of what this resource covers..."
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Content URL *</label>
              <input 
                type="text" 
                value={formData.contentUrl} 
                onChange={e => setFormData({...formData, contentUrl: e.target.value})}
                placeholder="Link to video, PDF, etc."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Thumbnail URL</label>
              <input 
                type="text" 
                value={formData.thumbnailUrl} 
                onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})}
                placeholder="Image URL"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          {error && <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

          <div className="flex gap-3 pt-4">
            <Button variant="secondary" className="flex-1" onClick={onClose} type="button">Cancel</Button>
            <Button variant="primary" className="flex-1" type="submit" disabled={isSubmitting} loading={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Resource'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
