/*
  A hand holding the phone, drawn in the phone's own coordinates (phone = 290 x 600).
  The grip matches the reference: the palm is behind the phone, the fingers curl around
  the right edge (their tips rest on the front), and the thumb wraps over the lower-left
  corner. Split in two layers so the phone can sit between them.
  Skin is lit by the scene: warm highlights, violet-tinted shadows, lavender rim light.
*/

const VIEW = { x: -220, y: -120, w: 820, h: 1240 };

function Frame({ children, className = "" }) {
  return (
    <svg
      aria-hidden
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
      className={`pointer-events-none absolute overflow-visible ${className}`}
      style={{ left: VIEW.x, top: VIEW.y, width: VIEW.w, height: VIEW.h }}
    >
      <defs>
        <linearGradient id="hand-mass" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#efc5ae" />
          <stop offset="0.35" stopColor="#d49a82" />
          <stop offset="0.75" stopColor="#9c6466" />
          <stop offset="1" stopColor="#4a2b4f" />
        </linearGradient>
        <linearGradient id="hand-tip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3cfba" />
          <stop offset="0.6" stopColor="#d79d85" />
          <stop offset="1" stopColor="#a56c69" />
        </linearGradient>
        <linearGradient id="hand-thumb" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5d3bf" />
          <stop offset="0.45" stopColor="#dca28a" />
          <stop offset="1" stopColor="#8a5462" />
        </linearGradient>
        <radialGradient id="hand-nail" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fdeee6" />
          <stop offset="1" stopColor="#e1b1a3" />
        </radialGradient>
        <filter id="hand-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      {children}
    </svg>
  );
}

// Behind the phone: palm, wrist and the curled fingers showing on the right.
export function HandBack() {
  return (
    <Frame>
      <ellipse cx="300" cy="560" rx="120" ry="220" fill="#12063a" opacity="0.5" filter="url(#hand-blur)" />
      <path
        d="M286 316
           C306 308 330 312 340 330
           C350 350 346 370 350 388
           C356 410 356 432 354 450
           C356 470 358 492 354 510
           C352 530 346 548 340 562
           C352 600 376 648 402 698
           C432 760 458 860 476 1000
           L470 1110 L238 1110
           C236 960 214 840 176 760
           C142 712 112 668 104 612
           C98 560 120 470 160 420
           Z"
        fill="url(#hand-mass)"
      />
      {/* gaps between the curled fingers */}
      {[372, 432, 492].map((y) => (
        <path key={y} d={`M292 ${y} C312 ${y - 3} 334 ${y + 1} 352 ${y + 8}`} stroke="#5d3352" strokeOpacity="0.55" strokeWidth="3" fill="none" strokeLinecap="round" />
      ))}
      {/* knuckle highlights */}
      {[330, 390, 450, 512].map((y, i) => (
        <path key={y} d={`M${318 + (i === 3 ? -4 : 0)} ${y} C330 ${y + 4} 338 ${y + 12} 340 ${y + 22}`} stroke="#ffe3d3" strokeOpacity="0.35" strokeWidth="3" fill="none" strokeLinecap="round" />
      ))}
      {/* rim light on the top finger */}
      <path d="M288 318 C306 310 328 314 338 330" stroke="#dacdff" strokeOpacity="0.6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </Frame>
  );
}

// In front of the phone: fingertips resting over the right edge, thumb over the lower-left corner.
export function HandFront() {
  const tips = [
    { y: 316, h: 50 },
    { y: 370, h: 54 },
    { y: 428, h: 52 },
    { y: 486, h: 44 },
  ];
  return (
    <Frame className="[filter:drop-shadow(0_8px_12px_rgba(18,6,58,0.5))]">
      {tips.map((t, i) => {
        const mid = t.y + t.h / 2;
        return (
          <g key={i}>
            <path
              d={`M300 ${t.y + 2} C286 ${t.y} 268 ${t.y + 6} 262 ${mid - 4} C258 ${mid + 10} 268 ${t.y + t.h - 2} 300 ${t.y + t.h}`}
              fill="url(#hand-tip)"
            />
            <path
              d={`M290 ${t.y + 9} C279 ${t.y + 10} 271 ${t.y + 16} 270 ${mid} C271 ${t.y + t.h - 14} 279 ${t.y + t.h - 9} 290 ${t.y + t.h - 9} C294 ${mid + 6} 294 ${mid - 6} 290 ${t.y + 9} Z`}
              fill="url(#hand-nail)"
              opacity="0.9"
            />
            <path d={`M300 ${t.y + t.h} C290 ${t.y + t.h + 1} 280 ${t.y + t.h - 1} 272 ${t.y + t.h - 6}`} stroke="#6a3a52" strokeOpacity="0.4" strokeWidth="2.5" fill="none" />
          </g>
        );
      })}

      {/* thumb, from outside the left edge up over the corner */}
      <path
        d="M-60 760
           C-64 700 -50 646 -22 604
           C0 570 28 530 50 494
           C62 474 80 458 98 462
           C118 466 124 486 114 506
           C96 540 70 578 52 614
           C40 640 46 670 78 690
           C112 712 170 722 232 724
           L240 820 L-60 820 Z"
        fill="url(#hand-thumb)"
      />
      <ellipse cx="94" cy="478" rx="12" ry="18" transform="rotate(32 94 478)" fill="url(#hand-nail)" />
      <path d="M24 560 C38 566 50 574 58 586" stroke="#8a5462" strokeOpacity="0.4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M-20 604 C2 570 30 530 50 496" stroke="#dacdff" strokeOpacity="0.6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </Frame>
  );
}
