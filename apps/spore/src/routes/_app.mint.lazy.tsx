import { useSwitchChain, useSendTransaction } from 'wagmi'
import { createLazyFileRoute } from '@tanstack/react-router'
import Button from '~/components/Button'
import { shortAddress } from '@/lib/wallets'

export const Route = createLazyFileRoute('/_app/mint')({
  component: About,
})

// Component
function About() {
  const { switchChain } = useSwitchChain()
  const { data: hash, sendTransaction } = useSendTransaction()

  // Handler
  async function handleCreateTA() {
    console.log('create transferable account')
  }

  async function handleApproveTransferTA() {
    console.log('approve transferable account')
  }

  async function handleDepositETH() {
    switchChain({ chainId: 11155111 })
    // send 1 wei to TA
    const TA = '0x0000000000000000000000000000000000000000'
    const amount = BigInt('1')
    sendTransaction({
      to: TA,
      value: amount,
      gas: BigInt(21000),
    })
  }

  async function handleSignMintRequest() {
    console.log('sign mint request')
  }

  async function handleMintNFT() {
    console.log('mint nft')
  }

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
          For information on the methods and risks of activation, see:
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
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleCreateTA()}
              >
                Create
              </Button>
            </li>
            <li>
              Approve to Transfer TA
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleApproveTransferTA()}
              >
                Approve
              </Button>
            </li>
            <li>
              Deposit SepETH to TA
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleDepositETH()}
                disabled={!!hash}
              >
                Deposit
              </Button>
              {hash && (
                <div className="text-sm m-4">
                  <p>
                    Tx Hash:{' '}
                    <a
                      className="text-blue-500 underline"
                      href={`https://sepolia.etherscan.io/tx/${hash}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {shortAddress(hash)}
                    </a>
                  </p>
                </div>
              )}
            </li>
            <li>
              Sign mint request
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleSignMintRequest()}
              >
                Sign
              </Button>
            </li>
            <li>
              Mint NFT on Sepolia
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleMintNFT()}
              >
                Mint
              </Button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
