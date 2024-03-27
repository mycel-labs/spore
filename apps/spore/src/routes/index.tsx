import { createRootRoute } from '@tanstack/react-router'
import { useStore } from '@/store'

export const Route = createRootRoute({
  beforeLoad: ({ search }) => {
    if (search?.ref) {
      useStore.getState().updateRefCode(search.ref)
    }
  },
})
