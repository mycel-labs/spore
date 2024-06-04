import { createLazyFileRoute } from '@tanstack/react-router'
import Button from '~/components/Button'

export const Route = createLazyFileRoute('/_app/mint')({
  component: About,
})

function About() {
  return (
    <div className="py-8 space-y-8">
      <div className="bg-light overlay-dot-ll rounded-xl">
        <h2 className="text-center text-3xl font-bold py-8 centerline">Mint</h2>
        <p className="text-center text-sm px-8">
          <span className="font-bold text-yellow-500">⚠</span>{' '}
          <span className="font-bold">eth_sign</span> must be enabled on your
          wallet to sign mint requests on SUAVE Rigil Testnet.
        </p>
        <div className="text-center text-sm px-8">
          For information on the methods and risks of deactivation, see:
        </div>
        <div className="text-center text-sm px-8 text-blue-500 underline font-bold">
          <a
            href="https://support.metamask.io/privacy-and-security/what-is-eth_sign-and-why-is-it-a-risk/"
            target="_blank"
            rel="noreferrer"
          >
            🔗 What is &apos;eth sign&apos; and why is it a risk?
          </a>
        </div>
        <div className="p-8 pb-16">
          <ol className="list-decimal text-xl font-title list-inside space-y-6 px-4">
            <li>
              Create Transferable Account (TA)
              <Button className="btn bg-secondary w-full h-14 mt-2">
                Create
              </Button>
            </li>
            <li>
              Approve to Transfer TA
              <Button className="btn bg-secondary w-full h-14 mt-2">
                Approve
              </Button>
            </li>
            <li>
              Deposit SepETH to TA
              <Button className="btn bg-secondary w-full h-14 mt-2">
                Deposit
              </Button>
            </li>
            <li>
              Sign mint request
              <Button className="btn bg-secondary w-full h-14 mt-2">
                Sign
              </Button>
            </li>
            <li>
              Mint NFT on Sepolia
              <Button className="btn bg-secondary w-full h-14 mt-2">
                Mint
              </Button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
