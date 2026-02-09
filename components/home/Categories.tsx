// Same fetch helper as before
// It goes to CoinGecko and brings category data back
import { fetcher } from '@/lib/coingecko.actions';

// Same table component used everywhere
import DataTable from '@/components/DataTable';

// Next.js optimized image component
import Image from 'next/image';

// Helper functions for class names and formatting numbers
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';

// Icons for up and down arrows
import { TrendingDown, TrendingUp } from 'lucide-react';

// A fallback UI shown when something goes wrong
import { CategoriesFallback } from './fallback';

// This component shows the "Top Categories" section on the home page
// It runs on the server because it is async
const Categories = async () => {
  try {
    // Step 1: Ask CoinGecko for coin categories
    const categories = await fetcher<Category[]>('/coins/categories');

    // Step 2: Define how the table should look
    const columns: DataTableColumn<Category>[] = [

      // Column 1: Category name
      {
        header: 'Category',
        cellClassName: 'category-cell',

        // Just show the category name
        cell: (category) => category.name,
      },

      // Column 2: Top gaining coins in this category
      {
        header: 'Top Gainers',
        cellClassName: 'top-gainers-cell',

        // category.top_3_coins is an array of image URLs
        // We loop over it and show coin icons
        cell: (category) =>
          category.top_3_coins.map((coin) => (
            <Image
              src={coin}
              alt={coin}
              key={coin}
              width={28}
              height={28}
            />
          )),
      },

      // Column 3: Market cap change in last 24 hours
      {
        header: '24h Change',
        cellClassName: 'change-header-cell',

        cell: (category) => {
          // Check if category is going up or down
          const isTrendingUp = category.market_cap_change_24h > 0;

          return (
            <div
              // Green if up, red if down
              className={cn(
                'change-cell',
                isTrendingUp ? 'text-green-500' : 'text-red-500'
              )}
            >
              <p className="flex items-center">
                {/* Show percentage change */}
                {formatPercentage(category.market_cap_change_24h)}

                {/* Show arrow icon */}
                {isTrendingUp ? (
                  <TrendingUp width={16} height={16} />
                ) : (
                  <TrendingDown width={16} height={16} />
                )}
              </p>
            </div>
          );
        },
      },

      // Column 4: Total market cap of this category
      {
        header: 'Market Cap',
        cellClassName: 'market-cap-cell',

        // Format big number nicely
        cell: (category) => formatCurrency(category.market_cap),
      },

      // Column 5: Trading volume in last 24 hours
      {
        header: '24h Volume',
        cellClassName: 'volume-cell',

        // Again, format number as currency
        cell: (category) => formatCurrency(category.volume_24h),
      },
    ];

    // Step 3: Render the section
    return (
      <div id="categories" className="custom-scrollbar">
        {/* Section title */}
        <h4>Top Categories</h4>

        {/* Table showing only top 10 categories */}
        <DataTable
          columns={columns}                 // how table looks
          data={categories?.slice(0, 10)}   // first 10 categories only
          rowKey={(_, index) => index}      // use index as row key
          tableClassName="mt-3"
        />
      </div>
    );
  } catch (error) {
    // If API fails or something breaks,
    // show a fallback UI instead of crashing the page
    console.error('Error fetching categories:', error);
    return <CategoriesFallback />;
  }
};

// Export so home page can use it
export default Categories;
