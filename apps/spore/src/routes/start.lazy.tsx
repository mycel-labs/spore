import { useState, useEffect } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import ImgIntro from '@/assets/spore-intro.svg'
import ImgLogo from '@/assets/spore-logo.svg'
import { useWallet } from '@/hooks/useWallet'
import { useBalance } from '@/hooks/useMycel'
import { toast } from '@/components/ui/sonner'
import { shortAddress } from '@/lib/wallets'
import { copyClipboard, cn } from '@/lib/utils'
import { ClipboardCopy } from 'lucide-react'
import Button from '~/components/Button'
import {
  MYCEL_COIN_DECIMALS,
  MYCEL_HUMAN_COIN_UNIT,
  convertToDecimalString,
} from '@/lib/coin'

export const Route = createLazyFileRoute('/start')({
  component: Start,
})

function Start() {
  return (
    <div className="min-h-screen sm:max-w-screen-sm mx-auto py-8 px-4 sm:px-6">
      <img src={ImgLogo} className="h-16 mx-auto mb-6" />
      <div className="bg-light overlay-dot-ll px-6 py-10 rounded-2xl">
        <img src={ImgIntro} className="mx-auto max-w-sm mt-4 mb-8 px-10" />
        <div>
          <ol className="list-decimal text-xl font-title list-inside space-y-6 px-4">
            <li>
              <Create />
            </li>
            <li>
              <Mint />
            </li>
            <li>
              <GetCel />
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

function Create() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { deriveKeys, mycelAccount } = useWallet()

  const createMycelAddress = async () => {
    setIsLoading(false)
    await deriveKeys()
    setIsLoading(true)
    toast(`Created! "${shortAddress(mycelAccount.address ?? 'mycel...')}"`)
  }

  return (
    <>
      <span className={cn(!!mycelAccount?.address && 'line-through')}>
        Create mycel address
      </span>
      {!mycelAccount ? (
        <Button
          type="button"
          isLoading={isLoading}
          className="bg-secondary w-full h-14 mt-2"
          onClick={async () => await createMycelAddress()}
          disabled={!!mycelAccount}
        >
          Create
        </Button>
      ) : (
        <div className="relative">
          <input
            readOnly
            type="text"
            className="w-full mt-2"
            value={shortAddress(mycelAccount.address)}
          />
          <button
            onClick={() => {
              copyClipboard(mycelAccount.address)
              toast(`Address "${shortAddress(mycelAccount.address)}" copied!`)
            }}
          >
            <ClipboardCopy
              strokeWidth={3}
              size={26}
              className="text-light absolute right-5 bottom-4 z-10"
            />
          </button>
        </div>
      )}
    </>
  )
}

function Mint() {
  const THRESHOLD: number =
    import.meta.env.VITE_FAUCET_CLAIMABLE_THRESHOLD ?? 1000000
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isClaimable, setIsClaimable] = useState<boolean>(false)
  const { mycelAccount } = useWallet()
  const { isLoading: isLoadingBalance, data: dataBalance } = useBalance()

  useEffect(() => {
    if (BigInt(dataBalance?.balance?.amount ?? 0) < BigInt(THRESHOLD)) {
      setIsClaimable(true)
    } else {
      setIsClaimable(false)
    }
  }, [isLoadingBalance, dataBalance, THRESHOLD, isClaimable])

  const claimFaucet = async () => {
    if (isClaimable && mycelAccount?.address) {
      await fetch(
        `${import.meta.env.VITE_DASHBOARD_HOST}/api/faucet?address=${mycelAccount?.address}`
      )
        .then((res) => res.json())
        .then((data) => {
          toast(data.response as DeliverTxResponse)
          // setTxResponse(data.response as DeliverTxResponse)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      toast('⚠️ You have enough balance')
      // setTxResponse({
      //   code: -1,
      //   rawLog: 'You have enough balance',
      // } as DeliverTxResponse)
    }
  }

  const mintTestToken = async () => {
    setIsLoading(true)
    try {
      await claimFaucet()
      toast('👌 Minted!')
    } catch (e) {
      toast('⚠️ Mint error!')
    }
    setIsLoading(false)
  }

  return (
    <>
      <span className={cn(!isClaimable ? 'line-through' : undefined)}>
        Mint test token
      </span>
      {!isClaimable ? (
        <p className="text-right font-title text-3xl font-bold">
          {convertToDecimalString(
            dataBalance?.balance?.amount ?? 0,
            MYCEL_COIN_DECIMALS
          )}
          <span className="text-xl ml-1.5">{MYCEL_HUMAN_COIN_UNIT}</span>
        </p>
      ) : (
        <Button
          type="button"
          isLoading={isLoading}
          disabled={!isClaimable}
          className="btn bg-secondary w-full h-14 mt-2"
          onClick={async () => await mintTestToken()}
        >
          Mint
        </Button>
      )}
    </>
  )
}

function GetCel() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { mycelAccount } = useWallet()

  const getCelName = async () => {
    setIsLoading(true)
    setIsLoading(false)
    toast(`Get "${shortAddress(mycelAccount.address ?? 'xxx.cel')}"`)
  }

  return (
    <>
      <span className={cn('')}>Get your name</span>
      <input type="text" placeholder="xxx.cel" className="w-full mt-2" />
      <Button
        type="button"
        isLoading={isLoading}
        className="btn bg-secondary w-full h-14 mt-2"
        onClick={async () => await getCelName()}
      >
        Get .cel name
      </Button>
    </>
  )
}
