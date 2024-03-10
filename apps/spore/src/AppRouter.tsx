import { RouterProvider, createRouter } from '@tanstack/react-router'
import { useWallet } from '@/hooks/useWallet'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function AppRouter() {
  const wallet = useWallet()
  return <RouterProvider router={router} context={{ wallet }} />
}
