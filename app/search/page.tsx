import type { Metadata } from 'next'
import { ProductCard } from '@/components/product/ProductCard'
import { products } from '@/data/products'

export const metadata: Metadata = {
  title: 'Search | Djellaba',
}

interface Props {
  searchParams: { q?: string }
}

export default function SearchPage({ searchParams }: Props) {
  const query = searchParams.q?.toLowerCase() || ''
  const results = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.tags.some((t) => t.includes(query)) ||
          p.category.includes(query) ||
          p.shortDescription.toLowerCase().includes(query)
      )
    : []

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-8xl mx-auto px-6 lg:px-10 py-16">
        <div className="mb-10">
          <h1 className="font-display text-display-md text-brown-900">
            {query ? `Results for "${query}"` : 'Search'}
          </h1>
          {query && (
            <p className="text-brown-500 text-sm mt-1">
              {results.length} {results.length === 1 ? 'result' : 'results'} found
            </p>
          )}
        </div>

        {!query ? (
          <p className="text-brown-400 text-center py-16">
            Use the search bar above to find garments, collections, and more.
          </p>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-display text-2xl text-brown-400 mb-2">No results found</p>
            <p className="text-sm text-brown-400">Try a different search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
