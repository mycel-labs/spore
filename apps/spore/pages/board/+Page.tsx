import { BaseLayout } from '~/renderer/PageShell'
import BoardTab from '~/components/BoardTab'

export default function Page() {
  return (
    <BaseLayout>
      <div className="py-6 space-y-8">
        <BoardTab />
      </div>
    </BaseLayout>
  )
}
