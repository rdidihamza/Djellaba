'use client'

import { useState, useMemo } from 'react'
import { Star, ThumbsUp, CheckCircle, PenLine, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Review } from '@/types'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StarRow({
  filled,
  size = 16,
  interactive = false,
  onSelect,
}: {
  filled: number
  size?: number
  interactive?: boolean
  onSelect?: (n: number) => void
}) {
  const [hovered, setHovered] = useState(0)
  const display = interactive ? hovered || filled : filled
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type={interactive ? 'button' : undefined}
          disabled={!interactive}
          onMouseEnter={() => interactive && setHovered(n)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onSelect?.(n)}
          className={cn(interactive && 'cursor-pointer transition-transform hover:scale-110')}
          aria-label={interactive ? `Rate ${n} star${n > 1 ? 's' : ''}` : undefined}
        >
          <Star
            size={size}
            className={cn(
              n <= display ? 'text-gold-500 fill-gold-500' : 'text-brown-200',
              'transition-colors duration-100'
            )}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ─── Review Card ──────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  const [helpfulClicked, setHelpfulClicked] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const isLong = review.body.length > 260
  const bodyDisplay = isLong && !expanded ? review.body.slice(0, 260) + '…' : review.body

  return (
    <article className="py-7 border-b border-gold-100 last:border-0">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-brown-100 flex items-center justify-center flex-shrink-0 text-sm font-medium text-brown-700">
            {review.author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-brown-900 leading-tight">{review.author}</p>
            {review.location && (
              <p className="text-xs text-brown-400 leading-tight">{review.location}</p>
            )}
          </div>
        </div>
        <time className="text-xs text-brown-400 flex-shrink-0 mt-0.5">
          {formatDate(review.date)}
        </time>
      </div>

      {/* Stars + title */}
      <div className="flex items-center gap-3 mb-2">
        <StarRow filled={review.rating} size={13} />
        <h4 className="text-sm font-medium text-brown-900">{review.title}</h4>
      </div>

      {/* Body */}
      <p className="text-sm text-brown-600 leading-relaxed mb-3">
        {bodyDisplay}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-gold-600 hover:text-gold-700 transition-colors text-xs font-medium"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>

      {/* Meta badges */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {review.verified && (
          <span className="inline-flex items-center gap-1 text-[11px] text-green-700 font-medium">
            <CheckCircle size={11} className="fill-green-100" />
            Verified Purchase
          </span>
        )}
        {review.colorPurchased && (
          <span className="text-[11px] text-brown-400">
            Color: <span className="text-brown-600">{review.colorPurchased}</span>
          </span>
        )}
        {review.sizePurchased && (
          <span className="text-[11px] text-brown-400">
            Size: <span className="text-brown-600">{review.sizePurchased}</span>
          </span>
        )}
      </div>

      {/* Helpful */}
      <button
        onClick={() => setHelpfulClicked(true)}
        disabled={helpfulClicked}
        className={cn(
          'inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all duration-200',
          helpfulClicked
            ? 'border-gold-300 bg-gold-50 text-gold-700'
            : 'border-brown-200 text-brown-400 hover:border-gold-300 hover:text-gold-600 hover:bg-gold-50'
        )}
      >
        <ThumbsUp size={11} strokeWidth={1.5} />
        Helpful{' '}
        <span className="font-medium">
          ({(review.helpful ?? 0) + (helpfulClicked ? 1 : 0)})
        </span>
      </button>
    </article>
  )
}

// ─── Write a Review Form ──────────────────────────────────────────────────────

function WriteReviewForm({ onSubmit }: { onSubmit: (r: Review) => void }) {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: string[] = []
    if (!rating) errs.push('Please select a star rating.')
    if (!author.trim()) errs.push('Please enter your name.')
    if (!title.trim()) errs.push('Please add a review title.')
    if (body.trim().length < 20) errs.push('Review must be at least 20 characters.')
    if (errs.length) { setErrors(errs); return }

    onSubmit({
      id: `r-${Date.now()}`,
      author: author.trim(),
      date: new Date().toISOString(),
      rating,
      title: title.trim(),
      body: body.trim(),
      verified: false,
      helpful: 0,
    })
    setSubmitted(true)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brown-200 rounded-xl text-sm font-medium text-brown-700 hover:border-brown-500 hover:text-brown-900 transition-all duration-200 group"
      >
        <PenLine size={15} strokeWidth={1.5} className="group-hover:text-gold-600 transition-colors" />
        Write a Review
      </button>
    )
  }

  return (
    <div className="rounded-2xl border border-gold-200 bg-parchment p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg text-brown-900">Share Your Experience</h3>
        <button
          onClick={() => { setOpen(false); setSubmitted(false); setErrors([]) }}
          className="w-8 h-8 flex items-center justify-center rounded-full text-brown-400 hover:text-brown-700 hover:bg-sand transition-all"
        >
          <X size={15} />
        </button>
      </div>

      {submitted ? (
        <div className="text-center py-8 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-gold-100 flex items-center justify-center">
            <CheckCircle size={22} className="text-gold-600" />
          </div>
          <p className="font-display text-xl text-brown-900">Thank you for your review.</p>
          <p className="text-sm text-brown-500">Your feedback helps other customers find the right fit.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Rating */}
          <div>
            <label className="block text-xs font-medium text-brown-700 tracking-wide mb-2 uppercase">
              Your Rating <span className="text-red-400">*</span>
            </label>
            <StarRow filled={rating} size={26} interactive onSelect={setRating} />
            {rating > 0 && (
              <p className="text-xs text-brown-400 mt-1">
                {['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'][rating]}
              </p>
            )}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="review-author" className="block text-xs font-medium text-brown-700 tracking-wide mb-1.5 uppercase">
              Your Name <span className="text-red-400">*</span>
            </label>
            <input
              id="review-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Youssef A."
              className="w-full px-4 py-2.5 bg-cream border border-gold-200 rounded-lg text-sm text-brown-800 placeholder-brown-300 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          {/* Title */}
          <div>
            <label htmlFor="review-title" className="block text-xs font-medium text-brown-700 tracking-wide mb-1.5 uppercase">
              Review Title <span className="text-red-400">*</span>
            </label>
            <input
              id="review-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarise your experience"
              className="w-full px-4 py-2.5 bg-cream border border-gold-200 rounded-lg text-sm text-brown-800 placeholder-brown-300 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          {/* Body */}
          <div>
            <label htmlFor="review-body" className="block text-xs font-medium text-brown-700 tracking-wide mb-1.5 uppercase">
              Your Review <span className="text-red-400">*</span>
            </label>
            <textarea
              id="review-body"
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What did you think about the quality, fit, and finish?"
              className="w-full px-4 py-2.5 bg-cream border border-gold-200 rounded-lg text-sm text-brown-800 placeholder-brown-300 focus:outline-none focus:border-gold-500 transition-colors resize-none"
            />
            <p className="text-right text-[11px] text-brown-400 mt-1">
              {body.length} / 1000
            </p>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <ul className="space-y-1">
              {errors.map((e) => (
                <li key={e} className="text-xs text-red-500 flex items-center gap-1.5">
                  <span>✕</span> {e}
                </li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-brown-800 text-cream text-sm font-medium tracking-[0.1em] uppercase rounded-xl hover:bg-brown-700 transition-colors"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

type SortKey = 'recent' | 'highest' | 'lowest' | 'helpful'

interface CustomerReviewsProps {
  reviews?: Review[]
  productName: string
}

export function CustomerReviews({ reviews: initialReviews = [], productName }: CustomerReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [sort, setSort] = useState<SortKey>('recent')
  const [filterStar, setFilterStar] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  // ── Stats ──
  const total = reviews.length
  const avg = total > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0
  const breakdown = useMemo(() => {
    const counts = [0, 0, 0, 0, 0] // index 0 = 1-star ... index 4 = 5-star
    reviews.forEach((r) => { counts[r.rating - 1]++ })
    return counts.map((count, i) => ({
      star: i + 1,
      count,
      pct: total > 0 ? Math.round((count / total) * 100) : 0,
    })).reverse() // 5→1
  }, [reviews, total])

  // ── Filter + Sort ──
  const visible = useMemo(() => {
    let list = filterStar ? reviews.filter((r) => r.rating === filterStar) : [...reviews]
    if (sort === 'recent')   list.sort((a, b) => b.date.localeCompare(a.date))
    if (sort === 'highest')  list.sort((a, b) => b.rating - a.rating)
    if (sort === 'lowest')   list.sort((a, b) => a.rating - b.rating)
    if (sort === 'helpful')  list.sort((a, b) => (b.helpful ?? 0) - (a.helpful ?? 0))
    return list
  }, [reviews, sort, filterStar])

  const displayed = showAll ? visible : visible.slice(0, 4)

  const handleNewReview = (r: Review) => {
    setReviews((prev) => [r, ...prev])
    setSort('recent')
    setFilterStar(null)
    setShowAll(false)
  }

  return (
    <section aria-label="Customer reviews" className="mt-16 pt-12 border-t border-gold-100">
      <h2 className="font-display text-display-sm text-brown-900 mb-10">Customer Reviews</h2>

      <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">
        {/* ── Left: Summary ── */}
        <div className="space-y-7">
          {/* Overall */}
          <div>
            <div className="flex items-end gap-3 mb-2">
              <span className="font-display text-6xl font-light text-brown-900 leading-none">
                {total > 0 ? avg.toFixed(1) : '—'}
              </span>
              <div className="pb-1">
                <StarRow filled={Math.round(avg)} size={16} />
                <p className="text-xs text-brown-400 mt-1">
                  {total > 0 ? `${total} global ${total === 1 ? 'rating' : 'ratings'}` : 'No ratings yet'}
                </p>
              </div>
            </div>
          </div>

          {/* Star breakdown */}
          <div className="space-y-2.5">
            {breakdown.map(({ star, count, pct }) => (
              <button
                key={star}
                onClick={() => setFilterStar(filterStar === star ? null : star)}
                className={cn(
                  'flex items-center gap-3 w-full group',
                  filterStar === star && 'opacity-100',
                  filterStar && filterStar !== star && 'opacity-40'
                )}
                aria-label={`Filter by ${star} star`}
              >
                <span className={cn(
                  'text-xs font-medium w-10 text-left transition-colors',
                  filterStar === star ? 'text-gold-600' : 'text-brown-500 group-hover:text-gold-600'
                )}>
                  {star} star
                </span>
                <div className="flex-1 h-2 rounded-full bg-brown-100 overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      filterStar === star ? 'bg-gold-500' : 'bg-gold-400'
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={cn(
                  'text-xs w-8 text-right transition-colors',
                  filterStar === star ? 'text-gold-600 font-medium' : 'text-brown-400'
                )}>
                  {pct}%
                </span>
              </button>
            ))}
          </div>

          {/* Clear filter */}
          {filterStar && (
            <button
              onClick={() => setFilterStar(null)}
              className="text-xs text-brown-400 hover:text-brown-700 transition-colors flex items-center gap-1"
            >
              <X size={11} /> Clear filter
            </button>
          )}

          {/* Divider */}
          <div className="border-t border-gold-100 pt-6">
            <p className="text-xs text-brown-500 mb-4 leading-relaxed">
              Share your thoughts with other customers
            </p>
            <WriteReviewForm onSubmit={handleNewReview} />
          </div>
        </div>

        {/* ── Right: Reviews list ── */}
        <div>
          {/* Sort bar */}
          {total > 0 && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs text-brown-500">
                {filterStar
                  ? `${visible.length} ${visible.length === 1 ? 'review' : 'reviews'} for ${filterStar}-star`
                  : `${total} ${total === 1 ? 'review' : 'reviews'}`}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-brown-400 hidden sm:block">Sort by</span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-sand border border-gold-200 rounded-lg text-brown-700 focus:outline-none focus:border-gold-500 cursor-pointer"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="helpful">Most Helpful</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                  </select>
                  <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-brown-400 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {/* Review cards */}
          {visible.length === 0 ? (
            <div className="py-12 text-center rounded-2xl border border-dashed border-gold-200">
              {filterStar ? (
                <>
                  <p className="font-display text-lg text-brown-400 mb-1">No {filterStar}-star reviews yet</p>
                  <button onClick={() => setFilterStar(null)} className="text-xs text-gold-600 hover:underline mt-1">
                    View all reviews
                  </button>
                </>
              ) : (
                <>
                  <p className="font-display text-lg text-brown-400 mb-1">No reviews yet</p>
                  <p className="text-sm text-brown-400">Be the first to share your experience with the {productName}.</p>
                </>
              )}
            </div>
          ) : (
            <>
              <div>
                {displayed.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>

              {visible.length > 4 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-6 w-full py-3 border border-gold-200 rounded-xl text-sm text-brown-600 hover:bg-sand hover:border-brown-400 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {showAll ? (
                    <>Show fewer reviews <ChevronDown size={14} className="rotate-180" /></>
                  ) : (
                    <>Show all {visible.length} reviews <ChevronDown size={14} /></>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
