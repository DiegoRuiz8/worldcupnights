import Link from "next/link";

export default function FailurePage() {
  return (
    <main style={{
      background: "#000",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "sans-serif",
    }}>
      <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>
        
        <div style={{ fontSize: "64px", marginBottom: "24px" }}>😔</div>
        
        <h1 style={{ color: "#fff", fontSize: "32px", marginBottom: "12px" }}>
          Payment didn't go through
        </h1>
        
        <p style={{ color: "#ccc", fontSize: "18px", marginBottom: "32px" }}>
          No worries — your spot is still available. Try again or contact us on WhatsApp.
        </p>

        <Link href="/" style={{
          display: "inline-block",
          background: "#FF6B00",
          color: "#fff",
          padding: "14px 32px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
          marginRight: "12px",
        }}>
          Try Again
        </Link>
      </div>
    </main>
  );
}