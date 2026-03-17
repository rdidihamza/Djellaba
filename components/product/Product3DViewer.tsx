'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface Product3DViewerProps {
  src: string
  posterSrc?: string
  productName: string
  className?: string
}

export function Product3DViewer({
  src,
  posterSrc,
  productName,
  className,
}: Product3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [modelViewerReady, setModelViewerReady] = useState(false)

  useEffect(() => {
    // Load model-viewer script
    if (typeof window !== 'undefined' && !customElements.get('model-viewer')) {
      const script = document.createElement('script')
      script.type = 'module'
      script.src =
        'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js'
      script.onload = () => setModelViewerReady(true)
      document.head.appendChild(script)
    } else {
      setModelViewerReady(true)
    }
  }, [])

  return (
    <div
      className={cn(
        'relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-parchment',
        className
      )}
      ref={containerRef}
    >
      {/* Loading State */}
      {!loaded && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
          <div className="w-12 h-12 border-2 border-gold-300 border-t-gold-600 rounded-full animate-spin" />
          <p className="text-xs text-brown-400 tracking-widest uppercase animate-pulse">
            Loading 3D Model
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <p className="text-sm text-brown-400">3D view unavailable</p>
        </div>
      )}

      {/* Model Viewer */}
      {modelViewerReady && !error && (
        <div
          className="w-full h-full"
          dangerouslySetInnerHTML={{
            __html: `
              <model-viewer
                src="${src}"
                ${posterSrc ? `poster="${posterSrc}"` : ''}
                alt="${productName} — 3D view"
                ar
                ar-modes="webxr scene-viewer quick-look"
                camera-controls
                auto-rotate
                auto-rotate-delay="2000"
                rotation-per-second="10deg"
                shadow-intensity="1"
                exposure="1"
                style="width:100%;height:100%;background:transparent;"
                loading="eager"
              >
                <div slot="progress-bar" style="display:none;"></div>
              </model-viewer>
            `,
          }}
          onLoad={() => setLoaded(true)}
        />
      )}

      {/* 3D Badge */}
      <div className="absolute top-3 left-3 px-2.5 py-1 bg-brown-800/80 backdrop-blur-sm text-cream text-[10px] font-medium tracking-[0.15em] uppercase rounded z-20">
        3D View
      </div>

      {/* Hint */}
      {loaded && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-brown-900/70 backdrop-blur-sm rounded-full text-[10px] text-cream/80 tracking-wide whitespace-nowrap z-20">
          Drag to rotate · Pinch to zoom
        </div>
      )}
    </div>
  )
}
