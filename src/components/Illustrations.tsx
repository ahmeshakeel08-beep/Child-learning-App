import React from 'react';

interface IllustrationProps {
  letter: string;
  className?: string;
}

export const LetterIllustration: React.FC<IllustrationProps> = ({ letter, className = 'w-48 h-48' }) => {
  switch (letter) {
    case 'A': // Apple
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="115" r="70" fill="#EF4444" />
          <path d="M 70 70 C 50 100 60 160 100 170 C 140 160 150 100 130 70 C 110 50 90 50 70 70 Z" fill="#DC2626" />
          {/* Stem & Leaf */}
          <path d="M 100 65 C 100 40 115 25 125 20" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
          <path d="M 105 45 C 130 30 145 40 145 40 C 145 40 135 60 110 55 Z" fill="#22C55E" />
          {/* Highlight */}
          <ellipse cx="75" cy="95" rx="14" ry="24" transform="rotate(-25 75 95)" fill="#FFFFFF" fillOpacity="0.4" />
          {/* Cute Smile */}
          <circle cx="85" cy="115" r="5" fill="#1E293B" />
          <circle cx="115" cy="115" r="5" fill="#1E293B" />
          <path d="M 94 125 Q 100 135 106 125" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="76" cy="122" rx="5" ry="3" fill="#F87171" />
          <ellipse cx="124" cy="122" rx="5" ry="3" fill="#F87171" />
        </svg>
      );

    case 'B': // Ball
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="75" fill="#3B82F6" />
          {/* Slices of beach ball */}
          <path d="M 100 25 A 75 75 0 0 1 175 100 L 100 100 Z" fill="#EF4444" />
          <path d="M 175 100 A 75 75 0 0 1 100 175 L 100 100 Z" fill="#EAB308" />
          <path d="M 100 175 A 75 75 0 0 1 25 100 L 100 100 Z" fill="#10B981" />
          {/* Center cap */}
          <circle cx="100" cy="100" r="22" fill="#FFFFFF" />
          <circle cx="100" cy="100" r="14" fill="#6366F1" />
          {/* Highlight */}
          <ellipse cx="65" cy="65" rx="15" ry="8" transform="rotate(-40 65 65)" fill="#FFFFFF" fillOpacity="0.5" />
        </svg>
      );

    case 'C': // Cat
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ears */}
          <polygon points="50,90 40,30 90,65" fill="#F59E0B" />
          <polygon points="52,80 47,42 80,68" fill="#FDE68A" />
          <polygon points="150,90 160,30 110,65" fill="#F59E0B" />
          <polygon points="148,80 153,42 120,68" fill="#FDE68A" />
          {/* Head */}
          <circle cx="100" cy="110" r="65" fill="#F59E0B" />
          {/* Cheeks & Eyes */}
          <ellipse cx="80" cy="105" rx="7" ry="10" fill="#1E293B" />
          <ellipse cx="120" cy="105" rx="7" ry="10" fill="#1E293B" />
          <circle cx="78" cy="102" r="3" fill="#FFFFFF" />
          <circle cx="118" cy="102" r="3" fill="#FFFFFF" />
          {/* Nose & Mouth */}
          <polygon points="95,118 105,118 100,125" fill="#EF4444" />
          <path d="M 93 126 C 96 135 100 133 100 133 C 100 133 104 135 107 126" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          {/* Whiskers */}
          <line x1="45" y1="115" x2="70" y2="118" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="45" y1="128" x2="70" y2="125" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="130" y1="118" x2="155" y2="115" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="130" y1="125" x2="155" y2="128" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'D': // Dog
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Floppy Ears */}
          <path d="M 50 70 C 30 70 20 120 40 140 C 55 150 65 110 60 85 Z" fill="#92400E" />
          <path d="M 150 70 C 170 70 180 120 160 140 C 145 150 135 110 140 85 Z" fill="#92400E" />
          {/* Head */}
          <circle cx="100" cy="105" r="60" fill="#D97706" />
          {/* White Muzzle */}
          <ellipse cx="100" cy="125" rx="35" ry="25" fill="#FEF3C7" />
          {/* Nose */}
          <ellipse cx="100" cy="115" rx="12" ry="8" fill="#1E293B" />
          {/* Tongue */}
          <path d="M 95 135 C 95 152 105 152 105 135 Z" fill="#F43F5E" />
          {/* Eyes */}
          <circle cx="80" cy="95" r="8" fill="#1E293B" />
          <circle cx="120" cy="95" r="8" fill="#1E293B" />
          <circle cx="78" cy="92" r="3" fill="#FFFFFF" />
          <circle cx="118" cy="92" r="3" fill="#FFFFFF" />
        </svg>
      );

    case 'E': // Elephant
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ears */}
          <ellipse cx="50" cy="95" rx="35" ry="45" fill="#818CF8" />
          <ellipse cx="50" cy="95" rx="22" ry="30" fill="#C7D2FE" />
          <ellipse cx="150" cy="95" rx="35" ry="45" fill="#818CF8" />
          <ellipse cx="150" cy="95" rx="22" ry="30" fill="#C7D2FE" />
          {/* Head */}
          <circle cx="100" cy="100" r="50" fill="#6366F1" />
          {/* Trunk */}
          <path d="M 95 110 Q 100 150 120 155 Q 135 155 135 140" fill="none" stroke="#6366F1" strokeWidth="18" strokeLinecap="round" />
          {/* Eyes */}
          <circle cx="82" cy="90" r="6" fill="#1E293B" />
          <circle cx="118" cy="90" r="6" fill="#1E293B" />
          <circle cx="80" cy="88" r="2" fill="#FFFFFF" />
          <circle cx="116" cy="88" r="2" fill="#FFFFFF" />
        </svg>
      );

    case 'F': // Fish
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Tail Fin */}
          <polygon points="45,100 15,65 15,135" fill="#F97316" />
          {/* Body */}
          <ellipse cx="105" cy="100" rx="65" ry="45" fill="#06B6D4" />
          {/* Stripes */}
          <path d="M 85 60 Q 95 100 85 140" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
          <path d="M 125 65 Q 135 100 125 135" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
          {/* Top/Bottom Fins */}
          <path d="M 100 55 Q 115 30 135 55 Z" fill="#F97316" />
          <path d="M 100 145 Q 115 170 135 145 Z" fill="#F97316" />
          {/* Eye */}
          <circle cx="145" cy="92" r="8" fill="#FFFFFF" />
          <circle cx="147" cy="92" r="5" fill="#1E293B" />
          {/* Bubbles */}
          <circle cx="175" cy="80" r="6" fill="#E0F2FE" opacity="0.8" />
          <circle cx="185" cy="65" r="4" fill="#E0F2FE" opacity="0.8" />
        </svg>
      );

    case 'G': // Grapes
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stem & Leaf */}
          <path d="M 100 45 Q 100 20 115 15" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          <path d="M 100 40 C 80 20 60 40 60 40 C 60 40 75 60 95 50 Z" fill="#22C55E" />
          {/* Grape Circles */}
          {/* Top row */}
          <circle cx="75" cy="70" r="18" fill="#9333EA" />
          <circle cx="100" cy="65" r="18" fill="#A855F7" />
          <circle cx="125" cy="70" r="18" fill="#9333EA" />
          {/* Middle row */}
          <circle cx="65" cy="100" r="18" fill="#7E22CE" />
          <circle cx="90" cy="95" r="18" fill="#9333EA" />
          <circle cx="115" cy="95" r="18" fill="#A855F7" />
          <circle cx="135" cy="100" r="18" fill="#7E22CE" />
          {/* Lower row */}
          <circle cx="80" cy="125" r="18" fill="#9333EA" />
          <circle cx="105" cy="125" r="18" fill="#7E22CE" />
          <circle cx="120" cy="125" r="18" fill="#A855F7" />
          {/* Bottom */}
          <circle cx="95" cy="155" r="17" fill="#6B21A8" />
        </svg>
      );

    case 'H': // House
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Chimney */}
          <rect x="130" y="45" width="20" height="40" fill="#DC2626" />
          <circle cx="145" cy="35" r="7" fill="#E2E8F0" />
          <circle cx="152" cy="22" r="10" fill="#E2E8F0" />
          {/* Roof */}
          <polygon points="100,35 25,95 175,95" fill="#EF4444" />
          {/* Body */}
          <rect x="45" y="95" width="110" height="85" fill="#FEF08A" stroke="#F59E0B" strokeWidth="4" />
          {/* Door */}
          <rect x="85" y="125" width="30" height="55" rx="5" fill="#B45309" />
          <circle cx="92" cy="152" r="3" fill="#FDE047" />
          {/* Windows */}
          <rect x="55" y="110" width="22" height="22" rx="3" fill="#67E8F9" stroke="#0284C7" strokeWidth="2.5" />
          <rect x="123" y="110" width="22" height="22" rx="3" fill="#67E8F9" stroke="#0284C7" strokeWidth="2.5" />
        </svg>
      );

    case 'I': // Ice Cream
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cone */}
          <polygon points="65,115 135,115 100,185" fill="#D97706" />
          <line x1="75" y1="125" x2="115" y2="165" stroke="#B45309" strokeWidth="2" />
          <line x1="125" y1="125" x2="85" y2="165" stroke="#B45309" strokeWidth="2" />
          {/* Scoops */}
          <circle cx="100" cy="100" r="38" fill="#F43F5E" /> {/* Strawberry */}
          <circle cx="100" cy="65" r="32" fill="#FDE047" /> {/* Mango */}
          <circle cx="100" cy="38" r="24" fill="#38BDF8" /> {/* Blue Vanilla */}
          {/* Cherry */}
          <circle cx="100" cy="20" r="10" fill="#DC2626" />
          <path d="M 105 16 Q 115 5 125 8" stroke="#78350F" strokeWidth="2.5" fill="none" />
          {/* Sprinkles */}
          <rect x="88" y="60" width="6" height="3" rx="1.5" fill="#FFFFFF" />
          <rect x="108" y="72" width="6" height="3" rx="1.5" fill="#10B981" />
        </svg>
      );

    case 'J': // Juice
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glass */}
          <polygon points="65,60 135,60 125,175 75,175" fill="#BAE6FD" opacity="0.4" stroke="#38BDF8" strokeWidth="4" />
          {/* Orange Juice liquid */}
          <polygon points="68,85 132,85 123,172 77,172" fill="#F97316" />
          {/* Straw */}
          <path d="M 110 160 L 115 45 L 140 30" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" fill="none" />
          {/* Orange Slice on Rim */}
          <path d="M 50 65 A 25 25 0 0 1 75 40 Z" fill="#F59E0B" />
          <circle cx="100" cy="115" r="6" fill="#FDBA74" />
          <circle cx="90" cy="135" r="4" fill="#FDBA74" />
        </svg>
      );

    case 'K': // Kite
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Diamond Kite */}
          <polygon points="100,20 165,85 100,145 35,85" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
          <polygon points="100,20 165,85 100,85" fill="#EF4444" />
          <polygon points="100,85 165,85 100,145" fill="#EAB308" />
          <polygon points="35,85 100,85 100,145" fill="#10B981" />
          {/* String */}
          <path d="M 100 145 Q 85 170 110 190" stroke="#64748B" strokeWidth="2.5" fill="none" />
          {/* Ribbons */}
          <polygon points="88,160 98,155 93,165" fill="#EC4899" />
          <polygon points="102,175 112,170 107,180" fill="#F59E0B" />
        </svg>
      );

    case 'L': // Lion
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Fluffy Mane */}
          <circle cx="100" cy="100" r="70" fill="#EA580C" />
          {/* Head */}
          <circle cx="100" cy="105" r="48" fill="#FBBF24" />
          {/* Ears */}
          <circle cx="65" cy="70" r="14" fill="#FBBF24" />
          <circle cx="65" cy="70" r="8" fill="#EA580C" />
          <circle cx="135" cy="70" r="14" fill="#FBBF24" />
          <circle cx="135" cy="70" r="8" fill="#EA580C" />
          {/* Eyes & Nose */}
          <circle cx="85" cy="100" r="6" fill="#1E293B" />
          <circle cx="115" cy="100" r="6" fill="#1E293B" />
          <polygon points="94,112 106,112 100,120" fill="#991B1B" />
          <path d="M 94 122 Q 100 128 106 122" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'M': // Monkey
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ears */}
          <circle cx="45" cy="95" r="25" fill="#854D0E" />
          <circle cx="45" cy="95" r="14" fill="#FEF08A" />
          <circle cx="155" cy="95" r="25" fill="#854D0E" />
          <circle cx="155" cy="95" r="14" fill="#FEF08A" />
          {/* Head */}
          <circle cx="100" cy="100" r="55" fill="#854D0E" />
          {/* Face */}
          <ellipse cx="85" cy="90" rx="20" ry="22" fill="#FEF08A" />
          <ellipse cx="115" cy="90" rx="20" ry="22" fill="#FEF08A" />
          <ellipse cx="100" cy="120" rx="35" ry="24" fill="#FEF08A" />
          {/* Eyes */}
          <circle cx="85" cy="92" r="5" fill="#1E293B" />
          <circle cx="115" cy="92" r="5" fill="#1E293B" />
          {/* Smile */}
          <path d="M 85 125 Q 100 138 115 125" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <circle cx="95" cy="115" r="2" fill="#854D0E" />
          <circle cx="105" cy="115" r="2" fill="#854D0E" />
        </svg>
      );

    case 'N': // Nest
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Nest Twigs */}
          <path d="M 30 115 C 30 165 170 165 170 115 Z" fill="#92400E" />
          <path d="M 25 110 Q 100 135 175 110" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
          <path d="M 40 130 Q 100 155 160 130" stroke="#B45309" strokeWidth="6" strokeLinecap="round" />
          <path d="M 50 145 Q 100 165 150 145" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
          {/* 3 Eggs */}
          <ellipse cx="75" cy="100" rx="15" ry="20" transform="rotate(-15 75 100)" fill="#7DD3FC" stroke="#0284C7" strokeWidth="2" />
          <ellipse cx="100" cy="95" rx="16" ry="22" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
          <ellipse cx="125" cy="100" rx="15" ry="20" transform="rotate(15 125 100)" fill="#7DD3FC" stroke="#0284C7" strokeWidth="2" />
        </svg>
      );

    case 'O': // Orange
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="110" r="65" fill="#F97316" />
          {/* Leaf & Stem */}
          <path d="M 100 45 L 100 30" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          <path d="M 100 35 C 125 20 140 35 140 35 C 140 35 130 55 105 45 Z" fill="#16A34A" />
          {/* Texture dots */}
          <circle cx="75" cy="90" r="2.5" fill="#EA580C" />
          <circle cx="125" cy="105" r="2.5" fill="#EA580C" />
          <circle cx="100" cy="145" r="2.5" fill="#EA580C" />
          <circle cx="85" cy="130" r="2.5" fill="#EA580C" />
          {/* Cheerful face */}
          <circle cx="85" cy="108" r="5" fill="#1E293B" />
          <circle cx="115" cy="108" r="5" fill="#1E293B" />
          <path d="M 94 118 Q 100 126 106 118" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          <circle cx="75" cy="116" r="5" fill="#FB923C" />
          <circle cx="125" cy="116" r="5" fill="#FB923C" />
        </svg>
      );

    case 'P': // Panda
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Black Ears */}
          <circle cx="55" cy="65" r="24" fill="#0F172A" />
          <circle cx="145" cy="65" r="24" fill="#0F172A" />
          {/* White Head */}
          <circle cx="100" cy="110" r="62" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="3" />
          {/* Black Eye Patches */}
          <ellipse cx="75" cy="105" rx="16" ry="13" transform="rotate(-20 75 105)" fill="#0F172A" />
          <ellipse cx="125" cy="105" rx="16" ry="13" transform="rotate(20 125 105)" fill="#0F172A" />
          {/* Sparkly Eyes */}
          <circle cx="76" cy="104" r="5" fill="#FFFFFF" />
          <circle cx="124" cy="104" r="5" fill="#FFFFFF" />
          {/* Nose & Smile */}
          <ellipse cx="100" cy="120" rx="9" ry="6" fill="#0F172A" />
          <path d="M 94 126 Q 100 133 106 126" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          {/* Rosy cheeks */}
          <circle cx="62" cy="124" r="7" fill="#FDA4AF" opacity="0.8" />
          <circle cx="138" cy="124" r="7" fill="#FDA4AF" opacity="0.8" />
        </svg>
      );

    case 'Q': // Queen
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Golden Crown */}
          <polygon points="65,70 70,30 85,55 100,25 115,55 130,30 135,70" fill="#FACC15" stroke="#EAB308" strokeWidth="2" />
          {/* Crown Jewels */}
          <circle cx="70" cy="30" r="4" fill="#EF4444" />
          <circle cx="100" cy="25" r="5" fill="#3B82F6" />
          <circle cx="130" cy="30" r="4" fill="#10B981" />
          {/* Queen Hair */}
          <path d="M 60 90 C 50 140 60 160 65 170 C 70 140 70 100 70 90" fill="#78350F" />
          <path d="M 140 90 C 150 140 140 160 135 170 C 130 140 130 100 130 90" fill="#78350F" />
          {/* Head */}
          <circle cx="100" cy="105" r="45" fill="#FED7AA" />
          {/* Royal Dress Collar */}
          <path d="M 70 150 Q 100 170 130 150 L 140 185 L 60 185 Z" fill="#D946EF" />
          {/* Face */}
          <circle cx="85" cy="105" r="5" fill="#1E293B" />
          <circle cx="115" cy="105" r="5" fill="#1E293B" />
          <path d="M 94 120 Q 100 128 106 120" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'R': // Rainbow
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rainbow Arcs */}
          <path d="M 35 140 A 65 65 0 0 1 165 140" stroke="#EF4444" strokeWidth="11" fill="none" />
          <path d="M 45 140 A 55 55 0 0 1 155 140" stroke="#F97316" strokeWidth="11" fill="none" />
          <path d="M 55 140 A 45 45 0 0 1 145 140" stroke="#FACC15" strokeWidth="11" fill="none" />
          <path d="M 65 140 A 35 35 0 0 1 135 140" stroke="#22C55E" strokeWidth="11" fill="none" />
          <path d="M 75 140 A 25 25 0 0 1 125 140" stroke="#3B82F6" strokeWidth="11" fill="none" />
          <path d="M 85 140 A 15 15 0 0 1 115 140" stroke="#9333EA" strokeWidth="11" fill="none" />
          {/* Fluffy Clouds at ends */}
          <g transform="translate(15, 120)">
            <circle cx="20" cy="20" r="15" fill="#FFFFFF" />
            <circle cx="35" cy="15" r="18" fill="#FFFFFF" />
            <circle cx="50" cy="22" r="14" fill="#FFFFFF" />
          </g>
          <g transform="translate(125, 120)">
            <circle cx="15" cy="22" r="14" fill="#FFFFFF" />
            <circle cx="30" cy="15" r="18" fill="#FFFFFF" />
            <circle cx="45" cy="20" r="15" fill="#FFFFFF" />
          </g>
        </svg>
      );

    case 'S': // Sun
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sunrays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="100"
              y1="25"
              x2="100"
              y2="45"
              transform={`rotate(${angle} 100 100)`}
              stroke="#F59E0B"
              strokeWidth="8"
              strokeLinecap="round"
            />
          ))}
          {/* Sun body */}
          <circle cx="100" cy="100" r="52" fill="#FACC15" stroke="#F59E0B" strokeWidth="4" />
          {/* Happy Face */}
          <circle cx="82" cy="95" r="6" fill="#1E293B" />
          <circle cx="118" cy="95" r="6" fill="#1E293B" />
          <circle cx="80" cy="92" r="2" fill="#FFFFFF" />
          <circle cx="116" cy="92" r="2" fill="#FFFFFF" />
          <path d="M 85 110 Q 100 128 115 110" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
          {/* Rosy Cheeks */}
          <circle cx="72" cy="108" r="6" fill="#FB923C" opacity="0.8" />
          <circle cx="128" cy="108" r="6" fill="#FB923C" opacity="0.8" />
        </svg>
      );

    case 'T': // Train
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Smoke Puffs */}
          <circle cx="70" cy="40" r="8" fill="#CBD5E1" />
          <circle cx="60" cy="25" r="12" fill="#CBD5E1" />
          {/* Chimney */}
          <rect x="65" y="60" width="16" height="25" fill="#475569" />
          {/* Engine Body */}
          <rect x="40" y="85" width="80" height="50" rx="8" fill="#EF4444" />
          {/* Cabin */}
          <rect x="115" y="65" width="55" height="70" rx="5" fill="#3B82F6" />
          {/* Cabin Window */}
          <rect x="125" y="75" width="35" height="25" rx="3" fill="#BAE6FD" />
          {/* Cowcatcher / Front */}
          <polygon points="40,115 20,135 40,135" fill="#F59E0B" />
          {/* Wheels */}
          <circle cx="65" cy="145" r="16" fill="#1E293B" stroke="#94A3B8" strokeWidth="4" />
          <circle cx="105" cy="145" r="16" fill="#1E293B" stroke="#94A3B8" strokeWidth="4" />
          <circle cx="145" cy="145" r="18" fill="#1E293B" stroke="#F59E0B" strokeWidth="4" />
        </svg>
      );

    case 'U': // Umbrella
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Top Tip */}
          <line x1="100" y1="35" x2="100" y2="45" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          {/* Canopy */}
          <path d="M 30 110 C 30 55 170 55 170 110 Q 152 100 135 110 Q 118 100 100 110 Q 82 100 65 110 Q 48 100 30 110 Z" fill="#06B6D4" />
          <path d="M 65 110 C 65 70 135 70 135 110" fill="#F43F5E" />
          <path d="M 85 110 C 85 80 115 80 115 110" fill="#FACC15" />
          {/* Shaft & Handle */}
          <path d="M 100 45 L 100 155 Q 100 175 82 175" stroke="#78350F" strokeWidth="7" strokeLinecap="round" fill="none" />
          {/* Raindrops */}
          <path d="M 35 140 L 35 155" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <path d="M 165 135 L 165 150" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'V': // Violin
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Neck & Scroll */}
          <rect x="94" y="25" width="12" height="60" fill="#78350F" />
          <circle cx="100" cy="20" r="10" fill="#92400E" />
          {/* Violin Body (hourglass) */}
          <path d="M 80 85 C 65 95 65 115 75 125 C 60 140 65 165 85 175 C 105 180 115 180 135 165 C 145 150 140 135 125 125 C 135 115 135 95 120 85 Z" fill="#D97706" stroke="#92400E" strokeWidth="3" />
          {/* F-holes */}
          <path d="M 85 130 Q 82 140 86 148" stroke="#78350F" strokeWidth="3" fill="none" />
          <path d="M 115 130 Q 118 140 114 148" stroke="#78350F" strokeWidth="3" fill="none" />
          {/* Strings */}
          <line x1="97" y1="30" x2="97" y2="165" stroke="#F8FAFC" strokeWidth="1.5" />
          <line x1="103" y1="30" x2="103" y2="165" stroke="#F8FAFC" strokeWidth="1.5" />
          {/* Bow */}
          <line x1="55" y1="160" x2="155" y2="60" stroke="#78350F" strokeWidth="4" />
        </svg>
      );

    case 'W': // Watermelon
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Green outer rind */}
          <path d="M 25 100 C 25 165 175 165 175 100 Z" fill="#15803D" />
          {/* Light green layer */}
          <path d="M 33 100 C 33 157 167 157 167 100 Z" fill="#86EFAC" />
          {/* Juicy Red flesh */}
          <path d="M 40 100 C 40 150 160 150 160 100 Z" fill="#EF4444" />
          {/* Seeds */}
          <ellipse cx="70" cy="115" rx="3" ry="5" fill="#1E293B" transform="rotate(-15 70 115)" />
          <ellipse cx="90" cy="125" rx="3" ry="5" fill="#1E293B" />
          <ellipse cx="110" cy="125" rx="3" ry="5" fill="#1E293B" />
          <ellipse cx="130" cy="115" rx="3" ry="5" fill="#1E293B" transform="rotate(15 130 115)" />
          <ellipse cx="100" cy="110" rx="3" ry="5" fill="#1E293B" />
        </svg>
      );

    case 'X': // Xylophone
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Frame bars */}
          <polygon points="35,145 165,160 155,170 30,155" fill="#78350F" />
          <polygon points="50,55 150,75 140,85 45,65" fill="#78350F" />
          {/* Rainbow keys */}
          <rect x="40" y="50" width="16" height="115" rx="4" fill="#EF4444" />
          <rect x="60" y="55" width="16" height="105" rx="4" fill="#F97316" />
          <rect x="80" y="60" width="16" height="95" rx="4" fill="#FACC15" />
          <rect x="100" y="65" width="16" height="85" rx="4" fill="#22C55E" />
          <rect x="120" y="70" width="16" height="75" rx="4" fill="#06B6D4" />
          <rect x="140" y="75" width="16" height="65" rx="4" fill="#8B5CF6" />
          {/* Mallet */}
          <line x1="110" y1="25" x2="70" y2="120" stroke="#A16207" strokeWidth="4" />
          <circle cx="110" cy="25" r="9" fill="#F43F5E" />
        </svg>
      );

    case 'Y': // Yo-yo
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* String */}
          <path d="M 100 25 Q 90 70 95 110" stroke="#E2E8F0" strokeWidth="4" fill="none" />
          <circle cx="100" cy="22" r="6" fill="#F59E0B" />
          {/* Yo-yo halves */}
          <ellipse cx="90" cy="130" rx="30" ry="42" fill="#EAB308" stroke="#CA8A04" strokeWidth="3" />
          <ellipse cx="110" cy="130" rx="30" ry="42" fill="#EF4444" stroke="#DC2626" strokeWidth="3" />
          {/* Center axle & star motif */}
          <circle cx="100" cy="130" r="16" fill="#3B82F6" />
          <polygon points="100,120 103,127 110,127 105,132 107,139 100,135 93,139 95,132 90,127 97,127" fill="#FACC15" />
        </svg>
      );

    case 'Z': // Zebra
      return (
        <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mane */}
          <path d="M 60 40 Q 90 55 90 85 L 80 85 Z" fill="#0F172A" />
          {/* Head */}
          <ellipse cx="105" cy="100" rx="45" ry="55" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="3" />
          {/* Ears */}
          <polygon points="75,60 65,25 90,45" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2" />
          <polygon points="72,55 68,32 82,45" fill="#FDA4AF" />
          <polygon points="120,60 130,25 105,45" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2" />
          <polygon points="118,55 124,32 110,45" fill="#FDA4AF" />
          {/* Black Zebra Stripes */}
          <path d="M 75 75 Q 90 85 75 95" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <path d="M 135 75 Q 120 85 135 95" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <path d="M 70 105 Q 90 115 70 125" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <path d="M 140 105 Q 120 115 140 125" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          {/* Muzzle */}
          <ellipse cx="105" cy="135" rx="26" ry="18" fill="#1E293B" />
          <circle cx="97" cy="132" r="3" fill="#64748B" />
          <circle cx="113" cy="132" r="3" fill="#64748B" />
          {/* Friendly Eyes */}
          <circle cx="90" cy="95" r="6" fill="#0F172A" />
          <circle cx="120" cy="95" r="6" fill="#0F172A" />
          <circle cx="88" cy="92" r="2.5" fill="#FFFFFF" />
          <circle cx="118" cy="92" r="2.5" fill="#FFFFFF" />
        </svg>
      );

    default:
      return null;
  }
};
