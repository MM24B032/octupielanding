import Image from "next/image";
import { assets } from "@/lib/assets";
import { InstagramIcon, LinkedInIcon } from "@/components/social-icons";

type Testimonial = { name: string; avatar: string; quote: string };

const testimonials: Testimonial[] = [
  {
    name: "Husein",
    avatar: assets.avatars.husein,
    quote:
      "Just got the free trial and it's amazing. Saved me days of research and ideation work.",
  },
  {
    name: "Cody",
    avatar: assets.avatars.cody,
    quote:
      "As a neuroscientist, Octupie even works for advanced science and mental health content. V2 is a different beast.",
  },
  {
    name: "James",
    avatar: assets.avatars.james,
    quote:
      "3x views on Instagram in the first two videos I made with it, and it removed so much scripting stress.",
  },
  {
    name: "Grant",
    avatar: assets.avatars.grant,
    quote:
      "Perfect timing for my company. The script nailed every curiosity loop, and I could expand it in one click.",
  },
  {
    name: "Todd",
    avatar: assets.avatars.todd,
    quote:
      "Played with it last night and was totally blown away. Absolute game changer.",
  },
  {
    name: "Michael",
    avatar: assets.avatars.michael,
    quote:
      "Takes my scripting to the next level. My client list has grown tremendously.",
  },
  {
    name: "David",
    avatar: assets.avatars.david,
    quote:
      "Best tool I've seen made with AI to date. Absolute genius.",
  },
  {
    name: "Liz",
    avatar: assets.avatars.liz,
    quote:
      "Octupie is in a league of its own. So thoughtful, even the small details.",
  },
  {
    name: "Zach",
    avatar: assets.avatars.zach,
    quote: "Worth every single penny. Genius tool.",
  },
  {
    name: "@tube-master",
    avatar: assets.avatars.tubeMaster,
    quote: "Thanks for making this, absolute fire.",
  },
  {
    name: "Angie",
    avatar: assets.avatars.angie,
    quote:
      "On the free trial and it's phenomenal. 32 short-form scripts in 2 days with almost no work.",
  },
  {
    name: "Amar",
    avatar: assets.avatars.amar,
    quote: "Been trying it out, amazing work!",
  },
  {
    name: "Paul",
    avatar: assets.avatars.paul,
    quote: "This is awesome. Very cool.",
  },
  {
    name: "Atsatsa",
    avatar: assets.avatars.atsatsa,
    quote: "Amazing, much respect, and thank you.",
  },
  {
    name: "Hatem",
    avatar: assets.avatars.hatem,
    quote: "Just tried it and I love it. Total game changer.",
  },
  {
    name: "Mike",
    avatar: assets.avatars.mike,
    quote: "V2 is on point. Been using it all day.",
  },
  {
    name: "Lewis",
    avatar: assets.avatars.lewis,
    quote: "Please launch ASAP.",
  },
  {
    name: "Scott",
    avatar: assets.avatars.scott,
    quote: "Tested it on a couple ideas, dayum.",
  },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <div className="mx-2 w-[320px] shrink-0 rounded-2xl border border-white/10 bg-[#040E22] p-5">
      <p className="text-sm leading-relaxed text-white/85">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-4 flex items-center gap-3">
        <Image
          src={t.avatar}
          alt={t.name}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full"
          unoptimized
        />
        <div className="text-sm font-medium text-white">{t.name}</div>
      </div>
    </div>
  );
}

export function SocialProof() {
  const row1 = testimonials.slice(0, 9);
  const row2 = testimonials.slice(9);

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 items-center gap-8 text-center md:grid-cols-3 md:text-left">
          <div>
            <div className="font-heading text-5xl text-white md:text-[56px]">
              Top 1%
            </div>
            <div className="mt-2 text-white/70">
              outliers surfaced for every niche you track, not baseline noise.
            </div>
          </div>
          <div>
            <div className="font-heading text-5xl text-white md:text-[56px]">
              Instagram first
            </div>
            <div className="mt-2 text-white/70">
              We are starting with Instagram Reels. LinkedIn is next on the roadmap.
            </div>
          </div>
          <div>
            <div className="font-heading text-5xl text-white md:text-[56px]">
              End-to-end
            </div>
            <div className="mt-2 text-white/70">
              From outlier → script → caption in your voice. No more copy-paste chain.
            </div>
          </div>
        </div>

        <p className="mt-10 flex items-center justify-center gap-2 text-center text-xs font-medium uppercase tracking-[0.22em] text-white/50">
          <span>Built with</span>
          <InstagramIcon className="h-4 w-4" />
          <span>creators in the loop.</span>
          <LinkedInIcon className="h-4 w-4 opacity-80" />
          <span>coming soon.</span>
        </p>
      </div>

      <div className="relative mt-14 space-y-6 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#020814] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#020814] to-transparent" />

        <Marquee items={row1} reverse={false} />
        <Marquee items={row2} reverse />
      </div>
    </section>
  );
}

function Marquee({
  items,
  reverse,
}: {
  items: Testimonial[];
  reverse: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative flex overflow-hidden">
      <div
        className="gpu-layer flex shrink-0 animate-[marquee_60s_linear_infinite] gap-0"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((t, i) => (
          <Card key={i} t={t} />
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
