import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeCanvas() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 35

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Particles Constellation
    const particleCount = 75
    const positions = new Float32Array(particleCount * 3)
    const velocities = []

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 55
      positions[i * 3 + 1] = (Math.random() - 0.5) * 45
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25

      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.015,
      })
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Glowing particle material
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xbba5ff,
      size: 0.85,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    })

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)

    // Floating 3D wireframe geometric figures (Icosahedron & Torus)
    const icoGeometry = new THREE.IcosahedronGeometry(4.5, 1)
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x9370db,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    })
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial)
    icoMesh.position.set(22, 10, -8)
    scene.add(icoMesh)

    const torusGeometry = new THREE.TorusGeometry(3.5, 0.7, 16, 50)
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    })
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial)
    torusMesh.position.set(-20, -12, -5)
    scene.add(torusMesh)

    // Mouse tracking with smooth lerp
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationFrameId
    let isVisible = true

    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (!isVisible) return

      const elapsedTime = clock.getElapsedTime()

      // Smooth camera parallax
      targetX += (mouseX * 4 - targetX) * 0.05
      targetY += (mouseY * 4 - targetY) * 0.05
      camera.position.x = targetX
      camera.position.y = targetY
      camera.lookAt(0, 0, 0)

      // Rotate geometric wireframes
      icoMesh.rotation.x = elapsedTime * 0.15
      icoMesh.rotation.y = elapsedTime * 0.2
      icoMesh.position.y = 10 + Math.sin(elapsedTime * 0.8) * 1.5

      torusMesh.rotation.x = elapsedTime * 0.25
      torusMesh.rotation.y = elapsedTime * 0.18
      torusMesh.position.y = -12 + Math.cos(elapsedTime * 0.7) * 1.2

      // Drift particles gently
      const posAttr = particleGeometry.attributes.position
      const currentPositions = posAttr.array

      for (let i = 0; i < particleCount; i++) {
        currentPositions[i * 3] += velocities[i].x
        currentPositions[i * 3 + 1] += velocities[i].y
        currentPositions[i * 3 + 2] += velocities[i].z

        // Wrap around bounds
        if (Math.abs(currentPositions[i * 3]) > 30) velocities[i].x *= -1
        if (Math.abs(currentPositions[i * 3 + 1]) > 25) velocities[i].y *= -1
        if (Math.abs(currentPositions[i * 3 + 2]) > 15) velocities[i].z *= -1
      }

      posAttr.needsUpdate = true
      particleSystem.rotation.y = elapsedTime * 0.03

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)

      // Cleanup WebGL resources
      particleGeometry.dispose()
      particleMaterial.dispose()
      icoGeometry.dispose()
      icoMaterial.dispose()
      torusGeometry.dispose()
      torusMaterial.dispose()
      renderer.dispose()

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="three-canvas-container"
      aria-hidden="true"
    />
  )
}
