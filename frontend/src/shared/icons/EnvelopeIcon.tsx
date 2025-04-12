import React from 'react';

export const EnvelopeIcon: React.FC<{size?: number, color?: string}> = ({
  size = 20,
  color = "rgba(255, 255, 255, 0.3)"
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M224 56H32a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h192a8 8 0 0 0 8-8V64a8 8 0 0 0-8-8Zm-96 85.32L52.57 64h150.86ZM96.8 128 40 181.76V74.24Zm10.53 9.75 13.88 12.85a8 8 0 0 0 10.82 0l13.88-12.85L203.43 192H52.57ZM159.2 128 216 74.24v107.52Z"
      fill={color}
    />
  </svg>
);
