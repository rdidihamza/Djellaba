'use client'

import { createContext, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import type Konva from 'konva'
import { Library, Layers, Settings2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AssetPanel } from './AssetPanel'
import { ControlsPanel } from './ControlsPanel'
import { ToolBar } from './ToolBar'
import { useLamaalamStore } from '@/lib/lamaalam-store'

// ── Stage context — allows ControlsPanel to access the Konva stage ──
export const StageContext = createContext<React.MutableRefObject<Konva.Stage | null> | null>(null)

// ── Konva cannot run on the server ──────────────────────────
const StudioCanvas = dynamic(() => import('./StudioCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full min-h-[340px]">
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
      const active = document.activeElement?.tagName
      const inInput = active === 'INPUT' || active === 'TEXTAREA'

      if (mod && e.key === 'z' && !e.shiftKey) { e.preventDefault(); if (canUndo()) undo() }
      if (mod && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); if (canRedo()) redo() }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElementId && !inInput) {
        e.preventDefault()
        removeElement(selectedElementId)
      }
      if (mod && e.key === 'd' && selectedElementId && !inInput) {
        e.preventDefault()
        duplicateElement(selectedElementId)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [undo, redo, removeElement, duplicateElement, selectedElementId, canUndo, canRedo])
}

// ─────────────────────────────────────────────────────────────
// Canvas container — measures width for responsive Stage
// ─────────────────────────────────────────────────────────────

function CanvasContainer({ stageRef }: { stageRef: React.MutableRefObject<Konva.Stage | null> }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(380)
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
        <StageContext.Provider value={stageRef}>
          <StudioCanvas containerWidth={containerWidth} />
        </StageContext.Provider>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Mobile tab bar
// ─────────────────────────────────────────────────────────────

type MobileTab = 'library' | 'canvas' | 'properties'

function MobileTabBar({
  active,
  onChange,
}: {
  active: MobileTab
  onChange: (t: MobileTab) => void
}) {
  const tabs: { id: MobileTab; icon: React.ReactNode; label: string }[] = [
    { id: 'library',    icon: <Library size={16} strokeWidth={1.75} />,  label: 'Library' },
    { id: 'canvas',     icon: <Layers size={16} strokeWidth={1.75} />,   label: 'Canvas' },
    { id: 'properties', icon: <Settings2 size={16} strokeWidth={1.75} />, label: 'Properties' },
  ]

  return (
    <div className="lg:hidden flex border-t border-gold-200 bg-cream/95 backdrop-blur-sm">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            'flex-1 flex flex-col items-center gap-1 py-3 text-[10px] tracking-[0.08em] font-medium transition-all',
            active === t.id
              ? 'text-brown-800 border-t-2 border-brown-800 -mt-px'
              : 'text-brown-400 hover:text-brown-700'
          )}
        >
          {t.icon}
          {t.label}
        </button>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Main Studio layout
// ─────────────────────────────────────────────────────────────

export function Studio() {
  useKeyboardShortcuts()

  const loadFromStorage = useLamaalamStore((s) => s.loadFromStorage)
  const [activeTab, setActiveTab] = useState<MobileTab>('canvas')

  // Shared stageRef passed via context to StudioCanvas and directly to ControlsPanel
  const stageRef = useRef<Konva.Stage | null>(null)

  // Restore persisted design on mount
  useEffect(() => {
    loadFromStorage()
  }, [loadFromStorage])

  return (
    <StageContext.Provider value={stageRef}>
      <div className="w-full">
        {/* ── Toolbar strip ──────────────────────────────── */}
        <div className="flex items-center justify-between px-4 lg:px-0 mb-4">
          <ToolBar />
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[10px] text-brown-400 tracking-[0.1em] uppercase select-none">
              Del · Ctrl+Z · Ctrl+D
            </span>
          </div>
        </div>

        {/* ── Three-column layout (desktop) / Tabbed (mobile) ─── */}
        <div className="border border-gold-200 rounded-2xl overflow-hidden shadow-luxury-lg bg-cream">
          {/* Desktop: three columns */}
          <div className="hidden lg:grid lg:grid-cols-[260px_1fr_240px]">
            {/* Left: Asset panel */}
            <div className="border-r border-gold-200 max-h-[720px] overflow-hidden flex flex-col">
              <AssetPanel />
            </div>

            {/* Centre: Canvas */}
            <div className="bg-[#F0E9DC] flex flex-col">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gold-200/60 bg-cream/50">
                <span className="text-[10px] tracking-[0.2em] uppercase text-brown-400 font-medium">
                  Front View — Composition Canvas
                </span>
                <span className="text-[10px] text-brown-300 tracking-wide">
                  Free placement · Drag to reposition
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
                <CanvasContainer stageRef={stageRef} />
              </div>
            </div>

            {/* Right: Controls panel */}
            <div className="border-l border-gold-200 max-h-[720px] overflow-hidden flex flex-col">
              <ControlsPanel />
            </div>
          </div>

          {/* Mobile: tab-driven single panel */}
          <div className="lg:hidden">
            {/* Library tab */}
            <div className={cn('max-h-[540px] overflow-hidden flex flex-col', activeTab !== 'library' && 'hidden')}>
              <AssetPanel />
            </div>

            {/* Canvas tab */}
            <div className={cn('flex flex-col', activeTab !== 'canvas' && 'hidden')}>
              <div className="flex items-center justify-center px-4 py-2.5 border-b border-gold-200/60 bg-cream/50">
                <span className="text-[10px] tracking-[0.18em] uppercase text-brown-400 font-medium">
                  Composition Canvas
                </span>
              </div>
              <div className="flex items-center justify-center p-4 bg-[#F0E9DC]" style={{ minHeight: 360 }}>
                <CanvasContainer stageRef={stageRef} />
              </div>
            </div>

            {/* Properties tab */}
            <div className={cn('max-h-[540px] overflow-hidden flex flex-col', activeTab !== 'properties' && 'hidden')}>
              <ControlsPanel />
            </div>

            {/* Mobile tab bar */}
            <MobileTabBar active={activeTab} onChange={setActiveTab} />
          </div>
        </div>
      </div>
    </StageContext.Provider>
  )
}
