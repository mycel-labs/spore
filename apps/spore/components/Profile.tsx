import ImgMrIcon from '@/assets/mr-icon.svg'

export default function Profile() {
  return (
    <div className="grid grid-cols-2 border-dark border rounded my-6 mx-4 sm:mx-6">
      <div className="px-3 py-2 border-r border-dark flex items-center justify-center">
        <img src={ImgMrIcon} />
      </div>
      <div className="">
        <ul className="font-title">
          <li className="border-b border-dark px-3 py-2 w-full">
            <div className="text-xl uppercase">Name</div>
            <div className="text-3xl pt-2 break-words">akira.cel</div>
          </li>
          <li className="border-b border-dark px-3 py-2 w-full">
            <div className="text-xl">RANK</div>
            <div className="break-words">Mycellian</div>
          </li>
          <li className="px-3 py-2 w-full">
            <div className="text-xl">NEXT LEVEL</div>
            <div className="">Mycellian</div>
          </li>
        </ul>
      </div>
    </div>
  )
}
