import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import NavMenu from '~/components/NavMenu2'

export const Route = createRootRoute({
  beforeLoad: ({ context }) => {
    if (!context.wallet.isConnected) {
      throw redirect({ to: '/' })
    }
  },
  component: () => (
    <div className="sm:max-w-4xl mx-auto flex px-4 sm:px-6">
      <NavMenu />
      <div className="flex-1 sm:ml-72 pt-16 sm:pt-0">
        <Outlet />
      </div>
    </div>
  ),
})
