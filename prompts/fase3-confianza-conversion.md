# Fase 3 — Confianza y conversión

## Phase 1 of 3 — Expandir FAQ

In app/page.tsx, replace the entire FAQ copy object (EN and ES) with these expanded versions.
Do not touch layout or styles, only the copy object values.

EN — replace existing faq entries and ADD new ones:
faq: [
{
q: "When does it run?",
a: "June 5, 6, 10, 11, 12, 13, 17, 18, 19, 20, 23, 24, 25, 26 and 27. One departure per night at 9:00 PM from Plaza Liberación, Centro Histórico."
},
{
q: "Where do we meet?",
a: "Fan Fest at Plaza Liberación, Centro Histórico, Guadalajara. We recommend arriving 15 minutes early. Exact boarding instructions sent after booking."
},
{
q: "Can I come alone?",
a: "Absolutely. Most people do. The experience is designed to connect people — you will not feel out of place."
},
{
q: "Is it good if I don't speak Spanish?",
a: "Yes. Our hosts are bilingual (English/Spanish) and the crowd is international. No Spanish needed."
},
{
q: "How long is the experience?",
a: "Approximately 3 hours. Departure at 9:00 PM, ending around midnight at a final nightlife spot in the city."
},
{
q: "How many people fit on the bus?",
a: "Maximum 40 people per night. We keep it intentionally small for a better social experience."
},
{
q: "Can I change my date?",
a: "Yes — free date change up to 48 hours before your selected night. No refunds."
},
{
q: "Is it safe?",
a: "Yes. Bilingual local hosts are with you the entire night, the route is curated through safe areas of the city, and capacity is limited so the group stays together."
},
{
q: "Is it safe for women attending alone?",
a: "Yes. We have a strict code of conduct, mixed groups, and hosts present at all times. Many solo female travelers choose this experience specifically because it removes the uncertainty of navigating nightlife alone."
},
{
q: "What is the dress code?",
a: "No formal dress code. Come as you are — football jersey, casual, or dressed up. The vibe is energetic but relaxed."
},
{
q: "Minimum age?",
a: "18+ with valid ID. No exceptions."
}
]

ES — same structure, translated:
faq: [
{
q: "¿Cuándo opera?",
a: "5, 6, 10, 11, 12, 13, 17, 18, 19, 20, 23, 24, 25, 26 y 27 de junio. Una salida por noche a las 9:00 PM desde Plaza Liberación, Centro Histórico."
},
{
q: "¿Dónde nos encontramos?",
a: "Fan Fest en Plaza Liberación, Centro Histórico, Guadalajara. Recomendamos llegar 15 minutos antes. Las instrucciones exactas de abordaje se envían después de reservar."
},
{
q: "¿Puedo ir solo/a?",
a: "Claro que sí. La mayoría lo hace. La experiencia está diseñada para conectar personas — no te vas a sentir fuera de lugar."
},
{
q: "¿Funciona si no hablo español?",
a: "Sí. Nuestros hosts son bilingües (inglés/español) y el grupo es internacional. No necesitas español."
},
{
q: "¿Cuánto dura la experiencia?",
a: "Aproximadamente 3 horas. Salida a las 9:00 PM, terminando alrededor de medianoche en un spot final de la ciudad."
},
{
q: "¿Cuántas personas caben en el camión?",
a: "Máximo 40 personas por noche. Lo mantenemos pequeño intencionalmente para una mejor experiencia social."
},
{
q: "¿Puedo cambiar mi fecha?",
a: "Sí — cambio de fecha gratis hasta 48 horas antes de tu noche seleccionada. Sin reembolsos."
},
{
q: "¿Es seguro?",
a: "Sí. Hosts locales bilingües están contigo toda la noche, la ruta pasa por zonas seguras de la ciudad y el cupo es limitado para que el grupo permanezca unido."
},
{
q: "¿Es seguro para mujeres que van solas?",
a: "Sí. Tenemos un código de conducta estricto, grupos mixtos y hosts presentes en todo momento. Muchas viajeras solo eligen esta experiencia precisamente porque elimina la incertidumbre de salir solas en una ciudad desconocida."
},
{
q: "¿Hay código de vestimenta?",
a: "No. Ven como quieras — jersey de fútbol, casual o arreglado. El ambiente es energético pero relajado."
},
{
q: "¿Edad mínima?",
a: "18+ con identificación válida. Sin excepciones."
}
]

## Phase 2 of 3 — Tickets con diferencia emocional

In app/page.tsx, update ONLY the ticket section copy in the copy object.
Do not touch prices, styles, or layout.

EN:

- tickets section title: "PICK YOUR NIGHT" (keep)
- t1Name: "ENTRY"
- Add a new field t1Tagline: "For the ones who want in"
- t1Features: keep existing 4 features
- Add below features a small italic line: "Show up, get on, enjoy the night."
- t1Btn: "Reserve Entry — $35 USD"

- t2Name: "OPEN BAR"
- Add t2Tagline: "For the full experience"
- t2Features: keep existing 4 features
- Add below features: "Zero friction. Full energy. Just drink and enjoy."
- t2Btn: "Reserve Open Bar — $55 USD"

ES:

- t1Tagline: "Para los que quieren estar ahí"
- Add: "Súbete, disfruta la noche."
- t1Btn: "Reservar Entrada — $700 MXN"
- t2Tagline: "Para la experiencia completa"
- Add: "Sin fricciones. Energía total. Solo disfruta."
- t2Btn: "Reservar Barra Libre — $1,100 MXN"

Display the tagline below the ticket name in smaller text (14px, rgba(255,255,255,0.6)).
Display the italic line below the features list in 12px italic rgba(255,255,255,0.4).

## Phase 3 of 3 — WhatsApp real en footer y trust signals

1. In app/page.tsx, update the WhatsApp link in the footer:
   Change the WhatsApp text/link to open: https://wa.me/52XXXXXXXXXX
   (placeholder number — I will replace with real number later)
   Add target="\_blank" rel="noopener noreferrer"

2. Add a small trust bar ABOVE the footer, full width, border-t border-white/10, py-6:
   Display these 4 items centered in a row (flex, gap-8, wrap on mobile):
   - "✓ Secure checkout via MercadoPago"
   - "✓ Bilingual hosts · EN/ES"
   - "✓ Max 40 seats per night"
   - "✓ Free date change · 48hrs notice"

   ES version:
   - "✓ Pago seguro con MercadoPago"
   - "✓ Hosts bilingües · EN/ES"
   - "✓ Máx 40 lugares por noche"
   - "✓ Cambio de fecha gratis · 48hrs de aviso"

   Style: text-xs, color rgba(255,255,255,0.5), use lang state for EN/ES switch
