import { BaseLayout } from '~/renderer/PageShell'
import TotalTab from '~/components/TotalTab'

export default function Page() {
  return (
    <BaseLayout>
      <div className="py-6 space-y-8">
        <TotalTab />
      </div>
    </BaseLayout>
  )
}
