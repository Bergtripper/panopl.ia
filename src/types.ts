export type ColorMode = 'light' | 'dark';
export type Language = 'it' | 'de' | 'en';
export type TypographyPreset = 'plex' | 'swiss' | 'grotesk' | 'syne';
export type CapabilityGroup = 'THINK' | 'MAKE' | 'SEE' | 'MOVE' | 'HEAR' | 'ACT';

export interface Capability {
  id: string;
  code: string;
  group: CapabilityGroup;
  name: string;
  description: string;
}

export interface Tool {
  id: string;
  name: string;
  maker: string;
  kind: 'model' | 'product' | 'platform';
  access: string[];
  price: 1 | 2 | 3 | 4;
  capabilities: Record<string, 0 | 1 | 2 | 3 | 4 | 5>;
  note: string;
}

export interface RecipeStep {
  capability: string;
  label: string;
  preferred: string;
  alternatives: string[];
}

export interface Recipe {
  id: string;
  code: string;
  title: string;
  outcome: string;
  steps: RecipeStep[];
}

export interface TestDefinition {
  id: string;
  code: string;
  title: string;
  capability: string;
  status: 'protocol' | 'queued' | 'observed';
  metric: string;
}
