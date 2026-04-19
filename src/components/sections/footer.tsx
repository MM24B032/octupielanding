import { Wordmark } from "@/components/brand";
import { WaitlistButton } from "@/components/waitlist-button";

const cols = [
  {
    label: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Why Octupie", href: "#why" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "Contact Us", href: "mailto:vishnu@octupie.com?subject=Octupie%20inquiry" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-black/10 bg-white dark:border-white/10 dark:bg-[#020814]">
      <div className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-sm text-sm text-[#0B1430]/60 dark:text-white/60">
              Your personal viral content researcher and scriptwriter.
              Research top creators, recreate outliers in your voice.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.label}>
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#0B1430]/50 dark:text-white/50">
                {c.label}
              </div>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-[#0B1430]/75 transition hover:text-[#0B1430] dark:text-white/75 dark:hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#0B1430]/50 dark:text-white/50">
              Get early access
            </div>
            <div className="mt-4">
              <WaitlistButton />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-black/10 pt-6 md:flex-row md:items-center dark:border-white/10">
          <div className="text-xs text-[#0B1430]/50 dark:text-white/50">
            © {new Date().getFullYear()} Octupie. All rights reserved.
          </div>
          <div className="text-xs text-[#0B1430]/50 dark:text-white/50">octupie.com</div>
        </div>
      </div>
    </footer>
  );
}
