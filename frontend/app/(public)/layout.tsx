import React from 'react';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex-1 min-h-[calc(100vh-64px)] flex flex-col">
        {children}
      </div>
    </>
  );
}
