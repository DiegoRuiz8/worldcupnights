"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Copy
// ---------------------------------------------------------------------------

const copy = {
  en: {
    navExp: "The Experience",
    navTix: "Tickets",
    navFaq: "FAQ",
    navBook: "Book Now",
    eyebrow: "Guadalajara · FIFA World Cup 2026",
    heroTitle1: "THE NIGHT",
    heroTitle2: "IS",
    heroHighlight: "YOURS",
    heroSub:
      "A double-decker party bus rolling through Guadalajara's best streets — with curated music, open bar, local hosts, and a crowd from around the world.",
    heroCta1: "Book Your Spot",
    heroCta2: "See What's Included",
    heroBadge: "⚽ Running every match night during the World Cup",
    s1Label: "The Experience",
    s1Title: "NOT JUST A BUS. A MOVING PARTY.",
    p1Title: "Controlled Vibe",
    p1Body: "We curate everything — music, lights, energy. No bad nights.",
    p2Title: "Premium Tequila",
    p2Body: "Open bar option with real Mexican spirits. Not well drinks.",
    p3Title: "Global Crowd",
    p3Body: "Fans from 32+ nations in one electric space. Football energy.",
    p4Title: "Local Hosts",
    p4Body: "Guadalajara locals who know the city and keep the night alive.",
    s2Label: "Tickets",
    s2Title: "PICK YOUR NIGHT",
    t1Name: "ENTRY",
    t1Price: "$35",
    t1PriceSub: "USD / ~$700 MXN",
    t1F1: "Bus access all night",
    t1F2: "Curated DJ set",
    t1F3: "Local host crew",
    t1F4: "Drinks available for purchase",
    t1Btn: "Reserve Entry Ticket",
    t2Badge: "Most Popular",
    t2Name: "OPEN BAR",
    t2Price: "$55",
    t2PriceSub: "USD / ~$1,100 MXN",
    t2F1: "Everything in Entry",
    t2F2: "Unlimited premium tequila",
    t2F3: "Beer & cocktails included",
    t2F4: "Priority boarding",
    t2Btn: "Reserve Open Bar",
    s3Label: "The Route",
    s3Title: "GUADALAJARA AT NIGHT",
    r1Name: "Zona Rosa / Fan Zone",
    r1Desc: "Departure point · 9:00 PM — Board up, meet the crew",
    r2Name: "Centro Histórico",
    r2Desc: "Guadalajara's heart — colonial architecture, live vibe",
    r3Name: "Chapultepec",
    r3Desc: "The nightlife corridor — see the city from above",
    r4Name: "Final Stop · TBD",
    r4Desc: "We drop you off at the hottest spot of the night",
    s4Label: "FAQ",
    s4Title: "NEED TO KNOW",
    fq1: "When does it run?",
    fa1: "Every night the World Cup is active in Guadalajara. Exact dates TBD — sign up to get notified.",
    fq2: "Where do we meet?",
    fa2: "Boarding point confirmed at time of booking. Typically near the main fan zone.",
    fq3: "Is it safe?",
    fa3: "Yes. Our crew is local, experienced, and there with you the entire night. You're in good hands.",
    fq4: "Minimum age?",
    fa4: "18+ with valid ID. This is a nightlife experience — no exceptions.",
    footerInstagram: "Instagram",
    footerWhatsApp: "WhatsApp",
    footerContact: "Contact",
    footerCopy: "© 2026 World Cup Nights · Guadalajara, México",
  },
  es: {
    navExp: "La Experiencia",
    navTix: "Boletos",
    navFaq: "Preguntas",
    navBook: "Reservar",
    eyebrow: "Guadalajara · Copa Mundial FIFA 2026",
    heroTitle1: "LA NOCHE",
    heroTitle2: "ES",
    heroHighlight: "TUYA",
    heroSub:
      "Un camión de dos pisos recorriendo las mejores calles de Guadalajara — con música curada, barra libre, hosts locales y gente de todo el mundo.",
    heroCta1: "Reserva tu lugar",
    heroCta2: "¿Qué incluye?",
    heroBadge: "⚽ Cada noche de partido durante el Mundial",
    s1Label: "La Experiencia",
    s1Title: "NO ES UN CAMIÓN. ES UNA FIESTA QUE SE MUEVE.",
    p1Title: "Ambiente curado",
    p1Body: "Nosotros controlamos todo — música, luz, energía. Sin noches malas.",
    p2Title: "Tequila premium",
    p2Body: "Barra libre con auténticos destilados mexicanos. No es cualquier cosa.",
    p3Title: "Crowd global",
    p3Body: "Fanáticos de más de 32 naciones en un solo espacio. Energía mundialera.",
    p4Title: "Hosts locales",
    p4Body: "Tapatíos que conocen la ciudad y le dan vida a la noche.",
    s2Label: "Boletos",
    s2Title: "ELIGE TU NOCHE",
    t1Name: "ENTRADA",
    t1Price: "$700",
    t1PriceSub: "MXN / ~$35 USD",
    t1F1: "Acceso al camión toda la noche",
    t1F2: "DJ set curado",
    t1F3: "Crew de hosts locales",
    t1F4: "Bebidas disponibles para comprar",
    t1Btn: "Reservar Entrada",
    t2Badge: "Más popular",
    t2Name: "BARRA LIBRE",
    t2Price: "$1,100",
    t2PriceSub: "MXN / ~$55 USD",
    t2F1: "Todo lo de Entrada incluido",
    t2F2: "Tequila premium ilimitado",
    t2F3: "Cerveza y cócteles incluidos",
    t2F4: "Abordaje prioritario",
    t2Btn: "Reservar Barra Libre",
    s3Label: "La Ruta",
    s3Title: "GUADALAJARA DE NOCHE",
    r1Name: "Zona Rosa / Fan Zone",
    r1Desc: "Punto de salida · 9:00 PM — Sube y conoce al crew",
    r2Name: "Centro Histórico",
    r2Desc: "El corazón de Guadalajara — arquitectura colonial, vibra total",
    r3Name: "Chapultepec",
    r3Desc: "El corredor nocturno — la ciudad desde arriba",
    r4Name: "Parada final · Por definir",
    r4Desc: "Te dejamos en el spot más caliente de la noche",
    s4Label: "FAQ",
    s4Title: "LO QUE NECESITAS SABER",
    fq1: "¿Cuándo opera?",
    fa1: "Cada noche que el Mundial esté activo en Guadalajara. Fechas por confirmar — regístrate para recibir notificaciones.",
    fq2: "¿Dónde nos encontramos?",
    fa2: "El punto de abordaje se confirma al hacer tu reserva. Generalmente cerca del fan zone principal.",
    fq3: "¿Es seguro?",
    fa3: "Sí. Nuestro crew es local, con experiencia, y está contigo toda la noche. Estás en buenas manos.",
    fq4: "¿Edad mínima?",
    fa4: "+18 con ID válido. Esta es una experiencia nocturna — sin excepciones.",
    footerInstagram: "Instagram",
    footerWhatsApp: "WhatsApp",
    footerContact: "Contacto",
    footerCopy: "© 2026 World Cup Nights · Guadalajara, México",
  },
} as const;

type Lang = keyof typeof copy;


// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CheckDot() {
  return (
    <span
      style={{
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: "rgba(255,107,43,0.2)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          display: "block",
          width: 5,
          height: 5,
          background: "#FF6B2B",
          borderRadius: "50%",
        }}
      />
    </span>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: "0.5px",
        background: "rgba(255,255,255,0.08)",
        margin: "0 2rem",
      }}
    />
  );
}

function IconSliders() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B2B" strokeWidth="1.5" strokeLinecap="round">
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

function IconGlass() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22h8" /><line x1="12" y1="11" x2="12" y2="22" />
      <path d="M5 3l2 7c.6 2 2.2 3.2 5 3.2s4.4-1.2 5-3.2L19 3H5z" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconMic() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF6B2B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [loadingTier, setLoadingTier] = useState<"entry" | "open-bar" | null>(null);
  const t = copy[lang];

  useEffect(() => {
    const reset = () => setLoadingTier(null);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  async function handleCheckout(tier: "entry" | "open-bar") {
    setLoadingTier(tier);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketType: tier, quantity: 1 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      window.location.href = data.checkoutUrl;
    } catch {
      alert("Error al procesar el pago. Intenta de nuevo.");
    } finally {
      setLoadingTier(null);
    }
  }

  const heading: React.CSSProperties = { fontFamily: "var(--font-bebas)" };
  const body: React.CSSProperties = { fontFamily: "var(--font-dm-sans)" };

  return (
    <div
      style={{
        background: "#0a0a0a",
        color: "#f0ebe0",
        fontFamily: "var(--font-dm-sans)",
        minHeight: "100vh",
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* NAV                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.2rem 2rem",
          borderBottom: "0.5px solid rgba(255,255,255,0.1)",
        }}
      >
        <span
          style={{
            ...heading,
            fontSize: 22,
            letterSpacing: 2,
            color: "#FF6B2B",
          }}
        >
          WORLD CUP NIGHTS
        </span>

        <div style={{ display: "flex", gap: "1.5rem", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
          <a href="#experience" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}>
            {t.navExp}
          </a>
          <a href="#tickets" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}>
            {t.navTix}
          </a>
          <a href="#faq" style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}>
            {t.navFaq}
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Language switcher */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
            {(["en", "es"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  ...body,
                  background: "none",
                  border: `0.5px solid ${lang === l ? "#FF6B2B" : "rgba(255,255,255,0.15)"}`,
                  color: lang === l ? "#FF6B2B" : "rgba(255,255,255,0.4)",
                  padding: "3px 8px",
                  borderRadius: 3,
                  cursor: "pointer",
                  fontSize: 11,
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <a
            href="#tickets"
            style={{
              ...body,
              background: "#FF6B2B",
              color: "#fff",
              padding: "8px 18px",
              fontSize: 13,
              cursor: "pointer",
              borderRadius: 4,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {t.navBook}
          </a>
        </div>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "5rem 2rem 4rem",
          overflow: "hidden",
        }}
      >
        {/* Full-bleed bus photo */}
        <Image
          src="/bus-photo.png"
          alt="World Cup Nights party bus"
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.95) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Orange radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,43,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <p
            style={{
              ...body,
              fontSize: 11,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#FF6B2B",
              marginBottom: "1rem",
            }}
          >
            {t.eyebrow}
          </p>

          <h1
            style={{
              ...heading,
              fontSize: "clamp(52px, 10vw, 90px)",
              lineHeight: 0.95,
              color: "#f0ebe0",
              margin: "0 0 0.5rem",
            }}
          >
            {t.heroTitle1}
            <br />
            {t.heroTitle2}{" "}
            <span style={{ color: "#FF6B2B" }}>{t.heroHighlight}</span>
          </h1>

          <p
            style={{
              ...body,
              fontSize: 15,
              color: "rgba(240,235,224,0.6)",
              maxWidth: 440,
              margin: "1rem auto 2rem",
              lineHeight: 1.6,
            }}
          >
            {t.heroSub}
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="#tickets"
              style={{
                ...body,
                background: "#FF6B2B",
                color: "#fff",
                padding: "14px 28px",
                fontSize: 14,
                cursor: "pointer",
                borderRadius: 4,
                fontWeight: 500,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              {t.heroCta1}
            </a>
            <a
              href="#experience"
              style={{
                ...body,
                background: "transparent",
                color: "#f0ebe0",
                border: "1px solid rgba(240,235,224,0.3)",
                padding: "14px 28px",
                fontSize: 14,
                cursor: "pointer",
                borderRadius: 4,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              {t.heroCta2}
            </a>
          </div>

          <div
            style={{
              display: "inline-block",
              background: "rgba(255,107,43,0.15)",
              border: "1px solid rgba(255,107,43,0.3)",
              color: "#FF6B2B",
              fontSize: 11,
              padding: "4px 12px",
              borderRadius: 20,
              marginTop: "2rem",
            }}
          >
            {t.heroBadge}
          </div>
        </div>
      </section>

      <Divider />

      {/* ------------------------------------------------------------------ */}
      {/* EXPERIENCE PILLARS                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section id="experience" style={{ padding: "3.5rem 2rem" }}>
        <p
          style={{
            ...body,
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "0.5rem",
          }}
        >
          {t.s1Label}
        </p>
        <h2 style={{ ...heading, fontSize: 36, color: "#f0ebe0", margin: "0 0 2rem" }}>
          {t.s1Title}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
          }}
        >
          {[
            { icon: <IconSliders />, title: t.p1Title, body: t.p1Body },
            { icon: <IconGlass />,   title: t.p2Title, body: t.p2Body },
            { icon: <IconGlobe />,   title: t.p3Title, body: t.p3Body },
            { icon: <IconMic />,     title: t.p4Title, body: t.p4Body },
          ].map((pillar) => (
            <div
              key={pillar.title}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "0.5px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: "1.25rem",
              }}
            >
              <div style={{ marginBottom: "0.75rem", lineHeight: 1 }}>
                {pillar.icon}
              </div>
              <div style={{ ...body, fontSize: 14, fontWeight: 500, marginBottom: "0.4rem" }}>
                {pillar.title}
              </div>
              <div style={{ ...body, fontSize: 12, color: "rgba(240,235,224,0.5)", lineHeight: 1.5 }}>
                {pillar.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ------------------------------------------------------------------ */}
      {/* TICKETS                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section id="tickets" style={{ padding: "3.5rem 2rem" }}>
        <p
          style={{
            ...body,
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "0.5rem",
          }}
        >
          {t.s2Label}
        </p>
        <h2 style={{ ...heading, fontSize: 36, color: "#f0ebe0", margin: "0 0 2rem" }}>
          {t.s2Title}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {/* Entry ticket */}
          <div
            style={{
              borderRadius: 10,
              padding: "1.75rem",
              position: "relative",
              overflow: "hidden",
              background: "rgba(255,255,255,0.04)",
              border: "0.5px solid rgba(255,255,255,0.12)",
            }}
          >
            <div style={{ ...heading, fontSize: 26, marginBottom: "0.25rem" }}>{t.t1Name}</div>
            <div style={{ ...body, fontSize: 32, fontWeight: 500, color: "#FF6B2B", marginBottom: "1.25rem" }}>
              {t.t1Price}{" "}
              <span style={{ fontSize: 14, color: "rgba(240,235,224,0.4)" }}>{t.t1PriceSub}</span>
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {[t.t1F1, t.t1F2, t.t1F3, t.t1F4].map((feat) => (
                <li key={feat} style={{ ...body, fontSize: 13, color: "rgba(240,235,224,0.7)", display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckDot />
                  {feat}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout("entry")}
              disabled={loadingTier !== null}
              style={{
                ...body,
                width: "100%",
                padding: 12,
                fontSize: 13,
                cursor: loadingTier !== null ? "default" : "pointer",
                borderRadius: 6,
                fontWeight: 500,
                background: "transparent",
                color: "#f0ebe0",
                border: "0.5px solid rgba(255,255,255,0.25)",
                opacity: loadingTier !== null ? 0.7 : 1,
              }}
            >
              {loadingTier === "entry" ? "..." : t.t1Btn}
            </button>
          </div>

          {/* Open Bar ticket */}
          <div
            style={{
              borderRadius: 10,
              padding: "1.75rem",
              position: "relative",
              overflow: "hidden",
              background: "#1a0e06",
              border: "1.5px solid #FF6B2B",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                background: "#FF6B2B",
                color: "#fff",
                fontSize: 10,
                padding: "3px 9px",
                borderRadius: 20,
              }}
            >
              {t.t2Badge}
            </div>
            <div style={{ ...heading, fontSize: 26, marginBottom: "0.25rem" }}>{t.t2Name}</div>
            <div style={{ ...body, fontSize: 32, fontWeight: 500, color: "#FF6B2B", marginBottom: "1.25rem" }}>
              {t.t2Price}{" "}
              <span style={{ fontSize: 14, color: "rgba(240,235,224,0.4)" }}>{t.t2PriceSub}</span>
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {[t.t2F1, t.t2F2, t.t2F3, t.t2F4].map((feat) => (
                <li key={feat} style={{ ...body, fontSize: 13, color: "rgba(240,235,224,0.7)", display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckDot />
                  {feat}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout("open-bar")}
              disabled={loadingTier !== null}
              style={{
                ...body,
                width: "100%",
                padding: 12,
                fontSize: 13,
                cursor: loadingTier !== null ? "default" : "pointer",
                borderRadius: 6,
                fontWeight: 500,
                background: "#FF6B2B",
                color: "#fff",
                border: "none",
                opacity: loadingTier !== null ? 0.7 : 1,
              }}
            >
              {loadingTier === "open-bar" ? "..." : t.t2Btn}
            </button>
          </div>
        </div>
      </section>

      <Divider />

      {/* ------------------------------------------------------------------ */}
      {/* ROUTE                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section id="route" style={{ padding: "3.5rem 2rem" }}>
        <p
          style={{
            ...body,
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "0.5rem",
          }}
        >
          {t.s3Label}
        </p>
        <h2 style={{ ...heading, fontSize: 36, color: "#f0ebe0", margin: "0 0 2rem" }}>
          {t.s3Title}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { name: t.r1Name, desc: t.r1Desc },
            { name: t.r2Name, desc: t.r2Desc },
            { name: t.r3Name, desc: t.r3Desc },
            { name: t.r4Name, desc: t.r4Desc },
          ].map((stop, i, arr) => (
            <div
              key={stop.name}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                paddingBottom: "1.5rem",
                position: "relative",
              }}
            >
              {/* Vertical line except for last item */}
              {i < arr.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: 7,
                    top: 20,
                    width: 1,
                    height: "calc(100% - 4px)",
                    background: "rgba(255,107,43,0.25)",
                  }}
                />
              )}
              {/* Dot */}
              <div
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: "50%",
                  border: "2px solid #FF6B2B",
                  background: "#0a0a0a",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              />
              <div>
                <div style={{ ...body, fontWeight: 500, fontSize: 14, marginBottom: 3 }}>
                  {stop.name}
                </div>
                <div style={{ ...body, fontSize: 12, color: "rgba(240,235,224,0.45)" }}>
                  {stop.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ------------------------------------------------------------------ */}
      {/* FAQ                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section id="faq" style={{ padding: "3.5rem 2rem" }}>
        <p
          style={{
            ...body,
            fontSize: 11,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "0.5rem",
          }}
        >
          {t.s4Label}
        </p>
        <h2 style={{ ...heading, fontSize: 36, color: "#f0ebe0", margin: "0 0 2rem" }}>
          {t.s4Title}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { q: t.fq1, a: t.fa1 },
            { q: t.fq2, a: t.fa2 },
            { q: t.fq3, a: t.fa3 },
            { q: t.fq4, a: t.fa4 },
          ].map((item) => (
            <div
              key={item.q}
              style={{
                borderTop: "0.5px solid rgba(255,255,255,0.08)",
                padding: "1rem 0",
              }}
            >
              <div style={{ ...body, fontSize: 14, fontWeight: 500, marginBottom: "0.4rem" }}>
                {item.q}
              </div>
              <div style={{ ...body, fontSize: 13, color: "rgba(240,235,224,0.5)", lineHeight: 1.6 }}>
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                              */}
      {/* ------------------------------------------------------------------ */}
      <footer
        style={{
          padding: "2rem",
          borderTop: "0.5px solid rgba(255,255,255,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ ...heading, fontSize: 18, color: "#FF6B2B", letterSpacing: 2 }}>
          WORLD CUP NIGHTS
        </div>
        <div style={{ display: "flex", gap: "1.5rem", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
          <span style={{ cursor: "pointer" }}>{t.footerInstagram}</span>
          <span style={{ cursor: "pointer" }}>{t.footerWhatsApp}</span>
          <span style={{ cursor: "pointer" }}>{t.footerContact}</span>
        </div>
        <div style={{ ...body, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
          {t.footerCopy}
        </div>
      </footer>
    </div>
  );
}
