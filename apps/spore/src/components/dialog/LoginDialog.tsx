import {
  Dialog,
  DialogOverlay,
  DialogClose,
  DialogContent,
  // DialogDescription,
  // DialogFooter,
  // DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'
import { useLockBodyScroll } from '@uidotdev/usehooks'
import { useWallet } from '@/hooks/useWallet'
import { WALLET_CONFIG, type WalletType } from '@/lib/wallets'
import { cn, isBitGetApp, isMobile, isOKXApp, isPC } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'

export default function LoginDialog({ trigger }: { trigger: React.ReactNode }) {
  const [mode, setMode] = useState<'default' | 'wallet'>('wallet')
  useLockBodyScroll()
  const { connectWallet, connectorsWagmi, isConnected } = useWallet()
  const navigate = useNavigate()

  useEffect(() => {
    isConnected && navigate({ to: '/home' })
  }, [navigate, isConnected])

  return (
    <Dialog>
      <DialogOverlay className="overlay-dot bg-black/40 backdrop-blur-sm" />
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-light sm:max-w-md p-8">
        <DialogClose className="absolute right-2 sm:-right-2.5 top-2 sm:-top-2.5 rounded-full disabled:pointer-events-none font-title text-xl bg-secondary btn-s w-8 h-8 pb-0.5 flex justify-center items-center">
          x
        </DialogClose>
        {/* {mode === 'default' && (
          <>
            <div className="font-title font-bold text-2xl mb-6 centerline">
              Start
            </div>
            <div className="flex items-center space-x-4 border-b border-dark border-dashed pb-6 mb-6">
              <button className="btn-s w-full h-12 bg-secondary">
                <Fingerprint className="mr-2" />
                Passkey
              </button>
              <button className="btn-s w-full h-12 bg-secondary">
                <div className="w-5 h-5 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                  </svg>
                </div>
                Google
              </button>
            </div>
            <button
              className="btn-s h-12 bg-secondary"
              onClick={() => setMode('wallet')}
            >
              <Wallet className="mr-2" />
              Connect with Wallet <span className="ml-2">→</span>
            </button>
          </>
        )} */}
        {mode === 'wallet' && (
          <div className="space-y-4">
            {/* <button onClick={() => setMode('default')}>
              <span className="mr-2 font-title font-bold text-2xl">&lt;</span>
            </button> */}
            <div className="font-title font-bold text-2xl mb-6 centerline">
              Start
            </div>

            {Object.entries(WALLET_CONFIG).map(([key, val]) => (
              <button
                key={val.id}
                className={cn(
                  'btn-s bg-secondary font-bold font-title w-full h-12',
                  ((isMobile() && !val.showMobile) || (isPC() && val.hidePC)) &&
                    'hidden'
                )}
                disabled={val?.disabled}
                onClick={async () => {
                  if (val.name === 'OKXWallet') {
                    if (isOKXApp()) {
                      connectWallet({ walletType: key as WalletType })
                    } else if (isMobile()) {
                      window.open(
                        `https://okex.com/web3/connect-dapp?uri=${encodeURIComponent(window.location.href)}`
                      )
                    } else if (isPC()) {
                      window.open('https://www.okx.com/web3')
                    }
                  } else if (val.name === 'BitGetWallet') {
                    if (isBitGetApp()) {
                      connectWallet({ walletType: key as WalletType })
                    } else if (isMobile()) {
                      window.open(
                        `https://bkcode.vip/?action=dapp&url=${encodeURIComponent(window.location.href)}`
                      )
                    } else {
                      window.open('https://web3.bitget.com')
                    }
                  } else {
                    // TODO: refactor this
                    if (
                      val.chainType === 'evm' ||
                      (val.chainType === 'cosmos' && window.keplr)
                    ) {
                      console.log('connect', key)
                      connectWallet({ walletType: key as WalletType })
                    } else {
                      console.log('Conn::', connectorsWagmi, val)
                      window.open(val.getUrl)
                    }
                  }
                }}
              >
                <span className="btn-inner h-1/3 w-1/5" />
                <span className="flex items-center justify-center px-6 mr-2">
                  {Array.isArray(val.icon) ? (
                    val.icon.map((item, index) => (
                      <img
                        key={`wallet-${index}`}
                        src={item}
                        width={24}
                        height={24}
                        alt={val.name}
                        className={cn(index > 0 && '-ml-2')}
                        style={{ zIndex: 2 - index }}
                      />
                    ))
                  ) : (
                    <img src={val.icon} width={24} height={24} alt={val.name} />
                  )}
                  <span className="ml-3">{val.display}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
