import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/start')({
  beforeLoad: ({ context }) => {
    if (context.hasDomain) {
      throw redirect({ to: '/home' })
    }
  },
})
