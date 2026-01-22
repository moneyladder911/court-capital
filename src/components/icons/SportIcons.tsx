import React from "react";

export const PadelIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="8" rx="6" ry="4" />
    <path d="M6 8v8a6 4 0 0 0 12 0V8" />
    <circle cx="9" cy="10" r="1" fill="currentColor" />
    <circle cx="15" cy="10" r="1" fill="currentColor" />
    <circle cx="12" cy="13" r="1" fill="currentColor" />
    <circle cx="9" cy="16" r="1" fill="currentColor" />
    <circle cx="15" cy="16" r="1" fill="currentColor" />
  </svg>
);

export const TennisIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3c-2 3-2 6 0 9s2 6 0 9" />
    <path d="M3 12h18" />
  </svg>
);

export const GolfIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 18V3l7 4-7 4" />
    <path d="M5 21c0-2 3-3 7-3s7 1 7 3" />
  </svg>
);

export const GymIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6.5 6.5L17.5 17.5" />
    <path d="M3 10l2-2 2 2" />
    <path d="M5 8v8" />
    <path d="M17 16l2 2 2-2" />
    <path d="M19 8v8" />
    <rect x="8" y="10" width="8" height="4" rx="1" />
  </svg>
);

export const RunningIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="14" cy="4" r="2" />
    <path d="M4 17l3-3 3 2 5-5 2-4" />
    <path d="M10 16l-3 4" />
    <path d="M15 10l3 6h3" />
  </svg>
);

export const CombatIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4l4 4M20 4l-4 4" />
    <circle cx="12" cy="12" r="6" />
    <path d="M9 10h6M9 14h6" />
  </svg>
);
