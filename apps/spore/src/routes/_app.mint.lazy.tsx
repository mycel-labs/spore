import { useSwitchChain, useSendTransaction, useAccount } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { createLazyFileRoute } from '@tanstack/react-router'
import Button from '~/components/Button'
import {
  useCreateAccount,
  // useGetSignature,
  useWaitForTransactionReceiptSepolia,
} from '@/hooks/useSuave'
import { useState } from 'react'

export const Route = createLazyFileRoute('/_app/mint')({
  component: Mint,
})

// Component
function Mint() {
  const { switchChain } = useSwitchChain()
  const { chainId } = useAccount()
  const { data: hash, sendTransaction } = useSendTransaction()
  const [accountId, setAccountId] = useState<string>('')
  const [faAddress, setFaAddress] = useState<string>('')
  const { mutateAsync: createAccount, isPending: createAccountPending } =
    useCreateAccount()
  const { mutateAsync: waitForTransactionReceipt } =
    useWaitForTransactionReceiptSepolia()

  // handleDepositETH is a function to deposit SepETH to TA on Sepolia
  async function handleCreateTA() {
    const account = await createAccount()
    if (account) {
      console.log('Account created:', account)
      setAccountId(account.accountId)
      setFaAddress(account.address)
    } else {
      console.error('Failed to create account')
    }
  }

  async function handleDepositETH() {
    switchChain({ chainId: sepolia.id })
    if (chainId === sepolia.id) {
      // send 1 wei to TA
      if (/^0x[a-fA-F0-9]{40}$/.test(faAddress)) {
        const TA = faAddress as `0x${string}`
        const amount = BigInt('1')
        sendTransaction({
          to: TA,
          value: amount,
          gas: BigInt(21000),
          chainId: sepolia.id,
        })
        // wait for transaction to be mined
        try {
          await waitForTransactionReceipt(hash as `0x${string}`)
        } catch (error) {
          console.error('Failed to wait for transaction receipt:', error)
        }
      } else {
        console.error('Invalid faAddress:', faAddress)
      }
    }
  }

  async function handleSignMintRequest() {
    console.log('sign mint request')
  }

  // handleMintNFT is a function to mint NFT on Sepolia with signature
  async function handleMintNFT() {
    switchChain({ chainId: sepolia.id })
    console.log('mint nft')
  }

  return (
    <div className="py-8 space-y-8">
      <div className="bg-light overlay-dot-ll rounded-xl">
        <h2 className="text-center text-3xl font-bold pt-8 centerline">Mint</h2>
        <div className="pb-4">
          <p className="text-center text-sm px-8 pt-4">
            This feature allows you to mint NFTs on Sepolia Testnet with SUAVE
            Rigil Testnet by using a Transferable Account (TA).
          </p>
          <div className="text-center text-sm px-8">
            For information of Rigil Testnet, see:
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
          <p className="text-center text-sm px-8 pt-4">
            <strong>
              Please make sure you have enough SepETH in your TA to mint NFT.
            </strong>
          </p>
        </div>
        <div className="px-8 pb-16">
          <h3 className="text-center text-xl font-bold py-2 centerline">
            Steps
          </h3>
          <ol className="list-decimal text-xl font-title list-inside space-y-6 px-4">
            <li>
              Create Transferable Account (TA)
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleCreateTA()}
                isLoading={createAccountPending}
                success={!!accountId}
              >
                Create
              </Button>
              {accountId && (
                <div className="text-sm m-4">
                  <p>
                    <strong>TA Address:</strong> {faAddress}
                  </p>
                </div>
              )}
            </li>
            <li>
              Deposit SepETH to TA
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleDepositETH()}
                disabled={chainId !== sepolia.id || !faAddress}
                success={!!hash}
              >
                {chainId === sepolia.id
                  ? 'Deposit'
                  : 'Change network to Sepolia'}
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
              Mint NFT
              <Button
                className="btn bg-secondary w-full h-14 mt-2"
                onClick={async () => await handleMintNFT()}
              >
                {chainId === sepolia.id ? 'Mint' : 'Change network to Sepolia'}
              </Button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
