'use client'

import { Undo2, Redo2, Trash2, RotateCcw, Grid3x3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLamaalamStore } from '@/lib/lamaalam-store'

interface ToolBarProps {
  className?: string
}

export function ToolBar({ className }: ToolBarProps) {
  const {
    undo, redo, canUndo, canRedo,
    resetDesign, placedElements,
    showZones, toggleZones,
  } = useLamaalamStore()

  return (
    <div
      className={cn(
        'flex items-center gap-1 px-3 py-2 rounded-xl border border-gold-200 bg-cream/90 backdrop-blur-sm shadow-luxury',
        className
      )}
    >
      {/* Undo */}
      <button
        onClick={undo}
        disabled={!canUndo()}
        title="Undo (Ctrl+Z)"
        className={cn(
          'w-8 h-8 flex items-center justify-center rounded-lg transition-all text-[13px]',
          canUndo()
            ? 'text-brown-600 hover:text-brown-900 hover:bg-sand'
            : 'text-brown-300 cursor-not-allowed'
        )}
      >
        <Undo2 size={15} strokeWidth={1.75} />
      </button>

      {/* Redo */}
      <button
        onClick={redo}
        disabled={!canRedo()}
        title="Redo (Ctrl+Y)"
        className={cn(
          'w-8 h-8 flex items-center justify-center rounded-lg transition-all',
          canRedo()
            ? 'text-brown-600 hover:text-brown-900 hover:bg-sand'
            : 'text-brown-300 cursor-not-allowed'
        )}
      >
        <Redo2 size={15} strokeWidth={1.75} />
      </button>

      <div className="w-px h-5 bg-gold-200 mx-1" />

      {/* Zone grid toggle */}
      <button
        onClick={toggleZones}
        title="Toggle placement zones"
        className={cn(
          'w-8 h-8 flex items-center justify-center rounded-lg transition-all',
          showZones
            ? 'text-gold-600 bg-gold-50'
            : 'text-brown-500 hover:text-brown-800 hover:bg-sand'
        )}
      >
        <Grid3x3 size={15} strokeWidth={1.75} />
      </button>

      <div className="w-px h-5 bg-gold-200 mx-1" />

      {/* Element count badge */}
      <span className="text-[11px] text-brown-400 px-2 tabular-nums">
        {placedElements.length} element{placedElements.length !== 1 ? 's' : ''}
      </span>

      {/* Reset */}
      <button
        onClick={() => {
          if (placedElements.length > 0 && confirm('Reset the entire design? This cannot be undone.')) {
            resetDesign()
          }
        }}
        disabled={placedElements.length === 0}
        title="Reset design"
        className={cn(
          'ml-auto w-8 h-8 flex items-center justify-center rounded-lg transition-all',
          placedElements.length > 0
            ? 'text-brown-400 hover:text-red-500 hover:bg-red-50'
            : 'text-brown-200 cursor-not-allowed'
        )}
      >
        <RotateCcw size={14} strokeWidth={1.75} />
      </button>
    </div>
  )
}
