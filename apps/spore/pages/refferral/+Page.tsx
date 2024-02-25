import { BaseLayout } from '~/renderer/PageShell'

export default function Page() {
  return (
    <BaseLayout>
      <div className="py-6 space-y-8">
        <div className="bg-light rounded-xl pb-6 pt-6">
          <div className="bg-light rounded-xl">
            <h2 className="centerline text-3xl mb-4">Refferal</h2>
          </div>
          <div className="font-title mx-4 sm:mx-6 rounded border-dark border [&>div]:px-6">
            <div className="text-lg pt-2">Invited Friends</div>
            <div className="text-right text-2xl">99</div>
            <div className="text-lg pt-2 border-t border-dark">Points</div>
            <div className="text-right text-2xl">1,234</div>
          </div>
          <div className="px-6 mb-2 mt-8">
            <input
              type="text"
              value="https://spore.xxxx/?invite=akira.cel"
              className="border-dark border rounded w-full text-lg px-6 py-2 bg-transparent"
            />
            <button
              className="btn bg-secondary h-14 pt-1 px-10 font-title w-full mt-4"
              onClick={(e) => console.log(e)}
            >
              <span className="btn-inner h-2/3 w-1/3" />
              Copy referral url
            </button>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
