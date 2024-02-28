import React, { Suspense } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/sonner'
import '~/global.css'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      )

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow overflow-x-hidden">
          <Outlet />
        </main>
        <Toaster />
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      </div>
    </Providers>
  ),
})
