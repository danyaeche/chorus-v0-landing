import { useEffect, useRef } from 'react'

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
const POINT_COUNT = 1150
const points = Array.from({ length: POINT_COUNT }, (_, index) => {
  const y = 1 - (index / (POINT_COUNT - 1)) * 2
  const radius = Math.sqrt(1 - y * y)
  const theta = GOLDEN_ANGLE * index
  return {
    x: Math.cos(theta) * radius,
    y,
    z: Math.sin(theta) * radius,
  }
})

const routes = [
  { from: [-0.77, 0.35], to: [-0.1, 0.68], phase: 0.02 },
  { from: [-0.15, 0.55], to: [0.73, 0.28], phase: 0.35 },
  { from: [-0.82, -0.12], to: [0.44, -0.46], phase: 0.66 },
]

function project(latitude, longitude, rotation, radius) {
  const lat = latitude * Math.PI
  const lon = longitude * Math.PI + rotation
  const x = Math.cos(lat) * Math.sin(lon)
  const y = -Math.sin(lat)
  const z = Math.cos(lat) * Math.cos(lon)
  return { x: x * radius, y: y * radius, z }
}

export default function GlobeCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let frame
    let rotation = -0.45
    let pointerOffset = 0
    let dragging = false
    let previousX = 0

    const onPointerDown = (event) => {
      dragging = true
      previousX = event.clientX
      canvas.setPointerCapture(event.pointerId)
    }
    const onPointerMove = (event) => {
      if (!dragging) return
      pointerOffset += (event.clientX - previousX) * 0.005
      previousX = event.clientX
    }
    const onPointerUp = () => {
      dragging = false
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointercancel', onPointerUp)

    const draw = (time) => {
      const bounds = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.round(bounds.width * dpr)
      const height = Math.round(bounds.height * dpr)
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }

      const styles = getComputedStyle(canvas)
      const pointColor = styles.getPropertyValue('--globe-point').trim()
      const lineColor = styles.getPropertyValue('--globe-line').trim()
      const accentColor = styles.getPropertyValue('--globe-accent').trim()
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, bounds.width, bounds.height)

      const cx = bounds.width / 2
      const cy = bounds.height / 2
      const radius = Math.min(bounds.width, bounds.height) * 0.395
      const currentRotation = rotation + pointerOffset

      context.save()
      context.translate(cx, cy)

      context.strokeStyle = lineColor
      context.lineWidth = 0.7
      ;[0.62, 0.82, 1].forEach((scale, index) => {
        context.beginPath()
        context.ellipse(0, 0, radius * scale, radius * (0.18 + index * 0.025), -0.12, 0, Math.PI * 2)
        context.stroke()
      })

      points.forEach((point) => {
        const cos = Math.cos(currentRotation)
        const sin = Math.sin(currentRotation)
        const x = point.x * cos - point.z * sin
        const z = point.x * sin + point.z * cos
        const perspective = 0.78 + (z + 1) * 0.16
        const px = x * radius * perspective
        const py = point.y * radius * perspective
        const alpha = Math.max(0.1, (z + 1) / 2)
        const pointRadius = 0.55 + alpha * 1.15

        context.globalAlpha = 0.2 + alpha * 0.8
        context.fillStyle = pointColor
        context.beginPath()
        context.arc(px, py, pointRadius, 0, Math.PI * 2)
        context.fill()
      })

      routes.forEach((route) => {
        const start = project(route.from[0], route.from[1], currentRotation, radius)
        const end = project(route.to[0], route.to[1], currentRotation, radius)
        if (start.z < -0.1 && end.z < -0.1) return
        const lift = -radius * (0.18 + Math.abs(end.x - start.x) / radius * 0.08)
        const midX = (start.x + end.x) / 2
        const midY = (start.y + end.y) / 2 + lift

        context.globalAlpha = 0.4
        context.strokeStyle = accentColor
        context.lineWidth = 1
        context.beginPath()
        context.moveTo(start.x, start.y)
        context.quadraticCurveTo(midX, midY, end.x, end.y)
        context.stroke()

        const progress = (time * 0.00016 + route.phase) % 1
        const inverse = 1 - progress
        const dotX = inverse * inverse * start.x + 2 * inverse * progress * midX + progress * progress * end.x
        const dotY = inverse * inverse * start.y + 2 * inverse * progress * midY + progress * progress * end.y
        context.globalAlpha = 1
        context.fillStyle = accentColor
        context.shadowColor = accentColor
        context.shadowBlur = 10
        context.beginPath()
        context.arc(dotX, dotY, 2.4, 0, Math.PI * 2)
        context.fill()
        context.shadowBlur = 0
      })

      context.globalAlpha = 1
      context.restore()
      if (!dragging) rotation += 0.00125
      frame = requestAnimationFrame(draw)
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduceMotion.matches) {
      draw(0)
      cancelAnimationFrame(frame)
    } else {
      frame = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(frame)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  return (
    <canvas
      className="globe-canvas"
      ref={canvasRef}
      aria-label="Interactive rotating globe showing customer conversations around the world"
    />
  )
}
