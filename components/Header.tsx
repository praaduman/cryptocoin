"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { SearchModal } from "./SearchModal"

const Header = ({ trendingCoins }: { trendingCoins: TrendingCoin[] }) => {
  const pathname = usePathname();

  return (
    <header>
      <div className="main-container inner">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={60} height={15} />
        </Link>
        <nav>
          <Link href="/" className={cn('nav-link', {
            'is-active': pathname === '/',
          })}>Home</Link>

          <Link href="/coins" className={cn('nav-link', {
            'is-active': pathname === '/coins',
          })}>All Coins</Link>

          <SearchModal initialTrendingCoins={trendingCoins} />
        </nav>
      </div>
    </header>
  )
}
   

export default Header