import React from 'react';

interface AbcAppIconProps {
  className?: string;
  size?: number;
}

export const AbcAppIcon: React.FC<AbcAppIconProps> = ({ className = 'w-36 h-36', size = 512 }) => {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="appBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4F46E5" />
          <stop offset="50%" stop-color="#7C3AED" />
          <stop offset="100%" stop-color="#EC4899" />
        </linearGradient>

        <radialGradient id="appSunGlow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0" />
        </radialGradient>

        <linearGradient id="appAGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF5252" />
          <stop offset="50%" stop-color="#FF1744" />
          <stop offset="100%" stop-color="#D50000" />
        </linearGradient>
        <linearGradient id="appADepth" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#B71C1C" />
          <stop offset="100%" stop-color="#7F0000" />
        </linearGradient>

        <linearGradient id="appBGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFEA00" />
          <stop offset="50%" stop-color="#FFD600" />
          <stop offset="100%" stop-color="#FF9100" />
        </linearGradient>
        <linearGradient id="appBDepth" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#E65100" />
          <stop offset="100%" stop-color="#BF360C" />
        </linearGradient>

        <linearGradient id="appCGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00E5FF" />
          <stop offset="50%" stop-color="#00B0FF" />
          <stop offset="100%" stop-color="#2979FF" />
        </linearGradient>
        <linearGradient id="appCDepth" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#01579B" />
          <stop offset="100%" stop-color="#0D47A1" />
        </linearGradient>

        <linearGradient id="appGoldStar" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF9C4" />
          <stop offset="50%" stop-color="#FFD700" />
          <stop offset="100%" stop-color="#FFA000" />
        </linearGradient>

        <filter id="appShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#1E1B4B" flood-opacity="0.45" />
        </filter>
      </defs>

      {/* Rounded Squircle Base */}
      <rect x="16" y="16" width="480" height="480" rx="112" fill="url(#appBgGrad)" />
      <rect x="16" y="16" width="480" height="480" rx="112" fill="url(#appSunGlow)" />
      <rect
        x="18"
        y="18"
        width="476"
        height="476"
        rx="110"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="4"
        stroke-opacity="0.25"
      />

      {/* Bubbles */}
      <circle cx="80" cy="110" r="16" fill="#FFFFFF" fill-opacity="0.22" />
      <circle cx="430" cy="120" r="22" fill="#FFFFFF" fill-opacity="0.25" />
      <circle cx="95" cy="380" r="26" fill="#FFFFFF" fill-opacity="0.18" />
      <circle cx="420" cy="390" r="18" fill="#FFFFFF" fill-opacity="0.2" />

      {/* Gold Stars */}
      <path
        d="M 120 70 L 126 88 L 145 88 L 130 100 L 135 118 L 120 106 L 105 118 L 110 100 L 95 88 L 114 88 Z"
        fill="url(#appGoldStar)"
        filter="url(#appShadow)"
      />
      <path
        d="M 390 65 L 396 82 L 414 82 L 399 94 L 404 111 L 390 99 L 376 111 L 381 94 L 366 82 L 384 82 Z"
        fill="url(#appGoldStar)"
        filter="url(#appShadow)"
      />
      <path
        d="M 256 50 L 260 62 L 273 62 L 263 70 L 266 82 L 256 74 L 246 82 L 249 70 L 239 62 L 252 62 Z"
        fill="#FFE082"
        opacity="0.8"
      />

      {/* 3D LETTER A */}
      <g transform="translate(48, 115)">
        <path
          d="M 55 20 L 78 20 L 125 180 L 100 180 L 90 145 L 42 145 L 32 180 L 7 180 Z"
          fill="url(#appADepth)"
          transform="translate(0, 16)"
        />
        <path
          d="M 55 20 L 78 20 L 125 180 L 100 180 L 90 145 L 42 145 L 32 180 L 7 180 Z"
          fill="url(#appAGrad)"
          filter="url(#appShadow)"
        />
        <path d="M 66 58 L 82 118 L 50 118 Z" fill="#800000" transform="translate(0, 4)" />
        <path d="M 66 58 L 82 118 L 50 118 Z" fill="#7C3AED" opacity="0.85" />
        <path d="M 60 25 L 72 25 L 48 110 L 38 110 Z" fill="#FFFFFF" fill-opacity="0.4" />
        <circle cx="54" cy="52" r="5" fill="#FFFFFF" />
      </g>

      {/* 3D LETTER B */}
      <g transform="translate(190, 85)">
        <path
          d="M 15 15 L 75 15 C 105 15 125 32 125 60 C 125 76 114 90 98 97 C 120 105 132 122 132 152 C 132 185 107 205 72 205 L 15 205 Z"
          fill="url(#appBDepth)"
          transform="translate(0, 18)"
        />
        <path
          d="M 15 15 L 75 15 C 105 15 125 32 125 60 C 125 76 114 90 98 97 C 120 105 132 122 132 152 C 132 185 107 205 72 205 L 15 205 Z"
          fill="url(#appBGrad)"
          filter="url(#appShadow)"
        />
        <path
          d="M 45 42 L 72 42 C 84 42 94 50 94 62 C 94 74 84 82 72 82 L 45 82 Z"
          fill="#BF360C"
          transform="translate(0, 4)"
        />
        <path
          d="M 45 42 L 72 42 C 84 42 94 50 94 62 C 94 74 84 82 72 82 L 45 82 Z"
          fill="#6D28D9"
          opacity="0.9"
        />
        <path
          d="M 45 110 L 76 110 C 90 110 101 120 101 135 C 101 150 90 160 76 160 L 45 160 Z"
          fill="#BF360C"
          transform="translate(0, 4)"
        />
        <path
          d="M 45 110 L 76 110 C 90 110 101 120 101 135 C 101 150 90 160 76 160 L 45 160 Z"
          fill="#6D28D9"
          opacity="0.9"
        />
        <path d="M 22 22 L 40 22 L 40 195 L 22 195 Z" fill="#FFFFFF" fill-opacity="0.35" />
        <path
          d="M 72 25 C 90 25 110 35 110 55"
          fill="none"
          stroke="#FFFFFF"
          stroke-width="6"
          stroke-linecap="round"
          stroke-opacity="0.5"
        />
        <circle cx="108" cy="140" r="6" fill="#FFFFFF" />
      </g>

      {/* 3D LETTER C */}
      <g transform="translate(325, 115)">
        <path
          d="M 120 52 C 108 30 88 18 64 18 C 28 18 4 48 4 98 C 4 148 28 178 64 178 C 88 178 108 166 120 144 L 95 130 C 88 144 76 150 64 150 C 42 150 30 130 30 98 C 30 66 42 46 64 46 C 76 46 88 52 95 66 Z"
          fill="url(#appCDepth)"
          transform="translate(0, 16)"
        />
        <path
          d="M 120 52 C 108 30 88 18 64 18 C 28 18 4 48 4 98 C 4 148 28 178 64 178 C 88 178 108 166 120 144 L 95 130 C 88 144 76 150 64 150 C 42 150 30 130 30 98 C 30 66 42 46 64 46 C 76 46 88 52 95 66 Z"
          fill="url(#appCGrad)"
          filter="url(#appShadow)"
        />
        <path
          d="M 64 26 C 36 26 14 52 14 98"
          fill="none"
          stroke="#FFFFFF"
          stroke-width="7"
          stroke-linecap="round"
          stroke-opacity="0.45"
        />
        <circle cx="95" cy="52" r="5" fill="#FFFFFF" />
      </g>

      {/* LOWER BRANDING BANNER */}
      <g transform="translate(256, 420)">
        <rect
          x="-185"
          y="-32"
          width="370"
          height="64"
          rx="32"
          fill="#0F172A"
          opacity="0.3"
          transform="translate(0, 8)"
        />
        <rect x="-185" y="-32" width="370" height="64" rx="32" fill="#FFFFFF" />
        <rect
          x="-181"
          y="-28"
          width="362"
          height="56"
          rx="28"
          fill="#FFFBEB"
          stroke="#FBBF24"
          stroke-width="2.5"
        />
        <text
          x="0"
          y="8"
          font-family="'Nunito', 'Fredoka', 'Comic Sans MS', sans-serif"
          font-weight="900"
          font-size="28"
          text-anchor="middle"
          fill="#4338CA"
          letter-spacing="0.5"
        >
          ABC FUN LEARNING
        </text>
        <circle cx="-155" cy="0" r="7" fill="#EF4444" />
        <circle cx="-135" cy="0" r="5" fill="#10B981" />
        <circle cx="135" cy="0" r="5" fill="#F59E0B" />
        <circle cx="155" cy="0" r="7" fill="#3B82F6" />
      </g>
    </svg>
  );
};
