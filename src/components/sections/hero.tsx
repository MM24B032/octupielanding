import Image from "next/image";
import { assets } from "@/lib/assets";
import { WaitlistForm } from "@/components/waitlist-form";
import { InstagramIcon, LinkedInIcon } from "@/components/social-icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-overlay opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] gradient-radial-bottom" />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
            <span className="flex -space-x-2">
              <Image
                src={assets.avatars.a1}
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] rounded-full ring-1 ring-[#040E22]"
                unoptimized
              />
              <Image
                src={assets.avatars.a2}
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] rounded-full ring-1 ring-[#040E22]"
                unoptimized
              />
              <Image
                src={assets.avatars.a3}
                alt=""
                width={18}
                height={18}
                className="h-[18px] w-[18px] rounded-full ring-1 ring-[#040E22]"
                unoptimized
              />
            </span>
            <span className="inline-flex items-center gap-1.5">
              Built with
              <InstagramIcon className="h-3.5 w-3.5" />
              creators (
              <LinkedInIcon className="h-3.5 w-3.5 opacity-70" />
              coming soon)
            </span>
          </div>

          <h1 className="mt-6 font-heading text-[40px] leading-[1.05] tracking-tight text-white sm:text-[52px] md:text-[68px]">
            Your personal viral-content
            <br className="hidden sm:block" /> researcher &amp; script-writing
            <br className="hidden sm:block" /> agentic workflow
          </h1>

          <p className="mt-6 max-w-2xl text-base text-white/70 md:text-lg">
            The smarter way to research top creators, find viral content, and
            implement it in your voice and style. End-to-end, not just a
            research tool.
          </p>

          <div className="mt-8 w-full max-w-xl">
            <WaitlistForm ctaLabel="Join the Waitlist" />
            <p className="mt-3 text-xs text-white/50">
              Early access invites go out in waves. No spam, just launch news.
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-[1080px]">
          <div className="card-gradient-border overflow-hidden rounded-2xl border border-white/10 bg-[#040E22]/60 backdrop-blur-sm">
            <Image
              src={assets.featureImages.winningScripts}
              alt="Octupie product dashboard"
              width={2000}
              height={1200}
              className="h-auto w-full"
              priority
              unoptimized
            />
          </div>
          <div className="pointer-events-none absolute -inset-x-20 -bottom-20 h-40 bg-[radial-gradient(closest-side,rgba(1,76,227,0.45),transparent)]" />
        </div>
      </div>
    </section>
  );
}
