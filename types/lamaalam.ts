// ─────────────────────────────────────────────────────────────
// LAMAALAM — Djellaba Customization Studio
// Type definitions and data models
// ─────────────────────────────────────────────────────────────

export type GarmentView = 'front' | 'back' | 'sleeve-left' | 'sleeve-right' | 'detail'

export type AssetCategory =
  | 'terza'
  | 'neckline'
  | 'sleeve'
  | 'chest'
  | 'seam'
  | 'geometric'
  | 'embroidery'
  | 'trim'

export type ZoneId =
  | 'neckline'
  | 'chest-left'
  | 'chest-right'
  | 'chest-center'
  | 'placket'
  | 'sleeve-left-edge'
  | 'sleeve-right-edge'
  | 'front-center'
  | 'side-left'
  | 'side-right'
  | 'hem'
  | 'free'

// A named placement zone on the garment canvas
export interface PlacementZone {
  id: ZoneId
  label: string
  x: number       // relative to canvas (0–1)
  y: number
  width: number
  height: number
}

// The base djellaba garment
export interface DjellabBase {
  id: string
  name: string
  image: string           // path or data URI to base garment
  color: string           // CSS color name or hex for tinting
  colorLabel: string
  view: GarmentView
  canvasWidth: number     // intrinsic canvas width
  canvasHeight: number    // intrinsic canvas height
  zones: PlacementZone[]
}

// A decorative asset available in the library
export interface DecorationAsset {
  id: string
  name: string
  nameAr?: string         // Arabic name for cultural authenticity
  category: AssetCategory
  image: string           // path or SVG data URI
  thumbnail?: string      // optional smaller preview
  defaultWidth: number
  defaultHeight: number
  allowedZones?: ZoneId[]
  tags: string[]
  description?: string
}

// An instance of a decoration placed on the canvas
export interface PlacedDecoration {
  id: string              // unique instance id (uuid)
  assetId: string
  x: number               // canvas pixels from left
  y: number               // canvas pixels from top
  width: number
  height: number
  rotation: number        // degrees
  scaleX: number
  scaleY: number
  zIndex: number
  locked: boolean
  opacity: number         // 0–1
  zone?: ZoneId
  flipX?: boolean
  flipY?: boolean
  metadata?: Record<string, unknown>
}

// A saved preset design
export interface DesignPreset {
  id: string
  name: string
  baseId: string
  elements: PlacedDecoration[]
  createdAt: string       // ISO date string
  thumbnail?: string      // base64 preview
}

// The full studio state (what gets persisted / sent to server)
export interface StudioState {
  selectedBase: DjellabBase
  placedElements: PlacedDecoration[]
  selectedElementId: string | null
  past: PlacedDecoration[][]     // undo history
  future: PlacedDecoration[][]   // redo stack
  savedPresets: DesignPreset[]
  showZones: boolean
}

// Serialisable design export (sent to backend / workshop)
export interface DesignExport {
  version: '1.0'
  baseId: string
  elements: PlacedDecoration[]
  exportedAt: string
  totalElements: number
}

// Category metadata for the UI panel
export interface CategoryMeta {
  id: AssetCategory
  label: string
  labelAr?: string
  icon: string
}
