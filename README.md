🚀 Crypto Currency Tracker

A production-ready cryptocurrency tracking application built with Next.js App Router and powered by the CoinGecko API.

Inspired by a JavaScript Mastery YouTube tutorial, this project goes beyond the base implementation with improved architecture, server-driven rendering, performance optimizations, and modular system design.

✨ Features
📊 Coin Overview Dashboard

Server-rendered Bitcoin overview

Interactive candlestick chart using lightweight-charts

Dynamic period switching (daily, weekly, monthly)

Parallel API fetching with Promise.all

Streaming UI using React Suspense with skeleton fallbacks

🔥 Trending Coins

Live trending market data from CoinGecko

24h gain/loss indicators with directional icons

Controlled cache revalidation

Built using a reusable generic DataTable<T> system

📈 Top Categories

Market cap, 24h change, and 24h volume

Top 3 coins per category

Consistent currency and percentage formatting

🪙 Detailed Coin Pages

Market cap, rank, volume, and performance metrics

30-day percentage tracking

External links (website, explorer, community)

Expandable description section

Integrated multi-currency converter

📚 Global Coin Listing

Pagination with dynamic page number generation

Ellipsis handling for large datasets

Client-side navigation via Next.js router

⌨️ Command-Based Search (⌘ + K / Ctrl + K)

Debounced input handling

SWR-powered data fetching

Dual-fetch search flow (search endpoint → market data merge)

Trending fallback when no query is entered

OS-aware keyboard shortcut detection

🏗 Architecture & Engineering Decisions
Server-Driven Data Layer

Custom generic fetcher<T> utility

Query-string parameter handling

Environment-based API configuration

Incremental Static Regeneration via configurable revalidation

Structured error handling

Secure API key management via environment variables

Explicit server actions using "use server"

Smart Search Pipeline

Search is implemented in two steps:

Coin ID lookup via /search

Market data retrieval via /coins/markets

Results are merged into a consistent UI-ready structure

This avoids incomplete market data from the default search endpoint.

Rendering Strategy

Server Components for data-heavy views

Client Components for charts, search, pagination, and converter

Parallel data fetching

Suspense-based streaming for improved perceived performance

Dedicated skeleton fallback components for every major section

🛠 Tech Stack

Next.js (App Router)

React 18

TypeScript

CoinGecko API

lightweight-charts

SWR

Tailwind CSS

Lucide Icons

query-string

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
