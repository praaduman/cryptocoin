import { fetcher } from '@/lib/coingecko.actions';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { formatCurrency, formatPercentage, cn } from '@/lib/utils';
import Converter from '@/components/Converter';
import DescriptionToggle from '@/components/DescriptionToggle';

const Page = async ({ params }: NextPageProps) => {
  const { id } = await params;

  const coinData = await fetcher<CoinDetailsData>(`/coins/${id}`, {
    localization: false,
    tickers: false,
    community_data: false,
    developer_data: false,
  });

  const priceChange24h = coinData.market_data.price_change_percentage_24h_in_currency.usd;
  const isTrendingUp = priceChange24h > 0;

  const coinDetails = [
    {
      label: 'Market Cap',
      value: formatCurrency(coinData.market_data.market_cap.usd),
    },
    {
      label: 'Market Cap Rank',
      value: `#${coinData.market_cap_rank}`,
    },
    {
      label: 'Total Volume',
      value: formatCurrency(coinData.market_data.total_volume.usd),
    },
    {
      label: '24h Price Change',
      value: formatCurrency(coinData.market_data.price_change_24h_in_currency.usd),
    },
    {
      label: '30d Price Change %',
      value: formatPercentage(coinData.market_data.price_change_percentage_30d_in_currency.usd),
    },
    {
      label: 'Website',
      value: '-',
      link: coinData.links.homepage[0],
      linkText: 'Homepage',
    },
    {
      label: 'Explorer',
      value: '-',
      link: coinData.links.blockchain_site[0],
      linkText: 'Explorer',
    },
    {
      label: 'Community',
      value: '-',
      link: coinData.links.subreddit_url,
      linkText: 'Community',
    },
  ];

  return (
    <main id="coin-details-page">
      <section className="primary">
        <div className="flex items-center gap-4 mb-6">
              <div className="relative">
    <div className="absolute inset-0 rounded-full blur-md opacity-40 bg-violet-500" />
    <Image
      src={coinData.image.large}
      alt={coinData.name}
      width={56}
      height={56}
      className="relative rounded-full"
    />
              </div>
        <div>
                <h4 className="text-xl font-bold text-white">{coinData.name}</h4>
                    <p className="text-sm font-medium text-white/40 tracking-widest uppercase">
                        {coinData.symbol.toUpperCase()}
                      </p>
          </div>  
        </div>

        <div className="flex items-end gap-3">
        <h2 className="text-4xl font-bold tracking-tight text-white">
            {formatCurrency(coinData.market_data.current_price.usd)}
        </h2>
      <span
        className={cn(
        'mb-1 inline-flex items-center rounded-md px-2.5 py-1 text-sm font-semibold',
        {
        'bg-green-500/10 text-green-400': isTrendingUp,
        'bg-red-500/10 text-red-400': !isTrendingUp,
        }
        )}
        >
        {isTrendingUp ? '▲' : '▼'} {isTrendingUp && '+'}{formatPercentage(priceChange24h)}
      </span>
    </div>

       {coinData.description?.en && (
  <DescriptionToggle name={coinData.name} html={coinData.description.en} />
)}
      </section>

      <section className="secondary">
        <Converter
          symbol={coinData.symbol}
          icon={coinData.image.small}
          priceList={coinData.market_data.current_price}
        />
        <div className="details">
          <h4>Coin Details</h4>
          <ul className="details-grid">
            {coinDetails.map(({ label, value, link, linkText }, index) => (
              <li key={index}>
                <p className={label}>{label}</p>
                {link ? (
                  <div className="link">
                    <Link href={link} target="_blank" rel="noopener noreferrer">
                      {linkText || label}
                    </Link>
                    <ArrowUpRight size={16} />
                  </div>
                ) : (
                  <p className="text-base font-medium">{value}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Page;