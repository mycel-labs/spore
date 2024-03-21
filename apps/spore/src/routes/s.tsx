import { createFileRoute, redirect } from '@tanstack/react-router'
import { useStore } from '@/store'

export const Route = createFileRoute('/s')({
  beforeLoad: ({ search }) => {
    if (search.ref) {
      useStore.getState().updateRefCode(search.ref)
      throw redirect({ to: '/' })
    }
  },
})
