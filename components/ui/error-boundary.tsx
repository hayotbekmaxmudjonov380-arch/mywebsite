'use client'

import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { reportError } from '@/lib/error-reporting'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  component?: string
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Report error
    reportError(error, {
      component: this.props.component,
      metadata: {
        componentStack: errorInfo.componentStack,
      },
    })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-red-500/10">
            <AlertTriangle size={32} className="text-red-500" />
          </div>
          <h3 className="text-lg font-medium text-foreground">
            Xatolik yuz berdi
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Sahifani yuklashda xatolik yuz berdi.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <RefreshCw size={14} />
            Qaytadan urinish
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
