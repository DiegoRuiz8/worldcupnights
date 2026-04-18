import { NextRequest, NextResponse } from "next/server";
import { sendConfirmationEmail } from "@/lib/resend";

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  await sendConfirmationEmail({
    nombre: body.nombre,
    email: body.email,
    fechaEvento: body.fechaEvento,
    tipoTicket: body.tipoTicket,
    monto: body.monto,
  });

  return NextResponse.json({ ok: true });
}