import type {
  DjellabBase,
  DecorationAsset,
  CategoryMeta,
  PlacementZone,
} from '@/types/lamaalam'

// ─────────────────────────────────────────────────────────────
// SVG UTILITIES
// ─────────────────────────────────────────────────────────────

function toDataURI(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

// ─────────────────────────────────────────────────────────────
// MATH HELPERS
// ─────────────────────────────────────────────────────────────

/** Generate an n-pointed star polygon points string.
 *  alternates between outerR and innerR radii. */
function starPoints(cx: number, cy: number, n: number, outerR: number, innerR: number): string {
  const pts: string[] = []
  for (let i = 0; i < n * 2; i++) {
    const angle = (Math.PI / n) * i - Math.PI / 2
    const r = i % 2 === 0 ? outerR : innerR
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`)
  }
  return pts.join(' ')
}

/** Regular polygon points string */
function polygonPoints(cx: number, cy: number, n: number, r: number, offset = 0): string {
  const pts: string[] = []
  for (let i = 0; i < n; i++) {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2 + offset
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`)
  }
  return pts.join(' ')
}

// ─────────────────────────────────────────────────────────────
// PROGRAMMATIC MOROCCAN PATTERN SVGs
// ─────────────────────────────────────────────────────────────

// Terza Classique — vertical gold strip with mathematical diamond chain
const terzaClassiqueSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 200" width="48" height="200">
  <defs>
    <linearGradient id="tg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8A6200"/>
      <stop offset="25%" stop-color="#C8920A"/>
      <stop offset="50%" stop-color="#F0CB6A"/>
      <stop offset="75%" stop-color="#C8920A"/>
      <stop offset="100%" stop-color="#8A6200"/>
    </linearGradient>
    <pattern id="tdp" x="0" y="0" width="48" height="28" patternUnits="userSpaceOnUse">
      <polygon points="${starPoints(24, 14, 4, 11, 5.5)}" fill="none" stroke="#FAF0D0" stroke-width="1" opacity="0.75"/>
      <circle cx="24" cy="14" r="2" fill="#FAF0D0" opacity="0.6"/>
    </pattern>
    <linearGradient id="tside" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#5A3C00"/>
      <stop offset="100%" stop-color="#5A3C00" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="48" height="200" fill="url(#tg)" rx="2"/>
  <rect width="48" height="200" fill="url(#tdp)" rx="2"/>
  <!-- Edge shadows for depth -->
  <rect x="0" y="0" width="5" height="200" fill="url(#tside)" opacity="0.5"/>
  <rect x="43" y="0" width="5" height="200" fill="url(#tside)" opacity="0.5" transform="scale(-1,1) translate(-48,0)"/>
  <!-- Edge lines -->
  <line x1="1" y1="0" x2="1" y2="200" stroke="#FAF0D0" stroke-width="0.5" opacity="0.3"/>
  <line x1="47" y1="0" x2="47" y2="200" stroke="#FAF0D0" stroke-width="0.5" opacity="0.3"/>
</svg>`

// Sfifa Dorée — braided trim with wave pattern
const sfifaDoreeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 24" width="200" height="24">
  <defs>
    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#B87A0A"/>
      <stop offset="40%" stop-color="#F0CB6A"/>
      <stop offset="100%" stop-color="#8A5A00"/>
    </linearGradient>
    <pattern id="sp" x="0" y="0" width="20" height="24" patternUnits="userSpaceOnUse">
      <path d="M0,7 Q5,1 10,7 Q15,13 20,7" fill="none" stroke="#FAF0D0" stroke-width="1.2" opacity="0.65"/>
      <path d="M0,17 Q5,11 10,17 Q15,23 20,17" fill="none" stroke="#FAF0D0" stroke-width="1.2" opacity="0.65"/>
      <circle cx="10" cy="12" r="1.2" fill="#FAF0D0" opacity="0.4"/>
    </pattern>
  </defs>
  <rect width="200" height="24" fill="url(#sg)" rx="2"/>
  <rect width="200" height="24" fill="url(#sp)"/>
  <line x1="0" y1="1.5" x2="200" y2="1.5" stroke="#FAF0D0" stroke-width="0.8" opacity="0.35"/>
  <line x1="0" y1="22.5" x2="200" y2="22.5" stroke="#FAF0D0" stroke-width="0.8" opacity="0.35"/>
</svg>`

// Najma Marocaine — mathematically precise 8-pointed star
const najmaSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <radialGradient id="ng" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#F5E080"/>
      <stop offset="55%" stop-color="#D4A84B"/>
      <stop offset="100%" stop-color="#7A5200"/>
    </radialGradient>
    <radialGradient id="ng2" cx="50%" cy="35%">
      <stop offset="0%" stop-color="#FFF8E0"/>
      <stop offset="100%" stop-color="#F0CB6A" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- Outer star fill -->
  <polygon points="${starPoints(50, 50, 8, 44, 18)}" fill="url(#ng)" stroke="#FAF0D0" stroke-width="0.8" stroke-linejoin="round"/>
  <!-- Light sheen -->
  <polygon points="${starPoints(50, 50, 8, 44, 18)}" fill="url(#ng2)" opacity="0.4"/>
  <!-- Inner star outline -->
  <polygon points="${starPoints(50, 50, 8, 28, 12)}" fill="none" stroke="#FAF0D0" stroke-width="0.7" opacity="0.55"/>
  <!-- Centre circle -->
  <circle cx="50" cy="50" r="8" fill="#FAF0D0" opacity="0.75"/>
  <circle cx="50" cy="50" r="4" fill="#C8920A"/>
  <circle cx="50" cy="50" r="1.8" fill="#FAF0D0" opacity="0.8"/>
</svg>`

// Khatam Or — interlocking geometric star with inner ring
const khatamSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="kg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E8C050"/>
      <stop offset="100%" stop-color="#8A5A00"/>
    </linearGradient>
  </defs>
  <!-- Outer hex star -->
  <polygon points="${starPoints(50, 50, 6, 42, 22)}" fill="url(#kg)" stroke="#FAF0D0" stroke-width="0.6" opacity="0.95"/>
  <!-- Inner rotating star offset -->
  <polygon points="${starPoints(50, 50, 6, 42, 22)}" fill="none" stroke="#FAF0D0" stroke-width="1.2" transform="rotate(30 50 50)" opacity="0.5"/>
  <!-- Ring -->
  <circle cx="50" cy="50" r="15" fill="none" stroke="#FAF0D0" stroke-width="1.5" opacity="0.6"/>
  <!-- Centre -->
  <circle cx="50" cy="50" r="8" fill="url(#kg)"/>
  <circle cx="50" cy="50" r="4" fill="#FAF0D0"/>
  <circle cx="50" cy="50" r="1.5" fill="#C8920A"/>
</svg>`

// Mkass Qob — V-shaped neckline ornament with precision tips
const mkassSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="120" height="80">
  <defs>
    <linearGradient id="mqg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#D4A84B"/>
      <stop offset="100%" stop-color="#7A5200"/>
    </linearGradient>
    <linearGradient id="mqg2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#C8920A" stop-opacity="0"/>
      <stop offset="50%" stop-color="#F0CB6A"/>
      <stop offset="100%" stop-color="#C8920A" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <!-- Main V shape -->
  <path d="M 10 6 L 60 72 L 110 6" fill="none" stroke="url(#mqg)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Inner highlight -->
  <path d="M 18 6 L 60 60 L 102 6" fill="none" stroke="#FAF0D0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.45"/>
  <!-- Top horizontal bar -->
  <line x1="0" y1="6" x2="120" y2="6" stroke="url(#mqg2)" stroke-width="3"/>
  <!-- Corner accents -->
  <path d="M 4 6 L 10 6 L 10 22" fill="none" stroke="#D4A84B" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 116 6 L 110 6 L 110 22" fill="none" stroke="#D4A84B" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Tip ornament -->
  <circle cx="60" cy="72" r="4.5" fill="#FAF0D0" stroke="#C8920A" stroke-width="1.5"/>
  <circle cx="60" cy="72" r="2" fill="#D4A84B"/>
  <!-- Corner dots -->
  <circle cx="10" cy="6" r="3.5" fill="#FAF0D0" stroke="#C8920A" stroke-width="1.2"/>
  <circle cx="110" cy="6" r="3.5" fill="#FAF0D0" stroke="#C8920A" stroke-width="1.2"/>
</svg>`

// Aakad Manche — sleeve cuff band with arabesque
const aakadSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 36" width="160" height="36">
  <defs>
    <linearGradient id="ag" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#7A5200"/>
      <stop offset="20%" stop-color="#C8920A"/>
      <stop offset="50%" stop-color="#F0CB6A"/>
      <stop offset="80%" stop-color="#C8920A"/>
      <stop offset="100%" stop-color="#7A5200"/>
    </linearGradient>
    <pattern id="ap" x="0" y="0" width="32" height="36" patternUnits="userSpaceOnUse">
      <path d="M0,18 C6,6 14,6 16,18 C18,30 26,30 32,18" fill="none" stroke="#FAF0D0" stroke-width="1.4" opacity="0.6"/>
      <circle cx="16" cy="18" r="2" fill="#FAF0D0" opacity="0.45"/>
    </pattern>
  </defs>
  <rect width="160" height="36" fill="url(#ag)" rx="3"/>
  <rect width="160" height="36" fill="url(#ap)"/>
  <rect x="0" y="0" width="160" height="2.5" fill="#FAF0D0" opacity="0.18" rx="1"/>
  <rect x="0" y="33.5" width="160" height="2.5" fill="#FAF0D0" opacity="0.18" rx="1"/>
</svg>`

// Trilis — diagonal lattice border strip
const trilisSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 32" width="200" height="32">
  <defs>
    <linearGradient id="trlg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#A87820"/>
      <stop offset="50%" stop-color="#E8C050"/>
      <stop offset="100%" stop-color="#A07020"/>
    </linearGradient>
    <pattern id="trlp" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
      <rect x="5" y="5" width="12" height="12" fill="none" stroke="#FAF0D0" stroke-width="1" transform="rotate(45 11 11)" opacity="0.5"/>
      <circle cx="11" cy="11" r="1.5" fill="#FAF0D0" opacity="0.35"/>
    </pattern>
  </defs>
  <rect width="200" height="32" fill="url(#trlg)" rx="2.5"/>
  <rect width="200" height="32" fill="url(#trlp)"/>
  <line x1="0" y1="2.5" x2="200" y2="2.5" stroke="#FAF0D0" stroke-width="0.8" opacity="0.3"/>
  <line x1="0" y1="29.5" x2="200" y2="29.5" stroke="#FAF0D0" stroke-width="0.8" opacity="0.3"/>
</svg>`

// Rosace Florale — 8-petal floral rosette built with math
const rosaceSVG = (() => {
  const petals = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45 * Math.PI) / 180
    const cx = (50 + Math.cos(angle) * 26).toFixed(1)
    const cy = (50 + Math.sin(angle) * 26).toFixed(1)
    return `<ellipse cx="${cx}" cy="${cy}" rx="11" ry="5.5" transform="rotate(${i * 45} ${cx} ${cy})" fill="url(#rg)" opacity="0.88" stroke="#FAF0D0" stroke-width="0.5"/>`
  }).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <radialGradient id="rg" cx="50%" cy="35%">
      <stop offset="0%" stop-color="#F8E890"/>
      <stop offset="60%" stop-color="#D4A84B"/>
      <stop offset="100%" stop-color="#7A5200"/>
    </radialGradient>
  </defs>
  <g transform="translate(0,0)">
    ${petals}
    <circle cx="50" cy="50" r="16" fill="url(#rg)" stroke="#FAF0D0" stroke-width="1"/>
    <circle cx="50" cy="50" r="8" fill="#FAF0D0" opacity="0.65"/>
    <circle cx="50" cy="50" r="3.5" fill="#D4A84B"/>
    <circle cx="50" cy="50" r="1.5" fill="#FAF0D0" opacity="0.9"/>
  </g>
</svg>`
})()

// Tbiq Central — rectangular chest panel with geometric medallion
const tbiqSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 140" width="80" height="140">
  <defs>
    <linearGradient id="tbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#9A7020"/>
      <stop offset="50%" stop-color="#D4A84B"/>
      <stop offset="100%" stop-color="#9A7020"/>
    </linearGradient>
  </defs>
  <rect width="80" height="140" fill="url(#tbg)" rx="3.5" stroke="#FAF0D0" stroke-width="0.8" opacity="0.9"/>
  <rect x="4" y="4" width="72" height="132" fill="none" stroke="#FAF0D0" stroke-width="0.7" rx="2" opacity="0.45"/>
  <!-- Top arch -->
  <path d="M18,18 Q40,8 62,18 L62,28 Q40,20 18,28 Z" fill="#FAF0D0" opacity="0.25"/>
  <!-- Central 8-star medallion -->
  <polygon points="${starPoints(40, 70, 8, 22, 9)}" fill="none" stroke="#FAF0D0" stroke-width="1.2" opacity="0.55"/>
  <polygon points="${starPoints(40, 70, 8, 14, 7)}" fill="#FAF0D0" opacity="0.2"/>
  <circle cx="40" cy="70" r="6" fill="none" stroke="#FAF0D0" stroke-width="1" opacity="0.6"/>
  <circle cx="40" cy="70" r="2.5" fill="#FAF0D0" opacity="0.6"/>
  <!-- Bottom zigzag trim -->
  <path d="M10,115 L20,108 L30,115 L40,108 L50,115 L60,108 L70,115" fill="none" stroke="#FAF0D0" stroke-width="1.4" opacity="0.45"/>
</svg>`

// Tassel ornament — hand-tied silk
const tasselSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
  <defs>
    <linearGradient id="tsg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E8C050"/>
      <stop offset="60%" stop-color="#C8920A"/>
      <stop offset="100%" stop-color="#7A5200"/>
    </linearGradient>
  </defs>
  <!-- Cap -->
  <circle cx="15" cy="12" r="10" fill="url(#tsg)" stroke="#FAF0D0" stroke-width="0.8"/>
  <circle cx="15" cy="12" r="5.5" fill="#FAF0D0" opacity="0.35"/>
  <circle cx="15" cy="12" r="2.5" fill="#C8920A"/>
  <!-- Neck band -->
  <rect x="11" y="21" width="8" height="10" fill="url(#tsg)"/>
  <line x1="11" y1="24" x2="19" y2="24" stroke="#FAF0D0" stroke-width="0.8" opacity="0.4"/>
  <line x1="11" y1="27" x2="19" y2="27" stroke="#FAF0D0" stroke-width="0.8" opacity="0.4"/>
  <!-- Fringe threads -->
  ${Array.from({ length: 9 }, (_, i) => {
    const x1 = 7 + i * 1.8
    const x2 = 6.5 + i * 1.9
    return `<line x1="${x1.toFixed(1)}" y1="31" x2="${x2.toFixed(1)}" y2="78" stroke="#C8920A" stroke-width="1" opacity="${0.6 + (i % 3) * 0.13}"/>`
  }).join('')}
</svg>`

// Arabesque Strip — flowing cubic bezier vine
const arabesqueSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" width="200" height="48">
  <defs>
    <linearGradient id="argg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#7A5200" stop-opacity="0"/>
      <stop offset="12%" stop-color="#C8920A"/>
      <stop offset="50%" stop-color="#E0B040"/>
      <stop offset="88%" stop-color="#C8920A"/>
      <stop offset="100%" stop-color="#7A5200" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="200" height="48" fill="url(#argg)" rx="3.5" opacity="0.82"/>
  <!-- Main vine — cubic bezier -->
  <path d="M0,24 C20,6 30,42 50,24 C70,6 80,42 100,24 C120,6 130,42 150,24 C170,6 180,42 200,24"
    fill="none" stroke="#FAF0D0" stroke-width="1.8" opacity="0.58"/>
  <!-- Leaf ellipses at wave peaks/troughs -->
  <ellipse cx="25" cy="11" rx="7.5" ry="4" transform="rotate(-32,25,11)" fill="#FAF0D0" opacity="0.38"/>
  <ellipse cx="75" cy="37" rx="7.5" ry="4" transform="rotate(32,75,37)" fill="#FAF0D0" opacity="0.38"/>
  <ellipse cx="125" cy="11" rx="7.5" ry="4" transform="rotate(-32,125,11)" fill="#FAF0D0" opacity="0.38"/>
  <ellipse cx="175" cy="37" rx="7.5" ry="4" transform="rotate(32,175,37)" fill="#FAF0D0" opacity="0.38"/>
  <!-- Node dots at crossings -->
  <circle cx="50" cy="24" r="2.5" fill="#FAF0D0" opacity="0.55"/>
  <circle cx="100" cy="24" r="2.5" fill="#FAF0D0" opacity="0.55"/>
  <circle cx="150" cy="24" r="2.5" fill="#FAF0D0" opacity="0.55"/>
</svg>`

// ── NEW: Embroidered Collar — ornate band for neckline ────────
const embroideredCollarSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <defs>
    <linearGradient id="ecg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#7A5200"/>
      <stop offset="30%" stop-color="#D4A84B"/>
      <stop offset="50%" stop-color="#F0CB6A"/>
      <stop offset="70%" stop-color="#D4A84B"/>
      <stop offset="100%" stop-color="#7A5200"/>
    </linearGradient>
    <pattern id="ecp" x="0" y="0" width="40" height="50" patternUnits="userSpaceOnUse">
      <!-- Small 6-pointed star per unit -->
      <polygon points="${starPoints(20, 25, 6, 9, 5)}" fill="none" stroke="#FAF0D0" stroke-width="1" opacity="0.7"/>
      <circle cx="20" cy="25" r="2" fill="#FAF0D0" opacity="0.5"/>
      <!-- Corner dots -->
      <circle cx="0" cy="0" r="1.5" fill="#FAF0D0" opacity="0.3"/>
      <circle cx="40" cy="0" r="1.5" fill="#FAF0D0" opacity="0.3"/>
    </pattern>
  </defs>
  <rect width="160" height="50" fill="url(#ecg)" rx="4"/>
  <rect width="160" height="50" fill="url(#ecp)"/>
  <!-- Arch cut-out shape on the top -->
  <path d="M0,0 Q40,20 80,12 Q120,4 160,0" fill="#FAF0D0" opacity="0.12"/>
  <!-- Top + bottom trim lines -->
  <line x1="0" y1="3" x2="160" y2="3" stroke="#FAF0D0" stroke-width="1" opacity="0.4"/>
  <line x1="0" y1="47" x2="160" y2="47" stroke="#FAF0D0" stroke-width="1" opacity="0.4"/>
</svg>`

// ── NEW: Geometric Hem Band — wide repeating tessellation for hem ──
const geometricHemBandSVG = (() => {
  // Create tessellated row of alternating triangles
  const triangleRow = Array.from({ length: 10 }, (_, i) => {
    const x = i * 20
    const up = i % 2 === 0
    const pts = up
      ? `${x},36 ${x + 20},36 ${x + 10},18`
      : `${x},18 ${x + 20},18 ${x + 10},36`
    return `<polygon points="${pts}" fill="none" stroke="#FAF0D0" stroke-width="0.9" opacity="0.5"/>`
  }).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 46" width="200" height="46">
  <defs>
    <linearGradient id="ghg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#9A7020"/>
      <stop offset="50%" stop-color="#E0B840"/>
      <stop offset="100%" stop-color="#8A5A00"/>
    </linearGradient>
  </defs>
  <rect width="200" height="46" fill="url(#ghg)" rx="2"/>
  <!-- Top scallop row -->
  ${Array.from({ length: 10 }, (_, i) => {
    const x = i * 20 + 10
    return `<circle cx="${x}" cy="8" r="6" fill="#FAF0D0" opacity="0.18"/>`
  }).join('')}
  <!-- Alternating triangles -->
  ${triangleRow}
  <!-- Bottom scallop row -->
  ${Array.from({ length: 10 }, (_, i) => {
    const x = i * 20 + 10
    return `<circle cx="${x}" cy="38" r="6" fill="#FAF0D0" opacity="0.18"/>`
  }).join('')}
  <!-- Border lines -->
  <line x1="0" y1="2" x2="200" y2="2" stroke="#FAF0D0" stroke-width="1" opacity="0.35"/>
  <line x1="0" y1="44" x2="200" y2="44" stroke="#FAF0D0" stroke-width="1" opacity="0.35"/>
</svg>`
})()

// ─────────────────────────────────────────────────────────────
// BASE DJELLABA SVG — anatomically accurate, 380×680
// Three-tone cream fabric gradient, realistic hood, qob
// ─────────────────────────────────────────────────────────────

export const DJELLABA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 680" width="380" height="680">
  <defs>
    <!-- Main fabric: three-tone cream gradient -->
    <linearGradient id="fab" x1="0" y1="0" x2="1" y2="0.6">
      <stop offset="0%" stop-color="#F2E8D4"/>
      <stop offset="35%" stop-color="#F9F3E6"/>
      <stop offset="65%" stop-color="#F9F3E6"/>
      <stop offset="100%" stop-color="#EDE0C4"/>
    </linearGradient>
    <!-- Sleeve gradient (slightly darker) -->
    <linearGradient id="slv" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#E8D8BC"/>
      <stop offset="40%" stop-color="#F4EAD6"/>
      <stop offset="100%" stop-color="#E2D0B4"/>
    </linearGradient>
    <!-- Hood gradient with depth shading -->
    <linearGradient id="hood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#EDE0C4"/>
      <stop offset="40%" stop-color="#F4EAD6"/>
      <stop offset="100%" stop-color="#F0E6D0"/>
    </linearGradient>
    <!-- Hood inner shadow -->
    <linearGradient id="hoodInner" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#C8AE88" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#C8AE88" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="hoodInnerR" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#C8AE88" stop-opacity="0"/>
      <stop offset="100%" stop-color="#C8AE88" stop-opacity="0.35"/>
    </linearGradient>
    <!-- Side body shadow for 3D depth -->
    <linearGradient id="lshad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B89868" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#B89868" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="rshad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B89868" stop-opacity="0"/>
      <stop offset="100%" stop-color="#B89868" stop-opacity="0.22"/>
    </linearGradient>
    <!-- Qob (placket) gradient -->
    <linearGradient id="qob" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#D8C49A"/>
      <stop offset="40%" stop-color="#E8D8B4"/>
      <stop offset="60%" stop-color="#EEE0C0"/>
      <stop offset="100%" stop-color="#D4BA90"/>
    </linearGradient>
    <!-- Drop shadow filter -->
    <filter id="gshadow" x="-10%" y="-5%" width="120%" height="115%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#3D2314" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- ═══ LEFT SLEEVE ════════════════════════════════════════ -->
  <!-- Sleeve shape: narrows from armhole to cuff tip -->
  <path d="
    M 76,148
    L 76,195
    C 62,230 30,320 4,410
    L 44,424
    C 68,340 98,248 112,210
    L 112,148 Z"
    fill="url(#slv)" stroke="#C4A878" stroke-width="1.6"
    stroke-linejoin="round" filter="url(#gshadow)"/>
  <!-- Left sleeve fold line -->
  <path d="M 90,155 C 78,210 55,310 24,408" fill="none" stroke="#D8C4A0" stroke-width="0.6" opacity="0.5"/>

  <!-- ═══ RIGHT SLEEVE ═══════════════════════════════════════ -->
  <path d="
    M 304,148
    L 304,195
    C 318,230 350,320 376,410
    L 336,424
    C 312,340 282,248 268,210
    L 268,148 Z"
    fill="url(#slv)" stroke="#C4A878" stroke-width="1.6"
    stroke-linejoin="round" filter="url(#gshadow)"/>
  <!-- Right sleeve fold line -->
  <path d="M 290,155 C 302,210 325,310 356,408" fill="none" stroke="#D8C4A0" stroke-width="0.6" opacity="0.5"/>

  <!-- ═══ MAIN BODY ══════════════════════════════════════════ -->
  <path d="
    M 76,148
    L 112,148
    L 112,195
    L 268,195
    L 268,148
    L 304,148
    L 326,670
    L 54,670 Z"
    fill="url(#fab)" stroke="#C4A878" stroke-width="1.6"
    stroke-linejoin="round" filter="url(#gshadow)"/>

  <!-- Body left side shadow (3D depth) -->
  <path d="M 76,148 L 54,670 L 110,670 L 112,148 Z" fill="url(#lshad)" pointer-events="none"/>
  <!-- Body right side shadow -->
  <path d="M 304,148 L 326,670 L 270,670 L 268,148 Z" fill="url(#rshad)" pointer-events="none"/>

  <!-- Subtle vertical fabric grain lines -->
  <line x1="152" y1="155" x2="144" y2="668" stroke="#EAD8B8" stroke-width="0.45" opacity="0.3"/>
  <line x1="190" y1="148" x2="190" y2="670" stroke="#EAD8B8" stroke-width="0.45" opacity="0.22"/>
  <line x1="228" y1="155" x2="236" y2="668" stroke="#EAD8B8" stroke-width="0.45" opacity="0.3"/>

  <!-- ═══ HOOD ════════════════════════════════════════════════ -->
  <!-- Hood outer silhouette — generous ovoid shape -->
  <path d="
    M 150,136
    C 144,80 150,14 165,4
    Q 180,-4 195,4
    Q 210,12 230,80
    L 230,136
    C 218,126 206,120 190,118
    C 174,120 162,126 150,136 Z"
    fill="url(#hood)" stroke="#C4A878" stroke-width="1.6" stroke-linejoin="round"/>

  <!-- Hood inner left shadow (depth) -->
  <path d="M 158,136 C 154,88 160,32 170,14 C 162,30 156,72 160,136 Z"
    fill="url(#hoodInner)" pointer-events="none"/>
  <!-- Hood inner right shadow -->
  <path d="M 222,136 C 226,88 220,32 210,14 C 218,30 224,72 220,136 Z"
    fill="url(#hoodInnerR)" pointer-events="none"/>

  <!-- Hood bottom join curve -->
  <path d="M 150,136 C 157,130 166,126 180,124 L 190,124 C 204,126 213,130 230,136"
    fill="none" stroke="#C4A878" stroke-width="1.6"/>

  <!-- ═══ QOB — front placket ══════════════════════════════ -->
  <path d="
    M 178,124
    C 174,148 170,218 176,330
    C 178,348 180,358 180,358
    C 180,358 182,348 184,330
    C 190,218 186,148 182,124 Z"
    fill="url(#qob)" stroke="#B4946A" stroke-width="0.9"/>
  <!-- Qob inner highlight -->
  <path d="M 179,124 C 176,150 173,220 178,332" fill="none" stroke="#FAF0D0" stroke-width="0.7" opacity="0.4"/>

  <!-- Centre seam line -->
  <line x1="190" y1="124" x2="190" y2="670" stroke="#DCC8A0" stroke-width="0.8"
    stroke-dasharray="5,7" opacity="0.35"/>
</svg>`

export const DJELLABA_BASE_URI = toDataURI(DJELLABA_SVG)

// ─────────────────────────────────────────────────────────────
// GARMENT PLACEMENT ZONES  (scaled for 380×680)
// ─────────────────────────────────────────────────────────────

export const djellabZones: PlacementZone[] = [
  { id: 'neckline',          label: 'Neckline',           x: 0.35, y: 0.13, width: 0.30, height: 0.07 },
  { id: 'chest-center',      label: 'Chest Centre',       x: 0.38, y: 0.21, width: 0.24, height: 0.16 },
  { id: 'chest-left',        label: 'Chest Left',         x: 0.16, y: 0.21, width: 0.19, height: 0.16 },
  { id: 'chest-right',       label: 'Chest Right',        x: 0.65, y: 0.21, width: 0.19, height: 0.16 },
  { id: 'placket',           label: 'Placket (Qob)',      x: 0.44, y: 0.13, width: 0.12, height: 0.28 },
  { id: 'sleeve-left-edge',  label: 'Sleeve Left',        x: 0.01, y: 0.36, width: 0.18, height: 0.10 },
  { id: 'sleeve-right-edge', label: 'Sleeve Right',       x: 0.81, y: 0.36, width: 0.18, height: 0.10 },
  { id: 'front-center',      label: 'Front Centre',       x: 0.38, y: 0.44, width: 0.24, height: 0.28 },
  { id: 'side-left',         label: 'Side Left',          x: 0.13, y: 0.44, width: 0.18, height: 0.28 },
  { id: 'side-right',        label: 'Side Right',         x: 0.69, y: 0.44, width: 0.18, height: 0.28 },
  { id: 'hem',               label: 'Hem',                x: 0.15, y: 0.89, width: 0.70, height: 0.07 },
]

// ─────────────────────────────────────────────────────────────
// BASE GARMENT DEFINITIONS
// ─────────────────────────────────────────────────────────────

export const djellabBases: DjellabBase[] = [
  {
    id: 'djellaba-ivoire',
    name: 'Djellaba Classique — Ivoire',
    image: DJELLABA_BASE_URI,
    color: '#F9F3E6',
    colorLabel: 'Ivoire',
    view: 'front',
    canvasWidth: 380,
    canvasHeight: 680,
    zones: djellabZones,
  },
]

// ─────────────────────────────────────────────────────────────
// DECORATION ASSET LIBRARY  (12 assets)
// ─────────────────────────────────────────────────────────────

export const decorationAssets: DecorationAsset[] = [
  // ── TERZA ────────────────────────────────────────────────
  {
    id: 'terza-classique',
    name: 'Terza Classique',
    nameAr: 'طرزة كلاسيكية',
    category: 'terza',
    image: toDataURI(terzaClassiqueSVG),
    defaultWidth: 48,
    defaultHeight: 200,
    allowedZones: ['placket', 'front-center', 'chest-center'],
    tags: ['terza', 'vertical', 'gold', 'diamond'],
    description: 'Traditional gold-woven strip with diamond chain motif',
  },

  // ── CHEST ────────────────────────────────────────────────
  {
    id: 'tbiq-central',
    name: 'Tbiq Central',
    nameAr: 'طبيق مركزي',
    category: 'chest',
    image: toDataURI(tbiqSVG),
    defaultWidth: 80,
    defaultHeight: 140,
    allowedZones: ['chest-center', 'front-center'],
    tags: ['chest', 'panel', 'arabesque', 'gold'],
    description: 'Central chest panel with geometric star medallion',
  },

  // ── NECKLINE ─────────────────────────────────────────────
  {
    id: 'mkass-qob',
    name: 'Mkass Qob',
    nameAr: 'مقص القب',
    category: 'neckline',
    image: toDataURI(mkassSVG),
    defaultWidth: 120,
    defaultHeight: 80,
    allowedZones: ['neckline', 'placket'],
    tags: ['neckline', 'v-shape', 'collar', 'gold'],
    description: 'V-shaped neckline ornament with tassel tips',
  },
  {
    id: 'embroidered-collar',
    name: 'Embroidered Collar',
    nameAr: 'طوق مطرز',
    category: 'neckline',
    image: toDataURI(embroideredCollarSVG),
    defaultWidth: 160,
    defaultHeight: 50,
    allowedZones: ['neckline', 'chest-center'],
    tags: ['collar', 'embroidery', 'star', 'band'],
    description: 'Wide embroidered collar band with repeating star motifs',
  },

  // ── GEOMETRIC ────────────────────────────────────────────
  {
    id: 'najma-marocaine',
    name: 'Najma Marocaine',
    nameAr: 'نجمة مغربية',
    category: 'geometric',
    image: toDataURI(najmaSVG),
    defaultWidth: 80,
    defaultHeight: 80,
    allowedZones: ['chest-center', 'chest-left', 'chest-right', 'front-center'],
    tags: ['star', '8-pointed', 'geometric', 'medallion'],
    description: '8-pointed Moroccan star — the khatam',
  },
  {
    id: 'khatam-or',
    name: 'Khatam Or',
    nameAr: 'خاتم الذهب',
    category: 'geometric',
    image: toDataURI(khatamSVG),
    defaultWidth: 80,
    defaultHeight: 80,
    allowedZones: ['chest-center', 'chest-left', 'chest-right', 'front-center', 'hem'],
    tags: ['khatam', 'star', 'geometric', 'interlocking'],
    description: "Solomon's knot — khatam sulayman",
  },
  {
    id: 'rosace-florale',
    name: 'Rosace Florale',
    nameAr: 'وردة زهرية',
    category: 'geometric',
    image: toDataURI(rosaceSVG),
    defaultWidth: 80,
    defaultHeight: 80,
    allowedZones: ['chest-center', 'chest-left', 'chest-right', 'front-center'],
    tags: ['rosette', 'floral', 'circular', 'medallion'],
    description: 'Circular floral rosette — rosace marocaine',
  },

  // ── SLEEVE ───────────────────────────────────────────────
  {
    id: 'aakad-manche',
    name: 'Aakad Manche',
    nameAr: 'عقد الكم',
    category: 'sleeve',
    image: toDataURI(aakadSVG),
    defaultWidth: 130,
    defaultHeight: 32,
    allowedZones: ['sleeve-left-edge', 'sleeve-right-edge'],
    tags: ['sleeve', 'cuff', 'arabesque', 'horizontal'],
    description: 'Sleeve cuff band with flowing arabesque',
  },

  // ── TRIM ─────────────────────────────────────────────────
  {
    id: 'sfifa-doree',
    name: 'Sfifa Dorée',
    nameAr: 'صفيفة ذهبية',
    category: 'trim',
    image: toDataURI(sfifaDoreeSVG),
    defaultWidth: 180,
    defaultHeight: 20,
    allowedZones: ['hem', 'sleeve-left-edge', 'sleeve-right-edge', 'front-center'],
    tags: ['braid', 'trim', 'horizontal', 'gold'],
    description: 'Fine gold braid trim — sfifa artisanale',
  },
  {
    id: 'tassel-ornament',
    name: 'Tassel Ornament',
    nameAr: 'أزرار البلغة',
    category: 'trim',
    image: toDataURI(tasselSVG),
    defaultWidth: 28,
    defaultHeight: 72,
    allowedZones: ['neckline', 'placket', 'chest-center'],
    tags: ['tassel', 'pendant', 'cord', 'decorative'],
    description: 'Hand-tied silk tassel ornament',
  },

  // ── SEAM ─────────────────────────────────────────────────
  {
    id: 'trilis-bord',
    name: 'Trilis Border',
    nameAr: 'تريليس حاشية',
    category: 'seam',
    image: toDataURI(trilisSVG),
    defaultWidth: 180,
    defaultHeight: 28,
    allowedZones: ['hem', 'sleeve-left-edge', 'sleeve-right-edge', 'side-left', 'side-right'],
    tags: ['lattice', 'border', 'diagonal', 'seam'],
    description: 'Diagonal lattice border — trilis marocain',
  },
  {
    id: 'geometric-hem-band',
    name: 'Hem Band Géo',
    nameAr: 'حاشية هندسية',
    category: 'seam',
    image: toDataURI(geometricHemBandSVG),
    defaultWidth: 200,
    defaultHeight: 40,
    allowedZones: ['hem', 'sleeve-left-edge', 'sleeve-right-edge'],
    tags: ['hem', 'geometric', 'tessellation', 'border'],
    description: 'Wide geometric tessellation hem band',
  },

  // ── EMBROIDERY ───────────────────────────────────────────
  {
    id: 'arabesque-strip',
    name: 'Arabesque Strip',
    nameAr: 'شريط أرابيسك',
    category: 'embroidery',
    image: toDataURI(arabesqueSVG),
    defaultWidth: 180,
    defaultHeight: 44,
    allowedZones: ['front-center', 'side-left', 'side-right', 'hem'],
    tags: ['arabesque', 'vine', 'flowing', 'horizontal'],
    description: 'Flowing arabesque vine strip',
  },
]

// ─────────────────────────────────────────────────────────────
// CATEGORY METADATA
// ─────────────────────────────────────────────────────────────

export const categoryMeta: CategoryMeta[] = [
  { id: 'terza',      label: 'Terza',       labelAr: 'طرزة',       icon: '▎' },
  { id: 'neckline',   label: 'Neckline',    labelAr: 'القب',        icon: '◡' },
  { id: 'chest',      label: 'Chest',       labelAr: 'الصدر',       icon: '◈' },
  { id: 'sleeve',     label: 'Sleeves',     labelAr: 'الأكمام',     icon: '↔' },
  { id: 'seam',       label: 'Seams',       labelAr: 'الحواشي',     icon: '⊟' },
  { id: 'geometric',  label: 'Geometric',   labelAr: 'هندسي',       icon: '✦' },
  { id: 'embroidery', label: 'Embroidery',  labelAr: 'تطريز',       icon: '❧' },
  { id: 'trim',       label: 'Trim',        labelAr: 'الصفيفة',     icon: '—' },
]

// Export helper (used in tests / server-side)
export { polygonPoints, starPoints }
