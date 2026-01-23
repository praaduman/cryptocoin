import CoinOverview from "@/components/home/CoinOverview"
import { Suspense } from "react"
import TrendingCoins from "@/components/home/TrendingCoins"
const page = async() => {
  return (
  <main className="main-container">
    <section className="home-grid">
      <Suspense fallback={<div>Loading Coin Overview...</div>}>
        <CoinOverview />
      </Suspense>

      <Suspense fallback={<div>Loading Trending Coins...</div>}>
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