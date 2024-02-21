import { BaseLayout } from '~/renderer/PageShell'
import ImgMrIcon from '@/assets/mr-icon.svg'
import ImgEnoki from '@/assets/enoki.svg'

export default function Page() {
  return (
    <BaseLayout>
      <div className="py-6 space-y-8">
        <div className="bg-light rounded-xl py-6">
          <h2 className="text-center font-title uppercase text-2xl">
            - Your Board -
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="px-4 py-2">
              <img src={ImgMrIcon} className="w-auto" />
            </div>
            <div className="p-4">
              <ul className="border-dark border rounded">
                <li className="border-b border-dark px-3 py-2 w-full font-title">
                  <div className="font-title text-xl">RANK</div>
                  <div className="font-title">Mycellian</div>
                </li>
                <li className="border-b border-dark px-3 py-2 w-full font-title">
                  <div className="font-title text-xl">NEXT LEVEL</div>
                  <div className="font-title">Mycellian</div>
                </li>
                <li className="px-3 py-2 w-full font-title">
                  <div className="font-title text-xl">HOGE</div>
                  <div className="font-title">FUGA</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="px-6 py-2 grid gap-6 grid-cols-2">
            <div>
              <button
                type="button"
                className="btn bg-primary font-title px-6 pt-2.5 pb-1 w-full flex flex-col"
              >
                <span className="btn-inner h-2/3 w-5/6" />

                <p>Deposit</p>
                <p className="text-2xl">USDC</p>
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn bg-secondary font-title w-full px-6 pt-2.5 pb-1 flex flex-col"
              >
                <span className="btn-inner h-2/3 w-5/6" />
                <p>Withdraw</p>
                <p className="text-2xl">USDC</p>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-light rounded-xl py-6">
          <h2 className="text-center font-title uppercase text-2xl mb-4">
            - Total Board -
          </h2>
          <div className="grid grid-cols-4 gap-4 px-4">
            <img src={ImgEnoki} />
            <div className="col-span-3 pt-2 px-4">
              <ul className="border-dark border rounded">
                <li className="border-b border-dark w-full font-title">
                  <div className="font-title text-xl bg-dark text-light px-4">
                    POOL VALUE
                  </div>
                  <div className="font-title text-3xl text-right px-4 pt-4 pb-2">
                    $100,000,000
                  </div>
                </li>
                <li className="border-b border-dark w-full font-title">
                  <div className="font-title text-xl bg-dark text-light px-4">
                    TOTAL ESTIMATED REWARD
                  </div>
                  <div className="font-title text-3xl text-right px-4 pt-4 pb-2">
                    $123,000
                  </div>
                </li>
                <li className="w-full font-title">
                  <div className="font-title text-xl bg-dark text-light px-4">
                    PAYOUT DATE
                  </div>
                  <div className="font-title text-3xl text-right px-4 pt-4 pb-2">
                    23:59:59
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
