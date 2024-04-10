import { createRootRoute, Outlet, redirect } from '@tanstack/react-router'
import NavMenu from '~/components/NavMenu2'
import { isReferralUserExist } from '@/lib/referral'
import { useStore } from '@/store'

export const Route = createRootRoute({
  beforeLoad: async () => {
    const isConnected: boolean = useStore.getState().isConnected
    const mycelName = useStore.getState().mycelName
    const user: boolean = await isReferralUserExist(mycelName)
    if (!isConnected) {
      throw redirect({ to: '/' })
    } else if (!user) {
      throw redirect({ to: '/start' })
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
