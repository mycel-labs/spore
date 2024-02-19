import { Home, Contact, Settings2, MessageSquareDot } from 'lucide-react'

type NavItem = {
  id: string
  href: string
  text: string
  icon: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', href: '/home', icon: <Home />, text: 'Home' },
  { id: 'contact', href: '/contacts', icon: <Contact />, text: 'Contacts' },
  { id: 'message', href: '/chats', icon: <MessageSquareDot />, text: 'Chat' },
  { id: 'setting', href: '/setting', icon: <Settings2 />, text: 'Setting' },
]

export default function NavMenu() {
  return (
    <nav className="fixed bottom-6 right-0 left-0 sm:top-6 sm:bottom-auto lg:right-8 lg:left-auto flex justify-center z-40 -ml-1 md:ml-0">
      <ul className='bg-samon border-piano border flex h-14 rounded shadow-solid px-4'>
       {NAV_ITEMS.map((item: NavItem) => (<NavItem key={item.id} item={item} />))}
      </ul>
    </nav>
  )
}

function NavItem({item}: {item: NavItem}) {
  return (
    <li className='h-14'>
      <a href={item.href} className="h-10 my-2 flex items-center justify-center rounded-lg hover:bg-black/5">
        <div className='w-10 mx-2 flex justify-center'>{item.icon}</div>
        <div className='hidden sm:flex mr-6 text-xs font-bold'>{item.text}</div>
      </a>
    </li>
  )
}
