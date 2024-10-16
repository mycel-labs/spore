import { createLazyFileRoute } from '@tanstack/react-router'
import Button from '~/components/Button'
import ProfileImg from '~/components/ProfileImg'
import { useState } from 'react'
import { shortAddress } from '@/lib/wallets'
import { useWallet } from '@/hooks/useWallet'
import { useSuave } from '@/hooks/useSuave'
import { toast } from '@/components/ui/sonner'
import { isMobile } from '@/lib/utils'
import { useEffect } from 'react'

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
    hasMintedNFT,
  } = useWallet()

  const {
    state,
    sendCreateAccountCCR,
    sendSignL1MintApprovalFA,
    mintNFTWithSignature,
  } = useSuave()

  const [mintButtonStatus, setMintButtonStatus] = useState<
    'idle' | 'minting' | 'minted'
  >('idle')

  const sepolia = { id: 11155111 }
  const hasBalanceSepolia =
    evmChainId === sepolia.id && balance && balance > BigInt(5e15) // 0.005 ETH

  const hasBalanceToliman = state.balance && state.balance > BigInt(1e16) // 0.01 TEETH

  const [showNetworkMask, setShowNetworkMask] = useState(true)

  const [signButtonDisabled, setSignButtonDisabled] = useState(true)

  useEffect(() => {
    setSignButtonDisabled(!hash || receiptLoading)
  }, [hash, receiptLoading])

  useEffect(() => {
    if (evmChainId === sepolia.id) {
      setShowNetworkMask(false)
    } else {
      setShowNetworkMask(true)
    }
  }, [evmChainId])

  async function handleCreateTA() {
    await sendCreateAccountCCR()
  }

  async function handleDepositETH() {
    await switchEvmNetworkAsync(sepolia.id)
    if (evmChainId === sepolia.id) {
      // send 1 wei to TA
      if (/^0x[a-fA-F0-9]{40}$/.test(state.taAddress as `0x${string}`)) {
        const TA = state.taAddress as `0x${string}`
        const amount = BigInt('1')
        sendTransaction({
          to: TA,
          value: amount,
          gas: BigInt(21000),
          chainId: sepolia.id,
        })
      } else {
        console.error('Invalid faAddress:', state.taAddress)
      }
    }
  }

  async function handleMintNFT() {
    if (!state.accountId) {
      console.error('Invalid accountId')
      toast(
        '⚠️ Failed to get transferable account ID, please reload the page and try again from the start.'
      )
      return
    }
    setMintButtonStatus('minting')
    try {
      await mintNFTWithSignature()
    } catch (error) {
      console.error(`Failed to mint NFT on sepolia:`, error)
      setMintButtonStatus('idle')
      toast(
        '⚠️ Failed to mint NFT, please reload the page and try again from the start.'
      )
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
          href={`https://sepolia.etherscan.io/token/0x843f17358072d0ce2FB387Ef376dc984673f23Ee?a=${evmAddressWagmi}`}
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
            {!hasBalanceToliman ? (
              <div className="text-sm m-4 font-bold">
                <p>⚠️ Your balance on Toliman Testnet is quite low.</p>
                <span>You can get TEETH from : </span>
                <a
                  className="text-blue-500 underline"
                  href="https://faucet.toliman.suave.flashbots.net/"
                  target="_blank"
                  rel="noreferrer"
                >
                  🔗 SUAVE Toliman TEEth Faucet
                </a>
              </div>
            ) : (
              ''
            )}
            <Button
              className="btn bg-secondary w-full h-14 mt-2"
              onClick={async () => await handleCreateTA()}
              isLoading={!state.accountId && state.waitingForReceipt}
              success={!!state.accountId}
              disabled={!hasBalanceToliman}
            >
              Create
            </Button>
            {state.taAddress && (
              <div className="text-sm m-4 mt-6">
                <p>
                  <strong>TA Address:</strong>{' '}
                  {isMobile()
                    ? shortAddress(state.taAddress as `0x${string}`, 6)
                    : state.taAddress}
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
              disabled={!state.taAddress}
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
            Sign Mint Approval
            <Button
              className="btn bg-secondary w-full h-14 mt-2"
              onClick={async () => await sendSignL1MintApprovalFA()}
              isLoading={!!state.accountId && state.waitingForReceipt}
              success={!!state.signedMessage}
              disabled={signButtonDisabled || !!state.signedMessage}
            >
              Sign
            </Button>
          </li>
          <li>
            Mint NFT
            {/* <input
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
            </p> */}
            <p className="text-sm px-8 pt-2">
              to the connected wallet address:
            </p>
            <p className="text-md font-bold px-8 pb-2">
              {isMobile()
                ? shortAddress(evmAddressWagmi as `0x${string}`, 6)
                : shortAddress(evmAddressWagmi as `0x${string}`, 16)}
            </p>
            {!/^0x[a-fA-F0-9]{40}$/.test(evmAddressWagmi as `0x${string}`) && (
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
                !state.taAddress ||
                !state.signedMessage ||
                !evmAddressWagmi ||
                !/^0x[a-fA-F0-9]{40}$/.test(evmAddressWagmi as `0x${string}`)
              }
              isLoading={
                !!state.signedMessage &&
                !!state.mintTxHash &&
                !state.mintTxSuccess
              }
              success={!!state.mintTxSuccess}
            >
              Mint
            </Button>
            {mintButtonStatus !== 'idle' && (
              <div className="text-sm p-4 pt-6 pb-0">
                {!state.mintTxSuccess && (
                  <p>
                    <span role="img" aria-label="waiting">
                      ⏳
                    </span>{' '}
                    Minting...
                  </p>
                )}
                {state.mintTxSuccess && (
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
                <div>
                  <span>Sepolia: </span>
                  {state.mintTxSuccess && (
                    <a
                      className="text-blue-500 underline"
                      href={`https://sepolia.etherscan.io/tx/${state.mintTxHash}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {isMobile()
                        ? shortAddress(state.mintTxHash as `0x${string}`, 8, 10)
                        : shortAddress(
                            state.mintTxHash as `0x${string}`,
                            10,
                            16
                          )}
                    </a>
                  )}
                </div>
              </div>
            )}
          </li>
        </ol>
      </div>
    </>
  )

  const MainComponent = (
    <div>
      {showNetworkMask && NetworkMask}
      {hasMintedNFT ? MintedNFTMessage : ReadyToMintMessage}
    </div>
  )

  return (
    <div className="py-8 space-y-8">
      <div className="bg-light overlay-dot-ll rounded-xl relative">
        <h2 className="text-center text-3xl font-bold pt-8 centerline">Mint</h2>
        {MainComponent}
      </div>
    </div>
  )
}
