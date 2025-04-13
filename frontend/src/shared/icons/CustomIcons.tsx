import React from 'react';

// --- Иконки типов источников ---
export const TelegramIcon: React.FC<{ size?: number, color?: string }> = ({ size = 24, color = "#0088cc" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13L2 9L22 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

export const WebsiteIcon: React.FC<{ size?: number, color?: string }> = ({ size = 24, color = "#4F8CFF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5"/>
    <ellipse cx="12" cy="12" rx="4" ry="10" stroke={color} strokeWidth="1.5"/>
    <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.5"/>
  </svg>
);

export const ApiIcon: React.FC<{ size?: number, color?: string }> = ({ size = 24, color = "#27AE60" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 17L4 12L9 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 17L20 12L15 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const RssIcon: React.FC<{ size?: number, color?: string }> = ({ size = 24, color = "#FFA500" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 11a9 9 0 0 1 9 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 4a16 16 0 0 1 16 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="5" cy="19" r="1" fill={color}/>
  </svg>
);

export const YouTubeIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#FF0000"/>
    <path d="M10 16.5V7.5L16 12L10 16.5Z" fill="white"/>
  </svg>
);

export const TwitterIcon: React.FC<{ size?: number, color?: string }> = ({ size = 24, color = "#1DA1F2" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M23 3.01006C22.0424 3.65873 20.9821 4.1343 19.86 4.42006C19.2577 3.74856 18.4579 3.29181 17.5717 3.11618C16.6856 2.94056 15.7625 3.05591 14.9398 3.4465C14.1171 3.8371 13.4381 4.48495 13.0012 5.29313C12.5644 6.10131 12.3915 7.02784 12.509 7.94006V9.00006C10.5461 9.08019 8.62775 8.69596 6.93947 7.88895C5.25119 7.08194 3.85741 5.88067 2.9 4.40006C2.9 4.40006 -1.1 13.4001 8.9 17.4001C6.56996 19.0124 3.7888 19.8944 0.9 19.9901C8.9 24.0101 17.9 19.9901 17.9 7.93006C17.899 7.68081 17.8721 7.43278 17.82 7.19006C18.8271 6.31031 19.6314 5.24179 20.19 4.05006C21.313 4.47006 22.1942 4.84511 23 5.01006" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// --- Иконки статусов ---
export const StatusActiveIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="#27AE60" strokeWidth="2" fill="#27AE60" />
    <circle cx="8" cy="8" r="4" fill="white" />
  </svg>
);

export const StatusInactiveIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="#BDBDBD" strokeWidth="2" fill="#BDBDBD" />
    <circle cx="8" cy="8" r="4" fill="white" />
  </svg>
);

export const StatusErrorIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="#EB5757" strokeWidth="2" fill="#EB5757" />
    <rect x="6.5" y="4" width="3" height="6" rx="1.5" fill="white"/>
    <rect x="7" y="11" width="2" height="2" rx="1" fill="white"/>
  </svg>
);

export const StatusWarningIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="#F2C94C" strokeWidth="2" fill="#F2C94C" />
    <rect x="7" y="5" width="2" height="5" rx="1" fill="white"/>
    <rect x="7" y="11" width="2" height="2" rx="1" fill="white"/>
  </svg>
);

// --- Иконки действий ---
export const EditIcon: React.FC<{ size?: number, color?: string }> = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 2.5L10 10L17.5 17.5L17.5 2.5Z" fill={color} opacity="0.1"/>
    <path d="M12.5 3.75L4.58333 11.6667C4.41667 11.8333 4.25 12.1667 4.25 12.4167L4.16667 15L6.75 14.9167C7 14.9167 7.33333 14.75 7.5 14.5833L15.4167 6.66667C16.0833 6 16.0833 5 15.4167 4.33333L14.8333 3.75C14.1667 3.08333 13.1667 3.08333 12.5 3.75Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.5 4.75L14.4167 7.66667" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TrashIcon: React.FC<{ size?: number, color?: string }> = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect x="5" y="7" width="10" height="9" rx="2" fill={color} opacity="0.1"/>
    <rect x="8" y="10" width="1" height="5" rx="0.5" fill={color}/>
    <rect x="11" y="10" width="1" height="5" rx="0.5" fill={color}/>
    <rect x="7" y="4" width="6" height="2" rx="1" fill={color}/>
    <rect x="3" y="7" width="14" height="2" rx="1" fill={color}/>
  </svg>
);

export const RefreshIcon: React.FC<{ size?: number, color?: string }> = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M10 3V1M10 19v-2M4.22 4.22l-1.42-1.42M17.2 17.2l-1.42-1.42M1 10H3M17 10h2M4.22 15.78l-1.42 1.42M17.2 2.8l-1.42 1.42" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.5"/>
  </svg>
);

export const AutoFetchIcon: React.FC<{ size?: number, color?: string }> = ({ size = 20, color = "#27AE60" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="2" fill={color} opacity="0.15"/>
    <path d="M10 5V10L13 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PlusIcon: React.FC<{ size?: number, color?: string }> = ({ size = 20, color = "#4F8CFF" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect x="9" y="4" width="2" height="12" rx="1" fill={color}/>
    <rect x="4" y="9" width="12" height="2" rx="1" fill={color}/>
  </svg>
);

export const CloseIcon: React.FC<{ size?: number, color?: string }> = ({ size = 20, color = "#BDBDBD" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect x="5" y="5" width="10" height="10" rx="2" fill={color} opacity="0.1"/>
    <path d="M7 7L13 13M13 7L7 13" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
