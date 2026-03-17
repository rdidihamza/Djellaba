'use client'

import { Component, type ReactNode } from 'react'

interface State { hasError: boolean; message?: string }

export class StudioErrorBoundary extends Component<{ children: ReactNode }, State> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mb-6">
            <span className="text-2xl text-gold-500">✦</span>
          </div>
          <h3 className="font-display text-xl text-brown-800 mb-3">Studio failed to load</h3>
          <p className="text-[13px] text-brown-500 mb-6 max-w-sm leading-relaxed">
            The design studio encountered an error. Please refresh the page to try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-brown-800 text-cream text-[13px] font-medium hover:bg-brown-900 transition-colors"
          >
            Reload Studio
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
