import { BaseLayout } from '~/renderer/PageShell'
import { ChevronRight, UserCog, LogOut, FileSignature } from 'lucide-react'

const MENU_ITEMS = [
  {id: 'editProfile', text: 'Edit profile', href: '/profile/edit', icon: <UserCog />},
  {id: 'editAddress', text: 'Edit address', href: '/address/edit', icon: <FileSignature />},
  {id: 'signout', text: 'Logout', href: '/profile/edit', icon: <LogOut />},
]

export default function Page() {
  return (
    <BaseLayout title="Setting">
      <div className="text-center py-10">
        <div className="mx-auto rounded-full h-24 w-24 border">
          <div className="bg-noise rounded-full h-full w-full text-gray-50/60 flex justify-center items-center bg-jade">
          </div>
        </div>
        {/* <div className="rounded-full w-24 h-24 bg-jade mx-auto" /> */}
        <h2 className="mt-4 font-bold">xxxx.cel</h2>
      </div>
      <ul className="border-t border-piano">
        {MENU_ITEMS.map((item) => (<ListItem key={item.id} item={item} />))}
      </ul>
    </BaseLayout>
  )
}

const ListItem = ({item}: {item: any　}) => (
  <li className="border-b border-piano">
    <a href={item.href} className="fl items-center px-5 py-5 content hover:bg-black/5">
      <div className="flex-1 flex items-center">
        <span className="mr-4 text-trinidad">{item.icon}</span>
        {item.text}
      </div>
      <ChevronRight className="rounded-full border border-piano" />
    </a>
  </li>
)