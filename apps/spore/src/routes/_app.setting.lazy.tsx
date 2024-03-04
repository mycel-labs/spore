import { createLazyFileRoute } from '@tanstack/react-router'
import { UserCog, FileSignature, ClipboardCopy } from 'lucide-react'
import Profile from '~/components/Profile'
import useWallet from '@/hooks/useWallet'
import { shortAddress } from '@/lib/wallets'
import { copyClipboard } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import { toast } from '@/components/ui/sonner'

const MENU_ITEMS = [
  {
    id: 'editProfile',
    text: 'Edit profile',
    href: '/setting/profile',
    icon: <UserCog />,
  },
  {
    id: 'editAddress',
    text: 'Edit address',
    href: 'setting/address',
    icon: <FileSignature />,
  },
]

export const Route = createLazyFileRoute('/_app/setting')({
  component: Setting,
})

function Setting() {
  const { evmAddress, mycelAddress } = useWallet()
  const { disconnectWallet } = useWallet()
  const navigate = useNavigate()

  const handleSignout = (): void => {
    disconnectWallet()
    navigate({ to: '/' })
  }

  return (
    <div className="py-8 space-y-8">
      <div className="bg-light overlay-dot-ll rounded-xl py-8">
        <h2 className="centerline font-bold text-3xl">Setting</h2>
        <Profile />
        <div className="space-y-6 py-6 px-6">
          {MENU_ITEMS.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
        </div>
        <ul className="list-table mx-4 sm:mx-6 mt-6">
          {mycelAddress && (
            <li>
              <div className="header px-4">Mycel Address</div>
              <div className="px-4 flex justify-between items-center">
                {shortAddress(mycelAddress, 10, 6)}
                <button
                  className="btn-s bg-secondary px-2.5 py-1 -mt-4 text-sm uppercase font-bold"
                  onClick={() => {
                    copyClipboard(mycelAddress)
                    toast('Address copied!')
                  }}
                >
                  Copy
                </button>
              </div>
            </li>
          )}
          {evmAddress && (
            <li>
              <div className="header px-4">EVM Address</div>
              <div className="px-4 flex justify-between items-center">
                {shortAddress(evmAddress, 10, 6)}
                <button
                  className="px-2.5 py-1 -mt-2 text-sm uppercase font-bold"
                  onClick={() => {
                    copyClipboard(evmAddress)
                    toast('Address copied!')
                  }}
                >
                  <ClipboardCopy size={28} strokeWidth={3} />
                </button>
              </div>
            </li>
          )}
          <li className="px-6 pb-6">
            <button
              onClick={handleSignout}
              className="btn bg-secondary py-2 px-6 h-14 w-full mt-6"
            >
              <span className="btn-inner h-2/3 w-1/4" />
              <div className="flex items-center font-title text-xl">LogOut</div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

const ListItem = ({ item }: { item: any }) => (
  <a href={item.href} className="btn bg-secondary py-2 px-6 h-14">
    <span className="btn-inner h-2/3 w-1/4" />
    <div className="flex items-center font-title text-xl">
      <span className="mr-2">{item.icon}</span>
      {item.text}
    </div>
  </a>
)
