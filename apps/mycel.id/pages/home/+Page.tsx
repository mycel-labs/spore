import { BaseLayout } from '~/renderer/PageShell'
import Providers from '@/components/Providers'
import { useBalance } from '@/hooks/useMycelQuery'

export default function Page() {
  // const { data } = useBalance()

  return (
    <Providers>
      <BaseLayout title="Welcome!">
        <div className="border-b border-piano">
          <div className="py-10 p-6 content">Menu1</div>
        </div>
        <div className="border-b border-piano">
          <div className="py-10 p-6 content">Menu2</div>
        </div>
        <div className="p-6 space-x-4 space-y-4">
          <button onClick={() => reg()}>reg</button>
          <button onClick={() => auth()}>auth</button>
          <button onClick={() => authEth()}>EthWallet</button>
        </div>
      </BaseLayout>
    </Providers>
  )
}
