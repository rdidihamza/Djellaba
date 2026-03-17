'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { Stage, Layer, Image as KImage, Transformer, Rect, Text } from 'react-konva'
import useImage from 'use-image'
import type Konva from 'konva'
import { useLamaalamStore } from '@/lib/lamaalam-store'
import { decorationAssets } from '@/data/lamaalam-assets'
import type { PlacedDecoration } from '@/types/lamaalam'

// ─────────────────────────────────────────────────────────────
// Single placed decoration element
// ─────────────────────────────────────────────────────────────

interface DecoElementProps {
  el: PlacedDecoration
  isSelected: boolean
  onSelect: () => void
  onDragEnd: (x: number, y: number) => void
  onTransformEnd: (attrs: Partial<PlacedDecoration>) => void
}

function DecoElement({ el, isSelected, onSelect, onDragEnd, onTransformEnd }: DecoElementProps) {
  const asset = decorationAssets.find((a) => a.id === el.assetId)
  const [img] = useImage(asset?.image ?? '', 'anonymous')
  const nodeRef = useRef<Konva.Image>(null)

  return (
    <KImage
      ref={nodeRef}
      id={el.id}
      image={img}
      x={el.x}
      y={el.y}
      width={el.width}
      height={el.height}
      rotation={el.rotation}
      scaleX={el.scaleX * (el.flipX ? -1 : 1)}
      scaleY={el.scaleY * (el.flipY ? -1 : 1)}
      opacity={el.opacity}
      draggable={!el.locked}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        onDragEnd(e.target.x(), e.target.y())
      }}
      onTransformEnd={(e) => {
        const node = e.target as Konva.Image
        onTransformEnd({
          x: node.x(),
          y: node.y(),
          width: Math.max(10, node.width() * node.scaleX()),
          height: Math.max(10, node.height() * node.scaleY()),
          scaleX: 1,
          scaleY: 1,
          rotation: node.rotation(),
        })
        // Reset scale on node after baking into width/height
        node.scaleX(1)
        node.scaleY(1)
      }}
    />
  )
}

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
          fill="rgba(201,164,74,0.08)"
          stroke="rgba(201,164,74,0.35)"
          strokeWidth={1}
          dash={[4, 4]}
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
        />
      ))}
    </>
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

  const stageRef = useRef<Konva.Stage>(null)
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
  useEffect(() => {
    const tr = transformerRef.current
    const stage = stageRef.current
    if (!tr || !stage) return

    if (selectedElementId) {
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
  }, [selectedElementId, placedElements])

  // ── Deselect on stage background click ─────────────────
  const handleStageClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (e.target === e.target.getStage()) {
        selectElement(null)
      }
    },
    [selectElement]
  )

  // ── Drop from asset panel ───────────────────────────────
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDraggingOver(false)

      const assetId = e.dataTransfer.getData('assetId')
      const asset = decorationAssets.find((a) => a.id === assetId)
      if (!asset || !stageRef.current) return

      const stage = stageRef.current
      const stageBox = stage.container().getBoundingClientRect()
      const x = (e.clientX - stageBox.left) / scale
      const y = (e.clientY - stageBox.top) / scale

      useLamaalamStore.getState().addElement(asset, x - asset.defaultWidth / 2, y - asset.defaultHeight / 2)
    },
    [scale]
  )

  // ── Export canvas as PNG ────────────────────────────────
  // Exposed via store action — stageRef accessible externally
  useEffect(() => {
    ;(window as unknown as Record<string, unknown>).__lamaalamStage = stageRef.current
  }, [])

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
        ref={stageRef}
        width={stageW}
        height={stageH}
        scaleX={scale}
        scaleY={scale}
        onClick={handleStageClick}
        onTap={handleStageClick}
        style={{ display: 'block' }}
      >
        {/* ── Layer 0: Background ──────────────────────── */}
        <Layer>
          <Rect
            x={0}
            y={0}
            width={nativeW}
            height={nativeH}
            fill="#F7F2EA"
          />
        </Layer>

        {/* ── Layer 1: Base garment ────────────────────── */}
        <Layer>
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
              // Enforce minimum size
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

      {/* Empty state hint */}
      {placedElements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-[11px] tracking-[0.18em] uppercase text-brown-400 text-center px-4 opacity-60">
            Click or drag a motif<br />from the panel to begin
          </p>
        </div>
      )}
    </div>
  )
}
