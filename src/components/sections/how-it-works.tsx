"use client";

import { useState } from "react";
import {
  StepIllustration,
  type StepIllustrationKey,
} from "@/components/step-illustrations";

type Step = {
  label: string;
  title: string;
  body: string;
  illustration: StepIllustrationKey;
};

const steps: Step[] = [
  {
    label: "STEP 1",
    title: "Pick the creators you want to learn from",
    body: "Plug in any Instagram handle. Octupie tracks what's working for them in near real-time. LinkedIn support is on the roadmap.",
    illustration: "pick",
  },
  {
    label: "STEP 2",
    title: "Surface their actual outliers",
    body: "We filter out their baseline and show only videos that massively out-performed. The ones worth studying.",
    illustration: "outliers",
  },
  {
    label: "STEP 3",
    title: "Analyse the why: hooks, beats, style",
    body: "Octupie breaks down each outlier: hook pattern, story beats, pacing, format and the angle that made it land.",
    illustration: "analyse",
  },
  {
    label: "STEP 4",
    title: "Recreate in your voice: script, title, caption",
    body: "One click turns insight into a ready-to-shoot script plus matching titles and captions, tuned to your tone and niche.",
    illustration: "recreate",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <section id="how-it-works" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-4xl leading-tight tracking-tight text-white md:text-[56px]">
            How Octupie works
          </h2>
          <p className="mt-4 text-white/70 md:text-lg">
            Research → analysis → script → caption, all in one agentic loop. No
            more jumping between tabs, tools and half-finished docs.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-[380px_1fr]">
          <div className="flex flex-col gap-3">
            {steps.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActive(i)}
                className={[
                  "group relative overflow-hidden rounded-2xl border p-5 text-left transition",
                  active === i
                    ? "border-[#014CE3]/50 bg-[#0a1636]"
                    : "border-white/10 bg-[#040E22] hover:border-white/20",
                ].join(" ")}
              >
                <div
                  className={[
                    "text-[11px] font-medium tracking-[0.18em] transition",
                    active === i ? "text-[#4C61FF]" : "text-white/50",
                  ].join(" ")}
                >
                  {s.label}
                </div>
                <div className="mt-2 font-heading text-[22px] leading-snug tracking-tight text-white">
                  {s.title}
                </div>
                <div className="mt-1.5 text-sm text-white/65">{s.body}</div>
                {active === i && (
                  <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-1/3 bg-[#4C61FF]" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="relative lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#040E22] p-3">
              <div className="card-gradient-border relative aspect-[16/10] overflow-hidden rounded-xl bg-[#040E22]">
                <StepIllustration
                  key={current.illustration}
                  k={current.illustration}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
