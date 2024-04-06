import { createFileRoute, redirect } from '@tanstack/react-router'
import { isReferralUserExist } from '@/lib/referral'

export const Route = createFileRoute('/start')({
  beforeLoad: async () => {
    const user: boolean = await isReferralUserExist()
    if (user) {
      throw redirect({ to: '/home' })
    }
  },
})
