import CoinOverview from "@/components/home/CoinOverview"
import { Suspense } from "react"
import TrendingCoins from "@/components/home/TrendingCoins"
import { TrendingCoinsFallback } from "@/components/home/fallback"
import { CoinOverviewFallback } from "@/components/home/fallback"

const page = async() => {
  return (
  <main className="main-container">
     <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>

        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>

    <section className="">
      <p>Categories</p>
    </section>

  </main>
  )
}

export default page