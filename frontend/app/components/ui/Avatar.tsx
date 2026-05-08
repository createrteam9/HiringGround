import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
  fallback,
}) => {
  const dimension = sizeMap[size];

  if (!src) {
    return (
      <div
        className={`
          flex items-center justify-center
          rounded-full bg-primary text-white
          font-headline font-bold
          ${className}
        `}
        style={{
          width: `${dimension}px`,
          height: `${dimension}px`,
          fontSize: `${dimension / 2.5}px`,
        }}
      >
        {fallback || '?'}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={dimension}
      height={dimension}
      className={`rounded-full object-cover ${className}`}
    />
  );
};

export default Avatar;
