import DataTable from '../DataTable';
import { fetcher } from '@/lib/coingecko.actions';
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import { TrendingCoinsFallback } from './fallback';

// Async Server Component: data is fetched before HTML is rendered
const TrendingCoins = async () => {
  let trendingCoins;

  try {
    // Fetch trending coin data from CoinGecko via a shared fetch utility
    // 300 = cache revalidation time (in seconds)
    trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
      '/search/trending',
      undefined,
      300
    );
  } catch (error) {
    // If API fails, render a fallback UI instead of breaking the page
    console.error('Error fetching trending coins:', error);
    return <TrendingCoinsFallback />;
  }

  // Column definitions for the reusable DataTable component
  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: 'Name',
      cellClassName: 'name-cell',
      cell: (coin) => {
        const item = coin.item;
        return (
          <Link href={`/coins/${item.id}`}>
            <Image src={item.large} alt={item.id} width={36} height={36} />
            <p>{item.name}</p>
          </Link>
        );
      }
    },
    {
      header: '24 Change',
      cellClassName: 'name-cell',
      cell: (coin) => {
        const item = coin.item;

        // Used to decide color and icon (up/down)
        const isTrendingUp =
          item.data.price_change_percentage_24h.usd >= 0;

        return (
          <div
            className={cn(
              'price-change',
              isTrendingUp ? 'text-green-500' : 'text-red-500'
            )}
          >
            <p>
              {isTrendingUp ? (
                <TrendingUp height={16} width={16} />
              ) : (
                <TrendingDown height={16} width={16} />
              )}
              {Math.abs(
                item.data.price_change_percentage_24h.usd
              ).toFixed(2)}%
            </p>
          </div>
        );
      }
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (coin) => coin.item.data.price
    }
  ];

  return (
    <div className='trending-coins'>
      <h4>Trending Coins</h4>
      <DataTable
        // Only show top 6 trending coins
        data={trendingCoins.coins.slice(0, 6) || []}
        columns={columns}
        // Stable unique key for React reconciliation
        rowKey={(coin) => coin.item.id}
        tableClassName='trending-coins-table'
        headerCellClassName='py-3'
        bodyCellClassName='py-3'
      />
    </div>
  );
};

export default TrendingCoins;
