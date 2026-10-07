'use client';

import { ASCII_ART } from '@/constants/ascii';

interface ProfileCardProps {
  description: React.ReactNode;
}

// No leading-none and no explicit font: the default line height and the inherited
// Geist Mono are what produce the segmented-display texture in the block glyphs
const logoClasses = 'text-[5px] xs:text-[6px] sm:text-[7px] md:text-[8px] whitespace-pre';
const logoStyle = { color: '#9068F7' } as const;

const ProfileCard = ({ description }: ProfileCardProps) => {
  return (
    <div className="mt-6 sm:mt-8">
      {/* KODAKI ASCII Art — glow is a blurred copy behind, so the glyphs on top stay crisp */}
      <div className="mb-4 py-2">
        <div className="relative w-fit">
          <pre
            className={`absolute inset-0 ${logoClasses} blur-[5px] opacity-60`}
            style={logoStyle}
            aria-hidden="true"
          >
            {ASCII_ART.kodaki}
          </pre>
          <pre className={`relative ${logoClasses}`} style={logoStyle}>
            {ASCII_ART.kodaki}
          </pre>
        </div>
      </div>

      {/* Location and Position */}
      <div className="space-y-1 text-xs sm:text-sm mb-3 sm:mb-4" style={{ color: '#727780' }}>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>noida, India</span>
        </div>
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          <span>backend engineer, cs undergrad @ akg ec</span>
        </div>
      </div>

      {/* Description - Left aligned */}
      <p className="text-[13px] leading-relaxed break-words mb-8" style={{ color: '#D1D5DB', wordBreak: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>
        {description}
      </p>
    </div>
  );
};

export default ProfileCard;
