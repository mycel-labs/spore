import { BaseLayout } from '~/renderer/PageShell'
import Logout from '@/components/svg/Logout'
import { UserCog, FileSignature } from 'lucide-react'
import Profile from '~/components/Profile'

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
    href: '/setting/profile',
    icon: <Logout className="w-6 h-6" />,
  },
]

export default function Page() {
  return (
    <BaseLayout>
      <div className="bg-light rounded-xl my-6 py-8">
        <h2 className="centerline font-bold text-2xl">Setting</h2>
        <Profile />
        <div className="space-y-6 py-6">
          {MENU_ITEMS.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}

const ListItem = ({ item }: { item: any }) => (
  <a
    href={item.href}
    className="btn bg-secondary mx-10 pt-2.5 pb-1.5 px-6 h-14"
  >
    <span className="btn-inner h-2/3 w-1/4" />
    <div className="flex items-center font-title text-xl">
      <span className="mr-2">{item.icon}</span>
      {item.text}
    </div>
  </a>
)
