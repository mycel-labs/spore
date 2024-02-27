import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import ImgLogo from '@/assets/spore-logo.svg'
import PlayFill from '@/components/svg/PlayFill'
import Play from '@/components/svg/Play'
import { cn } from '@/lib/utils'
import {
  useLockBodyScroll,
  useWindowScroll,
  useWindowSize,
} from '@uidotdev/usehooks'

type NavItem = {
  name: string | JSX.Element
  link: string
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', link: '/home' },
  { name: 'Leader Board', link: '/board' },
  {
    name: 'Reward',
    link: '/reward',
  },
  { name: 'Referral', link: '/refferral' },
  { name: 'Setting', link: '/setting' },
  { name: 'About', link: '/about' },
]

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [{ y }] = useWindowScroll()

  useEffect(() => {
    y > 15 ? setScrolled(true) : setScrolled(false)
  }, [y, scrolled, setScrolled])

  return (
    <>
      {isOpen && <MenuOverlay setIsOpen={setIsOpen} />}
      <nav
        className={cn(
          scrolled
            ? 'bg-primary/95 overlay-dot-l backdrop-blur'
            : 'bg-transparent',
          'h-20 fixed right-0 left-0 top-0 w-full flex sm:hidden z-30 justify-between px-6 py-3'
        )}
      >
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
            'fixed w-72 top-0 bottom-0'
          )}
        >
          <ul
            className={cn(
              'bottom-auto top-0',
              'font-title text-xl rounded space-y-2.5 bg-dark text-light pt-7 pl-4 pr-2 pb-5 my-6 h-auto absolute left-0 right-8 outline outline-3 outline-dark border-3 border-light font-bold'
            )}
          >
            {NAV_ITEMS.map((item, i) => (
              <ListItem key={i} item={item} setIsOpen={setIsOpen} />
            ))}
          </ul>
          <img
            src={ImgLogo}
            className={cn(
              'hidden sm:flex top-6 bottom-auto sm:bottom-6 sm:top-auto absolute pr-8 opacity-90'
            )}
          />
        </div>
      </nav>
    </>
  )
}

const ListItem = ({
  item,
  setIsOpen,
}: {
  item: NavItem
  setIsOpen: (flg: boolean) => void
}) => {
  return (
    <li className="group">
      <Link
        to={item.link}
        className="flex items-center"
        onClick={() => setIsOpen(false)}
      >
        {({ isActive }) => (
          <>
            {isActive ? (
              <PlayFill className="w-3 h-3 mr-2 group-hover:animate-pulse" />
            ) : (
              <Play className="w-3 h-3 mr-2 group-hover:animate-pulse" />
            )}
            {item.name}
          </>
        )}
      </Link>
    </li>
  )
}

const MenuOverlay = ({ setIsOpen }: { setIsOpen: (flg: boolean) => void }) => {
  useLockBodyScroll()
  const { width } = useWindowSize()

  useEffect(() => {
    width > 640 && setIsOpen(false)
  }, [width, setIsOpen])

  return (
    <div
      className={cn(
        'flex sm:hidden',
        'overlay-dot backdrop-blur-sm bg-black/40 fixed top-0 bottom-0 right-0 left-0 z-40'
      )}
      onClick={() => setIsOpen(false)}
    >
      <button
        className="bg-secondary w-12 h-12 rounded-full btn-s fixed top-2 right-6 flex items-center justify-center"
        onClick={() => setIsOpen(false)}
      >
        <span className="font-title text-2xl">x</span>
      </button>
    </div>
  )
}
