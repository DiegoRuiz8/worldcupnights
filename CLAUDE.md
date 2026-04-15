# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

There are no tests.

## Stack

- **Next.js 16.2.3** (App Router) · **React 19.2.4** · **TypeScript**
- **Tailwind CSS v4** — configured via `@import "tailwindcss"` in `globals.css`; custom tokens defined in `@theme inline` block
- **MercadoPago SDK** (`mercadopago ^2.12.0`) — payment integration not yet wired; `handleCheckout()` in `page.tsx` is a stub

## Architecture

Single-page marketing/booking site for a World Cup 2026 party bus in Guadalajara. The entire page lives in `app/page.tsx` — one large "use client" component with inline styles throughout.

**Fonts** (loaded in `app/layout.tsx`):
- `--font-bebas` → Bebas Neue (headings)
- `--font-dm-sans` → DM Sans (body)

Both are also aliased as Tailwind theme tokens `--font-heading` / `--font-body` in `globals.css`.

**Brand colors**: `#0a0a0a` background, `#FF6B2B` orange accent.

**Bilingual copy**: All EN/ES strings live in a single `copy` object at the top of `page.tsx`. Active language is React state (`lang`). When adding copy, add both `en` and `es` keys.

**`app/components/Hero.tsx`** is an earlier standalone Hero component that is not currently used by `page.tsx`. It uses Tailwind classes (unlike `page.tsx`'s inline style approach) and references `/bus-hero-horizontal.png` which has been deleted.

## Key conventions

- `page.tsx` uses inline `style={{}}` props, not Tailwind classes — keep new additions consistent with whichever approach is already used in the section being edited.
- Section IDs for anchor nav: `#experience`, `#tickets`, `#route`, `#faq`.
- Ticket tiers: `"entry"` and `"open-bar"` — these strings flow into `handleCheckout()`.


## Contexto del negocio
World Cup Nights — experiencia de party bus de doble piso en Guadalajara durante el Mundial FIFA 2026.

### Diseño
- Background: #0a0a0a | Acento: #FF6B2B | Fuentes: Bebas Neue (títulos), DM Sans (cuerpo)

### Producto
- Ticket Entry: acceso al bus, DJ, hosts locales, bebidas a la venta
- Ticket Open Bar: todo lo anterior + tequila premium ilimitado, prioridad de abordaje

### Pagos
- Proveedor: MercadoPago (NO Stripe, NO PayPal)
- Flujo: botón → handleCheckout(ticketType) → crear preferencia MP → redirect a MP checkout
- Las credenciales van en .env.local: MP_ACCESS_TOKEN y NEXT_PUBLIC_MP_PUBLIC_KEY

### Estado actual
- La landing page visual está 100% completa
- Siguiente paso: implementar el flujo de pago real con MercadoPago