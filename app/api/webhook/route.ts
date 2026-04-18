import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { appendSaleToSheet } from "@/lib/sheets";
import { sendConfirmationEmail } from "@/lib/resend";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.type !== "payment") {
      return NextResponse.json({ ok: true });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      return NextResponse.json({ ok: true });
    }

    const payment = new Payment(client);
    const paymentData = await payment.get({ id: paymentId });

    if (paymentData.status !== "approved") {
      return NextResponse.json({ ok: true });
    }

    const nombre = paymentData.payer?.first_name
      ? `${paymentData.payer.first_name} ${paymentData.payer.last_name || ""}`.trim()
      : "Guest";
    const email = paymentData.payer?.email || "";

    const { fecha_evento, tipo_ticket } = paymentData.metadata || {};
    const fechaEvento = fecha_evento || "N/A";
    const tipoTicket = tipo_ticket || "N/A";
    const monto = paymentData.transaction_amount || 0;

    await appendSaleToSheet({
      nombre,
      email: email || "N/A",
      fechaEvento,
      tipoTicket,
      monto,
      paymentId: String(paymentId),
    });

    if (email) {
      await sendConfirmationEmail({
        nombre,
        email,
        fechaEvento,
        tipoTicket,
        monto,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}