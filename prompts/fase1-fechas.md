Create a new component app/components/DateSelector.tsx

This is a date picker for World Cup Nights events. Requirements:

DATA — hardcode these event dates (June 2026):
const eventDates = [5, 6, 10, 11, 12, 13, 17, 18, 19, 20, 23, 24, 25, 26, 27]
All are June 2026. Format display as "June 5", "June 6", etc. (EN) / "5 de junio", etc. (ES)

PROPS the component receives:
- lang: 'en' | 'es'
- onSelect: (date: string) => void  ← called when user picks a date
- selectedDate: string | null

UI:
- Title: "Choose Your Night" (EN) / "Elige Tu Noche" (ES)
- Display dates as a grid of clickable cards (3-4 columns on desktop, 2 on mobile)
- Each card shows: day number large (Bebas Neue font, 32px), month small below
- Selected card: orange border (#FF6B2B) + orange background rgba(255,107,43,0.15)
- Unselected card: dark card, border rgba(255,255,255,0.1), hover shows orange border
- Below the grid, show: "📍 Fan Fest · Plaza Liberación, Centro Histórico · 9:00 PM"
- Also show: "🔄 Free date change up to 48hrs before · No refunds"
  ES: "🔄 Cambio de fecha gratis hasta 48hrs antes · Sin reembolsos"
- Spots counter below each date: show "~40 spots available" for now (we'll make this dynamic later)

Style: match existing dark theme #0a0a0a, accent #FF6B2B, Bebas Neue headings, DM Sans body

Now integrate the DateSelector component into app/page.tsx:

1. Add state: const [selectedDate, setSelectedDate] = useState<string | null>(null)

2. Add a new section BETWEEN the hero and the experience section with id="dates":
   - Section background: #0a0a0a
   - Render <DateSelector lang={lang} selectedDate={selectedDate} onSelect={setSelectedDate} />

3. UPDATE the hero buttons:
   - "Book Your Spot" / "Reserva tu lugar" → change onClick to scroll to #dates section
     document.getElementById('dates')?.scrollIntoView({ behavior: 'smooth' })
   - "Book Now" in navbar → same, scroll to #dates

4. UPDATE the ticket buttons (Reserve Entry Ticket / Reserve Open Bar):
   - If no date is selected: show a toast/alert saying 
     EN: "Please select a date first" 
     ES: "Primero elige una fecha"
   - If date IS selected: call handleCheckout(ticketType, selectedDate)

5. UPDATE handleCheckout function signature to accept selectedDate:
   handleCheckout(ticketType: 'entry' | 'open-bar', date: string)
   Pass the date to the API as part of the request body.


   Update app/api/checkout/route.ts to include the selected date in the MercadoPago preference:

1. Accept 'date' in the request body alongside ticketType
2. Include the date in the preference item title:
   - Entry: "World Cup Nights — Entry Ticket · June {date}"
   - Open Bar: "World Cup Nights — Open Bar · June {date}"
3. Add the date as metadata in the preference:
   metadata: { ticketType, date, source: 'worldcupnights-web' }
4. Add statement_descriptor: "WORLDCUPNIGHTS" 
   (this is what appears on the buyer's bank statement)

No other changes.