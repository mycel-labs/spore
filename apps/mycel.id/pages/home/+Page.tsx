import { BaseLayout } from '@/renderer/PageShell'

export default function Page() {
  return (
    <BaseLayout title="Welcome!">
      <div className="border-b border-piano">
        <div className="py-10 p-6 content">Menu1</div>
      </div>
      <div className="border-b border-piano">
        <div className="py-10 p-6 content">Menu2</div>
      </div>
    </BaseLayout>
  )
}
