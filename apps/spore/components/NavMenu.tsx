import { useState } from 'react'
import { Menu } from 'lucide-react'
import ImgLogo from '@/assets/spore-logo.svg'
import { cn } from '@/lib/utils'

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <div
        className={cn(
          isOpen ? 'flex sm:hidden' : 'hidden',
          'bg-dot fixed top-0 bottom-0 right-0 left-0 z-40'
        )}
      >
        <button
          className="bg-secondary w-12 h-12 rounded-full btn-s fixed bottom-6 right-6 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <span className="font-title text-2xl">x</span>
        </button>
      </div>
      <nav className="h-20 fixed right-0 left-0 bottom-0 bg-primary w-full flex sm:hidden z-30 justify-between px-6 py-3">
        <img src={ImgLogo} className="" />
        <button
          className="btn w-12 h-12 bg-secondary"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="btn-inner h-2/3 w-2/3" />
          <Menu size={30} strokeWidth={3} />
        </button>
      </nav>
      <nav className="relative h-screen z-50">
        <div
          className={cn(
            isOpen ? 'flex' : 'hidden sm:flex',
            'overflow-hidden fixed w-72 top-0 bottom-0'
          )}
        >
          <ul
            className={cn(
              'bottom-0 top-auto sm:bottom-auto sm:top-0',
              'font-title text-2xl border-dark border-2 rounded-xl shadow-solid-xs space-y-1 bg-secondary pt-8 px-6 pb-6 my-6 h-auto absolute left-0 right-8'
            )}
          >
            <li className="border-b-4 border-transparent hover:border-dark hover:border-pulse">
              <a>▶ Home</a>
            </li>
            <li className="border-b-4 border-transparent hover:border-dark hover:border-pulse">
              <a>▷ Set address</a>
            </li>
            <li className="border-b-4 border-transparent hover:border-dark hover:border-pulse">
              <a>▷ Referral</a>
            </li>
            <li className="border-b-4 border-transparent hover:border-dark hover:border-pulse">
              <a>▷ Deposit</a>
            </li>
            <li className="border-b-4 border-transparent hover:border-dark hover:border-pulse">
              <a>▷ ?</a>
            </li>
          </ul>
          <img
            src={ImgLogo}
            className={cn(
              'top-5 bottom-auto sm:top-auto sm:bottom-5',
              'absolute pr-8'
            )}
          />
        </div>
      </nav>
    </>
  )
}
