import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(data: {
  nombre: string;
  email: string;
  fechaEvento: string;
  tipoTicket: string;
  monto: number;
}) {
  const isOpenBar = data.tipoTicket === "Open Bar";

  await resend.emails.send({
    from: "World Cup Nights <hola@worldcupnights.lat>",
    to: data.email,
    subject: `🎉 You're in! World Cup Nights — ${data.fechaEvento}`,
    html: `
      <div style="background:#000;color:#fff;font-family:sans-serif;padding:40px;max-width:600px;margin:0 auto;">
<img src="https://worldcupnights.lat/logo-orange.jpeg" alt="World Cup Nights" style="width:200px;margin-bottom:32px;border-radius:8px;" />        
        <h1 style="color:#FF6B00;font-size:28px;margin-bottom:8px;">You're confirmed! 🏆</h1>
        <p style="color:#ccc;font-size:16px;margin-bottom:32px;">
          Get ready for Guadalajara's wildest World Cup night.
        </p>

        <div style="background:#111;border:1px solid #333;border-radius:12px;padding:24px;margin-bottom:32px;">
          <h2 style="color:#fff;font-size:18px;margin-bottom:16px;">Your Booking</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="color:#888;padding:8px 0;">Name</td>
              <td style="color:#fff;text-align:right;">${data.nombre}</td>
            </tr>
            <tr>
              <td style="color:#888;padding:8px 0;">Date</td>
              <td style="color:#FF6B00;text-align:right;font-weight:bold;">${data.fechaEvento}</td>
            </tr>
            <tr>
              <td style="color:#888;padding:8px 0;">Ticket</td>
              <td style="color:#fff;text-align:right;">${data.tipoTicket}</td>
            </tr>
            <tr>
              <td style="color:#888;padding:8px 0;">Amount</td>
              <td style="color:#fff;text-align:right;">$${data.monto} MXN</td>
            </tr>
          </table>
        </div>

        <div style="background:#111;border:1px solid #333;border-radius:12px;padding:24px;margin-bottom:32px;">
          <h2 style="color:#fff;font-size:18px;margin-bottom:16px;">📍 Meeting Point</h2>
          <p style="color:#ccc;margin:0;">Plaza Liberación, Centro Histórico</p>
          <p style="color:#ccc;margin:4px 0;">Guadalajara, Jalisco</p>
          <p style="color:#FF6B00;margin:8px 0 0;font-weight:bold;">9:00 PM sharp ⚡</p>
        </div>

        ${
          isOpenBar
            ? `
        <div style="background:#1a0a00;border:1px solid #FF6B00;border-radius:12px;padding:24px;margin-bottom:32px;">
          <p style="color:#FF6B00;margin:0;font-weight:bold;">🥃 Open Bar included — drink all night on us.</p>
        </div>
        `
            : ""
        }

        <div style="margin-bottom:32px;">
          <h2 style="color:#fff;font-size:18px;margin-bottom:12px;">What to know</h2>
          <ul style="color:#ccc;padding-left:20px;line-height:1.8;">
            <li>Show this email at boarding</li>
            <li>Arrive on time — bus leaves at 9:00 PM</li>
            <li>Dress code: come ready to party</li>
            <li>Bilingual hosts on board all night</li>
          </ul>
        </div>

        <p style="color:#555;font-size:13px;border-top:1px solid #222;padding-top:24px;">
          Questions? WhatsApp us or reply to this email.<br/>
          World Cup Nights · Guadalajara, Mexico
        </p>
        <p style="color:#888;font-size:13px;margin-top:24px;padding-top:16px;border-top:1px solid #222;">
          📬 If this email landed in spam, please mark it as "Not Spam" to ensure
          you receive important updates about your night.
        </p>
      </div>
    `,
  });
}
