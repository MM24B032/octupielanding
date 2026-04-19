// Inline brand SVGs for Instagram and LinkedIn.
// Uses React.useId() so gradients stay unique per instance.
import { useId } from "react";

type Props = { className?: string; title?: string };

export function InstagramIcon({ className = "h-4 w-4", title = "Instagram" }: Props) {
  const gid = useId();
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={title}
      role="img"
      className={className}
    >
      <defs>
        <linearGradient id={`ig-${gid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="50%" stopColor="#DD2A7B" />
          <stop offset="100%" stopColor="#8134AF" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill={`url(#ig-${gid})`} />
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="4"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="17" cy="7" r="1" fill="#fff" />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-4 w-4", title = "LinkedIn" }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={title}
      role="img"
      className={className}
    >
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        d="M7.5 10v7H5v-7h2.5zM6.25 6.5a1.45 1.45 0 1 1 0 2.9 1.45 1.45 0 0 1 0-2.9zM10 10h2.4v1c.35-.6 1.25-1.2 2.55-1.2 2.7 0 3.05 1.7 3.05 4V17h-2.5v-2.8c0-.7 0-1.6-1-1.6s-1.1.8-1.1 1.5V17H10z"
        fill="#fff"
      />
    </svg>
  );
}
