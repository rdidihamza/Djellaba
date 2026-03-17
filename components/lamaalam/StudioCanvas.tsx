'use client'

import { useRef, useEffect, useCallback, useState, memo, useContext } from 'react'
import { Stage, Layer, Image as KImage, Transformer, Rect, Text } from 'react-konva'
import useImage from 'use-image'
import type Konva from 'konva'
import { useLamaalamStore } from '@/lib/lamaalam-store'
import { decorationAssets } from '@/data/lamaalam-assets'
import type { PlacedDecoration } from '@/types/lamaalam'
import { StageContext } from './Studio'

// ─────────────────────────────────────────────────────────────
// Single placed decoration element (memoized)
// ─────────────────────────────────────────────────────────────

interface DecoElementProps {
  el: PlacedDecoration
  isSelected: boolean
  onSelect: () => void
  onDragEnd: (x: number, y: number) => void
  onTransformEnd: (attrs: Partial<PlacedDecoration>) => void
  canvasW: number
  canvasH: number
}

const DecoElement = memo(function DecoElement({
  el,
  onSelect,
  onDragEnd,
  onTransformEnd,
  canvasW,
  canvasH,
}: DecoElementProps) {
  const asset = decorationAssets.find((a) => a.id === el.assetId)
  const [img] = useImage(asset?.image ?? '', 'anonymous')

  return (
    <KImage
      id={el.id}
      image={img}
      x={el.x}
      y={el.y}
      width={el.width}
      height={el.height}
      rotation={el.rotation}
      scaleX={el.scaleX * (el.flipX ? -1 : 1)}
      scaleY={el.scaleY * (el.flipY ? -1 : 1)}
      offsetX={el.flipX ? el.width : 0}
      offsetY={el.flipY ? el.height : 0}
      opacity={el.opacity}
      draggable={!el.locked}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        // Clamp position so element stays within canvas
        const node = e.target
        const clampedX = Math.max(0, Math.min(canvasW - el.width, node.x()))
        const clampedY = Math.max(0, Math.min(canvasH - el.height, node.y()))
        node.x(clampedX)
        node.y(clampedY)
        onDragEnd(clampedX, clampedY)
      }}
      onTransformEnd={(e) => {
        const node = e.target as Konva.Image
        const newW = Math.max(10, node.width() * node.scaleX())
        const newH = Math.max(10, node.height() * node.scaleY())
        onTransformEnd({
          x: node.x(),
          y: node.y(),
          width: newW,
          height: newH,
          scaleX: 1,
          scaleY: 1,
          rotation: node.rotation(),
        })
        node.scaleX(1)
        node.scaleY(1)
      }}
    />
  )
})

// ─────────────────────────────────────────────────────────────
// Zone overlay rectangles
// ─────────────────────────────────────────────────────────────

function ZoneOverlays({
  canvasWidth,
  canvasHeight,
  zones,
}: {
  canvasWidth: number
  canvasHeight: number
  zones: { id: string; label: string; x: number; y: number; width: number; height: number }[]
}) {
  return (
    <>
      {zones.map((z) => (
        <Rect
          key={z.id}
          x={z.x * canvasWidth}
          y={z.y * canvasHeight}
          width={z.width * canvasWidth}
          height={z.height * canvasHeight}
          fill="rgba(201,164,74,0.07)"
          stroke="rgba(201,164,74,0.32)"
          strokeWidth={1}
          dash={[4, 4]}
          listening={false}
        />
      ))}
      {zones.map((z) => (
        <Text
          key={z.id + '-label'}
          x={z.x * canvasWidth + 4}
          y={z.y * canvasHeight + 4}
          text={z.label}
          fontSize={9}
          fill="rgba(160,120,48,0.7)"
          fontFamily="Inter, sans-serif"
          listening={false}
        />
      ))}
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// Animated empty state ornament
// ─────────────────────────────────────────────────────────────

function EmptyStateOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing ornament */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-gold-200/30 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-gold-100/40 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl text-gold-500 opacity-60">✦</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-[11px] tracking-[0.18em] uppercase text-brown-400 opacity-70">
            Click or drag a motif
          </p>
          <p className="text-[11px] tracking-[0.18em] uppercase text-brown-400 opacity-70">
            from the library to begin
          </p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Main canvas component
// ─────────────────────────────────────────────────────────────

interface StudioCanvasProps {
  containerWidth: number
}

export default function StudioCanvas({ containerWidth }: StudioCanvasProps) {
  const {
    selectedBase,
    placedElements,
    selectedElementId,
    showZones,
    selectElement,
    updateElement,
    _snapshot,
    sortedElements,
  } = useLamaalamStore()

  const stageRef = useContext(StageContext)
  const internalStageRef = useRef<Konva.Stage>(null)
  const activeStageRef = stageRef ?? internalStageRef

  const transformerRef = useRef<Konva.Transformer>(null)
  const [baseImg] = useImage(selectedBase.image, 'anonymous')
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  // ── Responsive scaling ──────────────────────────────────
  const nativeW = selectedBase.canvasWidth
  const nativeH = selectedBase.canvasHeight
  const scale = Math.min(containerWidth / nativeW, 1)
  const stageW = nativeW * scale
  const stageH = nativeH * scale

  // ── Sync transformer to selected node ──────────────────
  const selectedEl = placedElements.find((e) => e.id === selectedElementId)
  const isLocked = selectedEl?.locked ?? false

  useEffect(() => {
    const tr = transformerRef.current
    const stage = activeStageRef.current
    if (!tr || !stage) return

    if (selectedElementId && !isLocked) {
      const node = stage.findOne(`#${selectedElementId}`)
      if (node) {
        tr.nodes([node as Konva.Node])
      } else {
        tr.nodes([])
      }
    } else {
      tr.nodes([])
    }
    tr.getLayer()?.batchDraw()
  }, [selectedElementId, placedElements, isLocked, activeStageRef])

  // ── Deselect on stage background click ─────────────────
  const handleStageClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (e.target === e.target.getStage()) {
        selectElement(null)
      }
    },
    [selectElement]
  )

  // ── Drop from asset panel (bounds-aware) ────────────────
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDraggingOver(false)

      const assetId = e.dataTransfer.getData('assetId')
      const asset = decorationAssets.find((a) => a.id === assetId)
      if (!asset || !activeStageRef.current) return

      const stage = activeStageRef.current
      const stageBox = stage.container().getBoundingClientRect()
      const rawX = (e.clientX - stageBox.left) / scale
      const rawY = (e.clientY - stageBox.top) / scale

      // Clamp so element stays fully within canvas
      const x = Math.max(0, Math.min(nativeW - asset.defaultWidth, rawX - asset.defaultWidth / 2))
      const y = Math.max(0, Math.min(nativeH - asset.defaultHeight, rawY - asset.defaultHeight / 2))

      useLamaalamStore.getState().addElement(asset, x, y)
    },
    [scale, nativeW, nativeH, activeStageRef]
  )

  const sorted = sortedElements()

  return (
    <div
      className="relative"
      style={{ width: stageW, height: stageH }}
      onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true) }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={handleDrop}
    >
      {/* Drop highlight ring */}
      {isDraggingOver && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-gold-400 ring-offset-2 ring-offset-cream pointer-events-none z-10" />
      )}

      <Stage
        ref={activeStageRef as React.RefObject<Konva.Stage>}
        width={stageW}
        height={stageH}
        scaleX={scale}
        scaleY={scale}
        onClick={handleStageClick}
        onTap={handleStageClick}
        style={{ display: 'block' }}
      >
        {/* ── Layer 0: Background ──────────────────────── */}
        <Layer listening={false}>
          <Rect x={0} y={0} width={nativeW} height={nativeH} fill="#F4EDE0" />
        </Layer>

        {/* ── Layer 1: Base garment ────────────────────── */}
        <Layer listening={false}>
          <KImage
            image={baseImg}
            x={0}
            y={0}
            width={nativeW}
            height={nativeH}
            listening={false}
          />
        </Layer>

        {/* ── Layer 2: Zone overlays ───────────────────── */}
        {showZones && (
          <Layer listening={false}>
            <ZoneOverlays
              canvasWidth={nativeW}
              canvasHeight={nativeH}
              zones={selectedBase.zones}
            />
          </Layer>
        )}

        {/* ── Layer 3: Decorations ─────────────────────── */}
        <Layer>
          {sorted.map((el) => (
            <DecoElement
              key={el.id}
              el={el}
              isSelected={el.id === selectedElementId}
              onSelect={() => selectElement(el.id)}
              canvasW={nativeW}
              canvasH={nativeH}
              onDragEnd={(x, y) => {
                updateElement(el.id, { x, y })
              }}
              onTransformEnd={(attrs) => {
                _snapshot()
                updateElement(el.id, attrs)
              }}
            />
          ))}
        </Layer>

        {/* ── Layer 4: Transformer ─────────────────────── */}
        <Layer>
          <Transformer
            ref={transformerRef}
            rotateEnabled
            keepRatio={false}
            enabledAnchors={[
              'top-left', 'top-right',
              'bottom-left', 'bottom-right',
              'middle-left', 'middle-right',
              'top-center', 'bottom-center',
            ]}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 10 || newBox.height < 10) return oldBox
              return newBox
            }}
            anchorSize={9}
            anchorCornerRadius={3}
            anchorStroke="#C9A44A"
            anchorFill="#FAF6EE"
            anchorStrokeWidth={1.5}
            borderStroke="#C9A44A"
            borderStrokeWidth={1.5}
            borderDash={[4, 3]}
            rotateAnchorOffset={18}
          />
        </Layer>
      </Stage>

      {/* Animated empty state */}
      {placedElements.length === 0 && <EmptyStateOverlay />}
    </div>
  )
}
