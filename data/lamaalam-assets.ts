import type {
  DjellabBase,
  DecorationAsset,
  CategoryMeta,
  PlacementZone,
} from '@/types/lamaalam'

// ─────────────────────────────────────────────────────────────
// SVG ASSET GENERATORS
// Moroccan-inspired decorative elements as inline SVGs
// ─────────────────────────────────────────────────────────────

function toDataURI(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

// Terza Classique — vertical gold strip with diamond chain
const terzaClassiqueSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 200" width="48" height="200">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#A07830"/>
      <stop offset="30%" stop-color="#D4A84B"/>
      <stop offset="60%" stop-color="#F0CB6A"/>
      <stop offset="100%" stop-color="#A07830"/>
    </linearGradient>
    <pattern id="dp" x="0" y="0" width="48" height="28" patternUnits="userSpaceOnUse">
      <polygon points="24,3 40,14 24,25 8,14" fill="none" stroke="#FAF0D0" stroke-width="1.2" opacity="0.7"/>
      <circle cx="24" cy="14" r="2.5" fill="#FAF0D0" opacity="0.5"/>
    </pattern>
  </defs>
  <rect width="48" height="200" fill="url(#g)" rx="3"/>
  <rect width="48" height="200" fill="url(#dp)" rx="3"/>
  <rect x="0" y="0" width="4" height="200" fill="#7A5820" opacity="0.4" rx="3"/>
  <rect x="44" y="0" width="4" height="200" fill="#7A5820" opacity="0.4" rx="3"/>
</svg>`

// Sfifa Doree — flat braid trim, horizontal
const sfifaDoreeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 24" width="200" height="24">
  <defs>
    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#C8920A"/>
      <stop offset="50%" stop-color="#F0CB6A"/>
      <stop offset="100%" stop-color="#C8920A"/>
    </linearGradient>
    <pattern id="sp" x="0" y="0" width="20" height="24" patternUnits="userSpaceOnUse">
      <path d="M 0 6 Q 5 0 10 6 Q 15 12 20 6" fill="none" stroke="#FAF0D0" stroke-width="1" opacity="0.6"/>
      <path d="M 0 18 Q 5 12 10 18 Q 15 24 20 18" fill="none" stroke="#FAF0D0" stroke-width="1" opacity="0.6"/>
    </pattern>
  </defs>
  <rect width="200" height="24" fill="url(#sg)" rx="2"/>
  <rect width="200" height="24" fill="url(#sp)"/>
  <line x1="0" y1="2" x2="200" y2="2" stroke="#FAF0D0" stroke-width="0.7" opacity="0.4"/>
  <line x1="0" y1="22" x2="200" y2="22" stroke="#FAF0D0" stroke-width="0.7" opacity="0.4"/>
</svg>`

// Najma Marocaine — 8-pointed Moroccan star
const najmaSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <radialGradient id="ng" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#F0CB6A"/>
      <stop offset="70%" stop-color="#C8920A"/>
      <stop offset="100%" stop-color="#8A6200"/>
    </radialGradient>
  </defs>
  <polygon points="50,8 56,35 80,20 65,42 92,50 65,58 80,80 56,65 50,92 44,65 20,80 35,58 8,50 35,42 20,20 44,35" fill="url(#ng)" stroke="#FAF0D0" stroke-width="1" stroke-linejoin="round"/>
  <polygon points="50,22 54,38 68,30 60,44 76,50 60,56 68,70 54,62 50,78 46,62 32,70 40,56 24,50 40,44 32,30 46,38" fill="none" stroke="#FAF0D0" stroke-width="0.8" opacity="0.5"/>
  <circle cx="50" cy="50" r="8" fill="#FAF0D0" opacity="0.7"/>
  <circle cx="50" cy="50" r="4" fill="#C8920A"/>
</svg>`

// Khatam — interlocking star geometric (Solomon's knot variant)
const khatamSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="kg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#D4A84B"/>
      <stop offset="100%" stop-color="#A07830"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="6" fill="none"/>
  <g fill="none" stroke="url(#kg)" stroke-width="3.5" stroke-linejoin="round">
    <polygon points="50,10 61,38 90,38 68,56 76,84 50,68 24,84 32,56 10,38 39,38" stroke-width="2.5"/>
    <polygon points="50,20 58,40 80,40 65,52 70,74 50,62 30,74 35,52 20,40 42,40" opacity="0.5"/>
  </g>
  <circle cx="50" cy="50" r="10" fill="url(#kg)" opacity="0.8"/>
  <circle cx="50" cy="50" r="5" fill="#FAF0D0"/>
</svg>`

// Mkass Qob — V-shaped neckline ornament
const mkassSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 80" width="120" height="80">
  <defs>
    <linearGradient id="mqg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#C8920A"/>
      <stop offset="100%" stop-color="#8A6200"/>
    </linearGradient>
  </defs>
  <path d="M 10 5 L 60 70 L 110 5" fill="none" stroke="url(#mqg)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 20 5 L 60 58 L 100 5" fill="none" stroke="#FAF0D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
  <path d="M 5 5 L 10 5 L 10 20" fill="none" stroke="#C8920A" stroke-width="3" stroke-linecap="round"/>
  <path d="M 115 5 L 110 5 L 110 20" fill="none" stroke="#C8920A" stroke-width="3" stroke-linecap="round"/>
  <circle cx="60" cy="70" r="5" fill="#FAF0D0" stroke="#C8920A" stroke-width="2"/>
  <circle cx="10" cy="5" r="4" fill="#FAF0D0" stroke="#C8920A" stroke-width="1.5"/>
  <circle cx="110" cy="5" r="4" fill="#FAF0D0" stroke="#C8920A" stroke-width="1.5"/>
</svg>`

// Aakad Manche — sleeve cuff band with arabesque
const aakadSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 36" width="160" height="36">
  <defs>
    <linearGradient id="ag" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8A6200"/>
      <stop offset="20%" stop-color="#D4A84B"/>
      <stop offset="50%" stop-color="#F0CB6A"/>
      <stop offset="80%" stop-color="#D4A84B"/>
      <stop offset="100%" stop-color="#8A6200"/>
    </linearGradient>
    <pattern id="ap" x="0" y="0" width="32" height="36" patternUnits="userSpaceOnUse">
      <path d="M 0 18 C 4 8 12 8 16 18 C 20 28 28 28 32 18" fill="none" stroke="#FAF0D0" stroke-width="1.5" opacity="0.6"/>
      <circle cx="16" cy="18" r="2.5" fill="#FAF0D0" opacity="0.5"/>
    </pattern>
  </defs>
  <rect width="160" height="36" fill="url(#ag)" rx="4"/>
  <rect width="160" height="36" fill="url(#ap)" rx="4"/>
  <rect x="0" y="0" width="160" height="3" fill="#FAF0D0" opacity="0.2" rx="2"/>
  <rect x="0" y="33" width="160" height="3" fill="#FAF0D0" opacity="0.2" rx="2"/>
</svg>`

// Trilis — diagonal lattice border strip
const trilisSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 32" width="200" height="32">
  <defs>
    <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#B89830"/>
      <stop offset="50%" stop-color="#E8C050"/>
      <stop offset="100%" stop-color="#B89830"/>
    </linearGradient>
    <pattern id="tp" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
      <rect x="5" y="5" width="12" height="12" fill="none" stroke="#FAF0D0" stroke-width="1" transform="rotate(45 11 11)" opacity="0.55"/>
    </pattern>
  </defs>
  <rect width="200" height="32" fill="url(#tg)" rx="3"/>
  <rect width="200" height="32" fill="url(#tp)"/>
  <line x1="0" y1="3" x2="200" y2="3" stroke="#FAF0D0" stroke-width="1" opacity="0.35"/>
  <line x1="0" y1="29" x2="200" y2="29" stroke="#FAF0D0" stroke-width="1" opacity="0.35"/>
</svg>`

// Rosace — circular floral rosette
const rosaceSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <radialGradient id="rg" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#F5E080"/>
      <stop offset="50%" stop-color="#D4A84B"/>
      <stop offset="100%" stop-color="#8A6200"/>
    </radialGradient>
  </defs>
  <g transform="translate(50,50)">
    ${Array.from({ length: 8 }, (_, i) => {
      const angle = (i * 45 * Math.PI) / 180
      const x = Math.round(Math.cos(angle) * 28)
      const y = Math.round(Math.sin(angle) * 28)
      return `<ellipse cx="${x}" cy="${y}" rx="12" ry="6" transform="rotate(${i * 45})" fill="url(#rg)" opacity="0.85" stroke="#FAF0D0" stroke-width="0.6"/>`
    }).join('')}
    <circle r="18" fill="url(#rg)" stroke="#FAF0D0" stroke-width="1.2"/>
    <circle r="9" fill="#FAF0D0" opacity="0.6"/>
    <circle r="4" fill="#D4A84B"/>
  </g>
</svg>`

// Tbiq Central — rectangular chest panel with arabesque cutout
const tbiqSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 140" width="80" height="140">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#A07830"/>
      <stop offset="50%" stop-color="#D4A84B"/>
      <stop offset="100%" stop-color="#A07830"/>
    </linearGradient>
  </defs>
  <rect width="80" height="140" fill="url(#bg)" rx="4" stroke="#FAF0D0" stroke-width="1" opacity="0.9"/>
  <!-- Inner border -->
  <rect x="5" y="5" width="70" height="130" fill="none" stroke="#FAF0D0" stroke-width="0.8" rx="2" opacity="0.5"/>
  <!-- Top arch decorations -->
  <path d="M 20 20 Q 40 10 60 20 L 60 30 Q 40 22 20 30 Z" fill="#FAF0D0" opacity="0.3"/>
  <!-- Central medallion -->
  <circle cx="40" cy="70" r="22" fill="none" stroke="#FAF0D0" stroke-width="1.5" opacity="0.6"/>
  <polygon points="40,52 45,63 57,63 48,71 51,83 40,76 29,83 32,71 23,63 35,63" fill="#FAF0D0" opacity="0.5" stroke="#FAF0D0" stroke-width="0.5"/>
  <!-- Bottom zigzag -->
  <path d="M 10 115 L 20 108 L 30 115 L 40 108 L 50 115 L 60 108 L 70 115" fill="none" stroke="#FAF0D0" stroke-width="1.5" opacity="0.5"/>
</svg>`

// Tassel ornament
const tasselSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 80" width="30" height="80">
  <defs>
    <linearGradient id="tsg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#D4A84B"/>
      <stop offset="100%" stop-color="#8A6200"/>
    </linearGradient>
  </defs>
  <circle cx="15" cy="12" r="11" fill="url(#tsg)" stroke="#FAF0D0" stroke-width="1"/>
  <circle cx="15" cy="12" r="6" fill="#FAF0D0" opacity="0.4"/>
  <rect x="12" y="22" width="6" height="12" fill="url(#tsg)"/>
  <g opacity="0.8">
    ${Array.from({ length: 7 }, (_, i) =>
      `<line x1="${9 + i * 2}" y1="34" x2="${8 + i * 2.5}" y2="78" stroke="#C8920A" stroke-width="1.2"/>`
    ).join('')}
  </g>
</svg>`

// Arabesque strip — flowing vine
const arabesqueSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 48" width="200" height="48">
  <defs>
    <linearGradient id="argg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#8A6200" stop-opacity="0"/>
      <stop offset="15%" stop-color="#D4A84B"/>
      <stop offset="85%" stop-color="#D4A84B"/>
      <stop offset="100%" stop-color="#8A6200" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="200" height="48" fill="url(#argg)" rx="4" opacity="0.85"/>
  <!-- Vine path -->
  <path d="M 0 24 C 25 8 25 40 50 24 C 75 8 75 40 100 24 C 125 8 125 40 150 24 C 175 8 175 40 200 24" fill="none" stroke="#FAF0D0" stroke-width="2" opacity="0.6"/>
  <!-- Leaves -->
  <ellipse cx="25" cy="12" rx="7" ry="4" transform="rotate(-30 25 12)" fill="#FAF0D0" opacity="0.4"/>
  <ellipse cx="75" cy="36" rx="7" ry="4" transform="rotate(30 75 36)" fill="#FAF0D0" opacity="0.4"/>
  <ellipse cx="125" cy="12" rx="7" ry="4" transform="rotate(-30 125 12)" fill="#FAF0D0" opacity="0.4"/>
  <ellipse cx="175" cy="36" rx="7" ry="4" transform="rotate(30 175 36)" fill="#FAF0D0" opacity="0.4"/>
  <!-- Dots at intersections -->
  <circle cx="50" cy="24" r="3" fill="#FAF0D0" opacity="0.6"/>
  <circle cx="100" cy="24" r="3" fill="#FAF0D0" opacity="0.6"/>
  <circle cx="150" cy="24" r="3" fill="#FAF0D0" opacity="0.6"/>
</svg>`

// ─────────────────────────────────────────────────────────────
// GARMENT PLACEMENT ZONES
// ─────────────────────────────────────────────────────────────

export const djellabZones: PlacementZone[] = [
  { id: 'neckline',          label: 'Neckline',           x: 0.35, y: 0.14, width: 0.30, height: 0.08 },
  { id: 'chest-center',      label: 'Chest Centre',       x: 0.38, y: 0.22, width: 0.24, height: 0.18 },
  { id: 'chest-left',        label: 'Chest Left',         x: 0.15, y: 0.22, width: 0.20, height: 0.18 },
  { id: 'chest-right',       label: 'Chest Right',        x: 0.65, y: 0.22, width: 0.20, height: 0.18 },
  { id: 'placket',           label: 'Placket (Qob)',      x: 0.44, y: 0.14, width: 0.12, height: 0.30 },
  { id: 'sleeve-left-edge',  label: 'Sleeve Left',        x: 0.00, y: 0.35, width: 0.18, height: 0.10 },
  { id: 'sleeve-right-edge', label: 'Sleeve Right',       x: 0.82, y: 0.35, width: 0.18, height: 0.10 },
  { id: 'front-center',      label: 'Front Centre',       x: 0.38, y: 0.45, width: 0.24, height: 0.30 },
  { id: 'side-left',         label: 'Side Left',          x: 0.12, y: 0.45, width: 0.20, height: 0.30 },
  { id: 'side-right',        label: 'Side Right',         x: 0.68, y: 0.45, width: 0.20, height: 0.30 },
  { id: 'hem',               label: 'Hem',                x: 0.15, y: 0.88, width: 0.70, height: 0.08 },
]

// ─────────────────────────────────────────────────────────────
// BASE DJELLABA SVG (inline — no file dependency)
// ─────────────────────────────────────────────────────────────

export const DJELLABA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 620" width="360" height="620">
  <defs>
    <linearGradient id="fab" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F7F0E4"/>
      <stop offset="100%" stop-color="#EDE0C8"/>
    </linearGradient>
    <filter id="fs" x="-8%" y="-4%" width="116%" height="112%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#3D2314" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- Left Sleeve -->
  <path d="M 72 135 L 72 188 L 8 360 L 48 374 L 108 208 Z"
    fill="url(#fab)" stroke="#C4A882" stroke-width="1.8" filter="url(#fs)" stroke-linejoin="round"/>

  <!-- Right Sleeve -->
  <path d="M 288 135 L 288 188 L 352 360 L 312 374 L 252 208 Z"
    fill="url(#fab)" stroke="#C4A882" stroke-width="1.8" filter="url(#fs)" stroke-linejoin="round"/>

  <!-- Main Body -->
  <path d="M 72 135 L 288 135 L 308 600 L 52 600 Z"
    fill="url(#fab)" stroke="#C4A882" stroke-width="1.8" filter="url(#fs)" stroke-linejoin="round"/>

  <!-- Hood -->
  <path d="M 145 122 C 138 68 150 12 164 4 Q 180 -4 196 4 Q 210 12 222 68 L 215 122 C 205 114 194 110 180 108 C 166 110 155 114 145 122 Z"
    fill="url(#fab)" stroke="#C4A882" stroke-width="1.8" stroke-linejoin="round"/>

  <!-- Hood inner shadow -->
  <path d="M 155 122 C 150 80 158 30 172 14 C 162 28 154 68 158 122 Z"
    fill="#D4BC9A" opacity="0.25"/>
  <path d="M 205 122 C 210 80 202 30 188 14 C 198 28 206 68 202 122 Z"
    fill="#D4BC9A" opacity="0.25"/>

  <!-- Collar join -->
  <path d="M 145 122 C 152 126 162 130 176 132 L 184 132 C 198 130 208 126 215 122"
    fill="none" stroke="#C4A882" stroke-width="1.8"/>

  <!-- Qob (front opening slit) -->
  <path d="M 174 132 C 170 155 166 210 174 300 C 177 316 180 322 180 322 C 180 322 183 316 186 300 C 194 210 190 155 186 132 Z"
    fill="#DEC9A6" stroke="#B08860" stroke-width="1"/>

  <!-- Subtle centre seam -->
  <line x1="180" y1="132" x2="180" y2="600" stroke="#D4BC9A" stroke-width="0.8" stroke-dasharray="4 6" opacity="0.4"/>

  <!-- Subtle fabric grain lines -->
  <line x1="140" y1="145" x2="132" y2="590" stroke="#E8D8B8" stroke-width="0.4" opacity="0.35"/>
  <line x1="220" y1="145" x2="228" y2="590" stroke="#E8D8B8" stroke-width="0.4" opacity="0.35"/>
</svg>`

export const DJELLABA_BASE_URI = toDataURI(DJELLABA_SVG)

// ─────────────────────────────────────────────────────────────
// BASE GARMENT DEFINITIONS
// ─────────────────────────────────────────────────────────────

export const djellabBases: DjellabBase[] = [
  {
    id: 'djellaba-ivoire',
    name: 'Djellaba Classique — Ivoire',
    image: DJELLABA_BASE_URI,
    color: '#F7F0E4',
    colorLabel: 'Ivoire',
    view: 'front',
    canvasWidth: 360,
    canvasHeight: 620,
    zones: djellabZones,
  },
]

// ─────────────────────────────────────────────────────────────
// DECORATION ASSET LIBRARY
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
    description: 'Central chest panel with arabesque medallion',
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

  // ── GEOMETRIC ────────────────────────────────────────────
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
