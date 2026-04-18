import Link from "next/link";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { fecha?: string; ticket?: string };
}) {
  const fecha = searchParams.fecha
    ? decodeURIComponent(searchParams.fecha)
    : searchParams.collection_status === "approved"
      ? "Confirmed"
      : "your selected date";
  const ticket = searchParams.ticket
    ? decodeURIComponent(searchParams.ticket)
    : "Entry";

  return (
    <main
      style={{
        background: "#000",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: "64px", marginBottom: "24px" }}>🏆</div>

        <h1
          style={{ color: "#FF6B00", fontSize: "32px", marginBottom: "12px" }}
        >
          You're in!
        </h1>

        <p style={{ color: "#ccc", fontSize: "18px", marginBottom: "32px" }}>
          Check your email for booking confirmation and meeting point details.
        </p>

        <div
          style={{
            background: "#111",
            border: "1px solid #333",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "32px",
            textAlign: "left",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <span style={{ color: "#666", fontSize: "13px" }}>DATE</span>
            <p
              style={{
                color: "#FF6B00",
                fontWeight: "bold",
                margin: "4px 0 0",
              }}
            >
              {fecha}
            </p>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <span style={{ color: "#666", fontSize: "13px" }}>TICKET</span>
            <p style={{ color: "#fff", margin: "4px 0 0" }}>{ticket}</p>
          </div>
          <div>
            <span style={{ color: "#666", fontSize: "13px" }}>
              MEETING POINT
            </span>
            <p style={{ color: "#fff", margin: "4px 0 0" }}>
              Plaza Liberación, 9:00 PM
            </p>
          </div>
        </div>

        <p style={{ color: "#555", fontSize: "14px", marginBottom: "32px" }}>
          Didn't receive the email? Check your spam folder or WhatsApp us.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            background: "#FF6B00",
            color: "#fff",
            padding: "14px 32px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
