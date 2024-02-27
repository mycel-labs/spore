import { createLazyFileRoute } from '@tanstack/react-router'
import Logout from '@/components/svg/Logout'
import { UserCog, FileSignature } from 'lucide-react'
import Profile from '~/components/Profile'
import useWallet from '@/hooks/useWallet'
import { useNavigate } from '@tanstack/react-router'

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
  {
    id: 'signout',
    text: 'Logout',
    icon: <Logout className="w-6 h-6" />,
  },
]

export const Route = createLazyFileRoute('/_app/setting')({
  component: Setting,
})

function Setting() {
  return (
    <div className="bg-light rounded-xl my-6 py-8">
      <h2 className="centerline font-bold text-2xl">Setting</h2>
      <Profile />
      <div className="space-y-6 py-6 px-6">
        {MENU_ITEMS.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

const ListItem = ({ item }: { item: any }) => {
  const { disconnectWallet } = useWallet()
  const navigate = useNavigate()

  const handleSignout = (): void => {
    disconnectWallet()
    navigate({ to: '/' })
  }

  if (item.id === 'signout') {
    return (
      <button
        onClick={handleSignout}
        className="btn bg-secondary py-2 px-6 h-14 w-full"
      >
        <span className="btn-inner h-2/3 w-1/4" />
        <div className="flex items-center font-title text-xl">
          <span className="mr-2">{item.icon}</span>
          {item.text}
        </div>
      </button>
    )
  }

  return (
    <a href={item.href} className="btn bg-secondary py-2 px-6 h-14">
      <span className="btn-inner h-2/3 w-1/4" />
      <div className="flex items-center font-title text-xl">
        <span className="mr-2">{item.icon}</span>
        {item.text}
      </div>
    </a>
  )
}
