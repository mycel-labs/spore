import { BaseLayout } from '~/renderer/PageShell'
import { toast } from '@/components/ui/sonner'

export default function Page() {
  return (
    <BaseLayout>
      <div className="py-6 space-y-8">
        <div className="bg-light rounded-xl pb-8">
          <div className="bg-light rounded-xl">
            <h2 className="centerline text-2xl font-bold py-8">Refferal</h2>
          </div>
          <ul className="list-table mx-4 sm:mx-6">
            <li>
              <div className="header">Invited friends</div>
              <div className="text-right">12</div>
            </li>
            <li>
              <div className="header">Points</div>
              <div className="text-right">100</div>
            </li>
          </ul>
          <div className="px-6 mb-2 mt-8">
            <input
              type="text"
              value="https://spore.xxxx/?invite=akira.cel"
              className="border-dark border rounded w-full text-lg px-6 py-2 bg-transparent"
            />
            <button
              className="btn bg-secondary h-14 pt-1 px-10 font-title w-full mt-4"
              onClick={() => toast('URL Copied!')}
            >
              <span className="btn-inner font-bold h-2/3 w-1/3" />
              Copy referral url
            </button>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
