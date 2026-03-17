'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useLamaalamStore } from '@/lib/lamaalam-store'
import { decorationAssets, categoryMeta } from '@/data/lamaalam-assets'
import type { AssetCategory, DecorationAsset } from '@/types/lamaalam'

// ─────────────────────────────────────────────────────────────
// Single asset thumbnail
// ─────────────────────────────────────────────────────────────

function AssetThumb({ asset }: { asset: DecorationAsset }) {
  const addElement = useLamaalamStore((s) => s.addElement)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('assetId', asset.id)
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <button
      title={asset.description}
      draggable
      onDragStart={handleDragStart}
      onClick={() => addElement(asset)}
      className={cn(
        'group relative flex flex-col items-center gap-2 p-3 rounded-xl',
        'border border-gold-100 bg-cream hover:bg-sand hover:border-gold-300',
        'transition-all duration-200 cursor-pointer text-left w-full',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400'
      )}
    >
      {/* Preview */}
      <div className="w-full aspect-square flex items-center justify-center overflow-hidden rounded-lg bg-sand/60">
        <Image
          src={asset.image}
          alt={asset.name}
          width={asset.defaultWidth}
          height={asset.defaultHeight}
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
          style={{ maxWidth: 56, maxHeight: 56 }}
          unoptimized
        />
      </div>

      {/* Name */}
      <span className="text-[10px] tracking-[0.08em] text-brown-600 group-hover:text-brown-800 text-center leading-tight font-medium transition-colors">
        {asset.name}
      </span>

      {/* Arabic sub-label */}
      {asset.nameAr && (
        <span className="text-[9px] text-brown-400 text-center leading-none font-sans" dir="rtl">
          {asset.nameAr}
        </span>
      )}

      {/* Drag hint */}
      <span className="absolute top-2 right-2 text-[8px] text-brown-300 opacity-0 group-hover:opacity-100 transition-opacity">
        ↕
      </span>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────
// Category filter tab
// ─────────────────────────────────────────────────────────────

function CategoryTab({
  id,
  label,
  icon,
  active,
  count,
  onClick,
}: {
  id: string
  label: string
  icon: string
  active: boolean
  count: number
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] tracking-[0.06em] font-medium',
        'transition-all duration-150 whitespace-nowrap',
        active
          ? 'bg-brown-800 text-cream shadow-sm'
          : 'bg-transparent text-brown-500 hover:text-brown-800 hover:bg-sand'
      )}
    >
      <span className="opacity-70">{icon}</span>
      {label}
      <span className={cn('text-[9px] tabular-nums', active ? 'text-gold-300' : 'text-brown-400')}>
        {count}
      </span>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────
// Asset panel
// ─────────────────────────────────────────────────────────────

export function AssetPanel() {
  const [activeCategory, setActiveCategory] = useState<AssetCategory | 'all'>('all')

  const filtered =
    activeCategory === 'all'
      ? decorationAssets
      : decorationAssets.filter((a) => a.category === activeCategory)

  return (
    <aside className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-gold-100">
        <p className="text-[10px] tracking-[0.22em] uppercase text-gold-600 mb-1">Library</p>
        <h3 className="font-display text-lg text-brown-800 leading-tight">Design Elements</h3>
        <p className="text-[11px] text-brown-400 mt-1 leading-relaxed">
          Click or drag to place on the garment
        </p>
      </div>

      {/* Category tabs */}
      <div className="px-4 py-3 border-b border-gold-100">
        <div className="flex flex-wrap gap-1.5">
          <CategoryTab
            id="all"
            label="All"
            icon="◈"
            active={activeCategory === 'all'}
            count={decorationAssets.length}
            onClick={() => setActiveCategory('all')}
          />
          {categoryMeta.map((cat) => {
            const count = decorationAssets.filter((a) => a.category === cat.id).length
            if (count === 0) return null
            return (
              <CategoryTab
                key={cat.id}
                id={cat.id}
                label={cat.label}
                icon={cat.icon}
                active={activeCategory === cat.id}
                count={count}
                onClick={() => setActiveCategory(cat.id as AssetCategory)}
              />
            )
          })}
        </div>
      </div>

      {/* Asset grid */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-[11px] text-brown-300 tracking-wide">No elements in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {filtered.map((asset) => (
              <AssetThumb key={asset.id} asset={asset} />
            ))}
          </div>
        )}
      </div>

      {/* Footer note */}
      <div className="px-5 py-4 border-t border-gold-100">
        <p className="text-[10px] text-brown-400 leading-relaxed tracking-wide">
          Motifs are inspired by traditional Moroccan craftsmanship and woven terza techniques.
        </p>
      </div>
    </aside>
  )
}
