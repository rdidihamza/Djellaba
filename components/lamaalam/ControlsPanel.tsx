'use client'

import { useState } from 'react'
import {
  Trash2, Copy, ChevronUp, ChevronDown, ChevronsUp, ChevronsDown,
  RotateCcw, FlipHorizontal, FlipVertical, Lock, Unlock, ShoppingBag, Download,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLamaalamStore } from '@/lib/lamaalam-store'
import { decorationAssets } from '@/data/lamaalam-assets'

// ─────────────────────────────────────────────────────────────
// Shared small button
// ─────────────────────────────────────────────────────────────

function CtrlBtn({
  onClick,
  title,
  disabled,
  danger,
  children,
  className,
}: {
  onClick: () => void
  title: string
  disabled?: boolean
  danger?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400',
        disabled
          ? 'border-gold-100 text-brown-300 cursor-not-allowed bg-cream'
          : danger
          ? 'border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400 bg-cream'
          : 'border-gold-200 text-brown-600 hover:text-brown-900 hover:bg-sand hover:border-gold-400 bg-cream',
        className
      )}
    >
      {children}
    </button>
  )
}

// ─────────────────────────────────────────────────────────────
// Slider row
// ─────────────────────────────────────────────────────────────

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  format?: (v: number) => string
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] tracking-[0.06em] text-brown-500 font-medium">{label}</span>
        <span className="text-[11px] text-brown-400 tabular-nums">
          {format ? format(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-gold-100 accent-gold-500 cursor-pointer"
      />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-5 py-4 border-b border-gold-100">
      <p className="text-[10px] tracking-[0.18em] uppercase text-gold-600 mb-3">{title}</p>
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Controls panel
// ─────────────────────────────────────────────────────────────

export function ControlsPanel() {
  const {
    selectedElementId,
    getSelectedElement,
    getAssetById,
    updateElement,
    removeElement,
    duplicateElement,
    bringForward,
    sendBackward,
    bringToFront,
    sendToBack,
    resetDesign,
    exportDesignJSON,
    placedElements,
    showZones,
    toggleZones,
  } = useLamaalamStore()

  const [saveLabel, setSaveLabel] = useState('Save JSON')
  const [requestSent, setRequestSent] = useState(false)

  const el = getSelectedElement()
  const asset = el ? getAssetById(el.assetId) : null

  const update = (attrs: Partial<typeof el>) => {
    if (!el) return
    updateElement(el.id, attrs as Parameters<typeof updateElement>[1])
  }

  const handleExport = () => {
    const data = exportDesignJSON()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lamaalam-design-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    setSaveLabel('Saved ✓')
    setTimeout(() => setSaveLabel('Save JSON'), 2000)
  }

  const handleImageExport = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stage = (window as any).__lamaalamStage
    if (!stage) return
    const dataURL = stage.toDataURL({ pixelRatio: 2 })
    const a = document.createElement('a')
    a.href = dataURL
    a.download = `lamaalam-design-${Date.now()}.png`
    a.click()
  }

  return (
    <aside className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-gold-100">
        <p className="text-[10px] tracking-[0.22em] uppercase text-gold-600 mb-1">Controls</p>
        <h3 className="font-display text-lg text-brown-800 leading-tight">
          {el ? asset?.name ?? 'Element' : 'Studio'}
        </h3>
        {el && asset?.nameAr && (
          <p className="text-[11px] text-brown-400 mt-0.5" dir="rtl">{asset.nameAr}</p>
        )}
      </div>

      {/* ── Selected element controls ────────────────────── */}
      {el ? (
        <div className="flex-1 overflow-y-auto">
          {/* Transform */}
          <Section title="Transform">
            <div className="space-y-3.5">
              <SliderRow
                label="Rotation"
                value={el.rotation}
                min={-180}
                max={180}
                step={1}
                onChange={(v) => update({ rotation: v })}
                format={(v) => `${v}°`}
              />
              <SliderRow
                label="Opacity"
                value={Math.round(el.opacity * 100)}
                min={10}
                max={100}
                step={1}
                onChange={(v) => update({ opacity: v / 100 })}
                format={(v) => `${v}%`}
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-brown-400 mb-1">Width</p>
                  <input
                    type="number"
                    value={Math.round(el.width)}
                    min={10}
                    onChange={(e) => update({ width: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 text-[12px] bg-cream border border-gold-200 rounded-lg text-brown-700 focus:outline-none focus:border-gold-400"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-brown-400 mb-1">Height</p>
                  <input
                    type="number"
                    value={Math.round(el.height)}
                    min={10}
                    onChange={(e) => update({ height: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 text-[12px] bg-cream border border-gold-200 rounded-lg text-brown-700 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>
            </div>
          </Section>

          {/* Flip */}
          <Section title="Flip">
            <div className="flex gap-2">
              <button
                onClick={() => update({ flipX: !el.flipX })}
                className={cn(
                  'flex items-center gap-2 flex-1 px-3 py-2 rounded-lg border text-[11px] font-medium transition-all',
                  el.flipX
                    ? 'bg-brown-800 text-cream border-brown-800'
                    : 'bg-cream text-brown-600 border-gold-200 hover:border-gold-400'
                )}
              >
                <FlipHorizontal size={13} /> Horizontal
              </button>
              <button
                onClick={() => update({ flipY: !el.flipY })}
                className={cn(
                  'flex items-center gap-2 flex-1 px-3 py-2 rounded-lg border text-[11px] font-medium transition-all',
                  el.flipY
                    ? 'bg-brown-800 text-cream border-brown-800'
                    : 'bg-cream text-brown-600 border-gold-200 hover:border-gold-400'
                )}
              >
                <FlipVertical size={13} /> Vertical
              </button>
            </div>
          </Section>

          {/* Layer order */}
          <Section title="Layer Order">
            <div className="grid grid-cols-4 gap-1.5">
              <CtrlBtn onClick={() => bringToFront(el.id)} title="Bring to front">
                <ChevronsUp size={14} />
              </CtrlBtn>
              <CtrlBtn onClick={() => bringForward(el.id)} title="Bring forward">
                <ChevronUp size={14} />
              </CtrlBtn>
              <CtrlBtn onClick={() => sendBackward(el.id)} title="Send backward">
                <ChevronDown size={14} />
              </CtrlBtn>
              <CtrlBtn onClick={() => sendToBack(el.id)} title="Send to back">
                <ChevronsDown size={14} />
              </CtrlBtn>
            </div>
          </Section>

          {/* Element actions */}
          <Section title="Actions">
            <div className="grid grid-cols-3 gap-1.5">
              <CtrlBtn onClick={() => duplicateElement(el.id)} title="Duplicate">
                <Copy size={14} />
              </CtrlBtn>
              <CtrlBtn
                onClick={() => update({ locked: !el.locked })}
                title={el.locked ? 'Unlock' : 'Lock position'}
              >
                {el.locked ? <Lock size={14} /> : <Unlock size={14} />}
              </CtrlBtn>
              <CtrlBtn
                onClick={() => { update({ rotation: 0, scaleX: 1, scaleY: 1 }); }}
                title="Reset transform"
              >
                <RotateCcw size={14} />
              </CtrlBtn>
            </div>
            <button
              onClick={() => removeElement(el.id)}
              className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-400 text-[11px] font-medium transition-all"
            >
              <Trash2 size={13} /> Remove element
            </button>
          </Section>
        </div>
      ) : (
        // ── No selection state ──────────────────────────────
        <div className="flex-1 flex flex-col justify-center items-center px-6 text-center">
          <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center mb-4">
            <span className="text-gold-500 text-lg">✦</span>
          </div>
          <p className="text-[12px] text-brown-500 leading-relaxed">
            Select an element on the canvas to adjust its properties.
          </p>
          <p className="text-[11px] text-brown-400 mt-2">
            {placedElements.length} element{placedElements.length !== 1 ? 's' : ''} placed
          </p>
        </div>
      )}

      {/* ── Global studio actions ────────────────────────── */}
      <div className="px-5 py-4 border-t border-gold-100 space-y-2">
        {/* Zone toggle */}
        <button
          onClick={toggleZones}
          className={cn(
            'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-[11px] font-medium tracking-[0.06em] transition-all',
            showZones
              ? 'bg-gold-100 border-gold-400 text-brown-800'
              : 'bg-cream border-gold-200 text-brown-500 hover:border-gold-400 hover:text-brown-700'
          )}
        >
          {showZones ? 'Hide' : 'Show'} Placement Zones
        </button>

        {/* Export PNG */}
        <button
          onClick={handleImageExport}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gold-300 bg-cream text-brown-700 hover:bg-sand hover:border-gold-500 text-[11px] font-medium tracking-[0.06em] transition-all"
        >
          <Download size={13} /> Export Preview
        </button>

        {/* Save JSON */}
        <button
          onClick={handleExport}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gold-300 bg-cream text-brown-700 hover:bg-sand hover:border-gold-500 text-[11px] font-medium tracking-[0.06em] transition-all"
        >
          <Download size={13} /> {saveLabel}
        </button>

        {/* Custom order CTA */}
        <button
          onClick={() => setRequestSent(true)}
          disabled={placedElements.length === 0 || requestSent}
          className={cn(
            'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[12px] font-medium tracking-[0.08em] transition-all duration-200',
            requestSent
              ? 'bg-gold-100 border border-gold-300 text-gold-700'
              : placedElements.length === 0
              ? 'bg-brown-100 text-brown-400 cursor-not-allowed border border-transparent'
              : 'bg-brown-800 hover:bg-brown-900 text-cream shadow-luxury-lg border border-transparent'
          )}
        >
          <ShoppingBag size={14} />
          {requestSent ? 'Request Sent ✓' : 'Request Custom Order'}
        </button>
      </div>
    </aside>
  )
}

