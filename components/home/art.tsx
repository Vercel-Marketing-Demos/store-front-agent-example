// The home page's illustrations: flat landscapes in the same style and palette as the product
// art in public/products, drawn as inline SVG so they stay sharp at any width and cost no requests.

// A pine: a short trunk under three stacked tiers. (x, y) is the base of the trunk.
function pine(x: number, y: number, h: number): string {
  const w = h * 0.42;
  const tier = (top: number, bottom: number, half: number) => `M${x} ${top} L${x + half} ${bottom} L${x - half} ${bottom} Z`;
  return [
    `M${x - h * 0.03} ${y} h${h * 0.06} v${-h * 0.14} h${-h * 0.06} Z`,
    tier(y - h * 0.62, y - h * 0.12, w * 0.5),
    tier(y - h * 0.82, y - h * 0.38, w * 0.4),
    tier(y - h, y - h * 0.6, w * 0.3),
  ].join(" ");
}

function Pines({ trees, fill }: { trees: [number, number, number][]; fill: string }) {
  return (
    <g fill={fill}>
      {trees.map(([x, y, h]) => (
        <path key={`${x}-${y}`} d={pine(x, y, h)} />
      ))}
    </g>
  );
}

// Dawn over layered ridges. Sized to cover a wide hero; the text sits in the sky at the left.
export function HeroLandscape({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden>
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6efe3" />
          <stop offset="70%" stopColor="#f1dcbc" />
          <stop offset="100%" stopColor="#ebc99c" />
        </linearGradient>
        <radialGradient id="hero-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f7c46c" />
          <stop offset="100%" stopColor="#f2b257" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#hero-sky)" />
      <circle cx="1170" cy="420" r="210" fill="#f6d9a6" opacity="0.5" />
      <circle cx="1170" cy="420" r="118" fill="url(#hero-sun)" />
      <path d="M0 585 L170 495 L300 540 L460 420 L610 515 L760 450 L900 535 L1050 395 L1210 490 L1370 430 L1600 520 V900 H0 Z" fill="#dccdb2" />
      <path d="M1050 395 L1095 430 L1075 432 L1050 418 L1025 432 L1005 430 Z M460 420 L500 450 L482 452 L460 440 L440 452 L422 450 Z" fill="#f6efe3" />
      <path d="M0 655 L130 575 L250 625 L410 515 L560 615 L700 555 L860 650 L1000 570 L1150 630 L1310 535 L1470 620 L1600 585 V900 H0 Z" fill="#a8ae8f" />
      <path d="M0 735 Q200 660 400 715 T800 700 T1200 712 T1600 672 V900 H0 Z" fill="#6b7a4b" />
      <Pines
        fill="#4c5a35"
        trees={[
          [1080, 720, 90],
          [1120, 716, 120],
          [1160, 718, 80],
          [1420, 690, 110],
          [1460, 686, 140],
          [1500, 684, 95],
          [300, 706, 85],
          [335, 708, 110],
          // Near the middle, so a phone's narrow crop keeps a few trees.
          [700, 712, 95],
          [740, 708, 130],
          [785, 712, 85],
        ]}
      />
      <path d="M0 815 Q320 750 660 800 T1600 780 V900 H0 Z" fill="#3f4a2e" />
      <Pines
        fill="#263022"
        trees={[
          [60, 830, 210],
          [130, 820, 280],
          [200, 826, 190],
          [1300, 812, 200],
          [1370, 800, 300],
          [1450, 808, 240],
          [1530, 815, 180],
          [1580, 812, 260],
        ]}
      />
    </svg>
  );
}

// A trail winding up a misty valley, for the layering story.
export function TrailScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 900" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id="trail-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9e0d6" />
          <stop offset="100%" stopColor="#eef0e6" />
        </linearGradient>
      </defs>
      <rect width="800" height="900" fill="url(#trail-sky)" />
      <path d="M0 360 L120 270 L230 320 L380 190 L520 300 L640 240 L800 330 V900 H0 Z" fill="#c4cab7" />
      <path d="M380 190 L420 222 L400 224 L380 212 L360 224 L340 222 Z" fill="#f4f5ef" />
      <path d="M0 470 L150 390 L300 450 L470 360 L620 440 L800 400 V900 H0 Z" fill="#9aa585" />
      <Pines
        fill="#6b7a4b"
        trees={[
          [90, 470, 80],
          [125, 466, 100],
          [640, 452, 90],
          [680, 448, 115],
          [720, 452, 85],
        ]}
      />
      <path d="M0 600 Q200 520 400 570 T800 540 V900 H0 Z" fill="#6b7a4b" />
      <path d="M455 560 Q430 600 470 640 Q540 700 420 760 Q300 820 360 900 H520 Q440 830 560 770 Q690 700 560 630 Q500 600 480 560 Z" fill="#e5d8bf" />
      <Pines
        fill="#3f4a2e"
        trees={[
          [40, 700, 200],
          [110, 690, 260],
          [180, 700, 170],
          [660, 690, 230],
          [740, 680, 290],
        ]}
      />
      <path d="M0 860 Q200 800 400 840 T800 820 V900 H0 Z" fill="#263022" />
    </svg>
  );
}

// A kitchen window at dawn: kettle on, mug waiting. For the home goods section.
export function KitchenScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1600 640" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id="kitchen-view" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6e6cc" />
          <stop offset="100%" stopColor="#efcf9f" />
        </linearGradient>
      </defs>
      <rect width="1600" height="640" fill="#ece1d1" />
      {/* Window with the view */}
      <rect x="250" y="70" width="560" height="400" rx="6" fill="#8a6a4a" />
      <rect x="270" y="90" width="520" height="360" fill="url(#kitchen-view)" />
      <circle cx="640" cy="230" r="50" fill="#f2b257" />
      <path d="M270 330 L370 270 L460 310 L560 240 L660 300 L790 260 V450 H270 Z" fill="#a8ae8f" />
      <path d="M270 390 Q420 340 560 380 T790 370 V450 H270 Z" fill="#6b7a4b" />
      <Pines
        fill="#3f4a2e"
        trees={[
          [320, 430, 110],
          [355, 434, 80],
          [720, 428, 120],
          [755, 432, 90],
        ]}
      />
      <rect x="526" y="90" width="8" height="360" fill="#8a6a4a" />
      <rect x="270" y="266" width="520" height="8" fill="#8a6a4a" />
      <rect x="230" y="466" width="600" height="18" rx="4" fill="#7a5c3e" />
      {/* Plant on the sill */}
      <path d="M300 466 h70 l-8 -50 h-54 Z" fill="#b8673a" />
      <path d="M335 418 C300 380 300 350 318 330 C330 360 336 380 335 418 Z M335 418 C365 375 380 360 395 352 C385 385 365 405 335 418 Z M335 418 C330 370 340 340 352 320 C356 350 350 390 335 418 Z" fill="#6b7a4b" />
      {/* Shelf with jars and a mug */}
      <rect x="980" y="200" width="460" height="14" rx="3" fill="#7a5c3e" />
      <rect x="1010" y="120" width="70" height="80" rx="10" fill="#d9cdb6" />
      <rect x="1010" y="110" width="70" height="18" rx="5" fill="#8a6a4a" />
      <rect x="1100" y="140" width="60" height="60" rx="10" fill="#c4cab7" />
      <rect x="1100" y="130" width="60" height="16" rx="5" fill="#8a6a4a" />
      <path d="M1220 140 h70 v52 a8 8 0 0 1 -8 8 h-54 a8 8 0 0 1 -8 -8 Z" fill="#f4f1ea" />
      <path d="M1290 152 h14 a14 14 0 0 1 0 28 h-14" fill="none" stroke="#f4f1ea" strokeWidth="9" />
      <rect x="1330" y="130" width="22" height="70" rx="3" fill="#6b7a4b" />
      <rect x="1356" y="140" width="18" height="60" rx="3" fill="#b8673a" />
      <rect x="1378" y="124" width="24" height="76" rx="3" fill="#3f4a2e" />
      {/* Counter, kettle, mug, steam */}
      <rect x="0" y="540" width="1600" height="100" fill="#8a6a4a" />
      <rect x="0" y="530" width="1600" height="18" fill="#a5835f" />
      <ellipse cx="1130" cy="532" rx="150" ry="12" fill="rgba(0,0,0,0.12)" />
      <path d="M1030 530 Q1020 420 1130 405 Q1240 420 1230 530 Z" fill="#b8673a" />
      <path d="M1040 470 L960 430 L968 418 L1046 448 Z" fill="#b8673a" />
      <path d="M1075 408 Q1130 330 1185 408" fill="none" stroke="#4a3626" strokeWidth="14" strokeLinecap="round" />
      <ellipse cx="1130" cy="404" rx="30" ry="9" fill="#8f4f2c" />
      <path d="M952 400 q-14 -24 2 -46 q14 -22 0 -44 M985 395 q-14 -24 2 -46 q14 -22 0 -44" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
      <path d="M1320 530 v-66 h76 v62 a4 4 0 0 1 -4 4 Z" fill="#f4f1ea" />
      <path d="M1396 478 h14 a16 16 0 0 1 0 32 h-14" fill="none" stroke="#f4f1ea" strokeWidth="9" />
    </svg>
  );
}
