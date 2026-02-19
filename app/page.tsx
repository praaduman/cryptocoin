import CoinOverview from "@/components/home/CoinOverview"
import { Suspense } from "react"
import TrendingCoins from "@/components/home/TrendingCoins"
import { CategoriesFallback, TrendingCoinsFallback } from "@/components/home/fallback"
import { CoinOverviewFallback } from "@/components/home/fallback"
import Categories from "@/components/home/Categories"


const page = async() => {
  return (
  <main className="main-container">
     <section className="home-grid">
          <div className="coin-overview-wrapper">
            <Suspense fallback={<CoinOverviewFallback />}>
                <CoinOverview />
            </Suspense>
          </div>
          <div className="trending-coins-wrapper">
             <Suspense fallback={<TrendingCoinsFallback />}>
                 <TrendingCoins />
              </Suspense>
          </div>
      </section>
    

      <section className="w-full mt-7 space-y-4">
         <Suspense fallback={<CategoriesFallback />}>
             <Categories />
        </Suspense>
      </section>

  </main>
  )
}

export default page