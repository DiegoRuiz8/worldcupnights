"use client";

const eventDates = [5, 6, 10, 11, 12, 13, 17, 18, 19, 20, 23, 24, 25, 26, 27];

interface DateSelectorProps {
  lang: "en" | "es";
  onSelect: (date: string) => void;
  selectedDate: string | null;
}

function formatDate(day: number, lang: "en" | "es"): { day: string; month: string } {
  if (lang === "en") {
    return { day: String(day), month: "June" };
  }
  return { day: String(day), month: "junio" };
}

export default function DateSelector({ lang, onSelect, selectedDate }: DateSelectorProps) {
  const heading: React.CSSProperties = { fontFamily: "var(--font-bebas)" };
  const body: React.CSSProperties = { fontFamily: "var(--font-dm-sans)" };

  const title = lang === "en" ? "Choose Your Night" : "Elige Tu Noche";
  const spotsLabel = lang === "en" ? "~40 spots available" : "~40 lugares disponibles";
  const policyLine =
    lang === "en"
      ? "🔄 Free date change up to 48hrs before · No refunds"
      : "🔄 Cambio de fecha gratis hasta 48hrs antes · Sin reembolsos";

  return (
    <div style={{ padding: "3.5rem 2rem" }}>
      <h2
        style={{
          ...heading,
          fontSize: 36,
          color: "#f0ebe0",
          margin: "0 0 2rem",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
          gap: 10,
          marginBottom: "1.5rem",
        }}
      >
        {eventDates.map((day) => {
          const { day: dayStr, month } = formatDate(day, lang);
          const dateValue = `June ${day}`;
          const isSelected = selectedDate === dateValue;

          return (
            <button
              key={day}
              onClick={() => onSelect(dateValue)}
              style={{
                ...body,
                background: isSelected ? "rgba(255,107,43,0.15)" : "rgba(255,255,255,0.04)",
                border: isSelected
                  ? "1.5px solid #FF6B2B"
                  : "0.5px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: "0.75rem 0.5rem 0.5rem",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                transition: "border-color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#FF6B2B";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(255,255,255,0.1)";
                }
              }}
            >
              <span
                style={{
                  ...heading,
                  fontSize: 32,
                  color: isSelected ? "#FF6B2B" : "#f0ebe0",
                  lineHeight: 1,
                }}
              >
                {dayStr}
              </span>
              <span
                style={{
                  ...body,
                  fontSize: 11,
                  color: isSelected ? "#FF6B2B" : "rgba(240,235,224,0.45)",
                  textTransform: "lowercase",
                }}
              >
                {month}
              </span>
              <span
                style={{
                  ...body,
                  fontSize: 9,
                  color: "rgba(240,235,224,0.3)",
                  marginTop: 4,
                }}
              >
                {spotsLabel}
              </span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          ...body,
          fontSize: 12,
          color: "rgba(240,235,224,0.45)",
          marginBottom: "0.5rem",
        }}
      >
        📍 Fan Fest · Plaza Liberación, Centro Histórico · 9:00 PM
      </div>
      <div
        style={{
          ...body,
          fontSize: 12,
          color: "rgba(240,235,224,0.35)",
        }}
      >
        {policyLine}
      </div>
    </div>
  );
}
