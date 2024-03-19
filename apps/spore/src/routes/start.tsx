import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/start')({
  beforeLoad: ({ context }) => {
    if (context.mycel.hasDomain) {
      console.log('context.mycel:', context.mycel)
      // throw redirect({ to: '/home' })
    }
  },
})
