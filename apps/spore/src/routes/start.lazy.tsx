import { useState, useEffect } from 'react'
import { createLazyFileRoute, redirect } from '@tanstack/react-router'
import ImgIntro from '@/assets/spore-intro.svg'
import ImgLogo from '@/assets/spore-logo.svg'
import { useWallet } from '@/hooks/useWallet'
import { useBalance } from '@/hooks/useMycel'
import { useDomainOwnership } from '@/hooks/useMycel'
import { useVault } from '@/hooks/useVault'
import { toast } from '@/components/ui/sonner'
import { shortAddress } from '@/lib/wallets'
import { copyClipboard, cn } from '@/lib/utils'
import { ClipboardCopy } from 'lucide-react'
import Button from '~/components/Button'
import CelNameForm from '~/components/form/CelName'
import RefCodeForm from '~/components/form/RefCode'
import {
  MYCEL_COIN_DECIMALS,
  MYCEL_HUMAN_COIN_UNIT,
  convertToDecimalString,
} from '@/lib/coin'
import { convertDomainToString } from '@/lib/domainName'
import { useStore } from '@/store'
import { useNavigate } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/start')({
  component: Start,
})

function Start() {
  const THRESHOLD: number =
    import.meta.env.VITE_FAUCET_CLAIMABLE_THRESHOLD ?? 1000000
  const [isClaimable, setIsClaimable] = useState<boolean>(false)
  const [isUSDCClaimable, setIsUSDCClaimable] = useState<boolean>(false)
  const { isLoading: isLoadingBalance, data: dataBalance } = useBalance()
  const { usdcBalance } = useVault()
  const { mycelAccount } = useWallet()
  const mycelName = useStore((state) => state.mycelName)
  const navigate = useNavigate()

  useEffect(() => {
    if (BigInt(dataBalance?.balance?.amount ?? 0) < BigInt(THRESHOLD)) {
      setIsClaimable(true)
    } else {
      setIsClaimable(false)
    }
  }, [isLoadingBalance, dataBalance, THRESHOLD, isClaimable])

  useEffect(() => {
    if (usdcBalance?.data < BigInt(10000 * 1e6)) {
      setIsUSDCClaimable(true)
    } else {
      setIsUSDCClaimable(false)
    }
  }, [usdcBalance.data])

  // redirect to home if user already has a mycel address
  useEffect(() => {
    if (mycelAccount?.address && mycelName) {
      navigate({ to: '/home' })
    }
  }, [mycelAccount, mycelName, navigate])

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
              <Mint
                isClaimable={isClaimable}
                isUSDCClaimable={isUSDCClaimable}
                balance={BigInt(dataBalance?.balance?.amount ?? 0)}
                usdcBalance={usdcBalance?.data}
              />
            </li>
            <li>
              <RegisterCelName
                balance={BigInt(dataBalance?.balance?.amount ?? 0)}
              />
            </li>
            <li>
              <CheckRefCode isClaimable={isClaimable} />
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

function Create() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { switchChainId } = useVault()
  const { deriveKeys, mycelAccount } = useWallet()

  const createMycelAddress = async () => {
    const onSuccess = async () => {
      await deriveKeys()
      setIsLoading(false)
    }
    const onError = () => {
      setIsLoading(false)
      toast('⚠️ Please switch to Ethereum Mainnet')
    }

    setIsLoading(true)
    switchChainId(1, onSuccess, onError)
    try {
      await deriveKeys()
    } catch (e) {
      toast('⚠️ User rejected the signature request.')
    }
    setIsLoading(false)
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

function Mint({
  isClaimable,
  isUSDCClaimable,
  balance,
  usdcBalance,
}: {
  isClaimable: boolean
  isUSDCClaimable: boolean
  balance: bigint
  usdcBalance: bigint
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { mycelAccount, evmAddress } = useWallet()
  const { refetch } = useVault()

  const claimFaucet = async () => {
    if (isClaimable && mycelAccount?.address) {
      try {
        await fetch(
          `${import.meta.env.VITE_FAUCET_URL!}/faucet?address=${mycelAccount?.address}`
        ).then((res) => {
          console.log('faucet MYCEL succeeded!', res)
          toast('👌 MYCEL Minted!')
        })
      } catch (e) {
        console.error('faucet error: ', e)
        toast('⚠️ Mint MYCEL error!')
      }
    } else {
      toast('⚠️ You have enough balance')
      // setTxResponse({
      //   code: -1,
      //   rawLog: 'You have enough balance',
      // } as DeliverTxResponse)
    }
  }

  const claimUSDC = async () => {
    if (isUSDCClaimable && evmAddress) {
      try {
        await fetch(
          `${import.meta.env.VITE_USDC_FAUCET_URL!}/api/usdc?address=${evmAddress}`
        ).then((res) => {
          console.log('usdc faucet succeeded!', res)
          toast('👌 USDC Minted!')
        })
      } catch (e) {
        console.error('usdc faucet error: ', e)
        toast('⚠️ Mint USDC error!')
      } finally {
        refetch()
      }
    } else {
      toast('⚠️ You have enough USDC')
    }
  }

  const mintTestToken = async () => {
    setIsLoading(true)
    try {
      await claimFaucet()
      await claimUSDC()
    } catch (e) {
      toast('⚠️ Mint error!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <span className={cn(!isClaimable ? 'line-through' : undefined)}>
        Mint test token
      </span>
      {!isClaimable && !isUSDCClaimable && !isLoading ? (
        <>
          <p className="text-right font-title text-3xl font-bold">
            {convertToDecimalString(balance ?? 0, MYCEL_COIN_DECIMALS)}
            <span className="text-xl ml-1.5">{MYCEL_HUMAN_COIN_UNIT}</span>
          </p>
          <p className="text-right font-title text-3xl font-bold">
            {convertToDecimalString(usdcBalance ?? 0, MYCEL_COIN_DECIMALS)}
            <span className="text-xl ml-1.5">USDC</span>
          </p>
        </>
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

function RegisterCelName({ balance }: { balance: bigint }) {
  const { mycelAccount } = useWallet()
  const { isLoading: isLoadingOwnDomain, data: dataOwnDomain } =
    useDomainOwnership(mycelAccount?.address)
  const mycelName = useStore((state) => state.mycelName)
  const updateMycelName = useStore((state) => state.updateMycelName)

  useEffect(() => {
    // set mycelName (xxx.cel)
    const mycelName = dataOwnDomain?.domain_ownership?.domains[0]
    if (mycelName) {
      updateMycelName(convertDomainToString(mycelName))
    }
  }, [dataOwnDomain, isLoadingOwnDomain, updateMycelName])
  return (
    <>
      <span className={cn(mycelName ? 'line-through' : '')}>Get your name</span>
      {!isLoadingOwnDomain && mycelName ? (
        <p className="text-right font-title text-3xl font-bold">{mycelName}</p>
      ) : (
        <CelNameForm balance={balance} />
      )}
    </>
  )
}

function CheckRefCode({ isClaimable }: { isClaimable: boolean }) {
  return (
    <>
      <span className={cn('')}>Refferal code</span>
      <RefCodeForm isClaimable={isClaimable} />
    </>
  )
}
