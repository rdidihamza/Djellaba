'use client'

import { useState, useCallback } from 'react'
import { AnnouncementBar } from './AnnouncementBar'
import { Header } from './Header'

interface SiteShellProps {
  children: React.ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  const [barHeight, setBarHeight] = useState(0)

  const handleBarVisibility = useCallback((visible: boolean, height: number) => {
    setBarHeight(visible ? height : 0)
  }, [])

  const totalOffset = barHeight + 72 // bar + header height

  return (
    <>
      <AnnouncementBar onVisibilityChange={handleBarVisibility} />
      <Header barOffset={barHeight} />
      <div style={{ paddingTop: totalOffset }}>
        {children}
      </div>
    </>
  )
}
