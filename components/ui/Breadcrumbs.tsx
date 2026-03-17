import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  crumbs: Crumb[]
}

export function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brown-400">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={10} className="text-brown-300" />}
          {crumb.href ? (
            <Link
              href={crumb.href}
              className="hover:text-brown-700 transition-colors duration-200"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-brown-600">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
