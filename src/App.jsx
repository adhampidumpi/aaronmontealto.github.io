import { useEffect, useRef, useState } from 'react'
import Icon from './components/Icon'
import Projects from './components/Projects'
import Portrait3D from './components/Portrait3D'
import ThreeCanvas from './components/ThreeCanvas'
import { portfolio } from './data/portfolio'

const navigation = [
  { id: 'home', label: 'Overview', icon: 'home' },
  { id: 'about', label: 'About', icon: 'user' },
  { id: 'skills', label: 'Technical Toolkit', icon: 'code' },
  { id: 'projects', label: 'Projects', icon: 'folder' },
  { id: 'exploring', label: 'Focus Areas', icon: 'compass' },
  { id: 'education', label: 'Education', icon: 'graduation' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
]

function ExternalLink({ href, children, className = '', label }) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label ? `${label} (opens in a new tab)` : undefined}
    >
      {children}
    </a>
  )
}

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')
  const menuButton = useRef(null)
  const sidebar = useRef(null)

  useEffect(() => {
    const updateSection = () => {
      const atPageEnd =
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      if (atPageEnd) {
        setActive('contact')
        return
      }
      const marker = window.innerHeight * 0.35
      const section = [...navigation].reverse().find(({ id }) => {
        const element = document.getElementById(id)
        return element && element.getBoundingClientRect().top <= marker
      })
      setActive(section?.id ?? 'home')
    }
    updateSection()
    window.addEventListener('scroll', updateSection, { passive: true })
    window.addEventListener('resize', updateSection)
    return () => {
      window.removeEventListener('scroll', updateSection)
      window.removeEventListener('resize', updateSection)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const dismiss = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    const dismissOutside = (event) => {
      if (!sidebar.current?.contains(event.target)) setMenuOpen(false)
    }
    document.addEventListener('keydown', dismiss)
    document.addEventListener('pointerdown', dismissOutside)
    return () => {
      document.removeEventListener('keydown', dismiss)
      document.removeEventListener('pointerdown', dismissOutside)
    }
  }, [menuOpen])

  return (
    <header className="sidebar" ref={sidebar}>
      <div className="sidebar-brand">
        <a
          className="brand"
          href="#home"
          aria-label="Aaron Dave, back to overview"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-mark" aria-hidden="true">
            a<span>.</span>
          </span>
          <span className="brand-copy">
            {portfolio.displayName}
            <span>Software Developer</span>
          </span>
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? 'x' : 'menu'} />
        </button>
      </div>

      <nav
        id="main-navigation"
        className={`navigation ${menuOpen ? 'is-open' : ''}`}
        aria-label="Main navigation"
      >
        <p className="nav-caption">Navigation</p>
        {navigation.map(({ id, label, icon }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-link ${active === id ? 'is-active' : ''}`}
            aria-current={active === id ? 'location' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <Icon name={icon} size={18} />
            <span>{label}</span>
            <span className="nav-dot" aria-hidden="true" />
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="small-status">
          <span /> Available for opportunities
        </span>
        <ExternalLink
          href={portfolio.github}
          className="sidebar-github"
          label="Aaron Dave on GitHub"
        >
          <Icon name="github" size={18} /> GitHub Profile <Icon name="arrow-up-right" size={15} />
        </ExternalLink>
        <span className="sidebar-note">Engineered with focus & clean code.</span>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="page-topline">
        <span>SOFTWARE ENGINEERING & WEB DEVELOPMENT</span>
        <span>
          <span className="status-dot" /> Available for Internships & Projects
        </span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-intro">
            <span className="short-line" /> Software Developer & CS Student
          </p>
          <h1 id="hero-title">
            {portfolio.displayName}
            <br />
            <span>{portfolio.name.slice(portfolio.displayName.length).trim()}</span>
            <span className="name-period">.</span>
          </h1>
          <p className="hero-headline">{portfolio.headline}</p>
          <p className="hero-description">{portfolio.heroDescription}</p>
          <div className="hero-actions flex flex-wrap gap-3">
            <a className="button button-primary" href="#projects">
              Explore Projects <Icon name="arrow-right" size={18} />
            </a>
            <ExternalLink
              href={portfolio.github}
              className="button button-secondary"
              label="View GitHub profile"
            >
              <Icon name="github" size={18} /> View GitHub
            </ExternalLink>
          </div>
          <p className="hero-footnote">
            <Icon name="graduation" size={17} /> Computer Science{' '}
            <span aria-hidden="true">·</span> {portfolio.education.year}
          </p>
        </div>

        {/* 3D Interactive Portrait */}
        <Portrait3D />
      </div>
      <a href="#about" className="scroll-cue">
        <span className="scroll-icon">
          <Icon name="arrow-down" size={16} />
        </span>{' '}
        Learn more about my background <span className="scroll-line" />
      </a>
    </section>
  )
}

function SectionHeading({ kicker, title, id, children }) {
  return (
    <div className="section-heading">
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {children && <p className="section-description">{children}</p>}
    </div>
  )
}

function About() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="about-grid">
        <SectionHeading
          kicker="Background & Philosophy"
          title={
            <>
              Grounded in Fundamentals.
              <br />
              Driven by Real Systems.
            </>
          }
          id="about-title"
        />
        <div className="about-copy">
          <p>{portfolio.about}</p>
          <div className="about-signature">
            <span className="signature-line" /> Aaron Dave <span className="signature-dot">.</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const symbols = {
    Python: 'Py',
    'C++': 'C++',
    Java: 'Ja',
    SQL: 'SQL',
    Git: 'Git',
    GitHub: 'github',
    React: 'Re',
    JavaScript: 'JS',
    'Tailwind CSS': 'TW',
  }

  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <SectionHeading
        kicker="Technical Proficiency"
        title="Core Stack & Development Tools."
        id="skills-title"
      >
        A proven foundation in systems programming, modern reactive frontends, and reliable data
        storage.
      </SectionHeading>
      <div className="skills-grid grid gap-4 md:grid-cols-3">
        {portfolio.skillGroups.map((group, index) => (
          <div className="skill-group" key={group.label}>
            <div className="skill-group-heading">
              <h3>{group.label}</h3>
              <span aria-hidden="true">0{index + 1}</span>
            </div>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill}>
                  <span
                    className={`skill-symbol skill-${skill.toLowerCase().replaceAll('+', 'p').replaceAll(' ', '-')}`}
                    aria-hidden="true"
                  >
                    {skill === 'GitHub' ? <Icon name="github" size={22} /> : symbols[skill] || skill.slice(0, 2)}
                  </span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Exploring() {
  return (
    <section className="section" id="exploring" aria-labelledby="exploring-title">
      <SectionHeading
        kicker="Engineering Focus"
        title="Key Specializations."
        id="exploring-title"
      >
        Domains where I actively design systems, build user experiences, and write production-oriented code.
      </SectionHeading>
      <div className="exploring-grid grid gap-4 md:grid-cols-3">
        {portfolio.interests.map((interest, index) => (
          <article className="interest-card" key={interest.title}>
            <div className="interest-card-top">
              <span className="interest-icon">
                <Icon name={interest.icon} size={24} />
              </span>
              <span className="interest-number">0{index + 1}</span>
            </div>
            <h3>{interest.title}</h3>
            <p>{interest.description}</p>
            <span className="interest-label">Core Domain</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function JourneyAndEducation() {
  return (
    <div className="journey-education-grid">
      <section className="journey-section" id="journey" aria-labelledby="journey-title">
        <span className="journey-icon">
          <Icon name="compass" size={25} />
        </span>
        <p className="section-kicker">Professional Trajectory</p>
        <h2 className="section-title" id="journey-title">
          Engineering Solutions.
          <br />
          Delivering High-Impact Code.
        </h2>
        <p>{portfolio.freelanceDescription}</p>
        <div className="journey-note">
          <span className="status-dot" /> Open to technical internships and software development.
        </div>
      </section>
      <section className="education-section" id="education" aria-labelledby="education-title">
        <p className="section-kicker">Academic Background</p>
        <h2 className="section-title" id="education-title">
          Formal Education.
        </h2>
        <div className="education-detail">
          <span className="education-icon">
            <Icon name="graduation" size={25} />
          </span>
          <div>
            <span className="education-tag">UNDERGRADUATE PROGRAM</span>
            <h3>
              {portfolio.education.degree} <span>— {portfolio.education.year}</span>
            </h3>
            <p className="education-placeholder">
              <span>Program</span>Bachelor of Science in Computer Science
            </p>
            <p className="education-placeholder">
              <span>Status</span>Enrolled · 2023 – Present
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function Contact() {
  const email = portfolio.email.trim()
  const validEmail = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)
  let validLinkedIn = false
  try {
    const url = new URL(portfolio.linkedin)
    validLinkedIn =
      url.protocol === 'https:' &&
      /^(www\.)?linkedin\.com$/.test(url.hostname) &&
      /^\/in\/[^/]+\/?$/.test(url.pathname)
  } catch {
    /* Unprovided contact details stay hidden. */
  }

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div>
        <p className="section-kicker">Get in Touch</p>
        <h2 className="section-title" id="contact-title">
          Let's discuss software,
          <br />
          collaborations, or opportunities<span>.</span>
        </h2>
        <p className="section-description">
          Open to software engineering internships, technical projects, and development roles.
        </p>
      </div>
      <div className="contact-actions">
        <ExternalLink
          href={portfolio.github}
          className="button button-primary"
          label="Connect on GitHub"
        >
          <Icon name="github" size={19} /> Connect on GitHub <Icon name="arrow-up-right" size={18} />
        </ExternalLink>
        {validEmail && (
          <ExternalLink
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`}
            className="button button-primary"
            label="Connect on Gmail"
          >
            <Icon name="mail" size={19} /> Connect on Gmail <Icon name="arrow-up-right" size={18} />
          </ExternalLink>
        )}
        {validLinkedIn && (
          <ExternalLink
            href={portfolio.linkedin}
            className="button button-secondary"
            label="Connect on LinkedIn"
          >
            <Icon name="linkedin" size={18} /> LinkedIn
          </ExternalLink>
        )}
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      {/* 3D Background Particle & Geometric Wireframe Scene */}
      <ThreeCanvas />

      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Sidebar />
      <main id="main-content" tabIndex={-1} className="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Exploring />
        <JourneyAndEducation />
        <Contact />
        <footer className="footer">
          <span>
            © {new Date().getFullYear()} {portfolio.displayName}. Engineered for performance.
          </span>
          <a href="#home">
            Back to top <Icon name="arrow-up" size={15} />
          </a>
        </footer>
      </main>
    </>
  )
}
