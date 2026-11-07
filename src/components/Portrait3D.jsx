import { useState, useRef } from 'react'
import Icon from './Icon'
import { portfolio } from '../data/portfolio'

const PORTRAIT_VARIANTS = [
  {
    id: '3d',
    label: '3D Avatar',
    badge: '3D CYBER EDITION',
    src: '/images/aaron-3d.jpg',
    tagline: 'Rendered with modern tech aesthetics',
  },
  {
    id: 'pro',
    label: 'Studio Pro',
    badge: 'PROFESSIONAL SUITE',
    src: '/images/aaron-pro.jpg',
    tagline: 'Polished studio lighting & executive attire',
  },
  {
    id: 'original',
    label: 'Original',
    badge: 'AUTHENTIC SHOT',
    src: '/images/aaron-original.jpg',
    tagline: 'Raw student portrait',
  },
]

export default function Portrait3D() {
  const [activeVariant, setActiveVariant] = useState('3d')
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, isHovered: false })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const cardRef = useRef(null)

  const currentVariant = PORTRAIT_VARIANTS.find((v) => v.id === activeVariant) || PORTRAIT_VARIANTS[0]

  const handleVariantSelect = (variantId) => {
    setImageLoaded(false)
    setImageFailed(false)
    setActiveVariant(variantId)
  }

  const handlePointerMove = (e) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate rotation (-14 to +14 deg)
    const rx = ((y - centerY) / centerY) * -12
    const ry = ((x - centerX) / centerX) * 12

    // Glare position in percent
    const gx = (x / rect.width) * 100
    const gy = (y / rect.height) * 100

    setTilt({ rx, ry, gx, gy, isHovered: true })
  }

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, isHovered: false })
  }

  return (
    <div className="portrait-3d-wrapper">
      {/* 3D Interactive Card Container */}
      <div
        ref={cardRef}
        className={`portrait-3d-card ${tilt.isHovered ? 'is-tilting' : ''}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
        role="region"
        aria-label="Interactive 3D Portrait"
      >
        {/* Holographic dynamic glare overlay */}
        <div
          className="portrait-3d-glare"
          style={{
            background: tilt.isHovered
              ? `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(187, 165, 255, 0.22) 0%, rgba(103, 232, 249, 0.1) 40%, transparent 70%)`
              : 'none',
          }}
          aria-hidden="true"
        />

        {/* 3D Ambient Lighting Glow */}
        <div className="portrait-3d-ambient-glow" aria-hidden="true" />

        {/* Top Header Bar */}
        <div className="portrait-3d-header">
          <span className="header-node">
            <span className="node-pulse" />
            LIVE 3D CARD
          </span>
          <span className="header-edition">{currentVariant.badge}</span>
          <Icon name="sparkles" size={14} className="header-sparkle" />
        </div>

        {/* Main Image Viewport */}
        <div className="portrait-3d-viewport">
          {/* Orbital Rings in 3D */}
          <div className="orbit-ring orbit-ring-outer" aria-hidden="true" />
          <div className="orbit-ring orbit-ring-inner" aria-hidden="true" />

          {/* Portrait Image or Fallback */}
          {imageFailed ? (
            <div className="portrait-3d-placeholder" role="img" aria-label="AD initials, portrait placeholder">
              <span className="portrait-initials">ad<span>.</span></span>
              <span className="portrait-label">{currentVariant.label.toUpperCase()}</span>
            </div>
          ) : (
            <img
              key={currentVariant.src}
              className={`portrait-3d-image ${imageLoaded ? 'is-visible' : 'is-loading'}`}
              src={currentVariant.src}
              alt={`Professional portrait of ${portfolio.displayName}`}
              width="600"
              height="600"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageFailed(true)}
            />
          )}

          {/* Floating 3D Badge 1: Top Floating Tech Tag */}
          <div className="floating-3d-pill pill-top" aria-hidden="true">
            <span className="pill-code">{'<dev/>'}</span>
            <span>CS @ 2nd Year</span>
          </div>

          {/* Floating 3D Badge 2: Status Pill */}
          <div className="floating-3d-pill pill-bottom" aria-hidden="true">
            <span className="status-indicator">
              <span className="indicator-ping" />
              <span className="indicator-dot" />
            </span>
            <span>Available for Internships & Projects</span>
          </div>
        </div>

        {/* Card Footer Bar */}
        <div className="portrait-3d-footer">
          <div className="footer-author">
            <span className="author-name">{portfolio.displayName.toUpperCase()}</span>
            <span className="author-role">SOFTWARE DEVELOPER</span>
          </div>
          <span className="footer-hint">MOVE CURSOR TO TILT 3D ↗</span>
        </div>
      </div>

      {/* Style Switcher Controls */}
      <div className="portrait-variant-controls" aria-label="Portrait style selector">
        <span className="variant-label">SELECT STYLE:</span>
        <div className="variant-buttons">
          {PORTRAIT_VARIANTS.map((variant) => (
            <button
              key={variant.id}
              type="button"
              className={`variant-btn ${activeVariant === variant.id ? 'is-active' : ''}`}
              onClick={() => handleVariantSelect(variant.id)}
              aria-pressed={activeVariant === variant.id}
            >
              {variant.id === '3d' && <Icon name="sparkles" size={13} />}
              {variant.id === 'pro' && <Icon name="user" size={13} />}
              {variant.id === 'original' && <Icon name="terminal" size={13} />}
              <span>{variant.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
