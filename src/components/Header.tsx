import { useEffect, useState } from 'react';
import { Grid3X3, Moon, Sun } from 'lucide-react';
import type { ColorMode, Language } from '../types';
import { DotzeroLogotype, DotzeroMark } from '../foundation/Identity';
import { DotMarker, SystemGlyph } from '../foundation/GraphicSyntax';
import { TypographySwitch } from '../foundation/TypographySwitch';

export const Header = ({ colorMode, setColorMode, showGrid, setShowGrid, language, setLanguage }: {
  colorMode: ColorMode;
  setColorMode: (value: ColorMode) => void;
  showGrid: boolean;
  setShowGrid: (value: boolean) => void;
  language: Language;
  setLanguage: (value: Language) => void;
}) => {
  const [compactBrand, setCompactBrand] = useState(false);
  useEffect(() => {
    const sync = () => setCompactBrand(window.scrollY > 32);
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    return () => window.removeEventListener('scroll', sync);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b dz-border bg-[color:var(--bg)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <a href="#top" className="dz-brand-lockup" aria-label="DOTZERO — personal research lab">
            <span className="dz-brand-state" data-compact={compactBrand}>
              {compactBrand ? <DotzeroMark className="dz-brand-state__item" /> : <DotzeroLogotype className="dz-brand-state__item w-[126px] sm:w-[148px]" />}
            </span>
          </a>
          <div className="hidden h-6 w-px bg-[var(--line-soft)] sm:block" />
          <a href="#top" className="hidden font-mono text-[10px] font-semibold uppercase tracking-[0.19em] sm:block">PANOPL.IA</a>
        </div>

        <nav className="hidden items-center gap-5 font-mono text-[9px] uppercase tracking-[0.16em] lg:flex">
          <a href="#capabilities" className="nav-link"><DotMarker size={5} />Capabilities</a>
          <a href="#arsenal" className="nav-link"><DotMarker size={5} />Arsenal</a>
          <a href="#recipes" className="nav-link"><SystemGlyph size={14} />Recipes</a>
          <a href="#tests" className="nav-link"><DotMarker size={5} />Tests</a>
          <a href="#timeline" className="nav-link"><DotMarker size={5} />Time</a>
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="hidden 2xl:block"><TypographySwitch compact /></div>
          <div className="hidden border dz-border md:flex">
            {(['it', 'de', 'en'] as Language[]).map((lng) => (
              <button key={lng} onClick={() => setLanguage(lng)} className={`px-2 py-1 font-mono text-[9px] font-bold uppercase ${language === lng ? 'bg-[var(--text)] text-[var(--bg)]' : 'dz-surface-raised dz-text'}`}>{lng}</button>
            ))}
          </div>
          <button onClick={() => setShowGrid(!showGrid)} className={`border dz-border p-1.5 ${showGrid ? 'bg-[var(--text)] text-[var(--bg)]' : 'dz-surface-raised dz-text'}`} aria-label="Toggle grid"><Grid3X3 className="h-3.5 w-3.5" /></button>
          <button onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')} className="border dz-border dz-surface-raised dz-text p-1.5" aria-label="Toggle color mode">{colorMode === 'light' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}</button>
        </div>
      </div>
    </header>
  );
};
