import logo from '@/assets/logo.svg'
import { FullLayout } from '~/renderer/PageShell'
import { Users, PiggyBank } from 'lucide-react'

export default function Page() {
  return (
    <FullLayout>
      <div className="w-full">
        <h1 className="font-title text-6xl border-b-2 border-piano text-center pt-4 pb-7">
          spore
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <BG>
          <img
            src={logo}
            width={240}
            className="mx-auto my-20 px-6"
            alt="mycel"
          />
        </BG>
        <div className="border-t-2 sm:border-t-0 sm:border-l-2 border-piano bg-saffron flex items-center justify-center py-12 px-10">
          <div>
            <h2 className="text-2xl font-bold mt-6">
              Spore is ID Based Financial Inclusion. Spore Provide Open
              Financial Product for 1.4B
            </h2>
            <ul className="mx-2 my-4 space-y-1">
              <li>✔️ 🙋🏻 Profile</li>
              <li>✔️ 💬 Chat with friends</li>
              <li>✔️ ➡️ Send money with privacy</li>
              <li>✔️ 💰 Get points/airdrops</li>
              <li>✔️ 🎮 Access gaming</li>
              <li>✔️ ...more!</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-piano border-t-2 border-b-2 pt-12 pb-10 px-6">
        <h2 className="text-4xl text-center mb-6">Get mycel.id</h2>
        <a
          href="/home"
          className="px-4 h-12 btn-solid bg-samon text-xl mx-auto mb-8 max-w-xs"
        >
          <span className="flex-1 text-center ml-14 mr-10">Start</span>
          <span>☞</span>
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="flex items-center justify-center pt-12 pb-16 px-16 min-h-64 bg-jade text-center">
          <div className="text-center">
            <div className="text-3xl font-bold mb-8">Friends pool</div>
            <div className="flex justify-center">
              <PiggyBank size={64} strokeWidth={1} />
            </div>
          </div>
        </div>
        <div className="border-t-2 sm:border-t-0 sm:border-l-2 border-piano flex items-center justify-center py-16 px-6 min-h-64 text-center">
          <div>
            <h2 className="text-xl font-bold">What is Friends Pool?</h2>
            <p className="mx-2 mt-2 mb-10">
              Pool and Get Reward App for users in Any chain
            </p>
            <h2 className="text-xl font-bold">How do you play Friends Pool?</h2>
            <p className="mx-2 mt-2 mb-2">
              Mint Mycel ID Deposit USDC on 6 chains Invite your friends Get
              reward from pool
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="flex items-center justify-center pt-12 pb-16 px-16 min-h-64 bg-lochmara text-center border-t-2 sm:border-l-2 border-piano sm:order-2">
          <div className="text-center">
            <div className="text-3xl font-bold mb-8">Profile & Message</div>
            <div className="flex justify-center">
              <Users size={64} strokeWidth={1} />
            </div>
          </div>
        </div>
        <div className="border-t-2 sm:border-l-2 border-piano flex items-center justify-center py-16 px-6 min-h-64 text-center sm:order-1">
          <div>
            <h2 className="text-xl font-bold">Create profile</h2>
            <p className="mx-2 mt-2 mb-10">....</p>
            <h2 className="text-xl font-bold">
              Message & send money to friends
            </h2>
            <p className="mx-2 mt-2 mb-2">...</p>
          </div>
        </div>
      </div>
      <div className="bg-piano py-12 px-6 text-white flex items-center justify-center text-center">
        <div className="max-w-lg">
          <p>
            Powered by
            <br />
            <a
              className="font-title text-2xl hover:underline"
              href="https://mycel.domains"
            >
              mycel.domains
            </a>
          </p>
          <p className="text-sm mt-6 text-smoke">
            Mycel is a Decentralized ID Infrastructure solution that resolves
            addresses such as websites, crypto wallets, IPFS, among many more
            accessible through a single domain with name resolution support in
            DNS, IBC and smart contracts.
          </p>
        </div>
      </div>
    </FullLayout>
  )
}

const BG = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-g h-full w-full">
    <div className="bg-noise h-full w-full overflow-hidden">{children}</div>
  </div>
)
