import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (context.wallet.isConnected) {
      throw redirect({ to: '/home' })
    }
  },
})
