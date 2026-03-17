'use client'

import { useState } from 'react'
import { Undo2, Redo2, RotateCcw, HelpCircle, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLamaalamStore } from '@/lib/lamaalam-store'

const SHORTCUTS = [
  { keys: 'Ctrl+Z', desc: 'Undo' },
  { keys: 'Ctrl+Y / Ctrl+Shift+Z', desc: 'Redo' },
  { keys: 'Ctrl+D', desc: 'Duplicate selected' },
  { keys: 'Del / Backspace', desc: 'Remove selected' },
  { keys: 'Click canvas', desc: 'Deselect' },
]

interface ToolBarProps {
  className?: string
}

export function ToolBar({ className }: ToolBarProps) {
  const {
    undo, redo, canUndo, canRedo,
    resetDesign, placedElements,
  } = useLamaalamStore()

  const [showHelp, setShowHelp] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const handleResetClick = () => {
    if (placedElements.length === 0) return
    if (confirmReset) {
      resetDesign()
      setConfirmReset(false)
    } else {
      setConfirmReset(true)
      // Auto-cancel confirmation after 3s
      setTimeout(() => setConfirmReset(false), 3000)
    }
  }

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
          'w-8 h-8 flex items-center justify-center rounded-lg transition-all',
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

      {/* Element count badge */}
      <span className="text-[11px] text-brown-400 px-2 tabular-nums select-none">
        {placedElements.length} element{placedElements.length !== 1 ? 's' : ''}
      </span>

      <div className="w-px h-5 bg-gold-200 mx-1" />

      {/* Reset — inline confirmation */}
      <button
        onClick={handleResetClick}
        disabled={placedElements.length === 0}
        title={confirmReset ? 'Click again to confirm reset' : 'Reset design'}
        className={cn(
          'flex items-center gap-1.5 px-2.5 h-8 rounded-lg transition-all text-[11px] font-medium',
          placedElements.length === 0
            ? 'text-brown-200 cursor-not-allowed'
            : confirmReset
            ? 'text-red-600 bg-red-50 border border-red-200 hover:bg-red-100'
            : 'text-brown-400 hover:text-red-500 hover:bg-red-50'
        )}
      >
        {confirmReset ? (
          <>
            <AlertTriangle size={13} />
            <span>Confirm?</span>
          </>
        ) : (
          <RotateCcw size={14} strokeWidth={1.75} />
        )}
      </button>

      {/* Help tooltip */}
      <div className="relative ml-auto">
        <button
          onClick={() => setShowHelp((v) => !v)}
          title="Keyboard shortcuts"
          className={cn(
            'w-8 h-8 flex items-center justify-center rounded-lg transition-all',
            showHelp
              ? 'text-gold-600 bg-gold-50'
              : 'text-brown-400 hover:text-brown-700 hover:bg-sand'
          )}
        >
          <HelpCircle size={14} strokeWidth={1.75} />
        </button>

        {showHelp && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-cream border border-gold-200 rounded-xl shadow-luxury-lg z-50 py-3 px-4">
            <p className="text-[10px] tracking-[0.15em] uppercase text-gold-600 mb-2.5">
              Keyboard Shortcuts
            </p>
            <div className="space-y-1.5">
              {SHORTCUTS.map((s) => (
                <div key={s.keys} className="flex items-start gap-2">
                  <code className="text-[10px] bg-sand px-1.5 py-0.5 rounded text-brown-600 shrink-0 font-mono leading-tight">
                    {s.keys}
                  </code>
                  <span className="text-[11px] text-brown-500">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
