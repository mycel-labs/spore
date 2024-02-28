import { Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { Menu, Home, Cog } from 'lucide-react'
import ImgLogo from '@/assets/spore-logo.svg'
import { cn } from '@/lib/utils'
import {
  useLockBodyScroll,
  useWindowScroll,
  useWindowSize,
} from '@uidotdev/usehooks'

type NavItem = {
  name: string | JSX.Element
  link: string
  klass: string
}

const NAV_ITEMS: NavItem[] = [
  // { name: 'Home', link: '/home', klass: 'bg-light' },
  { name: 'LeaderBoard', link: '/board', klass: 'bg-light' },
  {
    name: 'Reward',
    link: '/reward',
    klass: 'bg-light',
  },
  { name: 'Refereal', link: '/refferral', klass: 'bg-light' },
  // { name: 'Setting', link: '/setting', klass: 'bg-light' },
  { name: 'About', link: '/about', klass: 'bg-light' },
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
        <div className="flex space-x-2">
          <Link className="btn w-12 h-12 bg-light" to="/home">
            <span className="btn-inner h-2/3 w-2/3" />
            <Home size={30} strokeWidth={3} />
          </Link>
          <Link className="btn w-12 h-12 bg-light" to="/setting">
            <span className="btn-inner h-2/3 w-2/3" />
            <Cog size={30} strokeWidth={3} />
          </Link>
          <button
            className="btn w-12 h-12 bg-secondary"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="btn-inner h-2/3 w-2/3" />
            <Menu size={30} strokeWidth={3} />
          </button>
        </div>
      </nav>
      <nav className="relative h-screen z-50">
        <div
          className={cn(
            isOpen ? 'flex px-6' : 'hidden sm:flex',
            'fixed top-0 bottom-0 w-72'
          )}
        >
          <div className="absolute top-0 w-full pt-7">
            <img
              src={ImgLogo}
              className={cn('hidden sm:flex pr-8 opacity-90')}
            />
            <ul
              className={cn(
                'font-bold uppercase font-title text-2xl rounded space-y-5 mr-0 sm:mr-8 mt-14 sm:mt-10'
              )}
            >
              <div className="hidden sm:grid sm:grid-cols-2 gap-4 pb-1">
                <Link
                  className="btn bg-light h-14"
                  to="/home"
                  activeProps={{
                    className:
                      'bg-secondary shadow-none translate-y-2 opacity-90',
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <span className="btn-inner h-1/3 w-3/5" />
                      {isActive && (
                        <span className="btn-inner-active h-1/3 w-1/5" />
                      )}
                      <Home size={30} strokeWidth={3} />
                    </>
                  )}
                </Link>
                <Link
                  className="btn bg-light h-14"
                  to="/setting"
                  activeProps={{
                    className:
                      'bg-secondary shadow-none translate-y-2 opacity-90',
                  }}
                >
                  {({ isActive }) => (
                    <>
                      <span className="btn-inner h-1/3 w-3/5" />
                      {isActive && (
                        <span className="btn-inner-active h-1/3 w-1/5" />
                      )}
                      <Cog size={30} strokeWidth={3} />
                    </>
                  )}
                </Link>
              </div>
              {NAV_ITEMS.map((item, i) => (
                <ListItem setIsOpen={setIsOpen} key={i} item={item} />
              ))}
            </ul>
          </div>
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
        className="flex items-center btn bg-light h-14"
        activeProps={{
          className: 'bg-secondary shadow-none translate-y-2 opacity-90',
        }}
        onClick={() => setIsOpen(false)}
      >
        {({ isActive }) => (
          <>
            <span className="btn-inner h-1/3 w-2/5" />
            {isActive && <span className="btn-inner-active h-1/3 w-1/5" />}
            {item.name}
          </>
        )}
      </Link>
    </li>
  )
}

const MenuOverlay = ({ setIsOpen }: { setIsOpen: () => void }) => {
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
