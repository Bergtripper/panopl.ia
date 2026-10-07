import { useMemo, useState } from 'react';
import type { ChangeEvent, MouseEvent as ReactMouseEvent } from 'react';
import { ArrowRight, Check, ChevronRight, FlaskConical, Search, X } from 'lucide-react';
import { capabilities, eras, recipes, tests, tools } from './data';
import type { CapabilityGroup, ColorMode, Language, Tool } from './types';
import { Footer } from './components/Footer';
import { DotMarker, FieldGlyph, SystemGlyph } from './foundation/GraphicSyntax';
import { Header } from './components/Header';
import { TypographyProvider } from './foundation/TypographyContext';

const groups: CapabilityGroup[] = ['THINK', 'MAKE', 'SEE', 'MOVE', 'HEAR', 'ACT'];

const copy = {
  it: {
    eyebrow: 'DOTZERO / PERSONAL RESEARCH LAB / NODE 05',
    strap: 'An arsenal of artificial capabilities.',
    lead: 'Non quale AI è migliore. Quale combinazione di capacità serve per fare questa cosa?',
    intro: 'PANOPL.IA organizza l’intelligenza artificiale per capacità, non per brand: strumenti, pipeline, test ripetibili e cambiamento nel tempo.',
    matrix: 'Matrice delle capacità', arsenal: 'Arsenale', recipes: 'Recipe / pipeline', tests: 'Test lab', time: 'Time',
    provisional: 'PROFILI EDITORIALI PROVVISORI — NON BENCHMARK SCIENTIFICI',
    filter: 'Filtra strumenti', all: 'Tutti', open: 'Apri profilo', close: 'Chiudi',
  },
  de: {
    eyebrow: 'DOTZERO / PERSONAL RESEARCH LAB / KNOTEN 05',
    strap: 'An arsenal of artificial capabilities.',
    lead: 'Nicht: Welche KI ist die beste? Sondern: Welche Kombination von Fähigkeiten braucht diese Aufgabe?',
    intro: 'PANOPL.IA ordnet künstliche Intelligenz nach Fähigkeiten statt Marken: Werkzeuge, Pipelines, wiederholbare Tests und Veränderung über die Zeit.',
    matrix: 'Fähigkeitsmatrix', arsenal: 'Arsenal', recipes: 'Recipes / Pipelines', tests: 'Testlabor', time: 'Zeit',
    provisional: 'VORLÄUFIGE REDAKTIONELLE PROFILE — KEINE WISSENSCHAFTLICHEN BENCHMARKS',
    filter: 'Werkzeuge filtern', all: 'Alle', open: 'Profil öffnen', close: 'Schließen',
  },
  en: {
    eyebrow: 'DOTZERO / PERSONAL RESEARCH LAB / NODE 05',
    strap: 'An arsenal of artificial capabilities.',
    lead: 'Not which AI is best. Which combination of capabilities does this task require?',
    intro: 'PANOPL.IA organises artificial intelligence by capability rather than brand: tools, pipelines, repeatable tests and change over time.',
    matrix: 'Capability matrix', arsenal: 'Arsenal', recipes: 'Recipes / pipelines', tests: 'Test lab', time: 'Time',
    provisional: 'PROVISIONAL EDITORIAL PROFILES — NOT SCIENTIFIC BENCHMARKS',
    filter: 'Filter tools', all: 'All', open: 'Open profile', close: 'Close',
  },
};

const rating = (value: number) => (
  <span className="rating" aria-label={`${value} of 5`}>
    {Array.from({ length: 5 }).map((_, i) => <span key={i} className={i < value ? 'is-on' : ''} />)}
  </span>
);

const SectionHead = ({ index, title, subtitle }: { index: string; title: string; subtitle: string }) => (
  <div className="section-head">
    <div className="section-index"><DotMarker size={7} />{index}</div>
    <div><h2>{title}</h2><p>{subtitle}</p></div>
  </div>
);

function Panoplia() {
  const [colorMode, setColorMode] = useState<ColorMode>('light');
  const [showGrid, setShowGrid] = useState(true);
  const [language, setLanguage] = useState<Language>('it');
  const [group, setGroup] = useState<CapabilityGroup | 'ALL'>('ALL');
  const [query, setQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const c = copy[language];

  const visibleCapabilities = useMemo(() => capabilities.filter((cap) => group === 'ALL' || cap.group === group), [group]);
  const visibleTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => !q || `${tool.name} ${tool.maker} ${tool.note}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div data-color-mode={colorMode} className="min-h-screen dz-bg dz-text" id="top">
      {showGrid && <div className="foundation-grid" aria-hidden="true">{Array.from({ length: 12 }).map((_, i) => <i key={i} />)}</div>}
      <Header colorMode={colorMode} setColorMode={setColorMode} showGrid={showGrid} setShowGrid={setShowGrid} language={language} setLanguage={setLanguage} />

      <main>
        <section className="hero-shell">
          <div className="hero-meta">{c.eyebrow}</div>
          <div className="hero-grid">
            <div className="hero-title-wrap">
              <div className="hero-code">PANOPL<span className="hero-dot">.</span>IA</div>
              <div className="hero-syntax"><DotMarker size={10} /><FieldGlyph size={18} /><SystemGlyph size={31} /></div>
            </div>
            <div className="hero-copy">
              <p className="hero-strap">{c.strap}</p>
              <h1>{c.lead}</h1>
              <p>{c.intro}</p>
              <a className="hero-action" href="#capabilities"><span>ENTER SYSTEM</span><SystemGlyph size={25} /></a>
            </div>
          </div>
          <div className="hero-status"><span>STATUS / V0.1</span><span>MODE / CAPABILITY-FIRST</span><span>OBSERVED / 2026.10</span></div>
        </section>

        <section id="capabilities" className="content-section">
          <SectionHead index="01" title={c.matrix} subtitle="What can be done — before asking which product does it." />
          <div className="group-filter">
            <button onClick={() => setGroup('ALL')} className={group === 'ALL' ? 'is-active' : ''}>{c.all}</button>
            {groups.map((g) => <button key={g} onClick={() => setGroup(g)} className={group === g ? 'is-active' : ''}>{g}</button>)}
          </div>
          <div className="capability-grid">
            {visibleCapabilities.map((cap) => (
              <article key={cap.id} className="capability-card">
                <div className="capability-top"><span>{cap.code}</span><span>{cap.group}</span></div>
                <h3>{cap.name}</h3>
                <p>{cap.description}</p>
                <div className="capability-tool-count">{tools.filter((tool) => (tool.capabilities[cap.id] ?? 0) > 0).length.toString().padStart(2, '0')} mapped tools</div>
              </article>
            ))}
          </div>
        </section>

        <section id="arsenal" className="content-section section-invertible">
          <SectionHead index="02" title={c.arsenal} subtitle="Tools as capability profiles — not a directory of logos." />
          <div className="arsenal-controls">
            <label className="search-box"><Search size={15} /><span className="sr-only">{c.filter}</span><input value={query} onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} placeholder={c.filter} /></label>
            <div className="provisional-note">{c.provisional}</div>
          </div>
          <div className="arsenal-table-wrap">
            <table className="arsenal-table">
              <thead><tr><th>TOOL</th><th>MAKER</th><th>TYPE</th><th>ACCESS</th><th>COST</th><th>PROFILE</th><th /></tr></thead>
              <tbody>
                {visibleTools.map((tool) => {
                  const strongest = Object.entries(tool.capabilities).sort((a, b) => b[1] - a[1]).slice(0, 2);
                  return (
                    <tr key={tool.id}>
                      <td className="tool-name"><DotMarker size={6} />{tool.name}</td><td>{tool.maker}</td><td>{tool.kind}</td><td>{tool.access.join(' · ')}</td><td>{'€'.repeat(tool.price)}</td>
                      <td>{strongest.map(([id, score]) => <span className="profile-chip" key={id}>{capabilities.find((cap) => cap.id === id)?.name ?? id} {score}</span>)}</td>
                      <td><button className="open-tool" onClick={() => setSelectedTool(tool)} aria-label={`${c.open}: ${tool.name}`}><ChevronRight size={18} /></button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section id="recipes" className="content-section">
          <SectionHead index="03" title={c.recipes} subtitle="A workflow is a chain of capabilities. Tools are replaceable nodes." />
          <div className="recipes-stack">
            {recipes.map((recipe) => (
              <article className="recipe" key={recipe.id}>
                <div className="recipe-header"><span>{recipe.code}</span><h3>{recipe.title}</h3><p>{recipe.outcome}</p></div>
                <div className="recipe-flow">
                  {recipe.steps.map((step, i) => (
                    <div className="recipe-node-wrap" key={`${recipe.id}-${step.label}`}>
                      <div className="recipe-node"><span className="recipe-node-index">{String(i + 1).padStart(2, '0')}</span><strong>{step.label}</strong><span>{step.preferred}</span><small>{step.alternatives.join(' / ')}</small></div>
                      {i < recipe.steps.length - 1 && <ArrowRight className="recipe-arrow" size={20} />}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="tests" className="content-section">
          <SectionHead index="04" title={c.tests} subtitle="Repeatable protocols before rankings. Evidence before preference." />
          <div className="tests-grid">
            {tests.map((test) => (
              <article className="test-card" key={test.id}>
                <div className="test-code"><FlaskConical size={16} />{test.code}</div><div className={`test-status status-${test.status}`}>{test.status}</div>
                <h3>{test.title}</h3><p>CAPABILITY / {capabilities.find((cap) => cap.id === test.capability)?.name}</p><div className="test-metric">METRIC<br /><strong>{test.metric}</strong></div>
              </article>
            ))}
          </div>
        </section>

        <section id="timeline" className="content-section timeline-section">
          <SectionHead index="05" title={c.time} subtitle="PANOPL.IA records when a capability becomes practically useful — not only when a model launches." />
          <div className="timeline-line">
            {eras.map((era, i) => (
              <article className="era" key={era.year}><div className="era-node"><span>{String(i + 1).padStart(2, '0')}</span></div><div className="era-year">{era.year}</div><h3>{era.title}</h3><p>{era.text}</p></article>
            ))}
          </div>
          <div className="timeline-thesis"><FieldGlyph size={30} /><p><strong>2026 →</strong> The object is no longer the model. The object is the <em>system of capabilities</em> assembled around a task.</p></div>
        </section>
      </main>

      <Footer />

      {selectedTool && (
        <div className="drawer-backdrop" onMouseDown={() => setSelectedTool(null)}>
          <aside className="tool-drawer" onMouseDown={(e: ReactMouseEvent<HTMLElement>) => e.stopPropagation()} aria-label={`${selectedTool.name} profile`}>
            <button className="drawer-close" onClick={() => setSelectedTool(null)}><X size={18} /><span>{c.close}</span></button>
            <div className="drawer-kicker"><DotMarker size={7} />ARSENAL / {selectedTool.kind.toUpperCase()}</div>
            <h2>{selectedTool.name}</h2><div className="drawer-maker">{selectedTool.maker}</div><p className="drawer-note">{selectedTool.note}</p>
            <div className="drawer-meta"><div><span>ACCESS</span><strong>{selectedTool.access.join(' · ')}</strong></div><div><span>COST</span><strong>{'€'.repeat(selectedTool.price)}</strong></div></div>
            <div className="drawer-capabilities">
              {capabilities.map((cap) => {
                const value = selectedTool.capabilities[cap.id] ?? 0;
                if (!value) return null;
                return <div className="drawer-capability" key={cap.id}><span>{cap.name}</span>{rating(value)}</div>;
              })}
            </div>
            <div className="drawer-foot"><Check size={15} />PROFILE / EDITORIAL · PROVISIONAL · 2026.10</div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return <TypographyProvider><Panoplia /></TypographyProvider>;
}
