import { createRootRoute, Outlet } from '@tanstack/react-router'
import NavMenu from '~/components/NavMenu'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="sm:max-w-4xl mx-auto flex px-4 sm:px-6">
        <NavMenu />
        <div className="flex-1 sm:ml-72 pt-16 sm:pt-0">
          <Outlet />
        </div>
      </div>
    </>
  ),
})
