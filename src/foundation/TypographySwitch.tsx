import type { TypographyPreset } from '../types';
import { useTypography } from './TypographyContext';

const OPTIONS: Array<{ id: TypographyPreset; label: string }> = [
  { id: 'plex', label: 'PLEX' },
  { id: 'swiss', label: 'SWISS' },
  { id: 'grotesk', label: 'GROTESK' },
  { id: 'syne', label: 'SYNE' },
];

export const TypographySwitch = ({ compact = false }: { compact?: boolean }) => {
  const { typography, setTypography } = useTypography();
  return (
    <div className={`dz-type-switch ${compact ? 'is-compact' : ''}`} role="group" aria-label="Typography">
      <span className="dz-type-switch__label">TYPE</span>
      {OPTIONS.map((option) => (
        <button key={option.id} type="button" onClick={() => setTypography(option.id)} aria-pressed={typography === option.id} className={`dz-type-switch__option ${typography === option.id ? 'is-active' : ''}`}>
          {option.label}
        </button>
      ))}
    </div>
  );
};
