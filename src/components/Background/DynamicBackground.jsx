import React, { useEffect, useRef } from 'react'
// Statically import Three and Vanta to avoid runtime dynamic-import issues on GitHub Pages
import * as THREE from 'three'
import VANTA_NET from 'vanta/dist/vanta.net.min'
import VANTA_GLOBE from 'vanta/dist/vanta.globe.min'
import VANTA_WAVES from 'vanta/dist/vanta.waves.min'

// No external CSS required: Vanta handles the visuals.
export default function DynamicBackground({
  effect = 'NET',
  mouseControls = true,
  touchControls = true,
  gyroControls = false,
  minHeight = 200,
  minWidth = 200,
  scale = 1.0,
  scaleMobile = 1.0,
  points = 11.0,
  maxDistance = 15.0,
  color = 0xff3f81,
  backgroundColor = 0x23153c,
}) {
  const elRef = useRef(null)
  const vantaRef = useRef(null)

  useEffect(() => {
    let mounted = true

    // helper to convert numeric 0x.. or decimal to '#rrggbb'
    function toHexString(val) {
      if (typeof val === 'number') {
        const s = val.toString(16).padStart(6, '0')
        return `#${s}`
      }
      if (typeof val === 'string') {
        if (val.startsWith('#')) return val
        if (val.startsWith('0x')) return `#${val.slice(2)}`
        return val
      }
      return ''
    }

    const prevBodyBg = typeof document !== 'undefined' ? document.body.style.backgroundColor : ''
    const cssBg = toHexString(backgroundColor)
    if (cssBg && typeof document !== 'undefined') {
      document.body.style.backgroundColor = cssBg
    }

    function init() {
      try {
        // pick the requested effect (supporting NET by default). Add more as needed.
        const name = effect?.toUpperCase?.() || 'NET'
        let VANTA_MODULE
        if (name === 'NET') {
          VANTA_MODULE = VANTA_NET
        } else if (name === 'GLOBE') {
          VANTA_MODULE = VANTA_GLOBE
        } else if (name === 'WAVES') {
          VANTA_MODULE = VANTA_WAVES
        } else {
          // fallback to NET
          VANTA_MODULE = VANTA_NET
        }

        if (!mounted || !elRef.current) return

        vantaRef.current = VANTA_MODULE({
          el: elRef.current,
          THREE,
          // user script options
          mouseControls,
          touchControls,
          gyroControls,
          minHeight,
          minWidth,
          scale,
          scaleMobile,
          points,
          maxDistance,
          // color options
          color,
          backgroundColor,
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Vanta initialization failed:', err)
        // as a graceful fallback, show a simple gradient so the hero isn't plain white
        if (elRef.current) {
          elRef.current.style.background = `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.04), rgba(0,0,0,0))`
        }
      }
    }

    init()

    return () => {
      mounted = false
      if (vantaRef.current && typeof vantaRef.current.destroy === 'function') {
        vantaRef.current.destroy()
        vantaRef.current = null
      }
      if (typeof document !== 'undefined') {
        document.body.style.backgroundColor = prevBodyBg
      }
    }
    // When these props change, re-init Vanta to apply new options.
  }, [effect, mouseControls, touchControls, gyroControls, minHeight, minWidth, scale, scaleMobile, points, maxDistance, color, backgroundColor])

  // Inline styles so no CSS is required. The element fills its parent's bounds.
  const style = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none',
  }

  return <div ref={elRef} style={style} aria-hidden="true" />
}
