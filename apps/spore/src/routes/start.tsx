import { createFileRoute, redirect } from '@tanstack/react-router'
import { isReferralUserExist } from '@/lib/referral'
import { useStore } from '@/store'

export const Route = createFileRoute('/start')({
  beforeLoad: async () => {
    const mycelName = useStore.getState().mycelName
    const isConnected: boolean = useStore.getState().isConnected
    const user: boolean = await isReferralUserExist(mycelName)
    if (isConnected && user) {
      throw redirect({ to: '/home' })
    }
  },
})
