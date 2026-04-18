import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export async function appendSaleToSheet(data: {
  nombre: string;
  email: string;
  fechaEvento: string;
  tipoTicket: string;
  monto: number;
  paymentId: string;
}) {
  const sheets = google.sheets({ version: 'v4', auth });
  
  const fechaCompra = new Date().toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Hoja1!A:H',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        fechaCompra,
        data.nombre,
        data.email,
        data.fechaEvento,
        data.tipoTicket,
        data.monto,
        data.paymentId,
        'Confirmado',
      ]],
    },
  });
}