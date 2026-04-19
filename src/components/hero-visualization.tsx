// Hero "what Octupie does in a nutshell" diagram.
//
// Three stages, left to right, readable in one glance:
//   1. INSTAGRAM creator feed -> one reel marked OUTLIER
//   2. OCTUPIE engine reads it -> three plain analysis chips
//   3. OUTPUT script + caption + READY badge in your voice
//
// Static layout. Single subtle pulse on the outlier tile + a single
// pulse on the READY badge. No spinning rings, no glow halos, no
// travelling dots. Real Instagram + Octupie marks embedded inline.

type Props = { className?: string };

export function HeroVisualization({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 1080 540"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Octupie reads outlier reels from creators on Instagram and turns them into ready-to-post scripts in your voice"
    >
      <defs>
        <linearGradient id="hv-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a152c" />
          <stop offset="100%" stopColor="#040E22" />
        </linearGradient>
        <linearGradient id="hv-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4C61FF" />
          <stop offset="100%" stopColor="#014CE3" />
        </linearGradient>
        <linearGradient id="hv-chip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15223C" />
          <stop offset="100%" stopColor="#0a1530" />
        </linearGradient>
        <linearGradient id="hv-ig" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="50%" stopColor="#DD2A7B" />
          <stop offset="100%" stopColor="#8134AF" />
        </linearGradient>
        <style>{`
          @keyframes hv-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.78; } }
          .hv-pulse { animation: hv-pulse 3s ease-in-out infinite; }
          @keyframes hv-blink { 0%,90%,100% { opacity: 1; } 95% { opacity: 0.4; } }
          .hv-blink { animation: hv-blink 4s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .hv-pulse, .hv-blink { animation: none; }
          }
        `}</style>
      </defs>

      <rect width="1080" height="540" fill="url(#hv-bg)" />

      {/* phase headers */}
      {[
        { x: 195, label: "1. Track Instagram creators" },
        { x: 578, label: "2. Octupie analyses outliers" },
        { x: 950, label: "3. Ready to post in your voice" },
      ].map((p) => (
        <text
          key={p.x}
          x={p.x}
          y="50"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontSize="13"
          fontWeight="700"
          fill="rgba(155,178,255,0.85)"
          letterSpacing="1.5"
        >
          {p.label.toUpperCase()}
        </text>
      ))}

      {/* simple connectors between stages */}
      <line x1="320" y1="280" x2="378" y2="280" stroke="rgba(76,97,255,0.55)" strokeWidth="1.5" strokeDasharray="4 6" />
      <polygon points="378,280 370,275 370,285" fill="rgba(76,97,255,0.85)" />

      <line x1="780" y1="280" x2="828" y2="280" stroke="rgba(76,97,255,0.55)" strokeWidth="1.5" strokeDasharray="4 6" />
      <polygon points="828,280 820,275 820,285" fill="rgba(76,97,255,0.85)" />

      {/* ===== Stage 1: Instagram creator feed ===== */}
      <g transform="translate(70 90)">
        <rect width="250" height="380" rx="22" fill="#0a1636" stroke="rgba(255,255,255,0.1)" />
        <rect x="14" y="14" width="222" height="352" rx="14" fill="url(#hv-chip)" />

        {/* header: real Instagram glyph + handle */}
        <g transform="translate(28 30)">
          <rect width="32" height="32" rx="9" fill="url(#hv-ig)" />
          {/* IG camera body */}
          <rect x="6" y="6" width="20" height="20" rx="6" fill="none" stroke="#fff" strokeWidth="2" />
          {/* lens */}
          <circle cx="16" cy="16" r="4.6" fill="none" stroke="#fff" strokeWidth="2" />
          {/* viewfinder dot */}
          <circle cx="22.5" cy="9.5" r="1.3" fill="#fff" />
          <text x="44" y="16" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" fill="#fff">
            @creator
          </text>
          <text x="44" y="29" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="rgba(155,178,255,0.7)" letterSpacing="1.5">
            INSTAGRAM REELS
          </text>
        </g>

        {/* 3x3 reel grid */}
        {[
          { x: 0, y: 0, label: "12k" },
          { x: 1, y: 0, label: "18k" },
          { x: 2, y: 0, label: "22k" },
          { x: 0, y: 1, label: "412k", outlier: true },
          { x: 1, y: 1, label: "20k" },
          { x: 2, y: 1, label: "16k" },
          { x: 0, y: 2, label: "14k" },
          { x: 1, y: 2, label: "9k" },
          { x: 2, y: 2, label: "11k" },
        ].map((r, i) => {
          const x = 28 + r.x * 68;
          const y = 86 + r.y * 92;
          const w = 60;
          const h = 84;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx="6"
                fill={r.outlier ? "url(#hv-accent)" : "rgba(255,255,255,0.06)"}
                stroke={r.outlier ? "rgba(76,97,255,0.7)" : "rgba(255,255,255,0.06)"}
                className={r.outlier ? "hv-pulse" : undefined}
              />
              {r.outlier ? (
                <>
                  <circle cx={x + w / 2} cy={y + h / 2 - 6} r="10" fill="#fff" />
                  <polygon
                    points={`${x + w / 2 - 3},${y + h / 2 - 11} ${x + w / 2 - 3},${y + h / 2 - 1} ${x + w / 2 + 5},${y + h / 2 - 6}`}
                    fill="#014CE3"
                  />
                </>
              ) : (
                <>
                  <circle cx={x + w / 2} cy={y + h / 2 - 6} r="6" fill="rgba(255,255,255,0.16)" />
                  <rect x={x + 8} y={y + h - 16} width={w - 16} height="3" rx="1.5" fill="rgba(255,255,255,0.18)" />
                </>
              )}
              <text
                x={x + w / 2}
                y={y + h - 4}
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontSize="9"
                fontWeight={r.outlier ? "700" : "500"}
                fill={r.outlier ? "#fff" : "rgba(255,255,255,0.65)"}
              >
                {r.label}
              </text>
            </g>
          );
        })}

        {/* OUTLIER badge above the highlighted tile */}
        <g transform="translate(58 168)">
          <rect x="-30" y="0" width="60" height="18" rx="9" fill="#0a1636" stroke="rgba(76,97,255,0.7)" />
          <circle cx="-22" cy="9" r="2.5" fill="#4C61FF" />
          <text x="-15" y="12" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#fff">
            OUTLIER
          </text>
        </g>
      </g>

      {/* ===== Stage 2: Octupie engine (left) + analysis chips (right) ===== */}
      {/* outer width 380: engine 160 + 30 gap + chips 190 */}
      <g transform="translate(388 90)">
        {/* engine card */}
        <g transform="translate(0 110)">
          <rect width="160" height="180" rx="20" fill="#0a1636" stroke="rgba(76,97,255,0.55)" strokeWidth="1.5" />

          {/* Octupie brandmark, centred */}
          <g transform="translate(80 56)">
            <rect x="-22" y="-22" width="44" height="44" rx="10" fill="url(#hv-accent)" />
            <g fill="#ffffff">
              <circle cx="0" cy="-14" r="2" />
              <circle cx="9.9" cy="-9.9" r="2" />
              <circle cx="14" cy="0" r="2" />
              <circle cx="9.9" cy="9.9" r="2" />
              <circle cx="0" cy="14" r="2" />
              <circle cx="-9.9" cy="9.9" r="2" />
              <circle cx="-14" cy="0" r="2" />
              <circle cx="-9.9" cy="-9.9" r="2" />
            </g>
            <circle cx="0" cy="0" r="6.5" fill="#ffffff" />
            <circle cx="0" cy="0" r="2.4" fill="url(#hv-accent)" />
          </g>

          <text x="80" y="116" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="16" fontWeight="700" fill="#fff">
            Octupie
          </text>
          <text x="80" y="134" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="rgba(155,178,255,0.7)" letterSpacing="2">
            READING THE OUTLIER
          </text>
          <circle cx="80" cy="156" r="3" fill="#4C61FF" className="hv-blink" />
        </g>

        {/* short connector engine -> first chip */}
        <line x1="160" y1="200" x2="190" y2="200" stroke="rgba(76,97,255,0.55)" strokeWidth="1.5" strokeDasharray="3 5" />

        {/* 3 analysis chips stacked to the right of the engine */}
        {[
          { y: 110, label: "Hook", val: "Pattern interrupt" },
          { y: 178, label: "Beats", val: "3 beats, 2.5s each" },
          { y: 246, label: "Style", val: "Talking head + caption" },
        ].map((c, i) => (
          <g key={i} transform={`translate(190 ${c.y})`}>
            <rect width="190" height="56" rx="12" fill="url(#hv-chip)" stroke="rgba(76,97,255,0.4)" />
            <text x="16" y="22" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="#9BB2FF" letterSpacing="1.5">
              {c.label.toUpperCase()}
            </text>
            <text x="16" y="40" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="500" fill="#fff">
              {c.val}
            </text>
          </g>
        ))}
      </g>

      {/* ===== Stage 3: Output panel ===== */}
      <g transform="translate(830 90)">
        <rect width="240" height="380" rx="20" fill="url(#hv-chip)" stroke="rgba(76,97,255,0.45)" />

        {/* header tabs */}
        <g transform="translate(14 14)">
          <rect width="80" height="24" rx="12" fill="#014CE3" />
          <text x="40" y="16" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="#fff">
            Reels
          </text>
          <rect x="92" y="0" width="92" height="24" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
          <text x="106" y="16" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="rgba(255,255,255,0.6)">
            LinkedIn
          </text>
          <text x="180" y="16" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="7" fontWeight="700" fill="#9BB2FF">
            SOON
          </text>
        </g>

        {/* SCRIPT */}
        <g transform="translate(14 54)">
          <text fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#9BB2FF" letterSpacing="1.2">
            SCRIPT IN YOUR VOICE
          </text>
          <rect y="8" width="212" height="118" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
          {[
            { y: 24, w: 188, op: 0.85 },
            { y: 38, w: 168, op: 0.7 },
            { y: 52, w: 196, op: 0.7 },
            { y: 66, w: 144, op: 0.55 },
            { y: 80, w: 178, op: 0.55 },
            { y: 94, w: 102, op: 0.45 },
          ].map((l, i) => (
            <rect key={i} x="12" y={l.y} width={l.w} height="6" rx="2" fill={`rgba(255,255,255,${l.op})`} />
          ))}
        </g>

        {/* TITLE */}
        <g transform="translate(14 188)">
          <text fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#9BB2FF" letterSpacing="1.2">
            TITLE
          </text>
          <rect y="8" width="212" height="30" rx="10" fill="#0a1636" stroke="rgba(76,97,255,0.4)" />
          <rect x="12" y="20" width="186" height="8" rx="3" fill="#fff" opacity="0.85" />
        </g>

        {/* CAPTION */}
        <g transform="translate(14 236)">
          <text fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#9BB2FF" letterSpacing="1.2">
            CAPTION
          </text>
          <rect y="8" width="212" height="56" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
          <rect x="12" y="22" width="184" height="6" rx="2" fill="rgba(255,255,255,0.6)" />
          <rect x="12" y="34" width="160" height="6" rx="2" fill="rgba(255,255,255,0.5)" />
          <rect x="12" y="46" width="120" height="6" rx="2" fill="rgba(255,255,255,0.4)" />
        </g>

        {/* READY pill */}
        <g transform="translate(14 308)" className="hv-pulse">
          <rect width="212" height="34" rx="17" fill="url(#hv-accent)" />
          <text x="106" y="22" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="#fff">
            Ready to post →
          </text>
        </g>
      </g>
    </svg>
  );
}
