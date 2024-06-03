import { createLazyFileRoute } from '@tanstack/react-router'
import Profile from '~/components/Profile'
import { Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/home')({
  component: Home,
})

function Home() {
  return (
    <div className="py-8 space-y-8">
      <div className="bg-light rounded-xl py-8 overlay-dot-ll">
        <h2 className="centerline text-3xl font-bold">Home</h2>
        <Profile />
        <div className="px-4 sm:px-6 py-2 grid gap-6 grid-cols-2">
          <div className="col-span-2">
            <Link
              type="button"
              className="btn bg-light font-title font-bold uppercase px-6 pt-2.5 pb-0.5 w-full flex flex-col leading-none bg-yellow-200"
              to="/referral"
            >
              <span className="btn-inner" />
              <div>Invite Your Friend</div>
              <div className="text-3xl">REFERRAL</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
