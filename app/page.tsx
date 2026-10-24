import type { ReactNode } from 'react';
import content from '../lib/site-content.json';

type IconName = 'arrow' | 'download' | 'nodes' | 'layers' | 'code' | 'document' | 'plus' | 'up';

function Icon({ name }: { name: IconName }) {
  const shapes: Record<IconName, ReactNode> = {
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />,
    nodes: <><circle cx="12" cy="4" r="3" /><circle cx="4" cy="18" r="3" /><circle cx="20" cy="18" r="3" /><path d="m10.5 6.5-5 9m8-9 5 9M7 18h10" /></>,
    layers: <path d="m12 2 10 5-10 5L2 7l10-5ZM2 12l10 5 10-5M2 17l10 5 10-5" />,
    code: <path d="m7 5-6 7 6 7m10-14 6 7-6 7m-3-17-4 20" />,
    document: <path d="M5 2h9l5 5v15H5V2Zm9 0v6h5M8 12h8M8 16h8M8 19h5" />,
    plus: <path d="M4 12h16M12 4v16" />,
    up: <path d="M12 20V4m-6 6 6-6 6 6" />,
  };
  return <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shapes[name]}</svg>;
}

function ContactLink() {
  return <a className="button primary" href={`mailto:${content.email}`}>Get in touch <Icon name="arrow" /></a>;
}

function CVLink({ className = '' }: { className?: string }) {
  return <a className={className} href={content.cv} download="John_Wilson_CV.pdf"><Icon name="download" />Download CV</a>;
}

function Portrait() {
  return <div className="portrait-wrap">
    <div className="portrait" role="img" aria-label="John Wilson — open to work">
      <img className="portrait-photo" src="/john-wilson.jpg" alt="" width="294" height="336" fetchPriority="high" decoding="async" />
      <svg className="portrait-frame" viewBox="0 0 210 210" width="210" height="210" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="availability-ring" x1="0" y1="1" x2="1" y2="0">
            <stop offset="58%" stopColor="var(--available)" />
            <stop offset="74%" stopColor="var(--frame-neutral)" />
          </linearGradient>
          <path id="availability-label" d="M11 105a94 94 0 0 0 188 0" />
        </defs>
        <circle cx="105" cy="105" r="103.5" fill="none" stroke="var(--white)" strokeWidth="3" />
        <circle cx="105" cy="105" r="89" fill="none" stroke="url(#availability-ring)" strokeWidth="28" />
        <text className="portrait-label" fill="var(--white)"><textPath href="#availability-label" startOffset="50%" textAnchor="middle">#OPENTOWORK</textPath></text>
      </svg>
    </div>
  </div>;
}

function Experience() {
  return <section id="experience" className="section wrap" aria-labelledby="experience-title">
    <h2 id="experience-title">Career Experience</h2>
    <div className="careers">{content.careers.map(career => <article className="career" key={career.company}>
      <div className="company-logo"><img src={career.logo} alt={career.company} width="150" height="72" loading="lazy" decoding="async" /></div>
      <div className="career-copy"><h3>{career.role}</h3><p>{career.summary}</p></div>
      <p className="career-date">{career.dates}</p>
    </article>)}</div>
  </section>;
}

const capabilities: { icon: IconName; title: string; description: string; technologies: string }[] = [
  { icon: 'nodes', title: 'AI Platforms', description: 'Intelligent workflows. Practical outcomes.', technologies: 'Agentic AI · RAG · MCP' },
  { icon: 'layers', title: 'Cloud Architecture', description: 'Secure, resilient systems built to scale.', technologies: 'Azure · GCP · Kubernetes' },
  { icon: 'code', title: 'Engineering Leadership', description: 'Hands-on engineering. Disciplined delivery.', technologies: 'React · TypeScript · DevSecOps' },
];

function Expertise() {
  return <div className="soft"><section id="expertise" className="section wrap expertise" aria-labelledby="expertise-title">
    <h2 id="expertise-title">Strategy. <span>Systems.</span> Software.</h2>
    <div className="capabilities">{capabilities.map(item => <article className="capability" key={item.title}>
      <Icon name={item.icon} /><h3>{item.title}</h3><p>{item.description}</p><p className="stack">{item.technologies}</p>
    </article>)}</div>
  </section></div>;
}

function About() {
  return <section id="about" className="section wrap about" aria-labelledby="about-title">
    <div className="about-art"><img src="/architecture.webp" width="960" height="640" alt="" loading="lazy" decoding="async" /></div>
    <div className="about-copy">
      <h2 id="about-title">Technical depth.<br /><span>Business perspective.</span></h2>
      <p>I connect executive strategy with hands-on engineering, building AI platforms, modernising enterprise systems and guiding teams from architecture to delivery.</p>
      <div className="education">
        <div className="degrees"><p><strong>MBA</strong><span>Distinction · 2015–2017</span></p><p><strong>BSc Computer Science</strong><span>First Class Honours · 2010–2013</span></p></div>
        <img src="/staffordshire-2.png" alt="University of Staffordshire" width="150" height="58" loading="lazy" decoding="async" />
      </div>
      <details className="certifications"><summary>View certifications <Icon name="plus" /></summary><ul>{content.certifications.map(item => <li key={item}>{item}</li>)}</ul></details>
    </div>
  </section>;
}

function Writing() {
  return <aside className="graphite" aria-label="Featured publication"><a className="publication wrap" href={content.article} target="_blank" rel="noopener noreferrer">
    <Icon name="document" /><span className="publication-title"><strong>The New Architecture of Financial Trust in the Age of AI</strong><small>Business News Malaysia</small></span><span className="read-link">Read article <Icon name="arrow" /></span>
  </a></aside>;
}

export default function Home() {
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <div className="navy site-header"><header className="wrap header"><a className="brand" href="#main">John Wilson</a><nav aria-label="Main navigation"><a href="#experience">Experience</a><a href="#expertise">Expertise</a><a href="#about">About</a><a href="#contact">Contact</a></nav></header></div>
    <main id="main" tabIndex={-1}>
      <div className="navy"><section className="hero wrap" aria-labelledby="intro">
        <div className="hero-copy"><h1 id="intro">Business <span>clarity.</span><br /><span>Technical</span> depth.</h1><p className="role-line">CTO · Solution Architect · Software Developer</p><p className="hero-description">Connecting business strategy, AI and engineering.</p><div className="actions"><ContactLink /><CVLink className="button secondary" /></div></div>
        <Portrait />
      </section></div>
      <Experience /><Expertise /><About /><Writing />
      <div className="navy"><section id="contact" className="section wrap contact" aria-labelledby="contact-title"><h2 id="contact-title">Let’s build what comes <span>next.</span></h2><div className="contact-row"><ContactLink /><div className="social"><a href={content.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <Icon name="arrow" /></a><a href={content.github} target="_blank" rel="noopener noreferrer">GitHub <Icon name="arrow" /></a><CVLink /></div></div></section></div>
    </main>
    <div className="navy"><footer className="wrap"><span>© {new Date().getFullYear()} John Wilson</span><a href="#main">Back to top <Icon name="up" /></a></footer></div>
  </>;
}
