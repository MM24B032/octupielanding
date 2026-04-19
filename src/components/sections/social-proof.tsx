import { InstagramIcon, LinkedInIcon } from "@/components/social-icons";
import { NicheIcon, type NicheIconKind } from "@/components/niche-icons";

// Pre-launch social proof. We intentionally do NOT use testimonial quotes
// or avatars here because the product has not shipped yet and fabricated
// endorsements would mislead visitors. Instead, we surface the creator
// niches Octupie is being built for.
type Niche = { icon: NicheIconKind; label: string; blurb: string };

const niches: Niche[] = [
  {
    icon: "fitness",
    label: "Fitness & training",
    blurb: "Outlier routines and form breakdowns, scripted in your voice.",
  },
  {
    icon: "finance",
    label: "Finance & investing",
    blurb: "Viral hooks for markets, money, and side hustle content.",
  },
  {
    icon: "skincare",
    label: "Skincare & beauty",
    blurb: "Routine reveals and product breakdowns that convert.",
  },
  {
    icon: "selfImprovement",
    label: "Self improvement",
    blurb: "Deep work, habits, and discipline scripts built for retention.",
  },
  {
    icon: "food",
    label: "Food & recipes",
    blurb: "Viral recipe formats remixed into your kitchen and tone.",
  },
  {
    icon: "gaming",
    label: "Gaming & tech",
    blurb: "Reaction and explainer scripts around the latest drops.",
  },
  {
    icon: "coach",
    label: "Business coaches",
    blurb: "Client magnet hooks and case study breakdowns on demand.",
  },
  {
    icon: "travel",
    label: "Travel creators",
    blurb: "City guides and budget breakdowns written how you post.",
  },
  {
    icon: "design",
    label: "Design & creative",
    blurb: "Process reels and portfolio scripts from viral patterns.",
  },
  {
    icon: "saas",
    label: "SaaS & founders",
    blurb: "Build in public scripts and product teardown breakdowns.",
  },
  {
    icon: "education",
    label: "Education & learning",
    blurb: "Class style explainers that keep viewers hooked for 60s.",
  },
  {
    icon: "music",
    label: "Music & audio",
    blurb: "Sample scripts, gear explainers, and reaction formats.",
  },
  {
    icon: "realEstate",
    label: "Real estate",
    blurb: "Listing tours and market takes engineered for Reels virality.",
  },
  {
    icon: "parenting",
    label: "Parenting & lifestyle",
    blurb: "Relatable POV scripts that travel across your audience.",
  },
  {
    icon: "health",
    label: "Health & wellness",
    blurb: "Evidence first scripts written in your clinician voice.",
  },
  {
    icon: "chef",
    label: "Chefs & restaurants",
    blurb: "Signature dish reveal scripts engineered for saves.",
  },
  {
    icon: "podcast",
    label: "Podcasts & talk",
    blurb: "Clippable hooks and retention edits for every episode.",
  },
  {
    icon: "personalBrand",
    label: "Personal brand",
    blurb: "Thought leader scripts that sound like you, not a bot.",
  },
];

function Card({ n }: { n: Niche }) {
  return (
    <div className="mx-2 w-[300px] shrink-0 rounded-2xl border border-black/10 bg-white p-5 shadow-[0_1px_2px_rgba(11,20,48,0.04)] dark:border-white/10 dark:bg-[#040E22] dark:shadow-none">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-gradient-to-br from-[#F0F4FF] to-[#FFFFFF] text-[#014CE3] dark:border-white/10 dark:from-[#0a1636] dark:to-[#040E22] dark:text-[#9BB2FF]">
          <NicheIcon kind={n.icon} className="h-5 w-5" />
        </div>
        <div className="text-sm font-medium text-[#0B1430] dark:text-white">{n.label}</div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#0B1430]/70 dark:text-white/70">{n.blurb}</p>
    </div>
  );
}

export function SocialProof() {
  const row1 = niches.slice(0, 9);
  const row2 = niches.slice(9);

  return (
    <section className="relative overflow-x-clip py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 items-center gap-8 text-center md:grid-cols-3 md:text-left">
          <div>
            <div className="font-heading text-5xl text-[#0B1430] md:text-[56px] dark:text-white">
              Top 1%
            </div>
            <div className="mt-2 text-[#0B1430]/70 dark:text-white/70">
              outliers surfaced for every niche you track, not baseline noise.
            </div>
          </div>
          <div>
            <div className="font-heading text-5xl text-[#0B1430] md:text-[56px] dark:text-white">
              Instagram first
            </div>
            <div className="mt-2 text-[#0B1430]/70 dark:text-white/70">
              We are starting with Instagram Reels. LinkedIn is next on the roadmap.
            </div>
          </div>
          <div>
            <div className="font-heading text-5xl text-[#0B1430] md:text-[56px] dark:text-white">
              End to end
            </div>
            <div className="mt-2 text-[#0B1430]/70 dark:text-white/70">
              From outlier to script to caption in your voice. No more copy paste chain.
            </div>
          </div>
        </div>

        <div className="mt-14 text-center">
          <h2 className="font-heading text-3xl leading-tight tracking-tight text-[#0B1430] md:text-[44px] dark:text-white">
            Built for short form creators across every niche
          </h2>
        </div>

        <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-xs font-medium uppercase tracking-[0.22em] text-[#0B1430]/50 dark:text-white/50">
          <InstagramIcon className="h-4 w-4" />
          <span>Reels live at launch.</span>
          <LinkedInIcon className="h-4 w-4 opacity-80" />
          <span>creators onboard next.</span>
        </p>
      </div>

      <div className="relative mt-12 space-y-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent dark:from-[#020814]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent dark:from-[#020814]" />

        <Marquee items={row1} reverse={false} />
        <Marquee items={row2} reverse />
      </div>
    </section>
  );
}

function Marquee({ items, reverse }: { items: Niche[]; reverse: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden">
      <div
        className="gpu-layer flex shrink-0 animate-[marquee_60s_linear_infinite] gap-0"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((n, i) => (
          <Card key={i} n={n} />
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
