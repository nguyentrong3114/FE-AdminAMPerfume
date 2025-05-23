import React from 'react';

interface LogoProps {
  collapsed?: boolean;
}

export function Logo({ collapsed }: LogoProps) {
  return (
    <div className={`flex items-center ${collapsed ? 'hidden' : ''}`}>
      <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
        AM-Admin
      </span>
    </div>
  );
} 