'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Search, X } from 'lucide-react'
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

  // Compute a natural thumbnail size (max 64px on longest side)
  const maxThumb = 64
  const aspect = asset.defaultWidth / asset.defaultHeight
  const thumbW = aspect >= 1 ? maxThumb : Math.round(maxThumb * aspect)
  const thumbH = aspect >= 1 ? Math.round(maxThumb / aspect) : maxThumb

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
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400',
        'active:scale-[0.97]'
      )}
    >
      {/* Preview area */}
      <div className="w-full aspect-square flex items-center justify-center overflow-hidden rounded-lg bg-sand/50 relative">
        <Image
          src={asset.image}
          alt={asset.name}
          width={thumbW}
          height={thumbH}
          className="object-contain transition-transform duration-300 group-hover:scale-110"
          style={{ maxWidth: thumbW, maxHeight: thumbH }}
          unoptimized
        />
        {/* Hover drag hint */}
        <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-4 h-4 rounded bg-brown-800/60 flex items-center justify-center">
            <span className="text-cream text-[8px] leading-none">↕</span>
          </div>
        </div>
      </div>

      {/* Name */}
      <span className="text-[10px] tracking-[0.07em] text-brown-600 group-hover:text-brown-800 text-center leading-tight font-medium transition-colors w-full truncate">
        {asset.name}
      </span>

      {/* Arabic sub-label */}
      {asset.nameAr && (
        <span className="text-[9px] text-brown-400 text-center leading-none font-sans w-full truncate" dir="rtl">
          {asset.nameAr}
        </span>
      )}
    </button>
  )
}

// ─────────────────────────────────────────────────────────────
// Category filter tab
// ─────────────────────────────────────────────────────────────

function CategoryTab({
  label,
  icon,
  active,
  count,
  onClick,
}: {
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
        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] tracking-[0.05em] font-medium',
        'transition-all duration-150 whitespace-nowrap',
        active
          ? 'bg-brown-800 text-cream shadow-sm'
          : 'bg-transparent text-brown-500 hover:text-brown-800 hover:bg-sand'
      )}
    >
      <span className="opacity-75 text-[11px]">{icon}</span>
      {label}
      <span className={cn('text-[8px] tabular-nums ml-0.5', active ? 'text-gold-300' : 'text-brown-400')}>
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
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    let list =
      activeCategory === 'all'
        ? decorationAssets
        : decorationAssets.filter((a) => a.category === activeCategory)

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.nameAr?.includes(q) ||
          a.tags.some((t) => t.includes(q)) ||
          a.description?.toLowerCase().includes(q)
      )
    }
    return list
  }, [activeCategory, searchQuery])

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

      {/* Search */}
      <div className="px-4 pt-3 pb-2">
        <div className="relative">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-400" />
          <input
            type="text"
            placeholder="Search motifs…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-2 text-[11px] bg-sand/60 border border-gold-200 rounded-lg
              text-brown-700 placeholder:text-brown-300 focus:outline-none focus:border-gold-400
              focus:bg-cream transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brown-400 hover:text-brown-700"
            >
              <X size={11} />
            </button>
          )}
        </div>
      </div>

      {/* Category tabs */}
      <div className="px-4 pb-3 border-b border-gold-100">
        <div className="flex flex-wrap gap-1">
          <CategoryTab
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
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <span className="text-2xl text-brown-200">✦</span>
            <p className="text-[11px] text-brown-300 tracking-wide">
              {searchQuery ? `No results for "${searchQuery}"` : 'No elements in this category'}
            </p>
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
          Motifs inspired by centuries of Moroccan artisanal terza tradition.
        </p>
      </div>
    </aside>
  )
}
