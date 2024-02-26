import { BaseLayout } from '~/renderer/PageShell'
import RewardTab from '~/components/RewardTab'

export default function Page() {
  return (
    <BaseLayout>
      <div className="py-6 space-y-8">
        <RewardTab />
      </div>
    </BaseLayout>
  )
}
