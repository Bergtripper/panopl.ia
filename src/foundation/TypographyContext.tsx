import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { TypographyPreset } from '../types';

interface TypographyContextValue {
  typography: TypographyPreset;
  setTypography: (preset: TypographyPreset) => void;
}

const STORAGE_KEY = 'dotzero-typography';
const DEFAULT_PRESET: TypographyPreset = 'plex';
const TypographyContext = createContext<TypographyContextValue | undefined>(undefined);

export const TypographyProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [typography, setTypography] = useState<TypographyPreset>(() => {
    if (typeof window === 'undefined') return DEFAULT_PRESET;
    const saved = window.localStorage.getItem(STORAGE_KEY) as TypographyPreset | null;
    return saved && ['plex', 'swiss', 'grotesk', 'syne'].includes(saved) ? saved : DEFAULT_PRESET;
  });

  useEffect(() => {
    document.documentElement.dataset.typography = typography;
    window.localStorage.setItem(STORAGE_KEY, typography);
  }, [typography]);

  const value = useMemo(() => ({ typography, setTypography }), [typography]);
  return <TypographyContext.Provider value={value}>{children}</TypographyContext.Provider>;
};

export const useTypography = () => {
  const context = useContext(TypographyContext);
  if (!context) throw new Error('useTypography must be used within TypographyProvider');
  return context;
};
