import { Trash2 } from 'lucide-react'
import { Social } from '@/lib/social/utils'

export interface Links extends Social {
  link: string
  icon: string
  app: string
  id: string
}
export default function SocialLink({
  Link,
  removeSocial,
}: {
  Link: Links
  removeSocial: (id: string) => void
}) {
  return (
    <div className="relative">
      <div
        className="absolute top-2 right-2 bg-red-400 p-1 rounded cursor-pointer"
        onClick={() => removeSocial(Link.id)}
      >
        <Trash2 />
      </div>
      <a
        href={Link.link + Link.id}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-start gap-2 mb-2 p-4 bg-gray-100 hover:bg-gray-200 border rounded shadow-solid cursor-pointer"
      >
        <img src={Link.icon} width={40} height={40} alt="appLogo" />
        <p className="text-lg font-semibold">{Link.app}</p>
        <p className="text-sm font-medium">{Link.id}</p>
      </a>
    </div>
  )
}
