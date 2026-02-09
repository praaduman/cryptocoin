import { formatCurrency } from '@/lib/utils';
import { fetcher } from '@/lib/coingecko.actions';
import Image from 'next/image';
import { CoinOverviewFallback } from './fallback';
import CandlestickChart from '../CandlestickChart';

const CoinOverview = async () => {
  

  try {
    // Server-side fetch of Bitcoin data before rendering
    // render them parallely using promise.all  
    const[coin, coinOHLCData] =await Promise.all([
       fetcher<CoinDetailsData>(
      '/coins/bitcoin',
      { dex_pair_format: 'symbol' }
    ),
       fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
      vs_currency: 'usd',
      days: 1,
      // interval: 'hourly',  
      // precision: 'full',
    })
    ])
      
    return (
    <div className="coin-overview">
      <CandlestickChart data={coinOHLCData} coinId="bitcoin">
          <div className="header pt-2">
            <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
            <div className="info">
              <p>
                {coin.name} / {coin.symbol.toUpperCase()}
              </p>
              <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
            </div>
          </div>
        </CandlestickChart>
    </div>
  );

  } catch (error) {
    // Graceful UI fallback if API request fails
    console.error('Error fetching coin overview:', error);
    return <CoinOverviewFallback />;
  }



};

export default CoinOverview;
