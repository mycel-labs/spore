import { BaseLayout } from '~/renderer/PageShell'
import BankTab from '~/components/BankTab'

export default function Page() {
  return (
    <BaseLayout>
      <div className="py-6 space-y-8">
        <BankTab />
      </div>
    </BaseLayout>
  )
}
