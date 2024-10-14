import { createLazyFileRoute } from '@tanstack/react-router'
import Button from '~/components/Button'
import ProfileImg from '~/components/ProfileImg'
import { useState } from 'react'
import { shortAddress } from '@/lib/wallets'
import { useWallet } from '@/hooks/useWallet'
import { useSuave } from '@/hooks/useSuave'
import { isMobile } from '@/lib/utils'
import { useEffect } from 'react'
import { env } from '@/lib/env'

export const Route = createLazyFileRoute('/_app/mint')({
  component: Mint,
})

// Component
function Mint() {
  const {
    evmAddressWagmi,
    balance,
    evmChainId,
    switchEvmNetworkAsync,
    hash,
    sendTransaction,
    receiptError,
    receiptLoading,
    receiptSuccess,
    // hasMintedNFT,
  } = useWallet()

  const {
    state,
    sendCreateAccountCCR,
    // sendSignL1MintApprovalFA,
    mintNFTWithSignature,
  } = useSuave()

  const [accountId, setAccountId] = useState<string>('')
  const [faAddress, setFaAddress] = useState<string>('')
  const [recipientAddress, setRecipientAddress] = useState<string>('')
  const [mintButtonStatus, setMintButtonStatus] = useState<
    'idle' | 'minting' | 'minted'
  >('idle')

  const sepolia = { id: 11155111 }
  const hasBalanceSepolia =
    evmChainId === sepolia.id && balance && balance > BigInt(5e15) // 0.005 ETH

  const [showNetworkMask, setShowNetworkMask] = useState(true)

  useEffect(() => {
    if (evmChainId === sepolia.id) {
      setShowNetworkMask(false)
    } else {
      setShowNetworkMask(true)
    }
  }, [evmChainId])

  async function handleCreateTA() {
    await sendCreateAccountCCR()
    if (state.account) {
      console.log('Account created:', state.account)
      setAccountId(state.accountId)
      setFaAddress(state.taAddress)
    } else {
      console.error('Failed to create account')
    }
  }

  async function handleDepositETH() {
    await switchEvmNetworkAsync(sepolia.id)
    if (evmChainId === sepolia.id) {
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
      } else {
        console.error('Invalid faAddress:', faAddress)
      }
    }
  }

  async function handleMintNFT() {
    if (!state.account) {
      console.error('Invalid accountId')
      return
    }
    setMintButtonStatus('minting')
    try {
      await mintNFTWithSignature()
      console.log(`Minted NFT on sepolia:`, 'test')
    } catch (error) {
      console.error(`Failed to mint NFT on sepolia:`, error)
    }
    setMintButtonStatus('minted')
  }

  const NetworkMask = (
    <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center rounded-xl">
      <div className="bg-light p-8 m-8 rounded-xl text-center border-4 border-white">
        <h3 className="text-xl font-bold mb-4">Network Change Required</h3>
        <p className="mb-4">
          This feature is only available on the Sepolia testnet.
        </p>
        <Button
          className="btn bg-secondary w-full h-14 mt-2"
          onClick={() => switchEvmNetworkAsync(sepolia.id)}
        >
          Switch to Sepolia
        </Button>
      </div>
    </div>
  )

  const MintedNFTMessage = (
    <div className="p-4">
      <div className="text-center text-2xl font-extrabold m-4">
        <div className="pb-4">
          <p>🎊 Congratulations!🎉</p>
          <p>You own a Spore NFT!</p>
        </div>
        <div className="mt-4 flex justify-center items-center">
          <ProfileImg rank={1} />
        </div>
      </div>
      <div className="text-center text-sm px-8 pt-4">
        <a
          className="text-blue-500 underline"
          href={`https://sepolia.etherscan.io/token/0x1dc168b47be84d64c493b61120cb03167650df2a?a=${evmAddressWagmi}`}
          target="_blank"
          rel="noreferrer"
        >
          🔗 View your NFT on Etherscan
        </a>
      </div>
    </div>
  )

  const ReadyToMintMessage = (
    <>
      <div className="pb-4">
        <p className="text-center text-sm px-8 pt-4">
          This feature allows you to mint NFTs on Sepolia with SUAVE Toliman
          Testnet powered by Transferable Account (TA).
        </p>
        <div className="text-center text-sm px-8">
          For information of Toliman Testnet, see:
        </div>
        <div className="text-center text-sm px-8 text-blue-500 underline font-bold">
          <a
            href="https://suave-alpha.flashbots.net/toliman"
            target="_blank"
            rel="noreferrer"
          >
            🔗 Toliman Testnet Chain info
          </a>
        </div>
        <p className="text-center text-sm px-8 pt-4">
          <strong>
            This feature is in alpha. Specifications may change suddenly.
          </strong>
        </p>
      </div>
      <div className="px-8 pb-16">
        <h3 className="text-center text-xl font-bold py-2 centerline">Steps</h3>
        <ol className="list-decimal text-xl font-title list-inside space-y-6 px-4">
          <li>
            Create Transferable Account (TA)
            <Button
              className="btn bg-secondary w-full h-14 mt-2"
              onClick={async () => await handleCreateTA()}
              isLoading={state.waitingForReceipt}
              success={!!state.account}
            >
              Create
            </Button>
            {accountId && (
              <div className="text-sm m-4 mt-6">
                <p>
                  <strong>TA Address:</strong>{' '}
                  {isMobile() ? shortAddress(faAddress, 6) : faAddress}
                </p>
              </div>
            )}
          </li>
          <li>
            Deposit Sepolia ETH to TA
            {!hasBalanceSepolia && evmChainId === sepolia.id ? (
              <div className="text-sm m-4 font-bold">
                <p>⚠️ Your balance is quite low.</p>
                <span>You can get sepolia ETH from : </span>
                <a
                  className="text-blue-500 underline"
                  href="https://cloud.google.com/application/web3/faucet/ethereum/sepolia"
                  target="_blank"
                  rel="noreferrer"
                >
                  🔗 Google Cloud Faucet
                </a>
              </div>
            ) : (
              ''
            )}
            <Button
              className="btn bg-secondary w-full h-14 mt-2"
              onClick={async () => await handleDepositETH()}
              disabled={!faAddress}
              isLoading={receiptLoading}
              success={receiptSuccess}
            >
              {evmChainId === sepolia.id
                ? 'Deposit'
                : 'Switch network to Sepolia'}
            </Button>
            {hash && (
              <div className="text-sm m-4 mt-6">
                {receiptLoading && (
                  <p>
                    <span role="img" aria-label="success">
                      ⏳
                    </span>{' '}
                    Waiting for the transaction to be confirmed...
                  </p>
                )}
                {receiptError && (
                  <p>
                    <span role="img" aria-label="success">
                      ❌
                    </span>{' '}
                    Failed to wait for transaction receipt: {receiptError}
                  </p>
                )}
                {receiptSuccess && (
                  <p>
                    <span role="img" aria-label="success">
                      ✅
                    </span>{' '}
                    Transaction confirmed!{' '}
                  </p>
                )}
                <p>
                  {' '}
                  <a
                    className="text-blue-500 underline"
                    href={`https://sepolia.etherscan.io/tx/${hash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {isMobile()
                      ? shortAddress(hash, 8, 10)
                      : shortAddress(hash, 10, 16)}
                  </a>
                </p>
              </div>
            )}
          </li>
          <li>
            Mint NFT
            <input
              type="text"
              className="input w-full h-14 mt-2"
              placeholder="Recipient Ethereum Address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
            <p className="text-right text-xs p-2">
              <a
                className="text-blue-500 underline cursor-pointer"
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  setRecipientAddress(evmAddressWagmi as `0x${string}`)
                }}
              >
                Use connected wallet address
              </a>
            </p>
            {!/^0x[a-fA-F0-9]{40}$/.test(recipientAddress) &&
              recipientAddress && (
                <p className="text-red-500 text-right text-sm p-2">
                  <span role="img" aria-label="success">
                    ❌
                  </span>{' '}
                  Invalid Ethereum address format
                </p>
              )}
            <Button
              className="btn bg-secondary w-full h-14 mt-2"
              onClick={async () => await handleMintNFT()}
              disabled={
                !accountId ||
                !receiptSuccess ||
                !recipientAddress ||
                !/^0x[a-fA-F0-9]{40}$/.test(recipientAddress)
              }
              isLoading={state.waitingForReceipt}
              success={!!state.mintTxHash}
            >
              Mint
            </Button>
            {mintButtonStatus !== 'idle' && (
              <div className="text-sm p-4 pt-6 pb-0">
                {!state.mintTxHash && (
                  <p>
                    <span role="img" aria-label="waiting">
                      ⏳
                    </span>{' '}
                    Minting...
                  </p>
                )}
                {state.mintTxHash && (
                  <div className="flex flex-col md:flex-row md:m-4 md:mb-6 justify-center items-center">
                    <div className="md:w-1/3 w-1/2">
                      <ProfileImg rank={1} />
                    </div>
                    <div className="md:w-1/3  md:text-xl font-bold md:pl-4">
                      <span role="img" aria-label="success">
                        ✅ Minted!
                      </span>{' '}
                    </div>
                  </div>
                )}
                <p>
                  <div>
                    <span>Sepolia: </span>
                    {state.mintTxHash && (
                      <a
                        className="text-blue-500 underline"
                        href={`https://sepolia.etherscan.io/tx/${state.mintTxHash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {isMobile()
                          ? shortAddress(state.mintTxHash, 8, 10)
                          : shortAddress(state.mintTxHash, 10, 16)}
                      </a>
                    )}
                  </div>
                </p>
              </div>
            )}
          </li>
        </ol>
      </div>
    </>
  )

  const MaintenanceMessage = (
    <div className="p-4">
      <div className="text-center text-2xl font-extrabold m-4">
        <p className="pb-4">🚧 Temporary Maintenance 🚧</p>
        <p className="text-xl mt-4">
          We&apos;re currently upgrading this feature to serve you better.
        </p>
        <p className="text-xl mt-4">Thank you for your patience!</p>
        <p className="text-base mt-4">
          For the latest updates, follow us on{' '}
          <a
            href="https://x.com/mycelmycel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            X (Twitter)
          </a>{' '}
          or join our{' '}
          <a
            href="https://discord.com/invite/mycelland"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Discord
          </a>{' '}
          community.
        </p>
      </div>
    </div>
  )

  return (
    <div className="py-8 space-y-8">
      <div className="bg-light overlay-dot-ll rounded-xl relative">
        <h2 className="text-center text-3xl font-bold pt-8 centerline">Mint</h2>
        {env.isMaintenance ? (
          MaintenanceMessage
        ) : (
          <div>
            {showNetworkMask && NetworkMask}
            {/* {hasMintedNFT ? MintedNFTMessage : ReadyToMintMessage} */}
            {ReadyToMintMessage}
          </div>
        )}
      </div>
    </div>
  )
}
