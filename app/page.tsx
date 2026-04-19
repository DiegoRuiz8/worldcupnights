"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import CheckoutModal from "./components/CheckoutModal";

// ─────────────────────────────────────────────────────────────
// FONTS — add to your globals.css or layout.tsx:
// @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');
// ─────────────────────────────────────────────────────────────

type Lang = "en" | "es";

const DATES = [5, 6, 10, 11, 12, 13, 17, 18, 19, 20, 23, 24, 25, 26, 27];

const T = {
  en: {
    navExp: "Experience", navDates: "Dates", navTickets: "Tickets", navFaq: "FAQ", navBook: "Book Now",
    heroTag: "Guadalajara · June 2026 · FIFA World Cup",
    heroTitle: ["The Night", "Guadalajara", "Won't Forget"],
    heroDesc: "A curated double-decker party bus through the city's best neighborhoods. 40 people. 15 match nights. One unforgettable experience.",
    heroCta1: "Choose Your Night →", heroCta2: "See What's Included",
    scroll: "Scroll",
    stat1: "Match Nights", stat2: "Seats per Night", stat3: "Duration", stat4: "Departure Sharp",
    expTag: "The Experience", expTitle: ["Not Just a Bus.", "A Moving Party."],
    f1t: "Curated Crowd", f1d: "Capped at 40. Better energy, better connections — never a random mob.",
    f2t: "Real Mexican Spirits", f2d: "Premium tequila & mezcal. Open bar means open bar — no fine print.",
    f3t: "Bilingual Hosts", f3d: "Local crew, EN/ES. They know the city and how to keep the night alive.",
    f4t: "Best of GDL", f4d: "Centro Histórico, Chapultepec, Fan Zone — all in one night, no planning needed.",
    routeTag: "The Route", routeTitle: ["Guadalajara", "At Night"],
    stop1t: "Zona Rosa / Fan Zone", stop1d: "Departure point · 9:00 PM — Board up, meet the crew",
    stop2t: "Centro Histórico", stop2d: "Guadalajara's heart — colonial architecture, live vibe",
    stop3t: "Chapultepec", stop3d: "The nightlife corridor — see the city from above",
    stop4t: "Final Stop · TBD", stop4d: "We drop you off at the hottest spot of the night",
    datesTag: "June 2026", datesTitle: ["Choose", "Your Night"],
    dateMonth: "June", dateSpots: "~40 left",
    datesInfo: "📍 Plaza Liberación, Centro Histórico · 9:00 PM · Free date change up to 48hrs before · No refunds",
    ticketsTag: "Pricing", ticketsTitle: ["Pick Your", "Experience"],
    entryName: "Entry", entrySub: "For the ones who want in", entryMxn: "USD / ~$700 MXN",
    entryF: ["Bus access all night", "Curated DJ set", "Local host crew", "Drinks available for purchase"],
    entryTagline: "Show up, get on, enjoy the night.", entryBtn: "Reserve Entry — $35 USD",
    obName: "Open Bar", obSub: "For the full experience", obMxn: "USD / ~$1,100 MXN",
    obF: ["Everything in Entry", "Unlimited premium tequila", "Beer & cocktails included", "Priority boarding"],
    obTagline: "Zero friction. Full energy. Just drink and enjoy.", obBtn: "Reserve Open Bar — $55 USD",
    mostPop: "Most Popular",
    faqTag: "Need to Know", faqTitle: "FAQ",
    faqs: [
      { q: "When does it run?", a: "June 5, 6, 10–13, 17–20, 23–27. One departure per night at 9:00 PM from Plaza Liberación, Centro Histórico." },
      { q: "Can I come alone?", a: "Absolutely. Most people do. The experience connects strangers — you won't feel out of place." },
      { q: "Do I need to speak Spanish?", a: "No. Hosts are bilingual EN/ES and the crowd is international. Show up as you are." },
      { q: "How long is the experience?", a: "About 3 hours. Departure 9:00 PM, ending around midnight at a final nightlife spot." },
      { q: "Is it safe for solo travelers?", a: "Yes. Bilingual local hosts are with you the entire night, route is curated through safe areas." },
      { q: "Can I change my date?", a: "Free date change up to 48 hours before your selected night. No refunds after that." },
    ],
    footerLinks: ["Instagram", "WhatsApp", "Contact"],
    footerCopy: "© 2026 · Guadalajara, México",
    stickyNight: "Selected Night", stickyTicket: "Ticket",
    stickyNoTicket: "Choose a ticket below →", stickyChange: "Change date", stickyBtn: "Reserve Now →",
  },
  es: {
    navExp: "Experiencia", navDates: "Fechas", navTickets: "Boletos", navFaq: "FAQ", navBook: "Reservar",
    heroTag: "Guadalajara · Junio 2026 · Copa del Mundo FIFA",
    heroTitle: ["La Noche que", "Guadalajara", "No Olvidará"],
    heroDesc: "Un party bus de doble piso por los mejores rincones de la ciudad. 40 personas. 15 noches de partido. Una experiencia inolvidable.",
    heroCta1: "Elige Tu Noche →", heroCta2: "Ver Qué Incluye",
    scroll: "Bajar",
    stat1: "Noches de Partido", stat2: "Lugares por Noche", stat3: "Duración", stat4: "Salida en Punto",
    expTag: "La Experiencia", expTitle: ["No es Solo un Bus.", "Es una Fiesta en Movimiento."],
    f1t: "Crowd Curado", f1d: "Máximo 40 personas. Mejor energía, mejores conexiones.",
    f2t: "Spirits Mexicanos de Verdad", f2d: "Tequila y mezcal premium. Barra libre significa barra libre.",
    f3t: "Hosts Bilingues", f3d: "Crew local, EN/ES. Conocen la ciudad y cómo animar la noche.",
    f4t: "Lo Mejor de GDL", f4d: "Centro Histórico, Chapultepec, Fan Zone — todo en una noche.",
    routeTag: "La Ruta", routeTitle: ["Guadalajara", "De Noche"],
    stop1t: "Zona Rosa / Fan Zone", stop1d: "Punto de salida · 9:00 PM — Súbete, conoce al crew",
    stop2t: "Centro Histórico", stop2d: "El corazón de Guadalajara — arquitectura colonial, ambiente en vivo",
    stop3t: "Chapultepec", stop3d: "El corredor de la noche — ve la ciudad desde arriba",
    stop4t: "Parada Final · TBD", stop4d: "Te dejamos en el lugar más chido de la noche",
    datesTag: "Junio 2026", datesTitle: ["Elige", "Tu Noche"],
    dateMonth: "Junio", dateSpots: "~40 lugares",
    datesInfo: "📍 Plaza Liberación, Centro Histórico · 9:00 PM · Cambio de fecha gratis hasta 48hrs antes · Sin reembolsos",
    ticketsTag: "Precios", ticketsTitle: ["Elige Tu", "Experiencia"],
    entryName: "Entrada", entrySub: "Para los que quieren estar ahí", entryMxn: "USD / ~$700 MXN",
    entryF: ["Acceso al bus toda la noche", "Set de DJ curado", "Crew de hosts locales", "Bebidas disponibles para comprar"],
    entryTagline: "Llega, súbete y disfruta la noche.", entryBtn: "Reservar Entrada — $35 USD",
    obName: "Barra Libre", obSub: "Para la experiencia completa", obMxn: "USD / ~$1,100 MXN",
    obF: ["Todo lo de Entrada", "Tequila premium ilimitado", "Cerveza y cocteles incluidos", "Abordaje prioritario"],
    obTagline: "Sin fricción. Energía total. Solo toma y disfruta.", obBtn: "Reservar Barra Libre — $55 USD",
    mostPop: "Más Popular",
    faqTag: "Lo Que Necesitas Saber", faqTitle: "Preguntas Frecuentes",
    faqs: [
      { q: "¿Cuándo opera?", a: "Junio 5, 6, 10–13, 17–20, 23–27. Una salida por noche a las 9:00 PM desde Plaza Liberación, Centro Histórico." },
      { q: "¿Puedo ir solo/a?", a: "Absolutamente. La mayoría va solo/a. La experiencia conecta personas — no te sentirás fuera de lugar." },
      { q: "¿Necesito hablar inglés?", a: "No. Los hosts son bilingues EN/ES y el grupo es internacional." },
      { q: "¿Cuánto dura la experiencia?", a: "Aproximadamente 3 horas. Salida 9:00 PM, termina cerca de medianoche en un spot de antro." },
      { q: "¿Es seguro para viajeros solos?", a: "Sí. Los hosts locales bilingues están contigo toda la noche y la ruta es por zonas seguras." },
      { q: "¿Puedo cambiar mi fecha?", a: "Cambio de fecha gratis hasta 48 horas antes. Sin reembolsos después." },
    ],
    footerLinks: ["Instagram", "WhatsApp", "Contacto"],
    footerCopy: "© 2026 · Guadalajara, México",
    stickyNight: "Noche Seleccionada", stickyTicket: "Boleto",
    stickyNoTicket: "Elige un boleto abajo →", stickyChange: "Cambiar fecha", stickyBtn: "Reservar Ahora →",
  },
} as const;

// ─── Styles ───────────────────────────────────────────────────
const ORANGE = "#FF5C00";
const BG = "#080808";
const SURFACE = "#111111";
const SURFACE2 = "#1a1a1a";
const TEXT = "#f0ece4";
const MUTED = "#888880";
const BORDER = "rgba(255,255,255,0.08)";

const bebas: React.CSSProperties = { fontFamily: "var(--font-bebas), sans-serif" };
const mono: React.CSSProperties = { fontFamily: "var(--font-space-mono), monospace" };
const dm: React.CSSProperties = { fontFamily: "var(--font-dm-sans), sans-serif" };
// ─── Reveal hook ──────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" } as React.CSSProperties };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, style } = useReveal();
  return <div ref={ref} style={{ ...style, transitionDelay: `${delay}ms` }}>{children}</div>;
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitialType, setModalInitialType] = useState<"entry" | "open-bar">("entry");
  const [scrolled, setScrolled] = useState(false);
  const t = T[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function openModal(type: "entry" | "open-bar") {
    if (!selectedDate) { scrollTo("dates"); return; }
    setModalInitialType(type);
    setModalOpen(true);
  }

  function selectDate(day: number) {
    setSelectedDate(`${t.dateMonth} ${day}`);
  }

  const stickyVisible = !!selectedDate;
  const stickyLabel = selectedDate ? `${selectedDate}` : "—";

  return (
    <div style={{ background: BG, color: TEXT, fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "20px 48px",
        background: scrolled ? "rgba(8,8,8,0.97)" : "linear-gradient(to bottom, rgba(8,8,8,0.9), transparent)",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
        transition: "background 0.3s, border 0.3s",
      }}>
        <div style={{ ...bebas, fontSize: 18, letterSpacing: 3 }}>WCN</div>
        <div style={{ display: "flex", gap: 32, listStyle: "none" }}>
          {[["experience", t.navExp], ["dates", t.navDates], ["tickets", t.navTickets], ["faq", t.navFaq]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ ...dm, background: "none", border: "none", color: MUTED, fontSize: 12, letterSpacing: "1.5px", textTransform: "uppercase", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = TEXT)} onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Lang toggle */}
          <div style={{ display: "flex", border: `1px solid ${BORDER}`, borderRadius: 2, overflow: "hidden" }}>
            {(["en", "es"] as Lang[]).map((l) => (
              <button key={l} onClick={() => setLang(l)} style={{
                ...mono, background: lang === l ? ORANGE : "transparent",
                color: lang === l ? "#000" : MUTED, border: "none",
                fontSize: 11, letterSpacing: 1, padding: "7px 14px", cursor: "pointer", transition: "all 0.2s",
              }}>{l.toUpperCase()}</button>
            ))}
          </div>
          <button onClick={() => scrollTo("dates")} style={{
            ...dm, background: ORANGE, color: "#000", border: "none",
            padding: "9px 22px", fontSize: 12, fontWeight: 500, letterSpacing: 1,
            borderRadius: 2, cursor: "pointer",
          }}>{t.navBook}</button>
        </div>
      </nav>

      {/* ── STICKY BAR ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 300,
        background: "rgba(8,8,8,0.97)", borderTop: `1px solid ${BORDER}`,
        padding: "16px 48px", display: "flex", alignItems: "center", justifyContent: "space-between",
        transform: stickyVisible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        backdropFilter: "blur(20px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div>
            <div style={{ ...mono, fontSize: 9, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 4 }}>{t.stickyNight}</div>
            <div style={{ ...bebas, fontSize: 24, color: ORANGE }}>{stickyLabel}</div>
          </div>
          <div style={{ width: 1, height: 40, background: BORDER }} />
          <div>
            <div style={{ ...mono, fontSize: 9, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 4 }}>{t.stickyTicket}</div>
            <div style={{ fontSize: 13, color: MUTED }}>{t.stickyNoTicket}</div>
          </div>
          <div style={{ width: 1, height: 40, background: BORDER }} />
          <button onClick={() => scrollTo("dates")} style={{ ...dm, background: "none", border: "none", color: MUTED, fontSize: 12, textDecoration: "underline", cursor: "pointer" }}>{t.stickyChange}</button>
        </div>
        <button onClick={() => openModal("entry")} style={{
          ...dm, background: ORANGE, color: "#000", border: "none",
          padding: "14px 36px", fontSize: 14, fontWeight: 500, letterSpacing: 0.5,
          cursor: "pointer", borderRadius: 2, transition: "background 0.2s",
        }}>{t.stickyBtn}</button>
      </div>

      {/* ── HERO ── */}
      <section style={{ height: "100vh", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "80px 48px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/bus-photo.png" alt="Party Bus" fill priority quality={90} sizes="100vw" style={{ objectFit: "cover", objectPosition: "center" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.7) 40%, rgba(8,8,8,0.2) 100%), linear-gradient(to right, rgba(8,8,8,0.5) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ ...mono, fontSize: 11, letterSpacing: 3, color: ORANGE, textTransform: "uppercase", marginBottom: 20, animation: "fadeUp 0.8s 0.2s both" }}>
            {t.heroTag}
          </div>
          <h1 style={{ ...bebas, fontSize: "clamp(64px, 9vw, 130px)", lineHeight: 0.9, letterSpacing: -1, marginBottom: 36, animation: "fadeUp 0.9s 0.4s both" }}>
            {t.heroTitle[0]}<br />
            <span style={{ color: ORANGE }}>{t.heroTitle[1]}</span><br />
            {t.heroTitle[2]}
          </h1>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", animation: "fadeUp 0.9s 0.7s both" }}>
            <p style={{ ...dm, fontSize: 15, color: "rgba(240,236,228,0.7)", maxWidth: 400, lineHeight: 1.8, margin: 0 }}>{t.heroDesc}</p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
              <button onClick={() => scrollTo("dates")} style={{ ...dm, background: ORANGE, color: "#000", border: "none", padding: "16px 40px", fontSize: 14, fontWeight: 500, letterSpacing: 0.5, cursor: "pointer", borderRadius: 2, transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#ff7a2e"} onMouseLeave={e => e.currentTarget.style.background = ORANGE}>
                {t.heroCta1}
              </button>
              <button onClick={() => scrollTo("experience")} style={{ ...dm, background: "transparent", color: MUTED, border: `1px solid ${BORDER}`, padding: "15px 40px", fontSize: 14, cursor: "pointer", borderRadius: 2, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = TEXT; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = MUTED; }}>
                {t.heroCta2}
              </button>
            </div>
          </div>
        </div>
        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "fadeIn 1s 1.2s both" }}>
          <div style={{ width: 1, height: 50, background: `linear-gradient(to bottom, ${ORANGE}, transparent)` }} />
          <div style={{ ...mono, fontSize: 9, letterSpacing: 3, color: MUTED, textTransform: "uppercase" }}>{t.scroll}</div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        {[["15", t.stat1], ["40", t.stat2], ["3h", t.stat3], ["9PM", t.stat4]].map(([n, l], i) => (
          <Reveal key={l} delay={i * 100}>
            <div style={{ padding: "28px 40px", borderRight: i < 3 ? `1px solid ${BORDER}` : "none", transition: "background 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = SURFACE} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ ...bebas, fontSize: 44, color: ORANGE, lineHeight: 1, marginBottom: 2 }}>{n}</div>
              <div style={{ ...mono, fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", color: MUTED }}>{l}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── EXPERIENCE SPLIT ── */}
      <section id="experience" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "70vh" }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image src="/lp-image-2.jpg" alt="World Cup fans" fill sizes="50vw" style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,92,0,0.15), transparent)" }} />
        </div>
        <div style={{ padding: "80px 64px", background: SURFACE, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Reveal><div style={{ ...mono, fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: ORANGE, marginBottom: 16 }}>{t.expTag}</div></Reveal>
          <Reveal delay={100}><h2 style={{ ...bebas, fontSize: "clamp(40px, 5vw, 68px)", lineHeight: 0.95, marginBottom: 32 }}>{t.expTitle[0]}<br />{t.expTitle[1]}</h2></Reveal>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[[t.f1t, t.f1d], [t.f2t, t.f2d], [t.f3t, t.f3d], [t.f4t, t.f4d]].map(([title, desc], i) => (
              <Reveal key={title} delay={(i + 2) * 100}>
                <li style={{ display: "flex", gap: 16, padding: "18px 0", borderBottom: `1px solid ${BORDER}`, ...(i === 0 ? { borderTop: `1px solid ${BORDER}` } : {}) }}>
                  <div style={{ width: 32, height: 32, borderRadius: 2, background: "rgba(255,92,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: ORANGE, fontSize: 12, fontWeight: 700 }}>
                    {["40", "🥃", "EN", "🗺"][i]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── ROUTE / CITY IMAGE ── */}
      <div style={{ position: "relative", minHeight: 520, overflow: "hidden" }}>
        <Image src="/lp-image-1.jpg" alt="Guadalajara" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.7) 50%, rgba(8,8,8,0.5) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "80px 80px" }}>
          <Reveal><div style={{ ...mono, fontSize: 10, letterSpacing: 4, color: ORANGE, textTransform: "uppercase", marginBottom: 16 }}>{t.routeTag}</div></Reveal>
          <Reveal delay={100}><h2 style={{ ...bebas, fontSize: 56, lineHeight: 0.95, marginBottom: 56 }}>{t.routeTitle[0]}<br />{t.routeTitle[1]}</h2></Reveal>
          <div style={{ maxWidth: 420 }}>
            {[[t.stop1t, t.stop1d], [t.stop2t, t.stop2d], [t.stop3t, t.stop3d], [t.stop4t, t.stop4d]].map(([title, desc], i, arr) => (
              <Reveal key={title} delay={i * 100}>
                <div style={{ display: "flex", gap: 24, alignItems: "flex-start", paddingBottom: i < arr.length - 1 ? 32 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${ORANGE}`, background: i === arr.length - 1 ? ORANGE : "transparent", flexShrink: 0 }} />
                    {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: "rgba(255,92,0,0.3)", minHeight: 40, marginTop: 4 }} />}
                  </div>
                  <div style={{ paddingTop: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── DATES ── */}
      <section id="dates" style={{ padding: "100px 48px", background: SURFACE }}>
        <Reveal><div style={{ ...mono, fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: ORANGE, marginBottom: 16 }}>{t.datesTag}</div></Reveal>
        <Reveal delay={100}><h2 style={{ ...bebas, fontSize: "clamp(44px, 6vw, 76px)", lineHeight: 0.95, marginBottom: 48 }}>{t.datesTitle[0]}<br />{t.datesTitle[1]}</h2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 2 }}>
          {DATES.map((d, i) => {
            const dateStr = `${t.dateMonth} ${d}`;
            const isSelected = selectedDate === dateStr;
            return (
              <Reveal key={d} delay={i * 30}>
                <div onClick={() => selectDate(d)} style={{
                  background: isSelected ? "rgba(255,92,0,0.06)" : BG,
                  border: `2px solid ${isSelected ? ORANGE : "transparent"}`,
                  padding: "20px 16px", textAlign: "center", cursor: "pointer",
                  transition: "background 0.2s, transform 0.2s",
                  position: "relative",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = isSelected ? "rgba(255,92,0,0.06)" : SURFACE2; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = isSelected ? "rgba(255,92,0,0.06)" : BG; e.currentTarget.style.transform = "translateY(0)"; }}>
                  {isSelected && (
                    <div style={{ position: "absolute", top: 8, right: 8, width: 18, height: 18, background: ORANGE, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#000" }}>✓</div>
                  )}
                  <div style={{ ...bebas, fontSize: 44, color: isSelected ? ORANGE : TEXT, lineHeight: 1, marginBottom: 2, transition: "color 0.2s" }}>{String(d).padStart(2, "0")}</div>
                  <div style={{ ...mono, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: MUTED, marginBottom: 12 }}>{t.dateMonth}</div>
                  <div>
                    <span style={{ background: "rgba(255,92,0,0.12)", color: ORANGE, padding: "3px 8px", borderRadius: 2, fontSize: 9, letterSpacing: 1, fontFamily: "'Space Mono', monospace" }}>{t.dateSpots}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={200}>
          <p style={{ ...dm, marginTop: 24, fontSize: 12, color: MUTED, letterSpacing: 0.5 }}>{t.datesInfo}</p>
        </Reveal>
      </section>

      {/* ── TICKETS ── */}
      <section id="tickets" style={{ padding: "100px 48px" }}>
        <Reveal><div style={{ ...mono, fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: ORANGE, marginBottom: 16 }}>{t.ticketsTag}</div></Reveal>
        <Reveal delay={100}><h2 style={{ ...bebas, fontSize: "clamp(44px, 6vw, 76px)", lineHeight: 0.95, marginBottom: 48 }}>{t.ticketsTitle[0]}<br />{t.ticketsTitle[1]}</h2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>

          {/* Entry */}
          <Reveal>
            <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 4, padding: 40, transition: "transform 0.3s", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ ...bebas, fontSize: 28, letterSpacing: 1, marginBottom: 6 }}>{t.entryName}</div>
              <div style={{ ...dm, fontSize: 13, color: MUTED, marginBottom: 24 }}>{t.entrySub}</div>
              <div style={{ marginBottom: 6 }}>
                <span style={{ ...bebas, fontSize: 56, color: ORANGE }}>$35</span>
                <span style={{ ...dm, fontSize: 13, color: MUTED, marginLeft: 8 }}>{t.entryMxn}</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 16px" }}>
                {t.entryF.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontSize: 14, color: "rgba(240,236,228,0.8)", borderBottom: `1px solid ${BORDER}` }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: ORANGE, flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
              <p style={{ ...dm, fontSize: 13, fontStyle: "italic", color: MUTED, marginBottom: 28 }}>{t.entryTagline}</p>
              <button onClick={() => openModal("entry")} style={{
                ...dm, width: "100%", padding: 16, background: "transparent",
                border: `1px solid rgba(255,255,255,0.2)`, color: TEXT,
                fontSize: 14, fontWeight: 500, cursor: "pointer", borderRadius: 2, transition: "all 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                {t.entryBtn}
              </button>
            </div>
          </Reveal>

          {/* Open Bar */}
          <Reveal delay={100}>
            <div style={{ background: "#1a0c00", border: `1px solid ${ORANGE}`, borderRadius: 4, padding: 40, position: "relative", transition: "transform 0.3s", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ position: "absolute", top: 20, right: 20, background: ORANGE, color: "#000", ...mono, fontSize: 9, letterSpacing: 2, padding: "5px 12px", borderRadius: 20, textTransform: "uppercase" }}>{t.mostPop}</div>
              <div style={{ ...bebas, fontSize: 28, letterSpacing: 1, marginBottom: 6 }}>{t.obName}</div>
              <div style={{ ...dm, fontSize: 13, color: MUTED, marginBottom: 24 }}>{t.obSub}</div>
              <div style={{ marginBottom: 6 }}>
                <span style={{ ...bebas, fontSize: 56, color: ORANGE }}>$55</span>
                <span style={{ ...dm, fontSize: 13, color: MUTED, marginLeft: 8 }}>{t.obMxn}</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 16px" }}>
                {t.obF.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontSize: 14, color: "rgba(240,236,228,0.8)", borderBottom: `1px solid ${BORDER}` }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: ORANGE, flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
              <p style={{ ...dm, fontSize: 13, fontStyle: "italic", color: MUTED, marginBottom: 28 }}>{t.obTagline}</p>
              <button onClick={() => openModal("open-bar")} style={{
                ...dm, width: "100%", padding: 16, background: ORANGE,
                border: "none", color: "#000", fontSize: 14, fontWeight: 500,
                cursor: "pointer", borderRadius: 2, transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#ff7a2e"}
                onMouseLeave={e => e.currentTarget.style.background = ORANGE}>
                {t.obBtn}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: "100px 48px", background: SURFACE }}>
        <Reveal><div style={{ ...mono, fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: ORANGE, marginBottom: 16 }}>{t.faqTag}</div></Reveal>
        <Reveal delay={100}><h2 style={{ ...bebas, fontSize: "clamp(44px, 6vw, 76px)", lineHeight: 0.95, marginBottom: 48 }}>{t.faqTitle}</h2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: BORDER }}>
          {t.faqs.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <div style={{ background: SURFACE, padding: "28px 36px", transition: "background 0.2s", cursor: "default" }}
                onMouseEnter={e => e.currentTarget.style.background = SURFACE2} onMouseLeave={e => e.currentTarget.style.background = SURFACE}>
                <div style={{ ...dm, fontSize: 14, fontWeight: 500, marginBottom: 10 }}>{item.q}</div>
                <div style={{ ...dm, fontSize: 13, color: MUTED, lineHeight: 1.7 }}>{item.a}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "56px 48px", borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ ...bebas, fontSize: 28, letterSpacing: 3 }}>WORLD CUP <span style={{ color: ORANGE }}>NIGHTS</span></div>
        <div style={{ display: "flex", gap: 28 }}>
          {t.footerLinks.map((l) => (
            <a key={l} href="#" style={{ ...dm, fontSize: 12, color: MUTED, textDecoration: "none", letterSpacing: 1, transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = TEXT} onMouseLeave={e => e.currentTarget.style.color = MUTED}>{l}</a>
          ))}
        </div>
        <div style={{ ...mono, fontSize: 10, color: MUTED }}>{t.footerCopy}</div>
      </footer>

      {/* ── CHECKOUT MODAL ── */}
      <CheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedDate={selectedDate ?? ""}
        initialType={modalInitialType}
        lang={lang}
      />

      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
      `}</style>
    </div>
  );
}