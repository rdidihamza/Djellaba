'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { AssetPanel } from './AssetPanel'
import { ControlsPanel } from './ControlsPanel'
import { ToolBar } from './ToolBar'
import { useLamaalamStore } from '@/lib/lamaalam-store'

// ── Konva cannot run on the server ────────────────────────────
const StudioCanvas = dynamic(() => import('./StudioCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-[11px] text-brown-400 tracking-widest uppercase">Loading Studio…</p>
      </div>
    </div>
  ),
})

// ─────────────────────────────────────────────────────────────
// Keyboard shortcut handler
// ─────────────────────────────────────────────────────────────

function useKeyboardShortcuts() {
  const { undo, redo, removeElement, selectedElementId, duplicateElement, canUndo, canRedo } =
    useLamaalamStore()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey
      if (mod && e.key === 'z' && !e.shiftKey) { e.preventDefault(); if (canUndo()) undo() }
      if (mod && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); if (canRedo()) redo() }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElementId) {
        const active = document.activeElement?.tagName
        if (active !== 'INPUT' && active !== 'TEXTAREA') {
          e.preventDefault()
          removeElement(selectedElementId)
        }
      }
      if (mod && e.key === 'd' && selectedElementId) { e.preventDefault(); duplicateElement(selectedElementId) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [undo, redo, removeElement, duplicateElement, selectedElementId, canUndo, canRedo])
}

// ─────────────────────────────────────────────────────────────
// Canvas container — measures width for responsive Stage
// ─────────────────────────────────────────────────────────────

function CanvasContainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(360)
  const selectedBase = useLamaalamStore((s) => s.selectedBase)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => setContainerWidth(el.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const nativeW = selectedBase.canvasWidth
  const nativeH = selectedBase.canvasHeight
  const scale = Math.min(containerWidth / nativeW, 1)
  const stageH = nativeH * scale

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <div
        className="relative rounded-2xl overflow-hidden shadow-luxury-xl ring-1 ring-gold-200"
        style={{ width: nativeW * scale, height: stageH }}
      >
        <StudioCanvas containerWidth={containerWidth} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Main Studio layout
// ─────────────────────────────────────────────────────────────

export function Studio() {
  useKeyboardShortcuts()

  return (
    <div className="w-full">
      {/* ── Toolbar strip ────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 lg:px-0 mb-4">
        <ToolBar />
        <div className="hidden lg:flex items-center gap-3">
          <span className="text-[10px] text-brown-400 tracking-[0.12em] uppercase">
            Keyboard: Del to remove · Ctrl+Z to undo · Ctrl+D to duplicate
          </span>
        </div>
      </div>

      {/* ── Three-column layout ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_240px] gap-0 border border-gold-200 rounded-2xl overflow-hidden shadow-luxury-lg bg-cream">
        {/* Left: Asset panel */}
        <div className="border-b lg:border-b-0 lg:border-r border-gold-200 max-h-[700px] overflow-hidden flex flex-col">
          <AssetPanel />
        </div>

        {/* Centre: Canvas */}
        <div className="bg-[#F2EBE0] flex flex-col">
          {/* Canvas top bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gold-200/60 bg-cream/50">
            <span className="text-[10px] tracking-[0.2em] uppercase text-brown-400 font-medium">
              Front View — Composition Canvas
            </span>
            <span className="text-[10px] text-brown-300 tracking-wide">
              Free placement · Drag to reposition
            </span>
          </div>

          {/* Canvas area */}
          <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
            <CanvasContainer />
          </div>
        </div>

        {/* Right: Controls panel */}
        <div className="border-t lg:border-t-0 lg:border-l border-gold-200 max-h-[700px] overflow-hidden flex flex-col">
          <ControlsPanel />
        </div>
      </div>
    </div>
  )
}
