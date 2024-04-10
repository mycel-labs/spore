import { createFileRoute, redirect } from '@tanstack/react-router'
import { isReferralUserExist } from '@/lib/referral'
import { useStore } from '@/store'

export const Route = createFileRoute('/start')({
  beforeLoad: async () => {
    const mycelName = useStore.getState().mycelName
    const user: boolean = await isReferralUserExist(mycelName)
    if (user) {
      throw redirect({ to: '/home' })
    }
  },
})
