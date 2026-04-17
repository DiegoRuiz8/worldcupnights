# Fase 2 — Hero y conversión

## Phase 1 of 3 — Rewrite hero copy

In app/page.tsx, update ONLY the copy object for the hero section (EN and ES). 
Do not touch any styles, layout, or other sections.

EN changes:
- eyebrow: "Guadalajara · World Cup 2026" → "Guadalajara · 15 Match Nights · June 2026"
- heroTitle1: "THE NIGHT" → "GUADALAJARA'S"
- heroTitle2: "IS" → "WILDEST"  
- heroHighlight: "YOURS" → "WORLD CUP NIGHT"
- heroSub: replace with → "A curated double-decker party bus for fans, travelers, and locals who want more than just another bar. Music, premium drinks, local hosts — one unforgettable night."
- heroCta1: "Book Your Spot" → "Choose Your Night"
- heroCta2: "See What's Included" → "See What's Included" (no change)
- heroBadge: "Running every match night during the World Cup" → "Limited to 40 seats per night · June 2026"

ES changes:
- eyebrow: "Guadalajara · Copa Mundial 2026" → "Guadalajara · 15 Noches · Junio 2026"
- heroTitle1: "LA NOCHE" → "LA NOCHE"  
- heroTitle2: "ES" → "MÁS"
- heroHighlight: "TUYA" → "ÉPICA DEL MUNDIAL"
- heroSub: → "Un camión de dos pisos curado para fans, viajeros y locales que quieren más que una noche normal. Música, tequila premium, hosts locales — una noche que no vas a olvidar."
- heroCta1: "Reserva tu lugar" → "Elige Tu Noche"
- heroBadge: → "Solo 40 lugares por noche · Junio 2026"

## Phase 2 of 3 — Add urgency strip below hero

In app/page.tsx, add a thin urgency bar BETWEEN the hero section and the dates section.
It should be a full-width strip, background #FF6B2B, padding py-3.

Content (centered, single line on desktop, wraps on mobile):
EN: "🔥 15 match nights · 40 seats max per night · Prices increase closer to match dates"
ES: "🔥 15 noches de partido · Máximo 40 lugares por noche · Precios suben conforme se acercan las fechas"

Style: text-black font-medium text-sm, Bebas Neue font, letter-spacing wide
Use the lang state already in the page to switch between EN/ES.

## Phase 3 of 3 — Improve Experience section copy

In app/page.tsx, update ONLY the 4 pillar descriptions in the copy object.
Rewrite them to resolve objections, not just list features.

EN:
- p1Title: "No Random Crowd" | p1Body: "We cap every night at 40 people. Curated group, better energy, better connections."
- p2Title: "Real Mexican Spirits" | p2Body: "Not well drinks. Actual premium tequila and mezcal. Open bar means open bar."
- p3Title: "Never Feel Lost" | p3Body: "Bilingual local hosts from start to finish. They know the city, the spots, and how to keep the night alive."
- p4Title: "The Best of the City" | p4Body: "Centro Histórico, Chapultepec, Fan Zone — iconic Guadalajara nightlife in one night, no planning needed."

ES:
- p1Title: "Sin Crowd Aleatorio" | p1Body: "Máximo 40 personas por noche. Grupo curado, mejor energía, mejores conexiones."
- p2Title: "Spirits Mexicanos Reales" | p2Body: "No es alcohol de mala calidad. Tequila y mezcal premium de verdad. Barra libre significa barra libre."
- p3Title: "Nunca Te Pierdes" | p3Body: "Hosts locales bilingües de principio a fin. Conocen la ciudad, los spots y cómo mantener la noche viva."
- p4Title: "Lo Mejor de la Ciudad" | p4Body: "Centro Histórico, Chapultepec, Fan Zone — lo mejor de Guadalajara en una sola noche, sin planear nada."