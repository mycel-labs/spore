import { createLazyFileRoute } from '@tanstack/react-router'
import BoardTab from '~/components/BoardTab'

export const Route = createLazyFileRoute('/_app/board')({
  component: Board,
})

function Board() {
  const { t } = Route.useSearch()

  return (
    <div className="py-6 space-y-8">
      <BoardTab tab={t} />
    </div>
  )
}
