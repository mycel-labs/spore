import ImgMrIcon from '@/assets/mr-icon.svg'
import { useWallet } from '@/hooks/useWallet'
import { useDomainOwnership } from '@/hooks/useMycel'

export default function Profile() {
  const wallet = useWallet()
  const { isLoading: isLoadingOwnDomain, data: dataOwnDomain } =
    useDomainOwnership(wallet?.mycelAccount?.address)
  const domain = !isLoadingOwnDomain
    ? dataOwnDomain?.domainOwnership?.domains[0]
    : undefined

  return (
    <div className="grid grid-cols-2 border-dark border-2 rounded my-6 mx-4 sm:mx-6 bg-light">
      <div className="px-3 py-2 border-r-2 border-dark flex items-center justify-center">
        <img src={ImgMrIcon} />
      </div>
      <div className="break-all">
        <ul className="font-title">
          <li className="border-b-2 border-dark w-full">
            <div className="text-lg uppercase bg-dark text-light px-3 py-1">
              Name
            </div>
            <div className="text-3xl px-3 py-3 break-words">
              {domain?.name}.{domain?.parent}
            </div>
          </li>
          <li className="border-b-2 border-dark px-3 py-2 w-full">
            <div className="text-lg uppercase">Rank</div>
            <div className="text-2xl break-words pt-2">Mycellian</div>
          </li>
          <li className="px-3 py-2 w-full">
            <div className="text-lg uppercase">Next Level</div>
            <div className="pt-2 text-2xl text-right">100/1000</div>
          </li>
        </ul>
      </div>
    </div>
  )
}
