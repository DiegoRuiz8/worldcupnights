"use client";

import { useState, useEffect } from "react";

const PRICE_ENTRY_USD = 35;
const PRICE_OB_USD = 55;
const PRICE_ENTRY_MXN = 700;
const PRICE_OB_MXN = 1100;
const MAX_TICKETS = 10;

type Lang = "en" | "es";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  initialType: "entry" | "open-bar";
  lang: Lang;
}

export default function CheckoutModal({ isOpen, onClose, selectedDate, initialType, lang }: Props) {
  const [qtyEntry, setQtyEntry] = useState(0);
  const [qtyOB, setQtyOB] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showMax, setShowMax] = useState(false);
  const [upsellDone, setUpsellDone] = useState(false);

  // Pre-fill on open
  useEffect(() => {
    if (isOpen) {
      setQtyEntry(initialType === "entry" ? 1 : 0);
      setQtyOB(initialType === "open-bar" ? 1 : 0);
      setUpsellDone(false);
      setShowMax(false);
    }
  }, [isOpen, initialType]);

  const total = qtyEntry + qtyOB;
  const totalUSD = qtyEntry * PRICE_ENTRY_USD + qtyOB * PRICE_OB_USD;
  const totalMXN = qtyEntry * PRICE_ENTRY_MXN + qtyOB * PRICE_OB_MXN;

  function changeQty(type: "entry" | "ob", delta: number) {
    if (type === "entry") {
      const next = qtyEntry + delta;
      if (next < 0) return;
      if (delta > 0 && total >= MAX_TICKETS) { flashMax(); return; }
      setQtyEntry(next);
    } else {
      const next = qtyOB + delta;
      if (next < 0) return;
      if (delta > 0 && total >= MAX_TICKETS) { flashMax(); return; }
      setQtyOB(next);
    }
  }

  function flashMax() {
    setShowMax(true);
    setTimeout(() => setShowMax(false), 2500);
  }

  function acceptUpsell() {
    setQtyOB(qtyOB + qtyEntry);
    setQtyEntry(0);
    setUpsellDone(true);
  }

  async function handlePay() {
    if (total === 0) return;
    setLoading(true);
    try {
      const items = [];
      if (qtyEntry > 0) items.push({ ticketType: "entry", quantity: qtyEntry });
      if (qtyOB > 0) items.push({ ticketType: "open-bar", quantity: qtyOB });

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, date: selectedDate }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      window.location.href = data.checkoutUrl;
    } catch {
      alert(lang === "en" ? "Payment error. Please try again." : "Error al procesar el pago. Intenta de nuevo.");
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  const c = lang === "en" ? {
    title: "Complete Your Booking",
    night: "Night",
    tickets: "Tickets",
    entry: "Entry Ticket",
    entryPrice: "$35 USD / ~$700 MXN each",
    ob: "Open Bar",
    obPrice: "$55 USD / ~$1,100 MXN each",
    meetingPoint: "Meeting Point",
    total: "Total",
    upsellTitle: "Upgrade to Open Bar — only +$20/person",
    upsellDesc: "Unlimited premium tequila, beer & cocktails all night.",
    upgrade: "Upgrade →",
    upgraded: "Upgraded ✓",
    pay: "Pay with MercadoPago →",
    paying: "Redirecting...",
    maxWarning: "Max 10 tickets per order",
    trust1: "✓ Secure checkout",
    trust2: "✓ Free date change",
    trust3: "✓ Instant confirmation",
    breakdown: (qe: number, qo: number) => {
      const parts = [];
      if (qe > 0) parts.push(`${qe}× Entry = $${qe * PRICE_ENTRY_USD} USD`);
      if (qo > 0) parts.push(`${qo}× Open Bar = $${qo * PRICE_OB_USD} USD`);
      return parts.join("  +  ");
    },
  } : {
    title: "Completa Tu Reserva",
    night: "Noche",
    tickets: "Boletos",
    entry: "Entrada",
    entryPrice: "$700 MXN / ~$35 USD c/u",
    ob: "Barra Libre",
    obPrice: "$1,100 MXN / ~$55 USD c/u",
    meetingPoint: "Punto de Encuentro",
    total: "Total",
    upsellTitle: "Mejora a Barra Libre — solo +$20 USD/persona",
    upsellDesc: "Tequila premium ilimitado, cerveza y cocteles toda la noche.",
    upgrade: "Mejorar →",
    upgraded: "Mejorado ✓",
    pay: "Pagar con MercadoPago →",
    paying: "Redirigiendo...",
    maxWarning: "Máximo 10 boletos por orden",
    trust1: "✓ Pago seguro",
    trust2: "✓ Cambio de fecha gratis",
    trust3: "✓ Confirmación inmediata",
    breakdown: (qe: number, qo: number) => {
      const parts = [];
      if (qe > 0) parts.push(`${qe}× Entrada = $${qe * PRICE_ENTRY_MXN} MXN`);
      if (qo > 0) parts.push(`${qo}× Barra Libre = $${qo * PRICE_OB_MXN} MXN`);
      return parts.join("  +  ");
    },
  };

  const btnStyle: React.CSSProperties = {
    width: 36, height: 36,
    background: "rgba(255,255,255,0.06)",
    border: "0.5px solid rgba(255,255,255,0.12)",
    color: "#f0ebe0",
    fontSize: 20,
    cursor: "pointer",
    lineHeight: 1,
    borderRadius: 4,
    transition: "background 0.2s",
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          zIndex: 500, backdropFilter: "blur(8px)",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 501, width: "100%", maxWidth: 560,
        background: "#111", borderRadius: 6,
        overflow: "hidden", maxHeight: "92vh", overflowY: "auto",
      }}>

        {/* Header */}
        <div style={{
          padding: "24px 32px", borderBottom: "0.5px solid rgba(255,255,255,0.08)",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-bebas)", fontSize: 22, letterSpacing: 1 }}>
              {c.title}
            </div>
            <div style={{ fontSize: 12, color: "#FF6B2B", marginTop: 4, letterSpacing: 1 }}>
              {selectedDate} · Plaza Liberación · 9:00 PM
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "rgba(255,255,255,0.4)",
            fontSize: 24, cursor: "pointer", lineHeight: 1, padding: 4,
          }}>×</button>
        </div>

        {/* Ticket rows */}
        <div style={{ padding: "20px 32px", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 16 }}>
            {c.tickets}
          </div>

          {/* Entry row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{c.entry}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{c.entryPrice}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              <button onClick={() => changeQty("entry", -1)} style={{ ...btnStyle, borderRadius: "4px 0 0 4px" }}>−</button>
              <div style={{
                width: 44, height: 36, background: "#0a0a0a",
                border: "0.5px solid rgba(255,255,255,0.12)", borderLeft: "none", borderRight: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-bebas)", fontSize: 20, color: "#FF6B2B",
              }}>{qtyEntry}</div>
              <button onClick={() => changeQty("entry", 1)} style={{ ...btnStyle, borderRadius: "0 4px 4px 0" }}>+</button>
            </div>
          </div>

          {/* Open Bar row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{c.ob}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{c.obPrice}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              <button onClick={() => changeQty("ob", -1)} style={{ ...btnStyle, borderRadius: "4px 0 0 4px" }}>−</button>
              <div style={{
                width: 44, height: 36, background: "#0a0a0a",
                border: "0.5px solid rgba(255,255,255,0.12)", borderLeft: "none", borderRight: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-bebas)", fontSize: 20, color: "#FF6B2B",
              }}>{qtyOB}</div>
              <button onClick={() => changeQty("ob", 1)} style={{ ...btnStyle, borderRadius: "0 4px 4px 0" }}>+</button>
            </div>
          </div>

          {showMax && (
            <div style={{ fontSize: 12, color: "#FF6B2B", marginTop: 8, letterSpacing: 0.5 }}>
              {c.maxWarning}
            </div>
          )}
        </div>

        {/* Upsell */}
        {qtyEntry > 0 && qtyOB === 0 && (
          <div style={{
            margin: "16px 32px",
            background: "rgba(255,107,43,0.06)",
            border: "0.5px solid rgba(255,107,43,0.3)",
            borderRadius: 4, padding: "16px 20px",
            display: "flex", gap: 16, alignItems: "center",
          }}>
            <div style={{
              background: "#FF6B2B", color: "#000",
              fontSize: 9, letterSpacing: 1.5, padding: "4px 10px",
              borderRadius: 2, whiteSpace: "nowrap", textTransform: "uppercase", flexShrink: 0,
            }}>Upgrade</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{c.upsellTitle}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{c.upsellDesc}</div>
            </div>
            <button
              onClick={upsellDone ? undefined : acceptUpsell}
              style={{
                background: upsellDone ? "rgba(255,255,255,0.06)" : "#FF6B2B",
                color: upsellDone ? "rgba(255,255,255,0.4)" : "#000",
                border: "none", padding: "8px 16px", fontSize: 12,
                fontWeight: 500, cursor: upsellDone ? "default" : "pointer",
                borderRadius: 2, whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              {upsellDone ? c.upgraded : c.upgrade}
            </button>
          </div>
        )}

        {/* Summary */}
        <div style={{
          padding: "16px 32px 20px",
          background: "rgba(255,107,43,0.03)",
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
        }}>
          {(qtyEntry > 0 || qtyOB > 0) && (
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>
              {c.breakdown(qtyEntry, qtyOB)}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{c.total}</span>
            <span style={{ fontFamily: "var(--font-bebas)", fontSize: 32, color: "#FF6B2B" }}>
              ${totalUSD} USD
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>
                ~${totalMXN.toLocaleString()} MXN
              </span>
            </span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "20px 32px", borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
          <button
            onClick={handlePay}
            disabled={total === 0 || loading}
            style={{
              width: "100%", padding: "15px",
              background: total > 0 ? "#FF6B2B" : "rgba(255,255,255,0.06)",
              color: total > 0 ? "#fff" : "rgba(255,255,255,0.3)",
              border: "none", fontSize: 14, fontWeight: 500,
              cursor: total > 0 && !loading ? "pointer" : "default",
              borderRadius: 4, transition: "background 0.2s", marginBottom: 12,
            }}
          >
            {loading ? c.paying : c.pay}
          </button>
          <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
            {[c.trust1, c.trust2, c.trust3].map((t) => (
              <span key={t} style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 0.5 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}