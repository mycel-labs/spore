import { Social } from '~/public/Socials'

export interface Links extends Social {
  link: string
  icon: string
  app: string
  id: string
}
export default function SocialLink(props: Links) {
  return (
    <a
      href={props.link + props.id}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-start gap-2 mb-2 p-4 bg-gray-100 hover:bg-gray-200 border rounded shadow-solid cursor-pointer"
    >
      <img src={props.icon} width={40} height={40} alt="appLogo" />
      <p className="text-lg font-semibold">{props.app}</p>
      <p className="text-sm font-medium">{props.id}</p>
    </a>
  )
}
