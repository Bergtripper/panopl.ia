import React from 'react';

export const DotMarker = ({ size = 7, className = '' }: { size?: number; className?: string }) => (
  <span className={`dz-dot-marker ${className}`} style={{ width: size, height: size }} aria-hidden="true" />
);

export const SystemGlyph = ({ size = 28, className = '' }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 42 24" width={size} height={(size * 24) / 42} role="img" aria-label="Open direction / system" className={`dz-system-glyph ${className}`}>
    <path d="M11 3 L3 12 L11 21" />
    <path className="dz-system-glyph__slash" d="M25 2 L17 22" />
    <path d="M31 3 L39 12 L31 21" />
  </svg>
);

export const FieldGlyph = ({ size = 22, className = '' }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 24 32" width={size} height={(size * 32) / 24} role="img" aria-label="Zero / field" className={`dz-field-glyph ${className}`}>
    <rect x="3" y="2.5" width="18" height="27" rx="9" />
  </svg>
);
