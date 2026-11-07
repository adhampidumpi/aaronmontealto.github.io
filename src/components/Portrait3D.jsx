import { useState, useRef } from 'react'
import Icon from './Icon'
import { portfolio } from '../data/portfolio'

const baseUrl = (import.meta.env?.BASE_URL || '/').endsWith('/')
  ? import.meta.env?.BASE_URL || '/'
  : `${import.meta.env?.BASE_URL}/`

const portraitSrc = `${baseUrl}images/aaron-pro.jpg`

export default function Portrait3D() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, isHovered: false })
  const [imageFailed, setImageFailed] = useState(false)
  const cardRef = useRef(null)

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
          <span className="header-edition">PROFESSIONAL SUITE</span>
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
              <span className="portrait-label">STUDIO PRO</span>
            </div>
          ) : (
            <img
              className="portrait-3d-image"
              src={portraitSrc}
              alt={`Professional portrait of ${portfolio.displayName}`}
              width="600"
              height="600"
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

    </div>
  )
}
