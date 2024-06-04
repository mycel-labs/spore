import { useSwitchChain, useSendTransaction, useAccount } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { createLazyFileRoute } from '@tanstack/react-router'
import Button from '~/components/Button'
import { shortAddress } from '@/lib/wallets'

export const Route = createLazyFileRoute('/_app/mint')({
  component: About,
})

// Component
function About() {
  const { switchChain } = useSwitchChain()
  const { chainId } = useAccount()
  const { data: hash, sendTransaction } = useSendTransaction()
  const rigil = { id: 16813125 }

  // Handler
  async function handleCreateTA() {
    console.log('create transferable account')
  }

  async function handleApproveTransferTA() {
    console.log('approve transferable account')
  }
  async function handleSwitchNetwork(_chainId: number) {
    if (chainId === _chainId) {
      return
    }
    if (_chainId === rigil.id) {
      // switchChain of wagmi does not work for this chain
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: '0x1008C45',
          },
        ],
      })
    } else {
      switchChain({ chainId: _chainId })
    }
  }

  async function handleDepositETH() {
    if (chainId === sepolia.id) {
      // send 1 wei to TA
      const TA = '0x0000000000000000000000000000000000000000'
      const amount = BigInt('1')
      sendTransaction({
        to: TA,
        value: amount,
        gas: BigInt(21000),
        chainId: sepolia.id,
      })
    }
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
        <h2 className="text-center text-3xl font-bold pt-8 centerline">Mint</h2>
        <div className="pb-4">
          <h3 className="text-center text-xl font-bold py-2 centerline">
            Prerequisites
          </h3>
          <p className="text-center text-sm px-8">
            <span className="font-bold text-yellow-500">⚠</span> This feature
            requires you to have a
            <span className="font-bold"> SUAVE Rigil Testnet</span> in your
            wallet.
          </p>
          <div className="text-center text-sm px-8">
            For information on how to add a Rigil Testnet to your wallet, see:
          </div>
          <div className="text-center text-sm px-8 text-blue-500 underline font-bold">
            <a
              href="https://suave-alpha.flashbots.net/tutorials/rigil#chain-info"
              target="_blank"
              rel="noreferrer"
            >
              🔗 Rigil Testnet Chain info
            </a>
          </div>
          <div className="h-4" />
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
        </div>
        <div className="px-8 pb-16">
          <h3 className="text-center text-xl font-bold py-2 centerline">
            Steps
          </h3>
          <ol className="list-decimal text-xl font-title list-inside space-y-6 px-4">
            <li>
              Create Transferable Account (TA)
              <Button
                className="btn bg-secondary w-full h-14 mt-2 mb-4"
                onClick={async () => await handleSwitchNetwork(rigil.id)}
                disabled={chainId === rigil.id}
              >
                Change network to Rigil
              </Button>
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleCreateTA()}
                disabled={chainId !== rigil.id}
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
                className="btn bg-secondary w-full h-14 mt-2 mb-4"
                onClick={async () => await handleSwitchNetwork(sepolia.id)}
                disabled={chainId === sepolia.id}
              >
                Change network to Sepolia
              </Button>
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleDepositETH()}
                disabled={!!hash || chainId !== sepolia.id}
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
                className="btn bg-secondary w-full h-14 mt-2 mb-4"
                onClick={async () => await handleSwitchNetwork(rigil.id)}
                disabled={chainId === rigil.id}
              >
                Change network to Rigil
              </Button>
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleSignMintRequest()}
                disabled={chainId !== rigil.id}
              >
                Sign
              </Button>
            </li>
            <li>
              Mint NFT
              <Button
                className="btn bg-secondary w-full h-14 mt-2 mb-4"
                onClick={async () => await handleSwitchNetwork(sepolia.id)}
                disabled={chainId === sepolia.id}
              >
                Change network to Sepolia
              </Button>
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleMintNFT()}
                disabled={chainId !== sepolia.id}
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
