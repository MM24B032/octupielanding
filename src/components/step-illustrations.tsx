// Inline SVG illustrations for "How Octupie works" steps.
// Same visual language as feature-illustrations.tsx.

type Props = { className?: string };

const defs = (
  <defs>
    <linearGradient id="step-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#0a152c" />
      <stop offset="100%" stopColor="#040E22" />
    </linearGradient>
    <linearGradient id="step-accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#4C61FF" />
      <stop offset="100%" stopColor="#014CE3" />
    </linearGradient>
    <linearGradient id="step-chip" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#15223C" />
      <stop offset="100%" stopColor="#0a1530" />
    </linearGradient>
  </defs>
);

function Frame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 600 380"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {defs}
      <rect width="600" height="380" fill="url(#step-bg)" />
      <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="380" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} />
        ))}
      </g>
      {children}
    </svg>
  );
}

// STEP 1: Pick the creators you want to learn from
// IG handle search bar with autocomplete results, plus a "+ Add" badge.
export function PickCreatorsStep({ className }: Props) {
  return (
    <Frame className={className}>
      <style>{`
        @keyframes step1-cursor { 0%,100%{opacity:0} 50%{opacity:1} }
        .step1-cursor { animation: step1-cursor 1s steps(2) infinite; }
        @keyframes step1-pop { 0%{opacity:0; transform:translateY(6px)} 100%{opacity:1; transform:translateY(0)} }
        .step1-row { animation: step1-pop 0.6s ease-out backwards; }
      `}</style>

      {/* search bar */}
      <g transform="translate(80 60)">
        <rect width="440" height="56" rx="14" fill="url(#step-chip)" stroke="rgba(76,97,255,0.45)" />
        <circle cx="32" cy="28" r="9" fill="none" stroke="#9BB2FF" strokeWidth="2.2" />
        <line x1="38" y1="34" x2="46" y2="42" stroke="#9BB2FF" strokeWidth="2.2" strokeLinecap="round" />
        <text x="64" y="33" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="500" fill="#fff">
          @mrcreator
        </text>
        <rect className="step1-cursor" x="148" y="20" width="2" height="18" fill="#9BB2FF" />
        <rect x="370" y="14" width="56" height="28" rx="14" fill="#014CE3" />
        <text x="398" y="32" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#fff">
          Track
        </text>
      </g>

      {/* autocomplete dropdown */}
      <g transform="translate(80 134)">
        <rect width="440" height="200" rx="14" fill="url(#step-chip)" stroke="rgba(255,255,255,0.08)" />
        {[
          { name: "@mrcreator", meta: "1.2M followers · Reels", style: { animationDelay: "0s" }, active: true },
          { name: "@mr.creator.daily", meta: "640k followers · Reels", style: { animationDelay: "0.12s" } },
          { name: "@mrcreator.studio", meta: "182k followers · Reels", style: { animationDelay: "0.24s" } },
          { name: "@mr_creator_official", meta: "98k followers · Reels", style: { animationDelay: "0.36s" } },
        ].map((r, i) => (
          // Outer <g> for SVG positioning, inner <g> for CSS animation
          // (CSS transform would otherwise wipe the outer translate).
          <g key={i} transform={`translate(0 ${i * 50})`}>
            <g className="step1-row" style={r.style}>
              <rect
                x="6"
                y="6"
                width="428"
                height="42"
                rx="10"
                fill={r.active ? "rgba(76,97,255,0.12)" : "transparent"}
                stroke={r.active ? "rgba(76,97,255,0.45)" : "transparent"}
              />
              <circle cx="32" cy="27" r="14" fill="#E1306C" opacity="0.85" />
              <text x="32" y="31" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#fff">
                IG
              </text>
              <text x="58" y="24" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#fff">
                {r.name}
              </text>
              <text x="58" y="40" fontFamily="Inter, sans-serif" fontSize="10" fill="rgba(255,255,255,0.55)">
                {r.meta}
              </text>
              {r.active && (
                <g transform="translate(380 14)">
                  <rect width="40" height="22" rx="11" fill="#014CE3" />
                  <text x="20" y="15" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#fff">
                    ADD
                  </text>
                </g>
              )}
            </g>
          </g>
        ))}
      </g>
    </Frame>
  );
}

// STEP 2: Surface their actual outliers
// Bar chart with one bar much taller (the outlier), highlighted.
export function SurfaceOutliersStep({ className }: Props) {
  const bars = [
    { h: 50, label: "12k" },
    { h: 68, label: "18k" },
    { h: 80, label: "22k" },
    { h: 58, label: "15k" },
    { h: 200, label: "412k", outlier: true },
    { h: 72, label: "20k" },
    { h: 88, label: "25k" },
    { h: 62, label: "16k" },
    { h: 76, label: "21k" },
  ];
  const baseY = 320;

  return (
    <Frame className={className}>
      <style>{`
        @keyframes step2-rise { from { transform: scaleY(0) } to { transform: scaleY(1) } }
        .step2-bar { transform-box: fill-box; transform-origin: bottom; animation: step2-rise 0.7s ease-out backwards; }
        @keyframes step2-flag { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .step2-flag { animation: step2-flag 2.4s ease-in-out infinite; }
      `}</style>

      {/* axis */}
      <line x1="60" y1={baseY} x2="540" y2={baseY} stroke="rgba(255,255,255,0.15)" />
      <line x1="60" y1="80" x2="60" y2={baseY} stroke="rgba(255,255,255,0.08)" />

      {/* baseline median dashed line */}
      <line x1="60" y1={baseY - 95} x2="540" y2={baseY - 95} stroke="rgba(255,255,255,0.25)" strokeDasharray="6 6" />
      <text x="546" y={baseY - 92} fontFamily="Inter, sans-serif" fontSize="10" fill="rgba(255,255,255,0.5)">
        baseline
      </text>

      {/* bars (animated) */}
      {bars.map((b, i) => {
        const x = 80 + i * 50;
        const y = baseY - b.h;
        return (
          <g key={i} className="step2-bar" style={{ animationDelay: `${i * 0.06}s` }}>
            <rect
              x={x}
              y={y}
              width="32"
              height={b.h}
              rx="6"
              fill={b.outlier ? "url(#step-accent)" : "rgba(255,255,255,0.18)"}
            />
          </g>
        );
      })}

      {/* labels (no animation) */}
      {bars.map((b, i) => {
        const x = 80 + i * 50;
        return (
          <text
            key={`l${i}`}
            x={x + 16}
            y={baseY + 16}
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            fontSize="9"
            fill={b.outlier ? "#9BB2FF" : "rgba(255,255,255,0.45)"}
            fontWeight={b.outlier ? "700" : "500"}
          >
            {b.label}
          </text>
        );
      })}

      {/* OUTLIER flag — outer <g> positions via SVG attr transform,
           inner <g> handles the float animation so the CSS transform
           from the keyframe does NOT overwrite the outer positioning. */}
      {(() => {
        const i = bars.findIndex((b) => b.outlier);
        if (i < 0) return null;
        const cx = 80 + i * 50 + 16; // bar center x in viewBox
        const flagY = baseY - bars[i].h - 40; // 40px above the top of the bar
        return (
          <g transform={`translate(${cx} ${flagY})`}>
            <g className="step2-flag">
              <rect x="-44" y="0" width="88" height="26" rx="13" fill="#0a1636" stroke="rgba(76,97,255,0.6)" />
              <circle cx="-30" cy="13" r="4" fill="#4C61FF" />
              <text x="-20" y="17" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="#fff">
                OUTLIER
              </text>
              <polygon points="-6,26 0,32 6,26" fill="#0a1636" stroke="rgba(76,97,255,0.6)" />
            </g>
          </g>
        );
      })()}

      {/* title */}
      <text x="60" y="55" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="rgba(155,178,255,0.9)">
        VIEWS PER REEL
      </text>
    </Frame>
  );
}

// STEP 3: Analyse the why - hooks, beats, style
// Reel thumbnail on the left, annotation labels pointing to it on the right.
export function AnalyseWhyStep({ className }: Props) {
  return (
    <Frame className={className}>
      <style>{`
        @keyframes step3-fade { from { opacity: 0; transform: translateX(8px) } to { opacity: 1; transform: translateX(0) } }
        .step3-anno { animation: step3-fade 0.6s ease-out backwards; }
      `}</style>

      {/* phone reel */}
      <g transform="translate(80 60)">
        <rect width="180" height="260" rx="22" fill="#0a1636" stroke="rgba(76,97,255,0.45)" strokeWidth="2" />
        <rect x="10" y="10" width="160" height="240" rx="14" fill="url(#step-chip)" />
        {/* hook bar */}
        <rect x="20" y="22" width="140" height="22" rx="6" fill="#014CE3" />
        <text x="90" y="37" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="#fff">
          HOOK · 0:00
        </text>
        {/* face placeholder */}
        <circle cx="90" cy="120" r="42" fill="rgba(76,97,255,0.2)" stroke="rgba(76,97,255,0.4)" />
        <circle cx="78" cy="115" r="3" fill="#fff" />
        <circle cx="102" cy="115" r="3" fill="#fff" />
        <path d="M 76 130 Q 90 142, 104 130" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* caption lines */}
        <rect x="20" y="180" width="140" height="6" rx="2" fill="rgba(255,255,255,0.55)" />
        <rect x="20" y="192" width="100" height="6" rx="2" fill="rgba(255,255,255,0.4)" />
        {/* progress */}
        <rect x="20" y="220" width="140" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="20" y="220" width="60" height="4" rx="2" fill="#4C61FF" />
        <text x="20" y="240" fontFamily="Inter, sans-serif" fontSize="9" fill="rgba(255,255,255,0.55)">
          0:08 / 0:24
        </text>
      </g>

      {/* connector lines + annotations */}
      {[
        { y: 80, label: "Hook pattern", val: "Pattern interrupt + question", anchor: 35 },
        { y: 150, label: "Story beats", val: "3 beats, 2.5s each", anchor: 115 },
        { y: 220, label: "Format", val: "Talking head + on-screen text", anchor: 170 },
        { y: 290, label: "Style", val: "Fast cuts, captions burned in", anchor: 230 },
      ].map((a, i) => (
        <g key={i} className="step3-anno" style={{ animationDelay: `${i * 0.15}s` }}>
          <path
            d={`M 260 ${a.anchor + 60} L 320 ${a.y + 22}`}
            stroke="rgba(76,97,255,0.45)"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            fill="none"
          />
          <g transform={`translate(320 ${a.y})`}>
            <rect width="200" height="48" rx="12" fill="url(#step-chip)" stroke="rgba(76,97,255,0.35)" />
            <text x="14" y="20" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="#9BB2FF">
              {a.label.toUpperCase()}
            </text>
            <text x="14" y="36" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="500" fill="#fff">
              {a.val}
            </text>
          </g>
        </g>
      ))}
    </Frame>
  );
}

// STEP 4: Recreate in your voice - script, title, caption
// Editor mockup with script lines, then a "Generate" button producing
// title + caption variants on the right.
export function RecreateInVoiceStep({ className }: Props) {
  return (
    <Frame className={className}>
      <style>{`
        @keyframes step4-glow { 0%,100%{box-shadow:0 0 0 0 rgba(76,97,255,0.6)} 50%{box-shadow:0 0 0 6px rgba(76,97,255,0)} }
        @keyframes step4-line { from { width: 0 } to { width: 100% } }
      `}</style>

      {/* Script editor */}
      <g transform="translate(40 60)">
        <rect width="280" height="260" rx="14" fill="url(#step-chip)" stroke="rgba(255,255,255,0.08)" />
        <rect width="280" height="34" rx="14" fill="rgba(76,97,255,0.18)" />
        <text x="16" y="22" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700" fill="#9BB2FF">
          SCRIPT · IN YOUR VOICE
        </text>
        <text x="266" y="22" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="10" fill="rgba(255,255,255,0.55)">
          v3
        </text>

        {/* line numbers + script lines */}
        {[
          { w: 220, op: 0.7 },
          { w: 200, op: 0.55 },
          { w: 240, op: 0.55 },
          { w: 180, op: 0.45 },
          { w: 220, op: 0.45 },
          { w: 160, op: 0.4 },
          { w: 200, op: 0.4 },
          { w: 100, op: 0.35 },
        ].map((l, i) => (
          <g key={i} transform={`translate(0 ${52 + i * 22})`}>
            <text x="12" y="12" fontFamily="Inter, sans-serif" fontSize="9" fill="rgba(255,255,255,0.3)">
              {(i + 1).toString().padStart(2, "0")}
            </text>
            <rect x="34" y="6" width={l.w} height="6" rx="2" fill={`rgba(255,255,255,${l.op})`} />
          </g>
        ))}
      </g>

      {/* Generate arrow */}
      <g transform="translate(330 175)">
        <rect width="40" height="40" rx="20" fill="url(#step-accent)" />
        <polygon points="14,12 30,20 14,28" fill="#fff" />
      </g>

      {/* Output: title + caption + hashtags */}
      <g transform="translate(390 60)">
        {/* title */}
        <g>
          <text fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#9BB2FF">
            TITLE
          </text>
          <rect y="6" width="170" height="34" rx="10" fill="#0a1636" stroke="rgba(76,97,255,0.4)" />
          <rect x="10" y="18" width="138" height="10" rx="3" fill="#fff" opacity="0.85" />
        </g>

        {/* caption */}
        <g transform="translate(0 56)">
          <text fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#9BB2FF">
            CAPTION
          </text>
          <rect y="6" width="170" height="100" rx="10" fill="url(#step-chip)" stroke="rgba(255,255,255,0.08)" />
          <rect x="10" y="20" width="148" height="6" rx="2" fill="rgba(255,255,255,0.6)" />
          <rect x="10" y="32" width="120" height="6" rx="2" fill="rgba(255,255,255,0.5)" />
          <rect x="10" y="44" width="140" height="6" rx="2" fill="rgba(255,255,255,0.4)" />
          <rect x="10" y="56" width="90" height="6" rx="2" fill="rgba(255,255,255,0.3)" />
          <rect x="10" y="76" width="60" height="14" rx="7" fill="rgba(76,97,255,0.18)" stroke="rgba(76,97,255,0.4)" />
          <text x="40" y="86" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#9BB2FF">
            #reels
          </text>
          <rect x="76" y="76" width="74" height="14" rx="7" fill="rgba(76,97,255,0.18)" stroke="rgba(76,97,255,0.4)" />
          <text x="113" y="86" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" fill="#9BB2FF">
            #creator
          </text>
        </g>

        {/* post button */}
        <g transform="translate(0 178)">
          <rect width="170" height="40" rx="20" fill="#014CE3" />
          <text x="85" y="25" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="700" fill="#fff">
            Ready to post →
          </text>
        </g>

        {/* voice match badge */}
        <g transform="translate(0 230)">
          <rect width="170" height="28" rx="14" fill="rgba(76,97,255,0.12)" stroke="rgba(76,97,255,0.4)" />
          <circle cx="14" cy="14" r="4" fill="#4C61FF" />
          <text x="26" y="18" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="#9BB2FF">
            Voice match: 96%
          </text>
        </g>
      </g>
    </Frame>
  );
}

export type StepIllustrationKey = "pick" | "outliers" | "analyse" | "recreate";

export function StepIllustration({
  k,
  className,
}: {
  k: StepIllustrationKey;
  className?: string;
}) {
  switch (k) {
    case "pick":
      return <PickCreatorsStep className={className} />;
    case "outliers":
      return <SurfaceOutliersStep className={className} />;
    case "analyse":
      return <AnalyseWhyStep className={className} />;
    case "recreate":
      return <RecreateInVoiceStep className={className} />;
  }
}
