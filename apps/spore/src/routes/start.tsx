import { createFileRoute, redirect } from '@tanstack/react-router'
import { callFn } from '@/lib/firebase'
import { useStore } from '@/store'

export const Route = createFileRoute('/start')({
  beforeLoad: async () => {
    const mycelName = useStore.getState().mycelName
    let isReferralUserExist = false
    try {
      const { data } = await callFn('getUser')({ uid: mycelName })
      isReferralUserExist = !!data?.data?.user?.id
    } catch (e) {
      console.log('e:', e)
    }
    if (isReferralUserExist) {
      throw redirect({ to: '/home' })
    }
  },
})
