import React from 'react';
import Sidebar from '@/app/components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-background">
      <Sidebar />
      <div className="ml-64 flex flex-col">
        {/* We can add a top navigation or header here later if needed, but for now the Sidebar is the main nav */}
        {children}
      </div>
    </div>
  );
}
