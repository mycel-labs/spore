import { BaseLayout } from '~/renderer/PageShell'
import Profile from '~/components/Profile'
import TotalTab from '~/components/TotalTab'
import ImgMrIcon from '@/assets/mr-icon.svg'

export default function Page() {
  return (
    <BaseLayout>
      <div className="py-6 space-y-8">
        <div className="bg-light rounded-xl py-8">
          <h2 className="centerline text-3xl">Your Board</h2>
          <Profile />
          <div className="font-title mx-4 sm:mx-6 rounded border-dark border [&>div]:px-6 my-4">
            <div className="text-lg pt-2">Deposited USDC</div>
            <div className="text-right text-2xl border-b border-dark">
              $1,000
            </div>
            <div className="text-lg pt-2">Invited Friends</div>
            <div className="text-right text-2xl">12</div>
          </div>
          <div className="px-4 sm:px-6 py-2 grid gap-6 grid-cols-2">
            <div>
              <a
                type="button"
                className="btn bg-primary font-title px-6 pt-2.5 pb-0.5 w-full flex flex-col leading-none"
                href="/bank"
              >
                <span className="btn-inner h-2/3 w-5/6" />
                <div>Deposit</div>
                <div className="text-3xl">USDC</div>
              </a>
            </div>
            <div>
              <a
                type="button"
                className="btn bg-secondary font-title w-full px-6 pt-2.5 pb-0.5 flex flex-col leading-none"
                href="/bank#withdraw"
              >
                <span className="btn-inner h-2/3 w-5/6" />
                <div>Withdraw</div>
                <div className="text-3xl">USDC</div>
              </a>
            </div>
          </div>
        </div>
        <TotalTab />
      </div>
    </BaseLayout>
  )
}
