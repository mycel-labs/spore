import React, { Suspense, useEffect } from 'react'
import {
  createRootRoute,
  Outlet,
  useNavigate,
  useRouterState,
} from '@tanstack/react-router'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/sonner'
import useWallet from '@/hooks/useWallet'
import { useStore } from '@/store'
import Loading from '~/components/Loading'
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

function AuthenticatedRoute() {
  const wallet = useWallet()
  const navigate = useNavigate()
  const router = useRouterState()
  const isLoading = useStore((state) => state.isLoading)

  useEffect(() => {
    if (!wallet.isConnected && router.location.pathname !== '/') {
      navigate({ to: '/' })
    }
    if (wallet.isConnected && router.location.pathname === '/') {
      navigate({ to: '/home' })
    }
  }, [wallet])

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow overflow-x-hidden">
        <Outlet />
      </main>
      <Toaster />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
      {isLoading && <Loading />}
    </div>
  )
}

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <AuthenticatedRoute />
    </Providers>
  ),
})
