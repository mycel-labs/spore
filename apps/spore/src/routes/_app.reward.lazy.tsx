import { createLazyFileRoute } from '@tanstack/react-router'
import RewardTab from '~/components/RewardTab'

export const Route = createLazyFileRoute('/_app/reward')({
  component: Reward,
})

function Reward() {
  const { t } = Route.useSearch()

  return (
    <div className="py-8 space-y-8">
      <RewardTab tab={t} />
    </div>
  )
}
