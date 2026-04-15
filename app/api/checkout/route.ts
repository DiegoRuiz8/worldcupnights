import { NextRequest } from "next/server";
import { Preference } from "mercadopago";
import { mpClient } from "@/lib/mercadopago";

const TICKETS = {
  entry: { title: "World Cup Nights — Entry", unit_price: 700 },
  "open-bar": { title: "World Cup Nights — Open Bar", unit_price: 1100 },
} as const;

export async function POST(request: NextRequest) {
  const { ticketType } = await request.json();

  if (!(ticketType in TICKETS)) {
    return Response.json({ error: "Invalid ticket type" }, { status: 400 });
  }

  const ticket = TICKETS[ticketType as keyof typeof TICKETS];
  const preference = new Preference(mpClient);

  let result;
  try {
    result = await preference.create({
      body: {
        items: [
          {
            id: ticketType,
            title: ticket.title,
            quantity: 1,
            unit_price: ticket.unit_price,
            currency_id: "MXN",
          },
        ],
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
