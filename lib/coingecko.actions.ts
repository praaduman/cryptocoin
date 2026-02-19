"use server";

import queryString from "query-string";

const BASE_URL = process.env.COINGECKO_BASE_URL ;
const API_KEY = process.env.COINGECKO_API_KEY;

if(!BASE_URL) throw new Error("Could not get base url");
if(!API_KEY) throw new Error("Could not get api url");


export async function fetcher<T>(
	endpoint: string,
	params?: QueryParams,
	revalidate = 60,
): Promise<T> {
	const url = queryString.stringifyUrl(
		{
			url: `${BASE_URL}/${endpoint}`,
			query: params,
		},
		{ skipEmptyString: true, skipNull: true },
	);
	const response = await fetch(url, {
		headers: {
		'x-cg-demo-api-key': API_KEY,
		'Content-Type': 'application/json',
		} as Record<string, string>,
		next: { revalidate },
	});

	if (!response.ok) {
		const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));

		throw new Error(`API Error: ${response.status}: ${errorBody.error || response.statusText} `);
	}

	return response.json();
}
// lib/coingecko.actions.ts


// lib/coingecko.actions.ts


export async function searchCoins(query: string): Promise<SearchCoin[]> {
  // FETCH 1: Get matching coins by name/symbol
  const searchRes = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
  const searchData = await searchRes.json();

  // EXTRACTION: Top 10 coin IDs
  const topCoins = searchData.coins.slice(0, 10);
  const ids = topCoins.map((c: { id: string }) => c.id).join(",");

  if (!ids) return [];

  // FETCH 2: Get market data for those IDs
  const marketRes = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&ids=${ids}&price_change_percentage=24h`
  );
  const marketData = await marketRes.json();

  // MERGE: Shape the data to match SearchCoin type
  return marketData.map((coin: any) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    thumb: coin.image,
    data: {
      price_change_percentage_24h: coin.price_change_percentage_24h ?? 0,
    },
  }));
}