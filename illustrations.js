/* =========================================================
   THE BROADSIDE TRIBUNE — vintage illustration sprites
   All SVGs are monochrome (paper + ink + spot) so they adapt
   to the tweakable palette via currentColor / CSS vars.
   ========================================================= */

(function () {
  // Shared filters & patterns as an inline <svg> sprite injected once.
  const sprite = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <!-- halftone dot pattern that uses paper + ink -->
    <pattern id="ht-dot" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="4" height="4" fill="var(--paper)"/>
      <circle cx="2" cy="2" r="1.1" fill="var(--ink)"/>
    </pattern>
    <pattern id="ht-dot-fine" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
      <rect width="3" height="3" fill="var(--paper)"/>
      <circle cx="1.5" cy="1.5" r="0.7" fill="var(--ink)"/>
    </pattern>
    <pattern id="ht-lines" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="3" height="3" fill="var(--paper)"/>
      <rect width="1" height="3" fill="var(--ink)"/>
    </pattern>
    <pattern id="ht-cross" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
      <rect width="6" height="6" fill="var(--paper)"/>
      <path d="M0 3 H6 M3 0 V6" stroke="var(--ink)" stroke-width="0.6"/>
    </pattern>
    <!-- soft radial gradient for shadows on portraits -->
    <radialGradient id="shade" cx="50%" cy="35%" r="60%">
      <stop offset="0%" stop-color="var(--paper)"/>
      <stop offset="100%" stop-color="var(--ink)"/>
    </radialGradient>
    <!-- rough edges filter -->
    <filter id="rough">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4"/>
      <feDisplacementMap in="SourceGraphic" scale="1.5"/>
    </filter>
  </defs>
</svg>`;
  document.body.insertAdjacentHTML('afterbegin', sprite);
})();

/* ---------------------------------------------------------
   ILLUSTRATIONS — each fn returns SVG markup for a scene.
   All use currentColor for ink, CSS var --paper for bg,
   and var --spot for occasional accent.
   --------------------------------------------------------- */
const Illus = {

  // Hero: person at a printing press, engraving style
  printPress: () => `
<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" class="illus">
  <rect width="400" height="500" fill="url(#ht-dot)"/>
  <!-- sky / backdrop wash -->
  <rect width="400" height="260" fill="var(--paper)" opacity="0.7"/>
  <!-- diagonal hatch walls -->
  <rect x="0" y="0" width="400" height="280" fill="url(#ht-lines)" opacity="0.25"/>

  <!-- printing press silhouette -->
  <g fill="var(--ink)">
    <!-- big flywheel on left -->
    <circle cx="90" cy="330" r="78" fill="var(--ink)"/>
    <circle cx="90" cy="330" r="62" fill="var(--paper)"/>
    <circle cx="90" cy="330" r="56" fill="var(--ink)"/>
    <circle cx="90" cy="330" r="8" fill="var(--paper)"/>
    <g stroke="var(--paper)" stroke-width="3" fill="none">
      <line x1="34" y1="330" x2="146" y2="330"/>
      <line x1="90" y1="274" x2="90" y2="386"/>
      <line x1="50" y1="290" x2="130" y2="370"/>
      <line x1="50" y1="370" x2="130" y2="290"/>
    </g>
    <!-- press body -->
    <rect x="150" y="270" width="210" height="150" />
    <rect x="160" y="280" width="190" height="40" fill="var(--paper)"/>
    <rect x="165" y="285" width="180" height="30" fill="url(#ht-cross)"/>
    <!-- paper coming out -->
    <path d="M150 340 Q 130 355 160 380 L 220 380 L 220 345 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>
    <path d="M165 355 h 45 M165 365 h 40 M165 375 h 35" stroke="var(--ink)" stroke-width="1.2"/>
    <!-- lever -->
    <rect x="350" y="200" width="8" height="90" />
    <circle cx="354" cy="196" r="12" />
  </g>

  <!-- operator (silhouette, engraving feel) -->
  <g>
    <!-- body -->
    <path d="M240 260 Q 245 210 270 200 Q 295 195 310 210 L 320 240 L 325 300 L 325 420 L 290 420 L 285 340 L 275 420 L 240 420 L 243 340 Z" fill="var(--ink)"/>
    <!-- head -->
    <circle cx="285" cy="185" r="24" fill="var(--ink)"/>
    <!-- collar highlight -->
    <path d="M268 218 L 290 228 L 312 218 L 308 240 L 270 240 Z" fill="var(--paper)" opacity="0.4"/>
    <!-- arm reaching to lever -->
    <path d="M308 225 Q 340 210 352 202 L 348 215 Q 328 230 308 245 Z" fill="var(--ink)"/>
    <!-- hatching on coat -->
    <g stroke="var(--paper)" stroke-width="0.8" opacity="0.35">
      <line x1="255" y1="270" x2="275" y2="410"/>
      <line x1="265" y1="260" x2="285" y2="400"/>
      <line x1="300" y1="270" x2="320" y2="410"/>
    </g>
  </g>

  <!-- foreground papers scattered -->
  <g>
    <rect x="20" y="440" width="90" height="50" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.5" transform="rotate(-6 65 465)"/>
    <rect x="140" y="450" width="90" height="40" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.5" transform="rotate(4 185 470)"/>
    <rect x="260" y="440" width="110" height="55" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.5" transform="rotate(-3 315 467)"/>
    <g transform="translate(30 448) rotate(-6)" font-family="Playfair Display, serif" font-size="7" fill="var(--ink)">
      <text x="6" y="10" font-weight="900">EXTRA!</text>
      <line x1="6" y1="14" x2="80" y2="14" stroke="var(--ink)"/>
      <line x1="6" y1="20" x2="80" y2="20" stroke="var(--ink)" opacity="0.5"/>
      <line x1="6" y1="26" x2="80" y2="26" stroke="var(--ink)" opacity="0.5"/>
      <line x1="6" y1="32" x2="60" y2="32" stroke="var(--ink)" opacity="0.5"/>
    </g>
  </g>

  <!-- grainy overlay -->
  <rect width="400" height="500" fill="url(#ht-dot-fine)" opacity="0.08"/>
</svg>`,

  // Case study A: bottles on a shelf (kombucha/beverage)
  bottles: () => `
<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" class="illus">
  <rect width="400" height="300" fill="var(--paper)"/>
  <rect width="400" height="300" fill="url(#ht-dot)" opacity="0.5"/>
  <!-- shelf -->
  <rect x="0" y="240" width="400" height="14" fill="var(--ink)"/>
  <rect x="0" y="254" width="400" height="6" fill="var(--ink)" opacity="0.4"/>
  <!-- back wall hatching -->
  <rect x="0" y="0" width="400" height="240" fill="url(#ht-lines)" opacity="0.2"/>

  <!-- row of bottles -->
  <g>
    ${[30, 100, 170, 240, 310].map((x, i) => `
    <g transform="translate(${x} ${80 + (i%2)*5})">
      <!-- neck -->
      <rect x="18" y="0" width="14" height="32" fill="var(--ink)"/>
      <!-- shoulder -->
      <path d="M10 32 Q 25 36 40 32 L 46 60 L 4 60 Z" fill="var(--ink)"/>
      <!-- body -->
      <rect x="4" y="60" width="42" height="100" fill="var(--ink)"/>
      <!-- label -->
      <rect x="8" y="90" width="34" height="55" fill="var(--paper)"/>
      <rect x="8" y="90" width="34" height="10" fill="var(--spot)"/>
      <text x="25" y="98" font-family="Playfair Display, serif" font-weight="900" font-size="6" fill="var(--paper)" text-anchor="middle">F&amp;F</text>
      <line x1="12" y1="108" x2="38" y2="108" stroke="var(--ink)" stroke-width="0.6"/>
      <line x1="12" y1="114" x2="34" y2="114" stroke="var(--ink)" stroke-width="0.4"/>
      <line x1="12" y1="120" x2="36" y2="120" stroke="var(--ink)" stroke-width="0.4"/>
      <line x1="12" y1="126" x2="30" y2="126" stroke="var(--ink)" stroke-width="0.4"/>
      <text x="25" y="138" font-family="Special Elite, monospace" font-size="4" fill="var(--ink)" text-anchor="middle">NO. ${i+1}</text>
      <!-- bottle highlight -->
      <rect x="8" y="65" width="4" height="90" fill="var(--paper)" opacity="0.3"/>
      <!-- cap -->
      <rect x="16" y="-4" width="18" height="6" fill="var(--spot)"/>
    </g>`).join('')}
  </g>

  <!-- price tag dangling -->
  <g transform="translate(320 30) rotate(14)">
    <path d="M0 0 L 50 0 L 60 12 L 50 24 L 0 24 Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.5"/>
    <circle cx="52" cy="12" r="2" fill="var(--ink)"/>
    <text x="25" y="16" font-family="Playfair Display" font-weight="900" font-size="10" fill="var(--spot)" text-anchor="middle">3.1×</text>
  </g>

  <rect width="400" height="300" fill="url(#ht-dot-fine)" opacity="0.1"/>
</svg>`,

  // Case study B: laptop/dashboard, before/after style
  dashboard: () => `
<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" class="illus">
  <rect width="400" height="300" fill="var(--paper)"/>
  <rect width="400" height="300" fill="url(#ht-lines)" opacity="0.18"/>

  <!-- desk -->
  <rect x="0" y="240" width="400" height="60" fill="var(--ink)" opacity="0.15"/>
  <line x1="0" y1="240" x2="400" y2="240" stroke="var(--ink)" stroke-width="1.5"/>

  <!-- LEFT: "before" page with too much text -->
  <g transform="translate(30 40)">
    <rect x="0" y="0" width="150" height="190" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>
    <rect x="0" y="0" width="150" height="18" fill="var(--ink)"/>
    <text x="8" y="13" font-family="Special Elite" font-size="8" fill="var(--paper)">BEFORE</text>
    <!-- headline tiny -->
    <rect x="10" y="28" width="130" height="4" fill="var(--ink)"/>
    <!-- walls of text -->
    ${Array.from({length: 22}).map((_,i) => `<rect x="10" y="${40 + i*6}" width="${120 - (i%5)*10}" height="2" fill="var(--ink)" opacity="0.55"/>`).join('')}
    <!-- X stamp -->
    <g transform="translate(60 70) rotate(-12)" opacity="0.85">
      <rect x="0" y="0" width="80" height="30" fill="none" stroke="var(--spot)" stroke-width="3"/>
      <text x="40" y="21" font-family="Oswald, sans-serif" font-weight="700" font-size="16" fill="var(--spot)" text-anchor="middle">TOO MUCH</text>
    </g>
  </g>

  <!-- arrow -->
  <g transform="translate(195 130)" fill="var(--spot)">
    <path d="M0 0 L 20 0 L 20 -8 L 36 6 L 20 20 L 20 12 L 0 12 Z"/>
  </g>

  <!-- RIGHT: "after" page with clean single headline -->
  <g transform="translate(240 40)">
    <rect x="0" y="0" width="150" height="190" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>
    <rect x="0" y="0" width="150" height="18" fill="var(--spot)"/>
    <text x="8" y="13" font-family="Special Elite" font-size="8" fill="var(--paper)">AFTER</text>
    <!-- big headline -->
    <text x="75" y="60" font-family="Playfair Display" font-weight="900" font-size="14" fill="var(--ink)" text-anchor="middle">Close books</text>
    <text x="75" y="76" font-family="Playfair Display" font-weight="900" font-size="14" fill="var(--ink)" text-anchor="middle">3 days faster.</text>
    <line x1="30" y1="88" x2="120" y2="88" stroke="var(--ink)"/>
    <text x="75" y="102" font-family="Libre Caslon Text, serif" font-style="italic" font-size="8" fill="var(--ink)" text-anchor="middle">Without changing</text>
    <text x="75" y="114" font-family="Libre Caslon Text, serif" font-style="italic" font-size="8" fill="var(--ink)" text-anchor="middle">your ERP.</text>
    <!-- CTA -->
    <rect x="40" y="140" width="70" height="22" fill="var(--ink)"/>
    <text x="75" y="155" font-family="Oswald" font-weight="700" font-size="9" fill="var(--paper)" text-anchor="middle" letter-spacing="1">SEE DEMO</text>
    <!-- checkmark -->
    <g transform="translate(115 25)" opacity="0.9">
      <circle cx="0" cy="0" r="12" fill="var(--spot)"/>
      <path d="M-5 0 L -1 5 L 6 -4" stroke="var(--paper)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </g>
  </g>

  <rect width="400" height="300" fill="url(#ht-dot-fine)" opacity="0.08"/>
</svg>`,

  // Case study C: socks and envelope (mailer campaign)
  socksMail: () => `
<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" class="illus">
  <rect width="400" height="300" fill="var(--paper)"/>
  <rect width="400" height="300" fill="url(#ht-cross)" opacity="0.15"/>

  <!-- large envelope in back -->
  <g transform="translate(60 50)">
    <rect x="0" y="0" width="280" height="170" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5"/>
    <path d="M0 0 L 140 95 L 280 0" fill="none" stroke="var(--ink)" stroke-width="2"/>
    <!-- stamp -->
    <rect x="220" y="14" width="44" height="52" fill="none" stroke="var(--spot)" stroke-width="1.5" stroke-dasharray="2 2"/>
    <text x="242" y="34" font-family="Playfair Display" font-weight="900" font-size="14" fill="var(--spot)" text-anchor="middle">H&amp;Co</text>
    <text x="242" y="48" font-family="Special Elite" font-size="6" fill="var(--spot)" text-anchor="middle">PAID</text>
    <text x="242" y="58" font-family="Special Elite" font-size="5" fill="var(--spot)" text-anchor="middle">MAINE · USA</text>
    <!-- address lines -->
    <line x1="30" y1="125" x2="140" y2="125" stroke="var(--ink)"/>
    <line x1="30" y1="138" x2="170" y2="138" stroke="var(--ink)" opacity="0.6"/>
    <line x1="30" y1="151" x2="120" y2="151" stroke="var(--ink)" opacity="0.6"/>
    <!-- cancelled stamp -->
    <g transform="translate(100 30) rotate(-8)">
      <circle cx="0" cy="0" r="26" fill="none" stroke="var(--spot)" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="20" fill="none" stroke="var(--spot)" stroke-width="1"/>
      <text x="0" y="-4" font-family="Special Elite" font-size="6" fill="var(--spot)" text-anchor="middle">NO SALE</text>
      <text x="0" y="6" font-family="Special Elite" font-size="6" fill="var(--spot)" text-anchor="middle">NOV 2025</text>
    </g>
  </g>

  <!-- sock peeking out, foreground -->
  <g transform="translate(30 170) rotate(-12)">
    <path d="M0 0 L 70 0 L 70 30 Q 80 35 80 50 L 80 90 Q 80 105 65 105 L 45 105 Q 30 105 30 90 L 30 60 Q 30 45 20 45 L 0 45 Z" fill="var(--ink)"/>
    <!-- stripes -->
    <rect x="5" y="8" width="60" height="4" fill="var(--spot)"/>
    <rect x="5" y="16" width="60" height="2" fill="var(--paper)"/>
    <rect x="5" y="22" width="60" height="4" fill="var(--spot)"/>
    <!-- toe -->
    <ellipse cx="62" cy="97" rx="14" ry="5" fill="var(--paper)" opacity="0.3"/>
  </g>

  <!-- second sock -->
  <g transform="translate(280 185) rotate(10)">
    <path d="M0 0 L 70 0 L 70 30 Q 80 35 80 50 L 80 90 Q 80 105 65 105 L 45 105 Q 30 105 30 90 L 30 60 Q 30 45 20 45 L 0 45 Z" fill="var(--ink)"/>
    <rect x="5" y="8" width="60" height="3" fill="var(--paper)"/>
    <rect x="5" y="14" width="60" height="3" fill="var(--paper)"/>
    <rect x="5" y="20" width="60" height="3" fill="var(--paper)"/>
    <rect x="5" y="26" width="60" height="3" fill="var(--paper)"/>
  </g>

  <rect width="400" height="300" fill="url(#ht-dot-fine)" opacity="0.08"/>
</svg>`,

  // Case study D: hotel by the coast in fog
  hotel: () => `
<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" class="illus">
  <rect width="400" height="300" fill="var(--paper)"/>
  <!-- sky (fog) -->
  <rect width="400" height="200" fill="var(--ink)" opacity="0.15"/>
  <rect width="400" height="200" fill="url(#ht-dot)" opacity="0.4"/>
  <!-- sea -->
  <rect y="200" width="400" height="60" fill="var(--ink)" opacity="0.45"/>
  <rect y="200" width="400" height="60" fill="url(#ht-lines)" opacity="0.3"/>
  <!-- horizon rule -->
  <line x1="0" y1="200" x2="400" y2="200" stroke="var(--ink)" stroke-width="0.8"/>
  <!-- waves -->
  <g stroke="var(--ink)" stroke-width="0.6" fill="none" opacity="0.7">
    <path d="M0 215 Q 20 211 40 215 T 80 215 T 120 215 T 160 215 T 200 215 T 240 215 T 280 215 T 320 215 T 360 215 T 400 215"/>
    <path d="M0 228 Q 25 224 50 228 T 100 228 T 150 228 T 200 228 T 250 228 T 300 228 T 350 228 T 400 228"/>
    <path d="M0 242 Q 30 238 60 242 T 120 242 T 180 242 T 240 242 T 300 242 T 360 242 T 400 242"/>
  </g>

  <!-- hotel: gabled house silhouette on a cliff -->
  <g fill="var(--ink)">
    <!-- cliff -->
    <path d="M100 260 L 120 240 L 160 230 L 220 232 L 260 236 L 280 260 Z"/>
    <!-- hotel body -->
    <rect x="150" y="170" width="100" height="70"/>
    <!-- roof -->
    <path d="M145 170 L 200 130 L 255 170 Z"/>
    <!-- gable dormer -->
    <rect x="190" y="145" width="20" height="25"/>
    <path d="M186 145 L 200 130 L 214 145 Z"/>
    <!-- chimney -->
    <rect x="225" y="132" width="10" height="22"/>
    <!-- smoke -->
    <g fill="var(--paper)" opacity="0.6">
      <circle cx="230" cy="125" r="4"/>
      <circle cx="235" cy="118" r="5"/>
      <circle cx="230" cy="110" r="6"/>
    </g>
  </g>
  <!-- windows (lit, warm) -->
  <g fill="var(--paper)">
    <rect x="160" y="185" width="14" height="18"/>
    <rect x="184" y="185" width="14" height="18"/>
    <rect x="208" y="185" width="14" height="18"/>
    <rect x="232" y="185" width="14" height="18"/>
    <rect x="160" y="212" width="14" height="18"/>
    <rect x="232" y="212" width="14" height="18"/>
    <!-- door -->
    <rect x="192" y="212" width="16" height="26"/>
    <!-- dormer window -->
    <rect x="194" y="152" width="12" height="12"/>
  </g>
  <g fill="var(--spot)" opacity="0.7">
    <rect x="162" y="187" width="10" height="14"/>
    <rect x="186" y="187" width="10" height="14"/>
    <rect x="210" y="187" width="10" height="14"/>
    <rect x="234" y="187" width="10" height="14"/>
  </g>

  <!-- gulls -->
  <g stroke="var(--ink)" stroke-width="1.5" fill="none">
    <path d="M60 80 Q 66 74 72 80 Q 78 74 84 80"/>
    <path d="M100 60 Q 106 54 112 60 Q 118 54 124 60"/>
    <path d="M320 90 Q 326 84 332 90 Q 338 84 344 90"/>
  </g>

  <!-- trees -->
  <g fill="var(--ink)">
    <path d="M60 240 L 65 220 L 70 240 Z"/>
    <path d="M75 240 L 80 215 L 85 240 Z"/>
    <path d="M295 240 L 300 218 L 305 240 Z"/>
    <path d="M310 240 L 315 222 L 320 240 Z"/>
  </g>

  <rect width="400" height="300" fill="url(#ht-dot-fine)" opacity="0.08"/>
</svg>`,

  // Generic portrait — vintage engraving silhouette (used for staff)
  portrait: (seed) => {
    const s = seed || 0;
    const has = {
      hat: s % 5 === 0,
      glasses: s % 3 === 1,
      beard: s % 4 === 2,
      bun: s % 4 === 3,
      tie: s % 2 === 0,
      collar: s % 2 === 1
    };
    const dog = s === 99; // special case for dog mascot
    if (dog) {
      return `
<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" class="illus portrait-illus">
  <rect width="200" height="200" fill="var(--paper)"/>
  <rect width="200" height="200" fill="url(#ht-dot)" opacity="0.35"/>
  <ellipse cx="100" cy="135" rx="60" ry="40" fill="var(--ink)"/>
  <!-- head -->
  <ellipse cx="100" cy="95" rx="48" ry="42" fill="var(--ink)"/>
  <!-- ears -->
  <path d="M55 70 Q 40 95 55 115 L 70 100 Z" fill="var(--ink)"/>
  <path d="M145 70 Q 160 95 145 115 L 130 100 Z" fill="var(--ink)"/>
  <!-- snout -->
  <ellipse cx="100" cy="108" rx="22" ry="18" fill="var(--paper)" opacity="0.25"/>
  <ellipse cx="100" cy="102" rx="5" ry="4" fill="var(--paper)"/>
  <!-- eyes -->
  <circle cx="84" cy="88" r="3.5" fill="var(--paper)"/>
  <circle cx="116" cy="88" r="3.5" fill="var(--paper)"/>
  <!-- bowtie -->
  <path d="M85 145 L 100 135 L 115 145 L 115 158 L 100 148 L 85 158 Z" fill="var(--spot)"/>
  <circle cx="100" cy="147" r="3" fill="var(--paper)"/>
  <rect width="200" height="200" fill="url(#ht-dot-fine)" opacity="0.1"/>
</svg>`;
    }
    return `
<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" class="illus portrait-illus">
  <rect width="200" height="200" fill="var(--paper)"/>
  <!-- vignette -->
  <rect width="200" height="200" fill="url(#shade)" opacity="0.3"/>
  <rect width="200" height="200" fill="url(#ht-dot)" opacity="0.45"/>

  <!-- shoulders / torso -->
  <path d="M30 200 L 40 155 Q 70 140 100 140 Q 130 140 160 155 L 170 200 Z" fill="var(--ink)"/>

  ${has.collar ? `
  <!-- collar / shirt -->
  <path d="M80 148 L 100 165 L 120 148 L 130 200 L 70 200 Z" fill="var(--paper)"/>
  <path d="M92 170 L 100 180 L 108 170 L 100 200 Z" fill="var(--ink)"/>
  ${has.tie ? `<path d="M96 180 L 100 175 L 104 180 L 106 200 L 94 200 Z" fill="var(--spot)"/>` : ''}
  ` : `
  ${has.tie ? `
    <path d="M88 145 L 100 160 L 112 145 L 108 200 L 92 200 Z" fill="var(--paper)" opacity="0.2"/>
    <path d="M96 160 L 100 155 L 104 160 L 106 200 L 94 200 Z" fill="var(--spot)"/>
  ` : ''}`}

  <!-- neck -->
  <rect x="92" y="120" width="16" height="28" fill="var(--ink)"/>

  <!-- head -->
  <ellipse cx="100" cy="95" rx="38" ry="44" fill="var(--ink)"/>

  ${has.hat ? `
  <!-- top hat -->
  <rect x="72" y="30" width="56" height="38" fill="var(--ink)"/>
  <rect x="64" y="62" width="72" height="8" fill="var(--ink)"/>
  <rect x="72" y="58" width="56" height="4" fill="var(--spot)" opacity="0.7"/>
  ` : ''}

  ${has.bun ? `
  <!-- bun / updo -->
  <circle cx="100" cy="50" r="22" fill="var(--ink)"/>
  <circle cx="100" cy="55" r="15" fill="var(--paper)" opacity="0.15"/>
  ` : ''}

  <!-- face highlights (soft) -->
  <ellipse cx="100" cy="90" rx="30" ry="34" fill="var(--paper)" opacity="0.2"/>

  <!-- eyes (dots, engraved) -->
  <circle cx="88" cy="92" r="2" fill="var(--paper)"/>
  <circle cx="112" cy="92" r="2" fill="var(--paper)"/>

  ${has.glasses ? `
  <circle cx="88" cy="92" r="8" fill="none" stroke="var(--paper)" stroke-width="1.5"/>
  <circle cx="112" cy="92" r="8" fill="none" stroke="var(--paper)" stroke-width="1.5"/>
  <line x1="96" y1="92" x2="104" y2="92" stroke="var(--paper)" stroke-width="1.5"/>
  ` : ''}

  <!-- nose (subtle) -->
  <path d="M100 98 L 97 108 L 103 108 Z" fill="var(--paper)" opacity="0.25"/>

  <!-- mouth -->
  <path d="M92 117 Q 100 ${has.beard ? 114 : 120} 108 117" stroke="var(--paper)" stroke-width="1.2" fill="none"/>

  ${has.beard ? `
  <!-- beard -->
  <path d="M75 110 Q 100 145 125 110 Q 120 135 100 140 Q 80 135 75 110 Z" fill="var(--ink)"/>
  <path d="M80 115 L 85 135 M 90 118 L 92 140 M 100 120 L 100 142 M 110 118 L 108 140 M 120 115 L 115 135" stroke="var(--paper)" stroke-width="0.4" opacity="0.5"/>
  ` : ''}

  <!-- engraving hatch lines on face -->
  <g stroke="var(--paper)" stroke-width="0.4" opacity="0.25" fill="none">
    <path d="M70 90 Q 78 95 70 100"/>
    <path d="M130 90 Q 122 95 130 100"/>
    <path d="M85 108 Q 100 113 115 108"/>
  </g>

  <rect width="200" height="200" fill="url(#ht-dot-fine)" opacity="0.12"/>
</svg>`;
  }
};

window.Illus = Illus;

/* ---------- MOUNT illustrations into placeholders ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // hero
  const heroSlot = document.querySelector('[data-illus="hero"]');
  if (heroSlot) heroSlot.innerHTML = Illus.printPress() + (heroSlot.dataset.caption ? `<div class="caption-over">${heroSlot.dataset.caption}</div>` : '');

  // case studies
  const map = { bottles: Illus.bottles, dashboard: Illus.dashboard, socks: Illus.socksMail, hotel: Illus.hotel };
  document.querySelectorAll('[data-illus]').forEach(el => {
    const key = el.dataset.illus;
    if (map[key]) el.innerHTML = map[key]() + (el.dataset.caption ? `<div class="caption-over">${el.dataset.caption}</div>` : '');
  });

  // staff portraits
  document.querySelectorAll('[data-portrait]').forEach((el, i) => {
    const seed = el.dataset.portrait === 'dog' ? 99 : parseInt(el.dataset.portrait, 10) || i;
    el.innerHTML = Illus.portrait(seed);
  });
});
