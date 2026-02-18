/**
 * ErrorBoundary.tsx
 *
 * Catches JavaScript errors in the child component tree and displays a fallback UI
 * instead of crashing the whole app. Wraps the application in _app.tsx.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react'
import Link from 'next/link'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            fontFamily: 'sans-serif',
            textAlign: 'center',
            color: 'var(--black, #333)',
            backgroundColor: 'var(--white, #f4f5f0)',
          }}
        >
          <h1 style={{ fontSize: 24, marginBottom: 16 }}>
            問題が発生しました
          </h1>
          <p style={{ marginBottom: 24, maxWidth: 400 }}>
            予期しないエラーが発生しました。ページを再読み込みするか、ホームへお戻りください。
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: 'var(--blue, #3366ff)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: 8,
              fontWeight: 'bold',
            }}
          >
            ホームへ戻る
          </Link>
        </div>
      )
    }

    return this.props.children
  }
}
