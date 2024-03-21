import { createFileRoute, redirect } from '@tanstack/react-router'
import { useStore } from '@/store'
import { Helmet } from 'react-helmet-async'

export const Route = createFileRoute('/s')({
  beforeLoad: ({ search }) => {
    if (search.ref) {
      useStore.getState().updateRefCode(search.ref)
      throw redirect({ to: '/' })
    }
  },
  component: ShareComponent,
})

function ShareComponent() {
  const { ref } = Route.useSearch()

  return (
    <Helmet>
      <meta
        property="og:image"
        content={`https://og.spore.ooo/api/og?ref=${ref}`}
      />
    </Helmet>
  )
}
