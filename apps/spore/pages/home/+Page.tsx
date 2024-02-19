import { BaseLayout } from '~/renderer/PageShell'
import LoginDialog from '@/components/LoginDialog'

export default function Page() {
  return (
    <BaseLayout title="Welcome!">
      <div className="border-b border-piano">
        <div className="py-10 p-6 content">Menu1</div>
      </div>
      <div className="border-b border-piano">
        <div className="py-10 p-6 content">Menu2</div>
      </div>
      <div className="p-6 space-x-4 space-y-4">
        <LoginDialog trigger={<button>reg</button>} />
      </div>
    </BaseLayout>
  )
}
