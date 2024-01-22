import logo from '@/assets/logo.svg'
// TODO: fix type
export type Links = {
  link?: string
  icon?: React.ReactNode
  app?: string
  id?: string
}
export default function SocialLink(props: Links) {
  return (
    <a
      href={props.link || 'https://github.com/mycel-domain'}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-start gap-2 mb-2 p-4 bg-gray-100 hover:bg-gray-200 border rounded shadow-solid cursor-pointer"
    >
      <img src={logo} width={50} height={50} alt="appLogo" />
      <p className="text-lg font-bold">{props.app || 'mycel.id'}</p>
      <p className="text-sm font-medium">{props.id || 'user.cel'}</p>
    </a>
  )
}
