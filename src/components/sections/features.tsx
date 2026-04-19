import {
  FeatureIllustration,
  type FeatureIllustrationKey,
} from "@/components/feature-illustrations";

type Feature = {
  title: string;
  body: string;
  illustration: FeatureIllustrationKey;
  wide?: boolean;
};

const features: Feature[] = [
  {
    title: "Track the creators you want to beat",
    body: "Follow any Instagram, TikTok or YouTube creator and get a live feed of what's actually working for them. No manual scrolling, no spreadsheets.",
    illustration: "track",
    wide: true,
  },
  {
    title: "Copy, analyse and recreate outlier scripts, in your voice",
    body: "Octupie doesn't hand you someone else's words. It dissects why a script went viral, then rewrites it in your tone, pacing and vocabulary.",
    illustration: "voice",
  },
  {
    title: "Recreate hooks that are already working",
    body: "Hook templates pulled from your niche's top 1% outliers, rewritten for your topic so you never start a video from a blank page.",
    illustration: "hooks",
  },
  {
    title: "Daily script & content ideas",
    body: "Wake up to a fresh shortlist of video angles sourced from real outlier performance in your niche, not generic AI prompts.",
    illustration: "daily",
  },
  {
    title: "Ready-to-post titles & captions",
    body: "Every script ships with title, caption and hashtag variants tuned to each platform. Paste and post.",
    illustration: "titles",
  },
  {
    title: "An agentic workflow, not just a research tool",
    body: "From research to analysis to script to caption, Octupie runs the loop end-to-end so you spend time filming, not digging through dashboards.",
    illustration: "agentic",
    wide: true,
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#4C61FF]">
            What you actually get
          </p>
          <h2 className="mt-3 font-heading text-4xl leading-tight tracking-tight text-white md:text-[56px]">
            Everything a viral short-form
            <br className="hidden md:block" /> workflow actually needs
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {features.map((f, i) => (
            <article
              key={i}
              className={[
                "card-gradient-border group relative overflow-hidden rounded-2xl border border-white/10 bg-[#040E22] p-6 transition hover:bg-[#081433]",
                f.wide ? "md:col-span-2" : "",
              ].join(" ")}
            >
              <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-[#0a152c] to-[#040E22]">
                <FeatureIllustration
                  k={f.illustration}
                  className="transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <h3 className="font-heading text-xl leading-snug tracking-tight text-white md:text-[22px]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
