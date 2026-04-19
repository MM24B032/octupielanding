// Inline SVG illustrations for the "What you actually get" feature cards.
// All SVGs use viewBox for scale, Octupie palette, and small built-in
// animations (CSS @keyframes scoped inline) so cards feel alive without
// external assets.

type Props = { className?: string };

const defs = (
  <>
    <defs>
      <linearGradient id="oct-card-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0a152c" />
        <stop offset="100%" stopColor="#040E22" />
      </linearGradient>
      <linearGradient id="oct-accent" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4C61FF" />
        <stop offset="100%" stopColor="#014CE3" />
      </linearGradient>
      <linearGradient id="oct-chip" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#15223C" />
        <stop offset="100%" stopColor="#0a1530" />
      </linearGradient>
    </defs>
  </>
);

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 250"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {defs}
      <rect width="400" height="250" fill="url(#oct-card-bg)" />
      {/* subtle grid */}
      <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="250" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
        ))}
      </g>
      {children}
    </svg>
  );
}

// 1. Track the creators you want to beat
// Three creator chips feeding into a unified "Octupie feed".
// Wide 640-viewBox version so it fills wide cards without letterboxing.
export function TrackCreatorsIllustration({ className }: Props) {
  return (
    <svg
      viewBox="0 0 640 250"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-full w-full ${className ?? ""}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="track-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a152c" />
          <stop offset="100%" stopColor="#040E22" />
        </linearGradient>
        <linearGradient id="track-chip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15223C" />
          <stop offset="100%" stopColor="#0a1530" />
        </linearGradient>
        <linearGradient id="track-ig" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="50%" stopColor="#DD2A7B" />
          <stop offset="100%" stopColor="#8134AF" />
        </linearGradient>
      </defs>
      <rect width="640" height="250" fill="url(#track-bg)" />
      <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="250" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="640" y2={i * 50} />
        ))}
      </g>

      <style>{`
        @keyframes oct-pulse-a { 0%,100%{opacity:.55} 50%{opacity:1} }
        @keyframes oct-pulse-b { 0%,100%{opacity:.75} 50%{opacity:1} }
        .oct-row-1 { animation: oct-pulse-a 3.2s ease-in-out infinite; }
        .oct-row-2 { animation: oct-pulse-b 3.2s ease-in-out infinite 0.4s; }
        .oct-row-3 { animation: oct-pulse-a 3.2s ease-in-out infinite 0.8s; }
      `}</style>
      {/* platform chips (IG live, LinkedIn soon) */}
      {[
        { x: 60, y: 30, type: "ig" as const, live: true },
        { x: 60, y: 100, type: "ig" as const, live: true },
        { x: 60, y: 170, type: "li" as const, live: false },
      ].map((c, i) => (
        <g key={i} className={`oct-row-${i + 1}`}>
          <rect
            x={c.x}
            y={c.y}
            width="160"
            height="50"
            rx="10"
            fill="url(#track-chip)"
            stroke="rgba(255,255,255,0.08)"
            opacity={c.live ? 1 : 0.6}
          />
          <g transform={`translate(${c.x + 13} ${c.y + 13})`} opacity={c.live ? 1 : 0.55}>
            {c.type === "ig" ? (
              <g>
                <rect width="24" height="24" rx="6" fill="url(#track-ig)" />
                <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
                <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.8" />
                <circle cx="17" cy="7" r="1" fill="#fff" />
              </g>
            ) : (
              <g>
                <rect width="24" height="24" rx="4" fill="#0A66C2" />
                <path
                  d="M7.5 10v7H5v-7h2.5zM6.25 6.5a1.45 1.45 0 1 1 0 2.9 1.45 1.45 0 0 1 0-2.9zM10 10h2.4v1c.35-.6 1.25-1.2 2.55-1.2 2.7 0 3.05 1.7 3.05 4V17h-2.5v-2.8c0-.7 0-1.6-1-1.6s-1.1.8-1.1 1.5V17H10z"
                  fill="#fff"
                />
              </g>
            )}
          </g>
          <rect x={c.x + 48} y={c.y + 14} width="96" height="5" rx="2.5" fill="rgba(255,255,255,0.5)" />
          <rect x={c.x + 48} y={c.y + 24} width="70" height="4" rx="2" fill="rgba(255,255,255,0.22)" />
          {!c.live && (
            <g>
              <rect x={c.x + 48} y={c.y + 32} width="66" height="12" rx="6" fill="rgba(76,97,255,0.18)" stroke="rgba(76,97,255,0.4)" />
              <text x={c.x + 81} y={c.y + 41} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" fontWeight="700" fill="#9BB2FF">
                COMING SOON
              </text>
            </g>
          )}
        </g>
      ))}

      {/* connecting curves */}
      <g fill="none" stroke="#4C61FF" strokeWidth="1.6" opacity="0.7">
        <path d="M220 55 C 320 55, 360 125, 420 125" />
        <path d="M220 125 L 420 125" />
        <path d="M220 195 C 320 195, 360 125, 420 125" strokeDasharray="3 4" opacity="0.4" />
      </g>

      {/* Octupie feed panel (shifted right) */}
      <g>
        <rect
          x="420"
          y="30"
          width="180"
          height="190"
          rx="14"
          fill="url(#track-chip)"
          stroke="rgba(76,97,255,0.35)"
        />
        <rect x="436" y="44" width="90" height="8" rx="3" fill="rgba(255,255,255,0.6)" />
        <rect x="436" y="58" width="56" height="6" rx="2.5" fill="rgba(255,255,255,0.28)" />

        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(436 ${82 + i * 32})`}>
            <rect width="150" height="24" rx="6" fill="rgba(255,255,255,0.05)" />
            <circle cx="14" cy="12" r="6" fill="#4C61FF" />
            <rect x="26" y="7" width="90" height="4" rx="2" fill="rgba(255,255,255,0.65)" />
            <rect x="26" y="15" width="58" height="3" rx="1.5" fill="rgba(255,255,255,0.32)" />
          </g>
        ))}

        <rect x="436" y="212" width="150" height="4" rx="2" fill="#014CE3" opacity="0.7" />
      </g>
    </svg>
  );
}

// 2. Copy, analyse and recreate outlier scripts, in your voice
// Script lines being rewritten in your tone (left = generic, right = your voice)
export function VoiceRewriteIllustration({ className }: Props) {
  return (
    <Card className={className}>
      <style>{`
        @keyframes oct-type { 0%{width:0} 100%{width:100%} }
        .oct-line-your { animation: oct-type 3.2s steps(40,end) infinite alternate; }
      `}</style>

      {/* Left panel: generic script */}
      <g>
        <rect x="24" y="30" width="160" height="190" rx="14" fill="url(#oct-chip)" stroke="rgba(255,255,255,0.08)" />
        <rect x="36" y="44" width="60" height="6" rx="3" fill="rgba(255,255,255,0.35)" />
        <rect x="36" y="56" width="40" height="4" rx="2" fill="rgba(255,255,255,0.18)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x="36"
            y={80 + i * 18}
            width={130 - (i % 2) * 18}
            height="6"
            rx="2"
            fill="rgba(255,255,255,0.15)"
          />
        ))}
        <text x="36" y="206" fontFamily="Inter, sans-serif" fontSize="10" fill="rgba(255,255,255,0.45)">
          Generic template
        </text>
      </g>

      {/* middle arrow */}
      <g>
        <path
          d="M195 125 L 215 125"
          stroke="url(#oct-accent)"
          strokeWidth="2"
          fill="none"
        />
        <polygon points="215,120 223,125 215,130" fill="#4C61FF" />
      </g>

      {/* Right panel: your voice */}
      <g>
        <rect x="230" y="30" width="150" height="190" rx="14" fill="#0a1636" stroke="rgba(76,97,255,0.45)" />
        <rect x="242" y="44" width="80" height="6" rx="3" fill="#9BB2FF" />
        <rect x="242" y="56" width="54" height="4" rx="2" fill="rgba(155,178,255,0.5)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect
              x="242"
              y={80 + i * 18}
              width={120 - (i % 2) * 22}
              height="6"
              rx="2"
              fill="rgba(155,178,255,0.35)"
            />
            {i === 2 && (
              <rect
                className="oct-line-your"
                x="242"
                y={80 + i * 18}
                width="120"
                height="6"
                rx="2"
                fill="#4C61FF"
              />
            )}
          </g>
        ))}
        <text x="242" y="206" fontFamily="Inter, sans-serif" fontSize="10" fill="#9BB2FF">
          In your voice
        </text>
      </g>
    </Card>
  );
}

// 3. Recreate hooks that are already working
// Stack of hook cards with the top one being "rebuilt" for you.
export function HooksIllustration({ className }: Props) {
  return (
    <Card className={className}>
      <style>{`
        @keyframes oct-shine { 0%{transform:translateX(-40%)} 100%{transform:translateX(140%)} }
        .oct-shine { animation: oct-shine 3.5s ease-in-out infinite; }
      `}</style>
      <g transform="translate(70 40)">
        {/* stacked cards behind */}
        <rect x="14" y="16" width="240" height="120" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" />
        <rect x="7" y="8" width="240" height="120" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" />

        {/* top hook card */}
        <g>
          <rect
            width="240"
            height="120"
            rx="14"
            fill="#0a1636"
            stroke="rgba(76,97,255,0.55)"
          />
          <rect x="16" y="18" width="58" height="18" rx="9" fill="rgba(76,97,255,0.25)" />
          <text x="45" y="31" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="600" fill="#9BB2FF">
            HOOK
          </text>
          <rect x="16" y="48" width="200" height="8" rx="3" fill="rgba(255,255,255,0.7)" />
          <rect x="16" y="62" width="170" height="8" rx="3" fill="rgba(255,255,255,0.55)" />
          <rect x="16" y="82" width="100" height="5" rx="2" fill="rgba(255,255,255,0.25)" />

          {/* shimmer */}
          <g clipPath="url(#hookClip)">
            <rect
              className="oct-shine"
              x="0"
              y="0"
              width="80"
              height="120"
              fill="url(#oct-accent)"
              opacity="0.25"
            />
          </g>
          <clipPath id="hookClip">
            <rect width="240" height="120" rx="14" />
          </clipPath>
        </g>
      </g>

      {/* metrics below */}
      <g transform="translate(70 180)">
        {[
          { label: "Retention", val: "92%" },
          { label: "Saves", val: "4.1k" },
          { label: "Shares", val: "2.8k" },
        ].map((m, i) => (
          <g key={i} transform={`translate(${i * 85} 0)`}>
            <rect width="76" height="40" rx="10" fill="url(#oct-chip)" stroke="rgba(255,255,255,0.06)" />
            <text x="12" y="16" fontFamily="Inter, sans-serif" fontSize="9" fill="rgba(255,255,255,0.55)">
              {m.label}
            </text>
            <text x="12" y="32" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700" fill="#fff">
              {m.val}
            </text>
          </g>
        ))}
      </g>
    </Card>
  );
}

// 4. Daily script & content ideas
// Calendar with highlighted day + floating idea chips.
export function DailyIdeasIllustration({ className }: Props) {
  return (
    <Card className={className}>
      <style>{`
        @keyframes oct-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .oct-float-1 { animation: oct-float 3s ease-in-out infinite; }
        .oct-float-2 { animation: oct-float 3s ease-in-out infinite 0.5s; }
        .oct-float-3 { animation: oct-float 3s ease-in-out infinite 1s; }
      `}</style>

      {/* Calendar */}
      <g transform="translate(30 35)">
        <rect width="170" height="180" rx="14" fill="url(#oct-chip)" stroke="rgba(255,255,255,0.08)" />
        <rect width="170" height="36" rx="14" fill="rgba(76,97,255,0.2)" />
        <text x="16" y="23" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#fff">
          Today
        </text>
        <text x="154" y="23" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="10" fill="rgba(255,255,255,0.6)">
          Apr
        </text>
        {Array.from({ length: 21 }).map((_, i) => {
          const col = i % 7;
          const row = Math.floor(i / 7);
          const active = i === 10;
          return (
            <g key={i} transform={`translate(${14 + col * 21} ${52 + row * 30})`}>
              <rect
                width="18"
                height="22"
                rx="4"
                fill={active ? "#4C61FF" : "rgba(255,255,255,0.05)"}
              />
              <text
                x="9"
                y="15"
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontSize="9"
                fontWeight={active ? 700 : 500}
                fill={active ? "#fff" : "rgba(255,255,255,0.55)"}
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </g>

      {/* Idea chips */}
      <g transform="translate(220 40)">
        {[
          { y: 0, label: "Hook: reverse headline", cls: "oct-float-1" },
          { y: 44, label: "Angle: 3 myths about…", cls: "oct-float-2" },
          { y: 88, label: "Format: POV reaction", cls: "oct-float-3" },
          { y: 132, label: "Story beat: loop x3", cls: "oct-float-1" },
        ].map((c, i) => (
          // outer <g> positions, inner <g> runs the float animation so CSS
          // transform keyframes do not overwrite the SVG attr transform.
          <g key={i} transform={`translate(0 ${c.y})`}>
            <g className={c.cls}>
              <rect
                width="150"
                height="34"
                rx="10"
                fill="#0a1636"
                stroke="rgba(76,97,255,0.35)"
              />
              <circle cx="14" cy="17" r="4" fill="#4C61FF" />
              <text x="26" y="21" fontFamily="Inter, sans-serif" fontSize="10" fill="rgba(255,255,255,0.85)">
                {c.label}
              </text>
            </g>
          </g>
        ))}
      </g>
    </Card>
  );
}

// 5. Ready-to-post titles & captions
// UI mockup: title field, caption box, hashtag chips, platform toggles.
export function TitlesCaptionsIllustration({ className }: Props) {
  return (
    <Card className={className}>
      <g transform="translate(40 30)">
        <rect width="320" height="190" rx="14" fill="url(#oct-chip)" stroke="rgba(255,255,255,0.08)" />

        {/* platform toggles */}
        <g transform="translate(14 14)">
          {[
            { label: "Reels", live: true },
            { label: "LinkedIn", live: false },
          ].map((p, i) => (
            <g key={p.label} transform={`translate(${i * 92} 0)`}>
              <rect
                width={p.live ? 66 : 84}
                height="24"
                rx="12"
                fill={p.live ? "#014CE3" : "rgba(255,255,255,0.05)"}
                stroke={p.live ? "none" : "rgba(255,255,255,0.1)"}
              />
              <text
                x={p.live ? 33 : 26}
                y="16"
                textAnchor={p.live ? "middle" : "start"}
                fontFamily="Inter, sans-serif"
                fontSize="10"
                fontWeight="600"
                fill={p.live ? "#fff" : "rgba(255,255,255,0.65)"}
              >
                {p.label}
              </text>
              {!p.live && (
                <text x="78" y="16" textAnchor="end" fontFamily="Inter, sans-serif" fontSize="7" fontWeight="700" fill="#9BB2FF">
                  SOON
                </text>
              )}
            </g>
          ))}
        </g>

        {/* title */}
        <g transform="translate(14 52)">
          <text fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="rgba(155,178,255,0.9)">
            TITLE
          </text>
          <rect y="6" width="292" height="28" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
          <rect y="14" x="10" width="220" height="10" rx="3" fill="rgba(255,255,255,0.75)" />
        </g>

        {/* caption */}
        <g transform="translate(14 96)">
          <text fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="rgba(155,178,255,0.9)">
            CAPTION
          </text>
          <rect y="6" width="292" height="44" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
          <rect y="16" x="10" width="270" height="6" rx="2" fill="rgba(255,255,255,0.5)" />
          <rect y="28" x="10" width="220" height="6" rx="2" fill="rgba(255,255,255,0.4)" />
          <rect y="40" x="10" width="160" height="6" rx="2" fill="rgba(255,255,255,0.3)" />
        </g>

        {/* hashtags */}
        <g transform="translate(14 156)">
          {["#shortsviral", "#outlier", "#creator", "#reels"].map((h, i) => (
            <g key={h} transform={`translate(${i * 72} 0)`}>
              <rect width="64" height="20" rx="10" fill="rgba(76,97,255,0.2)" stroke="rgba(76,97,255,0.4)" />
              <text x="32" y="14" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="600" fill="#9BB2FF">
                {h}
              </text>
            </g>
          ))}
        </g>
      </g>
    </Card>
  );
}

// 6. Agentic workflow, end-to-end
// A pipeline of connected nodes: Research > Analyse > Script > Caption.
// Uses its own wider Card (600x250) so the flow stretches across wide cards.
export function AgenticFlowIllustration({ className }: Props) {
  const nodes = [
    { x: 30, y: 100, label: "Research" },
    { x: 200, y: 50, label: "Analyse" },
    { x: 360, y: 140, label: "Script" },
    { x: 510, y: 70, label: "Caption" },
  ];
  return (
    <svg
      viewBox="0 0 640 250"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-full w-full ${className ?? ""}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="agentic-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a152c" />
          <stop offset="100%" stopColor="#040E22" />
        </linearGradient>
        <linearGradient id="agentic-chip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15223C" />
          <stop offset="100%" stopColor="#0a1530" />
        </linearGradient>
      </defs>
      <rect width="640" height="250" fill="url(#agentic-bg)" />
      <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="250" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="640" y2={i * 50} />
        ))}
      </g>

      <style>{`
        @keyframes oct-dash { to { stroke-dashoffset: -40 } }
        .oct-path { stroke-dasharray: 4 6; animation: oct-dash 2.5s linear infinite; }
      `}</style>

      {/* connecting path between node centers */}
      <path
        d={`M ${nodes[0].x + 50} ${nodes[0].y + 20}
            Q ${(nodes[0].x + nodes[1].x) / 2 + 50} 40 ${nodes[1].x + 50} ${nodes[1].y + 20}
            Q ${(nodes[1].x + nodes[2].x) / 2 + 50} 170 ${nodes[2].x + 50} ${nodes[2].y + 20}
            Q ${(nodes[2].x + nodes[3].x) / 2 + 50} 70 ${nodes[3].x + 50} ${nodes[3].y + 20}`}
        fill="none"
        stroke="#4C61FF"
        strokeWidth="2"
        className="oct-path"
      />

      {nodes.map((n, i) => (
        <g key={n.label} transform={`translate(${n.x} ${n.y})`}>
          <rect
            width="110"
            height="60"
            rx="14"
            fill={i === 0 || i === 3 ? "#0a1636" : "url(#agentic-chip)"}
            stroke={i === 0 || i === 3 ? "rgba(76,97,255,0.55)" : "rgba(255,255,255,0.08)"}
          />
          <circle cx="22" cy="30" r="13" fill="rgba(76,97,255,0.25)" />
          <text x="22" y="34" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fill="#9BB2FF" fontWeight="700">
            {String(i + 1)}
          </text>
          <text x="44" y="26" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600" fill="#fff">
            {n.label}
          </text>
          <rect x="44" y="34" width="50" height="4" rx="2" fill="rgba(255,255,255,0.3)" />
          <rect x="44" y="44" width="34" height="4" rx="2" fill="rgba(255,255,255,0.18)" />
        </g>
      ))}
    </svg>
  );
}

export type FeatureIllustrationKey =
  | "track"
  | "voice"
  | "hooks"
  | "daily"
  | "titles"
  | "agentic";

export function FeatureIllustration({
  k,
  className,
}: {
  k: FeatureIllustrationKey;
  className?: string;
}) {
  switch (k) {
    case "track":
      return <TrackCreatorsIllustration className={className} />;
    case "voice":
      return <VoiceRewriteIllustration className={className} />;
    case "hooks":
      return <HooksIllustration className={className} />;
    case "daily":
      return <DailyIdeasIllustration className={className} />;
    case "titles":
      return <TitlesCaptionsIllustration className={className} />;
    case "agentic":
      return <AgenticFlowIllustration className={className} />;
  }
}
