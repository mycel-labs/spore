import { useGetUser } from '@/hooks/useReferral'
import { useStore } from '@/store'
import {
  getRankFromScore,
  getRankNameFromScore,
  getNextRankFromScore,
} from '@/lib/referral'
import ProfileImg from '~/components/ProfileImg'

export default function Profile() {
  const mycelName = useStore((state) => state.mycelName)
  const user = useGetUser(mycelName)
  const cnt =
    !user.isLoading && user.data
      ? (user.data.data as { user: User })?.user?.invitedUserCount
      : 0
  const rank: number = getRankFromScore(cnt)

  return (
    <div className="grid grid-cols-2 border-dark border-2 rounded my-6 mx-4 sm:mx-6 bg-light">
      <div className="px-3 py-6 border-r-2 border-dark flex items-center justify-center">
        <ProfileImg rank={rank} />
      </div>
      <div className="break-all">
        <ul className="font-title">
          <li className="border-b-2 border-dark w-full">
            <div className="text-lg uppercase bg-dark text-light px-3 py-1">
              Name
            </div>
            <div className="text-2xl px-3 py-3 break-words">{mycelName}</div>
          </li>
          <li className="border-b-2 border-dark px-3 py-2 w-full">
            <div className="text-lg uppercase">Rank</div>
            <div className="text-2xl break-words pt-2">
              {getRankNameFromScore(cnt)}
            </div>
          </li>
          <li className="px-3 py-2 w-full">
            <div className="text-lg uppercase">Next Level</div>
            <div className="pt-2 text-2xl text-right">
              {getNextRankFromScore(cnt).current}&nbsp;/&nbsp;
              {getNextRankFromScore(cnt).next}
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
