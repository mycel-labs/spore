import { RouterProvider, createRouter } from '@tanstack/react-router'
import { useWallet } from '@/hooks/useWallet'
import { useDomainOwnership } from '@/hooks/useMycel'

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
  const { isLoading: isLoadingOwnDomain, data: dataOwnDomain } =
    useDomainOwnership(wallet?.mycelAccount?.address)
  const hasDomain = () =>
    !isLoadingOwnDomain
      ? (dataOwnDomain?.domainOwnership?.domains?.length ?? 0) > 0
      : false

  return (
    <RouterProvider
      router={router}
      context={{
        wallet,
        mycel: { hasDomain },
      }}
    />
  )
}
