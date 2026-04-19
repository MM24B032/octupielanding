import type { Metadata } from "next";
import { Host_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Octupie | Your viral content researcher & scriptwriter",
  description:
    "The easiest way to research top channels, find viral outliers, and remix them into your own winning videos.",
  metadataBase: new URL("https://octupie.com"),
  openGraph: {
    title: "Octupie | Your viral content researcher & scriptwriter",
    description:
      "Research top channels, find viral outliers, and remix them into winning short form videos.",
    url: "https://octupie.com",
    siteName: "Octupie",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Octupie | Your viral content researcher & scriptwriter",
    description:
      "Research top channels, find viral outliers, and remix them into winning short form videos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hostGrotesk.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
