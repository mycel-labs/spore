import { createLazyFileRoute } from '@tanstack/react-router'
import Profile from '~/components/Profile'
import { Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/home')({
  component: Home,
})

function Home() {
  return (
    <div className="py-6 space-y-8">
      <div className="bg-light rounded-xl py-8">
        <h2 className="centerline text-2xl font-bold">Your Board</h2>
        <Profile />
        <ul className="list-table mx-4 sm:mx-6 mb-4">
          <li>
            <div className="header">Deposited USDC</div>
            <div className="text-right">$1,000</div>
          </li>
          <li>
            <div className="header">Invited Friends</div>
            <div className="text-right">12</div>
          </li>
          <li>
            <div className="header">Estimated Reward</div>
            <div className="text-right">$123,456</div>
          </li>
        </ul>
        <div className="px-4 sm:px-6 py-2 grid gap-6 grid-cols-2">
          <div>
            <Link
              type="button"
              className="btn bg-primary font-title font-bold uppercase px-6 pt-2.5 pb-0.5 w-full flex flex-col leading-none"
              to="/reward"
            >
              <span className="btn-inner h-2/3 w-5/6" />
              <div>Deposit</div>
              <div className="text-3xl">USDC</div>
            </Link>
          </div>
          <div>
            <Link
              type="button"
              className="btn bg-secondary font-title font-bold w-full px-6 pt-2.5 pb-0.5 flex flex-col leading-none"
              to="/reward?t=withdraw"
            >
              <span className="btn-inner h-2/3 w-5/6" />
              <div>Withdraw</div>
              <div className="text-3xl">USDC</div>
            </Link>
          </div>
          <div className="col-span-2">
            <Link
              type="button"
              className="btn bg-light font-title font-bold px-6 pt-2.5 pb-0.5 w-full flex flex-col leading-none bg-yellow-200"
              to="/refferral"
            >
              <span className="btn-inner h-2/3 w-5/6" />
              <div>Invite Your Friend</div>
              <div className="text-3xl">REFFEREAL</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
