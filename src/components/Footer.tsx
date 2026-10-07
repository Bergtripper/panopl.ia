import { DotMarker, SystemGlyph } from '../foundation/GraphicSyntax';

export const Footer = () => (
  <footer className="border-t dz-border">
    <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-8 font-mono text-[10px] uppercase tracking-[0.14em] dz-text-muted sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
      <span className="inline-flex items-center gap-2"><DotMarker size={5} />.DOTZERO · PANOPL.IA · NODE 05 · 2026</span>
      <span className="inline-flex items-center gap-2"><SystemGlyph size={18} />Capabilities · Workflows · Evidence · Time</span>
    </div>
  </footer>
);
