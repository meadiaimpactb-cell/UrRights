# UrRights — حقوقك

Multilingual labor-rights platform for migrant workers in Saudi Arabia.
منصة متعددة اللغات للتوعية بالحقوق العمالية ومساندة العمالة الوافدة في السعودية.

## Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Hono + tRPC 11 + Drizzle ORM + MySQL
- **Auth**: OAuth 2.0 (Kimi) with JWT sessions, roles: `user` / `agent` / `admin`

## Features

- Public site in 6 languages (Arabic, English, Urdu, Hindi, Indonesian, Filipino) with RTL/LTR support and CMS-driven copy
- Live chat between beneficiaries and staff with automatic translation
- WhatsApp deep links and social links, all editable from the admin panel
- Admin panel (Arabic/English): content management, language management, partners, help requests, chat queue, user & role management

## Development

```bash
npm install
cp .env.example .env   # fill in the values
npm run db:push        # create tables
npx tsx db/seed.ts     # seed languages + site content
npm run dev            # http://localhost:3000
```

## Production

```bash
npm run build
npm start              # NODE_ENV=production node dist/boot.js
```
