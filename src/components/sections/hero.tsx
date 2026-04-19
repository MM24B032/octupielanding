import { WaitlistForm } from "@/components/waitlist-form";
import { InstagramIcon, LinkedInIcon } from "@/components/social-icons";
import { HeroVisualization } from "@/components/hero-visualization";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-overlay opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] gradient-radial-bottom" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex max-w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-1 rounded-full border border-black/10 bg-black/[0.04] px-3 py-1.5 text-xs text-[#0B1430]/80 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80">
            <span>Built with</span>
            <InstagramIcon className="h-3.5 w-3.5" />
            <span>creators (</span>
            <LinkedInIcon className="h-3.5 w-3.5 opacity-70" />
            <span>coming soon)</span>
          </div>

          <h1 className="mt-6 font-heading text-[clamp(32px,9vw,40px)] leading-[1.08] tracking-tight text-[#0B1430] text-balance break-words sm:text-[52px] md:text-[60px] lg:text-[68px] sm:leading-[1.05] dark:text-white">
            Your personal viral content
            <br className="hidden sm:block" /> researcher &amp; scriptwriter
          </h1>

          <p className="mt-6 max-w-2xl text-base text-[#0B1430]/70 md:text-lg dark:text-white/70">
            The smarter way to research top creators, find viral content, and
            implement it in your voice and style. End to end, not just a
            research tool.
          </p>

          <div className="mt-8 w-full max-w-xl">
            <WaitlistForm ctaLabel="Join the Waitlist" />
            <p className="mt-3 text-xs text-[#0B1430]/50 dark:text-white/50">
              Early access invites go out in waves. No spam, just launch news.
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-[1100px]">
          <div className="card-gradient-border overflow-hidden rounded-2xl border border-white/10 bg-[#040E22]/90 p-3 backdrop-blur-sm dark:bg-[#040E22]/60">
            <div className="relative aspect-[2/1] overflow-hidden rounded-xl">
              <HeroVisualization />
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-x-20 -bottom-20 h-40 bg-[radial-gradient(closest-side,rgba(1,76,227,0.35),transparent)] dark:bg-[radial-gradient(closest-side,rgba(1,76,227,0.45),transparent)]" />
        </div>
      </div>
    </section>
  );
}
