import type { Capability, Recipe, TestDefinition, Tool } from './types';

export const capabilities: Capability[] = [
  { id: 'reason', code: '01.01', group: 'THINK', name: 'Reason', description: 'Structure a problem, infer, compare and decide.' },
  { id: 'research', code: '01.02', group: 'THINK', name: 'Research', description: 'Find, verify, cite and synthesize external information.' },
  { id: 'code', code: '01.03', group: 'THINK', name: 'Code', description: 'Design, write, inspect and change software systems.' },
  { id: 'image-gen', code: '02.01', group: 'MAKE', name: 'Image generation', description: 'Create images from language or visual references.' },
  { id: 'image-edit', code: '02.02', group: 'MAKE', name: 'Image editing', description: 'Transform an existing image while retaining intent.' },
  { id: 'layout', code: '02.03', group: 'MAKE', name: 'Layout / design', description: 'Construct coherent visual and interface compositions.' },
  { id: 'vision', code: '03.01', group: 'SEE', name: 'Vision', description: 'Read images, diagrams, screenshots and visual evidence.' },
  { id: 'ocr', code: '03.02', group: 'SEE', name: 'Text in image', description: 'Interpret textual information embedded in images.' },
  { id: 'video-gen', code: '04.01', group: 'MOVE', name: 'Video generation', description: 'Generate temporal visual sequences.' },
  { id: 'character', code: '04.02', group: 'MOVE', name: 'Character continuity', description: 'Preserve identity and appearance across shots.' },
  { id: 'audio', code: '05.01', group: 'HEAR', name: 'Audio / voice', description: 'Generate, transform or understand spoken audio.' },
  { id: 'agent', code: '06.01', group: 'ACT', name: 'Agentic work', description: 'Use tools and execute multi-step actions toward a goal.' },
  { id: 'repository', code: '06.02', group: 'ACT', name: 'Repository work', description: 'Operate against a codebase with inspect/change loops.' },
];

export const tools: Tool[] = [
  {
    id: 'chatgpt', name: 'ChatGPT', maker: 'OpenAI', kind: 'product', access: ['WEB', 'APP', 'API'], price: 3,
    capabilities: { reason: 5, research: 5, code: 5, vision: 5, 'image-gen': 4, 'image-edit': 4, agent: 5, repository: 5, audio: 4 },
    note: 'General multimodal workbench. Scores are provisional editorial observations, not benchmarks.'
  },
  {
    id: 'claude', name: 'Claude', maker: 'Anthropic', kind: 'product', access: ['WEB', 'APP', 'API'], price: 3,
    capabilities: { reason: 5, research: 4, code: 5, vision: 4, agent: 4, repository: 4 },
    note: 'Strong text, reasoning and software workflows. Provisional editorial profile.'
  },
  {
    id: 'gemini', name: 'Gemini', maker: 'Google', kind: 'product', access: ['WEB', 'APP', 'API'], price: 3,
    capabilities: { reason: 5, research: 5, code: 4, vision: 5, 'image-gen': 4, 'image-edit': 4, 'video-gen': 4, audio: 4, agent: 4 },
    note: 'Broad multimodal ecosystem profile. Provisional editorial profile.'
  },
  {
    id: 'midjourney', name: 'Midjourney', maker: 'Midjourney', kind: 'product', access: ['WEB'], price: 3,
    capabilities: { 'image-gen': 5, 'image-edit': 4, layout: 3 },
    note: 'Image-specialist profile.'
  },
  {
    id: 'veo', name: 'Veo', maker: 'Google', kind: 'model', access: ['WEB', 'API'], price: 4,
    capabilities: { 'video-gen': 5, character: 4 },
    note: 'Video-generation profile. Availability and limits can change.'
  },
  {
    id: 'runway', name: 'Runway', maker: 'Runway', kind: 'platform', access: ['WEB', 'API'], price: 4,
    capabilities: { 'video-gen': 4, character: 4, 'image-edit': 3 },
    note: 'Creative video platform profile.'
  },
  {
    id: 'wan', name: 'Wan', maker: 'Alibaba', kind: 'model', access: ['WEB', 'OPEN'], price: 2,
    capabilities: { 'video-gen': 4, character: 3, 'image-gen': 3 },
    note: 'Open/video-oriented profile; implementations vary.'
  },
  {
    id: 'elevenlabs', name: 'ElevenLabs', maker: 'ElevenLabs', kind: 'platform', access: ['WEB', 'API'], price: 3,
    capabilities: { audio: 5 },
    note: 'Voice and audio specialist profile.'
  },
];

export const recipes: Recipe[] = [
  {
    id: 'consistent-character-video', code: 'R.01', title: 'Consistent character → video', outcome: 'A short moving sequence that keeps a recognisable subject across shots.',
    steps: [
      { capability: 'vision', label: 'Reference audit', preferred: 'ChatGPT', alternatives: ['Gemini'] },
      { capability: 'image-gen', label: 'Identity frame', preferred: 'Midjourney', alternatives: ['ChatGPT', 'Gemini'] },
      { capability: 'video-gen', label: 'Motion pass', preferred: 'Veo', alternatives: ['Runway', 'Wan'] },
      { capability: 'character', label: 'Continuity check', preferred: 'Runway', alternatives: ['Veo'] },
      { capability: 'audio', label: 'Voice / sound', preferred: 'ElevenLabs', alternatives: ['ChatGPT'] },
    ],
  },
  {
    id: 'research-to-interface', code: 'R.02', title: 'Research → working interface', outcome: 'A sourced research question converted into a deployable exploratory tool.',
    steps: [
      { capability: 'research', label: 'Evidence map', preferred: 'ChatGPT', alternatives: ['Gemini', 'Claude'] },
      { capability: 'reason', label: 'System model', preferred: 'Claude', alternatives: ['ChatGPT'] },
      { capability: 'code', label: 'Implementation', preferred: 'ChatGPT', alternatives: ['Claude'] },
      { capability: 'repository', label: 'Repository loop', preferred: 'ChatGPT', alternatives: ['Claude'] },
    ],
  },
  {
    id: 'visual-identity', code: 'R.03', title: 'Visual identity exploration', outcome: 'A controlled identity study from concept through visual variants.',
    steps: [
      { capability: 'reason', label: 'Concept grammar', preferred: 'ChatGPT', alternatives: ['Claude'] },
      { capability: 'image-gen', label: 'Visual field', preferred: 'Midjourney', alternatives: ['ChatGPT'] },
      { capability: 'image-edit', label: 'Controlled refinements', preferred: 'ChatGPT', alternatives: ['Gemini'] },
      { capability: 'layout', label: 'System assembly', preferred: 'ChatGPT', alternatives: ['Gemini'] },
    ],
  },
];

export const tests: TestDefinition[] = [
  { id: 'character-walk', code: 'T.001', title: 'Character continuity / walk', capability: 'character', status: 'protocol', metric: 'identity drift across 5 shots' },
  { id: 'poster-type', code: 'T.002', title: 'Poster typography control', capability: 'image-gen', status: 'queued', metric: 'legibility + layout adherence' },
  { id: 'repo-fix', code: 'T.003', title: 'Repository bug repair', capability: 'repository', status: 'protocol', metric: 'successful fix / regressions / intervention count' },
  { id: 'source-chain', code: 'T.004', title: 'Research source chain', capability: 'research', status: 'protocol', metric: 'claim coverage + source quality' },
];

export const eras = [
  { year: '2022', title: 'GENERATE', text: 'Prompt → isolated output.' },
  { year: '2023', title: 'SEE', text: 'Multimodality becomes a practical interface.' },
  { year: '2024', title: 'REASON', text: 'Longer deliberation and structured problem solving.' },
  { year: '2025', title: 'ACT', text: 'Tool use and multi-step agentic workflows become central.' },
  { year: '2026', title: 'COMPOSE', text: 'Capability selection matters more than model loyalty.' },
];
