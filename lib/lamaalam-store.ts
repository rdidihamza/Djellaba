import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import type {
  DjellabBase,
  DecorationAsset,
  PlacedDecoration,
  DesignPreset,
  DesignExport,
  ToastMessage,
} from '@/types/lamaalam'
import { djellabBases, decorationAssets } from '@/data/lamaalam-assets'

// ─────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────

function uid() {
  return `el-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function deepClone<T>(value: T): T {
  if (typeof structuredClone !== 'undefined') return structuredClone(value)
  return JSON.parse(JSON.stringify(value))
}

const MAX_HISTORY = 50
const STORAGE_KEY = 'lamaalam_design_v2'

interface PersistedState {
  placedElements: PlacedDecoration[]
  baseId: string
  designNotes: string
}

// ─────────────────────────────────────────────────────────────
// Store interface
// ─────────────────────────────────────────────────────────────

interface LamaalamStore {
  // ── State ─────────────────────────────────────────
  selectedBase: DjellabBase
  placedElements: PlacedDecoration[]
  selectedElementId: string | null
  past: PlacedDecoration[][]
  future: PlacedDecoration[][]
  savedPresets: DesignPreset[]
  showZones: boolean
  isDirty: boolean
  designNotes: string
  toast: ToastMessage | null

  // ── History helpers ───────────────────────────────
  _snapshot: () => void

  // ── Persistence ───────────────────────────────────
  loadFromStorage: () => void

  // ── Element actions ───────────────────────────────
  addElement: (asset: DecorationAsset, x?: number, y?: number) => void
  updateElement: (id: string, updates: Partial<PlacedDecoration>) => void
  removeElement: (id: string) => void
  selectElement: (id: string | null) => void
  duplicateElement: (id: string) => void

  // ── Layer ordering ────────────────────────────────
  bringForward: (id: string) => void
  sendBackward: (id: string) => void
  bringToFront: (id: string) => void
  sendToBack: (id: string) => void

  // ── Undo / Redo ───────────────────────────────────
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean

  // ── Design management ─────────────────────────────
  resetDesign: () => void
  savePreset: (name: string) => DesignPreset
  loadPreset: (preset: DesignPreset) => void
  exportDesignJSON: () => DesignExport

  // ── UI toggles ────────────────────────────────────
  toggleZones: () => void
  setDesignNotes: (notes: string) => void
  showToast: (message: string, type?: ToastMessage['type']) => void
  dismissToast: () => void

  // ── Getters ───────────────────────────────────────
  getSelectedElement: () => PlacedDecoration | null
  getAssetById: (assetId: string) => DecorationAsset | undefined
  sortedElements: () => PlacedDecoration[]
}

// ─────────────────────────────────────────────────────────────
// Store implementation
// ─────────────────────────────────────────────────────────────

export const useLamaalamStore = create<LamaalamStore>()(
  subscribeWithSelector((set, get) => ({
    selectedBase: djellabBases[0],
    placedElements: [],
    selectedElementId: null,
    past: [],
    future: [],
    savedPresets: [],
    showZones: false,
    isDirty: false,
    designNotes: '',
    toast: null,

    // ── Snapshot for undo ──────────────────────────────────
    _snapshot() {
      const { placedElements, past } = get()
      const next = [deepClone(placedElements), ...past].slice(0, MAX_HISTORY)
      set({ past: next, future: [], isDirty: true })
    },

    // ── Load from localStorage ─────────────────────────────
    loadFromStorage() {
      if (typeof window === 'undefined') return
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        if (!raw) return
        const data: PersistedState = JSON.parse(raw)
        const base = djellabBases.find((b) => b.id === data.baseId) ?? djellabBases[0]
        set({
          placedElements: data.placedElements ?? [],
          selectedBase: base,
          designNotes: data.designNotes ?? '',
        })
      } catch {
        // Corrupted storage — ignore silently
      }
    },

    // ── Add element ────────────────────────────────────────
    addElement(asset, x, y) {
      get()._snapshot()
      const { selectedBase } = get()
      const cx = x ?? (selectedBase.canvasWidth - asset.defaultWidth) / 2
      const cy = y ?? selectedBase.canvasHeight / 3 - asset.defaultHeight / 2
      const maxZ = get().placedElements.reduce((m, e) => Math.max(m, e.zIndex), 0)

      const el: PlacedDecoration = {
        id: uid(),
        assetId: asset.id,
        x: cx,
        y: cy,
        width: asset.defaultWidth,
        height: asset.defaultHeight,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        zIndex: maxZ + 1,
        locked: false,
        opacity: 1,
      }
      set((s) => ({
        placedElements: [...s.placedElements, el],
        selectedElementId: el.id,
      }))
    },

    // ── Update element ─────────────────────────────────────
    updateElement(id, updates) {
      set((s) => ({
        placedElements: s.placedElements.map((e) =>
          e.id === id ? { ...e, ...updates } : e
        ),
        isDirty: true,
      }))
    },

    // ── Remove element ─────────────────────────────────────
    removeElement(id) {
      get()._snapshot()
      set((s) => ({
        placedElements: s.placedElements.filter((e) => e.id !== id),
        selectedElementId: s.selectedElementId === id ? null : s.selectedElementId,
      }))
    },

    // ── Select ─────────────────────────────────────────────
    selectElement(id) {
      set({ selectedElementId: id })
    },

    // ── Duplicate ──────────────────────────────────────────
    duplicateElement(id) {
      get()._snapshot()
      const original = get().placedElements.find((e) => e.id === id)
      if (!original) return
      const maxZ = get().placedElements.reduce((m, e) => Math.max(m, e.zIndex), 0)
      const copy: PlacedDecoration = {
        ...deepClone(original),
        id: uid(),
        x: original.x + 20,
        y: original.y + 20,
        zIndex: maxZ + 1,
      }
      set((s) => ({
        placedElements: [...s.placedElements, copy],
        selectedElementId: copy.id,
      }))
    },

    // ── Layer ordering ──────────────────────────────────────
    bringForward(id) {
      get()._snapshot()
      set((s) => {
        const sorted = [...s.placedElements].sort((a, b) => a.zIndex - b.zIndex)
        const idx = sorted.findIndex((e) => e.id === id)
        if (idx === -1 || idx === sorted.length - 1) return {}
        const above = sorted[idx + 1]
        return {
          placedElements: s.placedElements.map((e) => {
            if (e.id === id) return { ...e, zIndex: above.zIndex }
            if (e.id === above.id) return { ...e, zIndex: sorted[idx].zIndex }
            return e
          }),
        }
      })
    },

    sendBackward(id) {
      get()._snapshot()
      set((s) => {
        const sorted = [...s.placedElements].sort((a, b) => a.zIndex - b.zIndex)
        const idx = sorted.findIndex((e) => e.id === id)
        if (idx <= 0) return {}
        const below = sorted[idx - 1]
        return {
          placedElements: s.placedElements.map((e) => {
            if (e.id === id) return { ...e, zIndex: below.zIndex }
            if (e.id === below.id) return { ...e, zIndex: sorted[idx].zIndex }
            return e
          }),
        }
      })
    },

    bringToFront(id) {
      get()._snapshot()
      const maxZ = get().placedElements.reduce((m, e) => Math.max(m, e.zIndex), 0)
      set((s) => ({
        placedElements: s.placedElements.map((e) =>
          e.id === id ? { ...e, zIndex: maxZ + 1 } : e
        ),
      }))
    },

    sendToBack(id) {
      get()._snapshot()
      const minZ = get().placedElements.reduce((m, e) => Math.min(m, e.zIndex), Infinity)
      set((s) => ({
        placedElements: s.placedElements.map((e) =>
          e.id === id ? { ...e, zIndex: minZ - 1 } : e
        ),
      }))
    },

    // ── Undo ───────────────────────────────────────────────
    undo() {
      const { past, placedElements, future } = get()
      if (past.length === 0) return
      const [prev, ...rest] = past
      set({
        past: rest,
        future: [deepClone(placedElements), ...future].slice(0, MAX_HISTORY),
        placedElements: prev,
        selectedElementId: null,
      })
    },

    redo() {
      const { future, placedElements, past } = get()
      if (future.length === 0) return
      const [next, ...rest] = future
      set({
        future: rest,
        past: [deepClone(placedElements), ...past].slice(0, MAX_HISTORY),
        placedElements: next,
        selectedElementId: null,
      })
    },

    canUndo: () => get().past.length > 0,
    canRedo: () => get().future.length > 0,

    // ── Reset ──────────────────────────────────────────────
    resetDesign() {
      get()._snapshot()
      set({ placedElements: [], selectedElementId: null })
    },

    // ── Presets ────────────────────────────────────────────
    savePreset(name) {
      const { placedElements, selectedBase } = get()
      const preset: DesignPreset = {
        id: uid(),
        name,
        baseId: selectedBase.id,
        elements: deepClone(placedElements),
        createdAt: new Date().toISOString(),
      }
      set((s) => ({ savedPresets: [...s.savedPresets, preset] }))
      return preset
    },

    loadPreset(preset) {
      get()._snapshot()
      set({
        placedElements: deepClone(preset.elements),
        selectedElementId: null,
      })
    },

    // ── Export ─────────────────────────────────────────────
    exportDesignJSON(): DesignExport {
      const { placedElements, selectedBase, designNotes } = get()
      return {
        version: '1.0',
        baseId: selectedBase.id,
        elements: deepClone(placedElements),
        exportedAt: new Date().toISOString(),
        totalElements: placedElements.length,
        notes: designNotes || undefined,
      }
    },

    // ── UI toggles ──────────────────────────────────────────
    toggleZones() {
      set((s) => ({ showZones: !s.showZones }))
    },

    setDesignNotes(notes) {
      set({ designNotes: notes })
    },

    showToast(message, type = 'success') {
      const t: ToastMessage = { id: uid(), message, type }
      set({ toast: t })
    },

    dismissToast() {
      set({ toast: null })
    },

    // ── Getters ────────────────────────────────────────────
    getSelectedElement() {
      const { selectedElementId, placedElements } = get()
      if (!selectedElementId) return null
      return placedElements.find((e) => e.id === selectedElementId) ?? null
    },

    getAssetById(assetId) {
      return decorationAssets.find((a) => a.id === assetId)
    },

    sortedElements() {
      return [...get().placedElements].sort((a, b) => a.zIndex - b.zIndex)
    },
  }))
)

// ─────────────────────────────────────────────────────────────
// Persist to localStorage on every placedElements change
// ─────────────────────────────────────────────────────────────

if (typeof window !== 'undefined') {
  useLamaalamStore.subscribe(
    (state) => state.placedElements,
    (placedElements) => {
      const { selectedBase, designNotes } = useLamaalamStore.getState()
      const data: PersistedState = {
        placedElements,
        baseId: selectedBase.id,
        designNotes,
      }
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch {
        // Storage full or blocked — ignore
      }
    }
  )

  // Also persist when designNotes change
  useLamaalamStore.subscribe(
    (state) => state.designNotes,
    (designNotes) => {
      const { placedElements, selectedBase } = useLamaalamStore.getState()
      const data: PersistedState = {
        placedElements,
        baseId: selectedBase.id,
        designNotes,
      }
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch {
        // ignore
      }
    }
  )
}
