import React from "react";

// SVG-иконки для типов источников (минималистичные, свои)
export const RssIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="6" cy="18" r="2" fill="#FFA500"/>
    <path d="M4 10a8 8 0 0 1 8 8" stroke="#FFA500" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 4a14 14 0 0 1 14 14" stroke="#FFA500" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const WebsiteIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#4F8CFF" strokeWidth="2" fill="none"/>
    <ellipse cx="12" cy="12" rx="4" ry="10" stroke="#4F8CFF" strokeWidth="2" fill="none"/>
    <line x1="2" y1="12" x2="22" y2="12" stroke="#4F8CFF" strokeWidth="2"/>
  </svg>
);

export const ApiIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="8" width="16" height="8" rx="2" stroke="#00B894" strokeWidth="2" fill="none"/>
    <circle cx="8" cy="12" r="1.5" fill="#00B894"/>
    <circle cx="16" cy="12" r="1.5" fill="#00B894"/>
    <rect x="10.5" y="11" width="3" height="2" rx="1" fill="#00B894"/>
  </svg>
);

export const SocialIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="10" r="3" stroke="#A259FF" strokeWidth="2" fill="none"/>
    <circle cx="16" cy="10" r="3" stroke="#A259FF" strokeWidth="2" fill="none"/>
    <ellipse cx="12" cy="17" rx="7" ry="3" stroke="#A259FF" strokeWidth="2" fill="none"/>
  </svg>
);

// SVG-статусы
export const StatusActive: React.FC<{ size?: number }> = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="6" fill="#27AE60"/>
  </svg>
);

export const StatusInactive: React.FC<{ size?: number }> = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="6" fill="#BDBDBD"/>
  </svg>
);

export const StatusError: React.FC<{ size?: number }> = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="6" fill="#EB5757"/>
  </svg>
);
