import type {
  DjellabBase,
  DecorationAsset,
  CategoryMeta,
  PlacementZone,
} from '@/types/lamaalam'

// ─────────────────────────────────────────────────────────────
// SVG UTILITIES  (used only for the 3 assets without real photos)
// ─────────────────────────────────────────────────────────────

function toDataURI(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

// ─────────────────────────────────────────────────────────────
// MATH HELPERS
// ─────────────────────────────────────────────────────────────

export function starPoints(
  cx: number, cy: number, n: number, outerR: number, innerR: number
): string {
  const pts: string[] = []
  for (let i = 0; i < n * 2; i++) {
    const angle = (Math.PI / n) * i - Math.PI / 2
    const r = i % 2 === 0 ? outerR : innerR
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`)
  }
  return pts.join(' ')
}

export function polygonPoints(
  cx: number, cy: number, n: number, r: number, offset = 0
): string {
  const pts: string[] = []
  for (let i = 0; i < n; i++) {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2 + offset
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`)
  }
  return pts.join(' ')
}

// ─────────────────────────────────────────────────────────────
// SVGs for the 3 assets that have no real illustration
// ─────────────────────────────────────────────────────────────

// Mkass Qob — V-shaped neckline ornament
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
  <path d="M 10 6 L 60 72 L 110 6" fill="none" stroke="url(#mqg)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 18 6 L 60 60 L 102 6" fill="none" stroke="#FAF0D0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.45"/>
  <line x1="0" y1="6" x2="120" y2="6" stroke="url(#mqg2)" stroke-width="3"/>
  <path d="M 4 6 L 10 6 L 10 22" fill="none" stroke="#D4A84B" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 116 6 L 110 6 L 110 22" fill="none" stroke="#D4A84B" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="60" cy="72" r="4.5" fill="#FAF0D0" stroke="#C8920A" stroke-width="1.5"/>
  <circle cx="60" cy="72" r="2" fill="#D4A84B"/>
  <circle cx="10" cy="6" r="3.5" fill="#FAF0D0" stroke="#C8920A" stroke-width="1.2"/>
  <circle cx="110" cy="6" r="3.5" fill="#FAF0D0" stroke="#C8920A" stroke-width="1.2"/>
</svg>`

// Sfifa Dorée — gold braid trim
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

// Geometric Hem Band — tessellation border
const geometricHemBandSVG = (() => {
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
  ${Array.from({ length: 10 }, (_, i) => `<circle cx="${i * 20 + 10}" cy="8" r="6" fill="#FAF0D0" opacity="0.18"/>`).join('')}
  ${triangleRow}
  ${Array.from({ length: 10 }, (_, i) => `<circle cx="${i * 20 + 10}" cy="38" r="6" fill="#FAF0D0" opacity="0.18"/>`).join('')}
  <line x1="0" y1="2" x2="200" y2="2" stroke="#FAF0D0" stroke-width="1" opacity="0.35"/>
  <line x1="0" y1="44" x2="200" y2="44" stroke="#FAF0D0" stroke-width="1" opacity="0.35"/>
</svg>`
})()

// ─────────────────────────────────────────────────────────────
// BASE DJELLABA SVG — anatomically accurate, 380×680
// ─────────────────────────────────────────────────────────────

export const DJELLABA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 680" width="380" height="680">
  <defs>
    <linearGradient id="fab" x1="0" y1="0" x2="1" y2="0.6">
      <stop offset="0%" stop-color="#F2E8D4"/>
      <stop offset="35%" stop-color="#F9F3E6"/>
      <stop offset="65%" stop-color="#F9F3E6"/>
      <stop offset="100%" stop-color="#EDE0C4"/>
    </linearGradient>
    <linearGradient id="slv" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#E8D8BC"/>
      <stop offset="40%" stop-color="#F4EAD6"/>
      <stop offset="100%" stop-color="#E2D0B4"/>
    </linearGradient>
    <linearGradient id="hood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#EDE0C4"/>
      <stop offset="40%" stop-color="#F4EAD6"/>
      <stop offset="100%" stop-color="#F0E6D0"/>
    </linearGradient>
    <linearGradient id="hoodInner" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#C8AE88" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#C8AE88" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="hoodInnerR" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#C8AE88" stop-opacity="0"/>
      <stop offset="100%" stop-color="#C8AE88" stop-opacity="0.35"/>
    </linearGradient>
    <linearGradient id="lshad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B89868" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#B89868" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="rshad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B89868" stop-opacity="0"/>
      <stop offset="100%" stop-color="#B89868" stop-opacity="0.22"/>
    </linearGradient>
    <linearGradient id="qob" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#D8C49A"/>
      <stop offset="40%" stop-color="#E8D8B4"/>
      <stop offset="60%" stop-color="#EEE0C0"/>
      <stop offset="100%" stop-color="#D4BA90"/>
    </linearGradient>
    <filter id="gshadow" x="-10%" y="-5%" width="120%" height="115%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#3D2314" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Left Sleeve -->
  <path d="M 76,148 L 76,195 C 62,230 30,320 4,410 L 44,424 C 68,340 98,248 112,210 L 112,148 Z"
    fill="url(#slv)" stroke="#C4A878" stroke-width="1.6" stroke-linejoin="round" filter="url(#gshadow)"/>
  <path d="M 90,155 C 78,210 55,310 24,408" fill="none" stroke="#D8C4A0" stroke-width="0.6" opacity="0.5"/>

  <!-- Right Sleeve -->
  <path d="M 304,148 L 304,195 C 318,230 350,320 376,410 L 336,424 C 312,340 282,248 268,210 L 268,148 Z"
    fill="url(#slv)" stroke="#C4A878" stroke-width="1.6" stroke-linejoin="round" filter="url(#gshadow)"/>
  <path d="M 290,155 C 302,210 325,310 356,408" fill="none" stroke="#D8C4A0" stroke-width="0.6" opacity="0.5"/>

  <!-- Main Body -->
  <path d="M 76,148 L 112,148 L 112,195 L 268,195 L 268,148 L 304,148 L 326,670 L 54,670 Z"
    fill="url(#fab)" stroke="#C4A878" stroke-width="1.6" stroke-linejoin="round" filter="url(#gshadow)"/>
  <path d="M 76,148 L 54,670 L 110,670 L 112,148 Z" fill="url(#lshad)" pointer-events="none"/>
  <path d="M 304,148 L 326,670 L 270,670 L 268,148 Z" fill="url(#rshad)" pointer-events="none"/>
  <line x1="152" y1="155" x2="144" y2="668" stroke="#EAD8B8" stroke-width="0.45" opacity="0.3"/>
  <line x1="190" y1="148" x2="190" y2="670" stroke="#EAD8B8" stroke-width="0.45" opacity="0.22"/>
  <line x1="228" y1="155" x2="236" y2="668" stroke="#EAD8B8" stroke-width="0.45" opacity="0.3"/>

  <!-- Hood -->
  <path d="M 150,136 C 144,80 150,14 165,4 Q 180,-4 195,4 Q 210,12 230,80 L 230,136
    C 218,126 206,120 190,118 C 174,120 162,126 150,136 Z"
    fill="url(#hood)" stroke="#C4A878" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M 158,136 C 154,88 160,32 170,14 C 162,30 156,72 160,136 Z"
    fill="url(#hoodInner)" pointer-events="none"/>
  <path d="M 222,136 C 226,88 220,32 210,14 C 218,30 224,72 220,136 Z"
    fill="url(#hoodInnerR)" pointer-events="none"/>
  <path d="M 150,136 C 157,130 166,126 180,124 L 190,124 C 204,126 213,130 230,136"
    fill="none" stroke="#C4A878" stroke-width="1.6"/>

  <!-- Qob (placket) -->
  <path d="M 178,124 C 174,148 170,218 176,330 C 178,348 180,358 180,358
    C 180,358 182,348 184,330 C 190,218 186,148 182,124 Z"
    fill="url(#qob)" stroke="#B4946A" stroke-width="0.9"/>
  <path d="M 179,124 C 176,150 173,220 178,332" fill="none" stroke="#FAF0D0" stroke-width="0.7" opacity="0.4"/>
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
// DECORATION ASSET LIBRARY
// Real illustrations from /public/images/lamaalam/
// 9 real PNGs + 3 SVG fallbacks = 12 total
// ─────────────────────────────────────────────────────────────

export const decorationAssets: DecorationAsset[] = [

  // ── TERZA ────────────────────────────────────────────────
  {
    id: 'terza-classique',
    name: 'Terza Classique',
    nameAr: 'طرزة كلاسيكية',
    category: 'terza',
    // Real illustration: tall vertical gold terza strip with geometric interlocking
    // pattern and tassels — 1024×1536 source (2:3 ratio)
    image: '/images/lamaalam/terza-strip.png',
    defaultWidth: 52,
    defaultHeight: 78,
    allowedZones: ['placket', 'front-center', 'chest-center'],
    tags: ['terza', 'vertical', 'gold', 'geometric', 'strip'],
    description: 'Hand-woven gold terza strip with interlocking geometric pattern and tassels',
  },

  // ── CHEST / QOB ──────────────────────────────────────────
  {
    id: 'tbiq-central',
    name: 'Tbiq Central',
    nameAr: 'طبيق مركزي',
    category: 'chest',
    // Real illustration: vertical elongated qob/placket ornament with arch top,
    // arabesque scrollwork and droplet pendant — 1024×1536 source (2:3 ratio)
    image: '/images/lamaalam/qob-ornament.png',
    defaultWidth: 70,
    defaultHeight: 105,
    allowedZones: ['chest-center', 'placket', 'front-center'],
    tags: ['chest', 'qob', 'arabesque', 'ornament', 'vertical'],
    description: 'Ornate qob placket ornament with arabesque scrollwork and droplet pendant',
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
    // Real illustration: wide horizontal collar band with diamond shapes and droplets
    // — 1536×1024 source (3:2 ratio)
    image: '/images/lamaalam/collar-diamond.png',
    defaultWidth: 180,
    defaultHeight: 120,
    allowedZones: ['neckline', 'chest-center', 'hem'],
    tags: ['collar', 'embroidery', 'diamond', 'band', 'horizontal'],
    description: 'Wide embroidered collar band with diamond motifs and droplet fringe',
  },

  // ── GEOMETRIC ────────────────────────────────────────────
  {
    id: 'najma-marocaine',
    name: 'Najma Marocaine',
    nameAr: 'نجمة مغربية',
    category: 'geometric',
    // Real illustration: gold geometric flower/star medallion — 1024×1024 (1:1)
    image: '/images/lamaalam/star-geometric.png',
    defaultWidth: 80,
    defaultHeight: 80,
    allowedZones: ['chest-center', 'chest-left', 'chest-right', 'front-center'],
    tags: ['star', 'geometric', 'gold', 'medallion', 'flower'],
    description: 'Gold geometric star-flower medallion — najma marocaine',
  },
  {
    id: 'khatam-or',
    name: 'Khatam Or',
    nameAr: 'خاتم الذهب',
    category: 'geometric',
    // Real illustration: gold arabesque corner ornament (triangle shape with scrollwork)
    // — 1024×1024 (1:1). Can be rotated to any corner position.
    image: '/images/lamaalam/corner-ornament.png',
    defaultWidth: 80,
    defaultHeight: 80,
    allowedZones: ['chest-center', 'chest-left', 'chest-right', 'front-center', 'hem'],
    tags: ['corner', 'geometric', 'arabesque', 'gold', 'accent'],
    description: 'Gold arabesque corner accent — rotate to place in any corner',
  },
  {
    id: 'rosace-florale',
    name: 'Medallion Bleu Or',
    nameAr: 'ميدالية ذهبية زرقاء',
    category: 'geometric',
    // Real illustration: blue and gold Moroccan arch medallion, horizontal
    // — 1536×1024 (3:2 ratio)
    image: '/images/lamaalam/medallion-blue-gold.png',
    defaultWidth: 130,
    defaultHeight: 87,
    allowedZones: ['chest-center', 'chest-left', 'chest-right', 'front-center'],
    tags: ['medallion', 'blue', 'gold', 'arch', 'moroccan', 'horizontal'],
    description: 'Blue and gold Moroccan arch medallion with arabesque scrollwork',
  },

  // ── SLEEVE ───────────────────────────────────────────────
  {
    id: 'aakad-manche',
    name: 'Aakad Manche',
    nameAr: 'عقد الكم',
    category: 'sleeve',
    // Real illustration: wide horizontal arabesque collar/sleeve band
    // — 1536×1024 (3:2 ratio)
    image: '/images/lamaalam/collar-arabesque.png',
    defaultWidth: 180,
    defaultHeight: 120,
    allowedZones: ['sleeve-left-edge', 'sleeve-right-edge', 'neckline'],
    tags: ['sleeve', 'cuff', 'arabesque', 'horizontal', 'band'],
    description: 'Wide arabesque sleeve cuff band with scalloped fringe',
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
    // Real illustration: horizontal rope ornament with central flower and hanging tassel
    // — 1024×1024 (1:1)
    image: '/images/lamaalam/tassel-rope.png',
    defaultWidth: 110,
    defaultHeight: 110,
    allowedZones: ['neckline', 'placket', 'chest-center', 'chest-left', 'chest-right'],
    tags: ['tassel', 'rope', 'ornament', 'horizontal', 'flower'],
    description: 'Rope ornament with central floral medallion and hanging tassel',
  },

  // ── SEAM / BORDER ────────────────────────────────────────
  {
    id: 'trilis-bord',
    name: 'Trilis Border',
    nameAr: 'تريليس حاشية',
    category: 'seam',
    // Real illustration: large diamond arabesque horizontal medallion
    // — 1536×1024 (3:2 ratio)
    image: '/images/lamaalam/medallion-arabesque.png',
    defaultWidth: 140,
    defaultHeight: 93,
    allowedZones: ['hem', 'chest-center', 'front-center', 'side-left', 'side-right'],
    tags: ['arabesque', 'diamond', 'medallion', 'scrollwork'],
    description: 'Diamond arabesque medallion with intricate scrollwork',
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
    // (SVG kept — no matching illustration in the set)
    image: toDataURI(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" width="200" height="48">
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
  <path d="M0,24 C20,6 30,42 50,24 C70,6 80,42 100,24 C120,6 130,42 150,24 C170,6 180,42 200,24"
    fill="none" stroke="#FAF0D0" stroke-width="1.8" opacity="0.58"/>
  <ellipse cx="25" cy="11" rx="7.5" ry="4" transform="rotate(-32,25,11)" fill="#FAF0D0" opacity="0.38"/>
  <ellipse cx="75" cy="37" rx="7.5" ry="4" transform="rotate(32,75,37)" fill="#FAF0D0" opacity="0.38"/>
  <ellipse cx="125" cy="11" rx="7.5" ry="4" transform="rotate(-32,125,11)" fill="#FAF0D0" opacity="0.38"/>
  <ellipse cx="175" cy="37" rx="7.5" ry="4" transform="rotate(32,175,37)" fill="#FAF0D0" opacity="0.38"/>
  <circle cx="50" cy="24" r="2.5" fill="#FAF0D0" opacity="0.55"/>
  <circle cx="100" cy="24" r="2.5" fill="#FAF0D0" opacity="0.55"/>
  <circle cx="150" cy="24" r="2.5" fill="#FAF0D0" opacity="0.55"/>
</svg>`),
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
