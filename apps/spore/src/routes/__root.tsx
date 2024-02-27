import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/sonner'
import '~/global.css'

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Outlet />
        </main>
        <Toaster />
        <TanStackRouterDevtools />
      </div>
    </Providers>
  ),
})
