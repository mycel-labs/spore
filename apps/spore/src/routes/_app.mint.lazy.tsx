import { createLazyFileRoute } from '@tanstack/react-router'
import Button from '~/components/Button'
import ProfileImg from '~/components/ProfileImg'
import {
  MintRequest,
  useCreateAccount,
  useMint,
  Network,
} from '@/hooks/useSuave'
import { useState } from 'react'
import { shortAddress } from '@/lib/wallets'
import { useWallet } from '@/hooks/useWallet'
import { isMobile } from '@/lib/utils'

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
  } = useWallet()

  const [accountId, setAccountId] = useState<string>('')
  const [faAddress, setFaAddress] = useState<string>('')
  const [recipientAddress, setRecipientAddress] = useState<string>('')
  const [mintTxHash, setMintTxHash] = useState<string>('')
  const [mintButtonStatus, setMintButtonStatus] = useState<
    'idle' | 'minting' | 'minted'
  >('idle')
  const { mutateAsync: createAccount, isPending: createAccountPending } =
    useCreateAccount()
  const { mutateAsync: mint, isPending: mintPending } = useMint()

  const holesky = { id: 17000 }
  const hasBalanceHolesky =
    evmChainId === holesky.id && balance && balance > BigInt(5e15) // 0.005 ETH

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
    switchEvmNetworkAsync(holesky.id)
    if (evmChainId === holesky.id) {
      // send 1 wei to TA
      if (/^0x[a-fA-F0-9]{40}$/.test(faAddress)) {
        const TA = faAddress as `0x${string}`
        const amount = BigInt('1')
        sendTransaction({
          to: TA,
          value: amount,
          gas: BigInt(21000),
          chainId: holesky.id,
        })
      } else {
        console.error('Invalid faAddress:', faAddress)
      }
    }
  }

  async function handleMintNFT() {
    if (!accountId) {
      console.error('Invalid accountId')
      return
    }
    const networks: Network[] = ['holesky']
    for (const network of networks) {
      setMintButtonStatus('minting')
      const body: MintRequest = {
        recipient: recipientAddress,
        accountId,
        network,
      }
      try {
        const resp = await mint(body)
        setMintTxHash(resp.txHash)
        console.log(`Minted NFT on ${network}:`, resp.txHash)
      } catch (error) {
        console.error(`Failed to mint NFT on ${network}:`, error)
      }
    }
    setMintButtonStatus('minted')
  }

  return (
    <div className="py-8 space-y-8">
      <div className="bg-light overlay-dot-ll rounded-xl">
        <h2 className="text-center text-3xl font-bold pt-8 centerline">Mint</h2>
        <div className="pb-4">
          <p className="text-center text-sm px-8 pt-4">
            This feature allows you to mint NFTs on Holesky with SUAVE Toliman
            Testnet powered by Transferable Account (TA).
          </p>
          <div className="text-center text-sm px-8">
            For information of Rigil Testnet, see:
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
                <div className="text-sm m-4 mt-6">
                  <p>
                    <strong>TA Address:</strong>{' '}
                    {isMobile() ? shortAddress(faAddress, 6) : faAddress}
                  </p>
                </div>
              )}
            </li>
            <li>
              Deposit SepETH to TA
              {!hasBalanceHolesky && evmChainId === holesky.id ? (
                <div className="text-sm m-4 font-bold">
                  <p>⚠️ Your balance is quite low.</p>
                  <span>You can get sepETH from : </span>
                  <a
                    className="text-blue-500 underline"
                    href="https://cloud.google.com/application/web3/faucet/ethereum/holesky"
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
                {evmChainId === holesky.id
                  ? 'Deposit'
                  : 'Change network to Holesky'}
              </Button>
              {hash && (
                <div className="text-sm m-4 mt-6">
                  {receiptLoading && (
                    <p>
                      <span role="img" aria-label="success">
                        ⏳
                      </span>{' '}
                      Waiting for transaction to be confirmed...
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
                      href={`https://holesky.etherscan.io/tx/${hash}`}
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
                isLoading={mintPending}
                success={!!mintTxHash}
              >
                Mint
              </Button>
              {mintButtonStatus !== 'idle' && (
                <div className="text-sm p-4 pt-6 pb-0">
                  {!mintTxHash && (
                    <p>
                      <span role="img" aria-label="waiting">
                        ⏳
                      </span>{' '}
                      Minting...
                    </p>
                  )}
                  {mintTxHash && (
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
                      <span>Holesky: </span>
                      {mintTxHash && (
                        <a
                          className="text-blue-500 underline"
                          href={`https://holesky.etherscan.io/tx/${mintTxHash}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {isMobile()
                            ? shortAddress(mintTxHash, 8, 10)
                            : shortAddress(mintTxHash, 10, 16)}
                        </a>
                      )}
                    </div>
                  </p>
                </div>
              )}
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
