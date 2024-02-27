import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog'
import { Fingerprint, Wallet, MoveRight, MoveLeft } from 'lucide-react'
import { useState } from 'react'

export default function DialogCloseButton({
  trigger,
}: {
  trigger: React.ReactNode
}) {
  const [mode, setMode] = useState<'default' | 'wallet'>('default')

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md p-8">
        {mode === 'default' && (
          <>
            <div className="font-title text-2xl text-center mb-10">Connect</div>
            <div className="flex items-center space-x-4 border-b border-dark border-dashed pb-6 mb-6">
              <button className="btn-s w-full h-10">
                <Fingerprint className="mr-2" />
                Passkey
              </button>
              <button className="btn-s w-full h-10">
                <div className="w-5 h-5 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                  </svg>
                </div>
                Google
              </button>
            </div>
            <button className="btn-s h-10" onClick={() => setMode('wallet')}>
              <Wallet className="mr-2" />
              Connect with Wallet
              <MoveRight className="ml-2" />
            </button>
          </>
        )}
        {mode === 'wallet' && (
          <div className="space-y-4">
            <button onClick={() => setMode('default')}>
              <MoveLeft className="mr-2" />
            </button>
            <button className="btn-s h-10 w-full">
              <Wallet className="mr-2" />
              Metamask
            </button>
            <button className="btn-s h-10 w-full">
              <Wallet className="mr-2" />
              Keplr
            </button>
            <button className="btn-s h-10 w-full">
              <Wallet className="mr-2" />
              OKX
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
