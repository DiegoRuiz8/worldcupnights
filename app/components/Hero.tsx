"use client";

import { useState } from "react";
import Image from "next/image";

const copy = {
  en: {
    lang: "ES",
    eyebrow: "FIFA World Cup 2026 · Guadalajara",
    headline: "World Cup\nNights",
    subheadline: "The most epic double-decker party bus\nexperience of the tournament.",
    date: "June – July 2026",
    cta: "Get Tickets",
    scroll: "Scroll to explore",
  },
  es: {
    lang: "EN",
    eyebrow: "FIFA World Cup 2026 · Guadalajara",
    headline: "World Cup\nNights",
    subheadline: "La experiencia de fiesta en camión de dos\npisos más épica del torneo.",
    date: "Junio – Julio 2026",
    cta: "Comprar Boletos",
    scroll: "Desliza para explorar",
  },
};

export default function Hero() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const t = copy[lang];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/bus-hero-horizontal.png"
        alt="World Cup Nights party bus"
        fill
        priority
        quality={90}
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/40 to-[#0a0a0a]" />

      {/* Top bar */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 md:px-12">
        <Image
          src="/logo-orange.jpeg"
          alt="World Cup Nights logo"
          width={56}
          height={56}
          className="rounded-full object-cover"
        />

        <button
          onClick={() => setLang(lang === "en" ? "es" : "en")}
          className="text-sm font-medium tracking-widest text-white/70 hover:text-white transition-colors border border-white/20 hover:border-white/50 px-4 py-1.5 rounded-full"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {t.lang}
        </button>
      </nav>

      {/* Hero content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        {/* Eyebrow */}
        <p
          className="mb-4 text-xs md:text-sm tracking-[0.25em] uppercase text-[#FF6B2B]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {t.eyebrow}
        </p>

        {/* Main headline */}
        <h1
          className="text-[clamp(5rem,16vw,14rem)] leading-none tracking-wide text-white whitespace-pre-line"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          {t.headline}
        </h1>

        {/* Divider */}
        <div className="mt-4 mb-6 h-px w-24 bg-[#FF6B2B]" />

        {/* Subheadline */}
        <p
          className="max-w-md text-base md:text-lg text-white/75 leading-relaxed whitespace-pre-line"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {t.subheadline}
        </p>

        {/* Date */}
        <p
          className="mt-3 text-sm tracking-widest uppercase text-white/50"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {t.date}
        </p>

        {/* CTA */}
        <a
          href="#tickets"
          className="mt-10 inline-block bg-[#FF6B2B] hover:bg-[#e85a1f] active:bg-[#cc4f1a] text-white text-sm md:text-base font-semibold tracking-widest uppercase px-10 py-4 transition-colors"
          style={{ fontFamily: "var(--font-dm-sans)", clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
        >
          {t.cta}
        </a>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <p
          className="text-xs tracking-widest uppercase text-white/30"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {t.scroll}
        </p>
        <div className="h-10 w-px bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
