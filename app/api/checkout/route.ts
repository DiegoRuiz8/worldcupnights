import { NextRequest } from "next/server";
import { Preference } from "mercadopago";
import { mpClient } from "@/lib/mercadopago";

const TICKET_BASES = {
  entry: { label: "Entry Ticket", unit_price: 700 },
  "open-bar": { label: "Open Bar", unit_price: 1100 },
} as const;

export async function POST(request: NextRequest) {
  const { ticketType, date } = await request.json();

  if (!(ticketType in TICKET_BASES)) {
    return Response.json({ error: "Invalid ticket type" }, { status: 400 });
  }

  const base = TICKET_BASES[ticketType as keyof typeof TICKET_BASES];
  const dayNum = date ? date.replace("June ", "") : "";
  const itemTitle = `World Cup Nights — ${base.label} · June ${dayNum}`;
  const fechaEvento = `June ${dayNum}`;
  const tipoTicket = base.label;

  const preference = new Preference(mpClient);

  let result;
  try {
    result = await preference.create({
      body: {
        items: [
          {
            id: ticketType,
            title: itemTitle,
            quantity: 1,
            unit_price: base.unit_price,
            currency_id: "MXN",
          },
        ],
        metadata: {
          fecha_evento: fechaEvento,
          tipo_ticket: tipoTicket,
          source: "worldcupnights-web",
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/success?fecha=${encodeURIComponent(fechaEvento)}&ticket=${encodeURIComponent(tipoTicket)}`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/failure`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/success?fecha=${encodeURIComponent(fechaEvento)}&ticket=${encodeURIComponent(tipoTicket)}`,
        },
        auto_return: "approved",
        statement_descriptor: "WORLDCUPNIGHTS",
      },
    });
  } catch (err) {
    const error = err as Error & { cause?: unknown };
    console.error("[checkout] MercadoPago preference.create failed");
    console.error("[checkout] message:", error.message);
    console.error("[checkout] cause:", error.cause);
    console.error("[checkout] full error:", err);
    return Response.json({ error: "MercadoPago error" }, { status: 500 });
  }

  console.log("[checkout] preference created, init_point:", result.init_point);
  return Response.json({ checkoutUrl: result.init_point });
}