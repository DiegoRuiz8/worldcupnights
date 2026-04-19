import { NextRequest } from "next/server";
import { Preference } from "mercadopago";
import { mpClient } from "@/lib/mercadopago";

const TICKET_BASES = {
  entry: { label: "Entry Ticket", unit_price: 700 },
  "open-bar": { label: "Open Bar", unit_price: 1100 },
} as const;

export async function POST(request: NextRequest) {
  const { items, date } = await request.json();

  if (!items || !Array.isArray(items) || items.length === 0) {
    return Response.json({ error: "No items" }, { status: 400 });
  }

  const dayNum = date ? date.replace("June ", "").replace("Junio ", "") : "";
  const fechaEvento = `June ${dayNum}`;

  const mpItems = items
    .filter((item: { ticketType: string; quantity: number }) =>
      item.quantity > 0 && item.ticketType in TICKET_BASES
    )
    .map((item: { ticketType: string; quantity: number }) => {
      const base = TICKET_BASES[item.ticketType as keyof typeof TICKET_BASES];
      return {
        id: item.ticketType,
        title: `World Cup Nights — ${base.label} · June ${dayNum} (${item.quantity} ticket${item.quantity > 1 ? "s" : ""})`,
        quantity: item.quantity,
        unit_price: base.unit_price,
        currency_id: "MXN",
      };
    });

  if (mpItems.length === 0) {
    return Response.json({ error: "Invalid items" }, { status: 400 });
  }

  const tipoTicket = mpItems
    .map((i: { quantity: number; title: string }) =>
      `${i.quantity}x ${i.title.split("—")[1]?.trim()}`
    )
    .join(", ");

  const totalTickets = items.reduce(
    (sum: number, i: { quantity: number }) => sum + i.quantity, 0
  );

  const preference = new Preference(mpClient);

  let result;
  try {
    result = await preference.create({
      body: {
        items: mpItems,
        metadata: {
          fecha_evento: fechaEvento,
          tipo_ticket: tipoTicket,
          total_tickets: totalTickets,
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
    console.error("[checkout] failed:", error.message);
    return Response.json({ error: "MercadoPago error" }, { status: 500 });
  }

  console.log("[checkout] items sent to MP:", JSON.stringify(mpItems, null, 2));
  return Response.json({ checkoutUrl: result.init_point });
}