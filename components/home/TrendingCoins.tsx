
import DataTable from '../DataTable';
import { fetcher } from '@/lib/coingecko.actions';
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { TrendingUp,TrendingDown } from "lucide-react"



const TrendingCoins = async () => {
     const columns: DataTableColumn<TrendingCoin>[] =[

    { header:'Name',
      cellClassName:'name-cell',
      cell:(coin)=>{
        const item = coin.item;
        return (
          <Link href={`/coin/${item.id}`}>
            <Image src={item.large} alt={item.id} width={36}
            height={36}/>
            <p>{item.name}</p>
          </Link>
        )

      }
    },
    {
      header:'24 Change',
      cellClassName:'name-cell',
      cell:(coin) =>{
        const item = coin.item;
        const isTrendingUp = item.data.price_change_percentage_24h.usd >=0;

        return(
          <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
            <p>
              {
                isTrendingUp ? (
                  <TrendingUp height={16} width={16} />
                ): 
                 (<TrendingDown height={16} width={16} />)
              }
              {Math.abs(item.data.price_change_percentage_24h.usd).toFixed(2)}%
            </p>
          </div>
        )
      }
    },
    {
      header:'Price',
      cellClassName:'price-cell',
      cell:(coin) => coin.item.data.price
    }
  ];
  
  const trendingCoins = await fetcher<{coins: TrendingCoin[]}>('search/trending', undefined ,300);

  return (
    <div className='trending-coins'>
      <h4>Trending Coins</h4>
      <div>
      <DataTable data={trendingCoins.coins.slice(0,6)|| []}
      columns={columns}
      rowKey={(coin)=>coin.item.id}
      tableClassName='trending-coins-table' 
       />
     </div>
    </div>
  )
}

export default TrendingCoins