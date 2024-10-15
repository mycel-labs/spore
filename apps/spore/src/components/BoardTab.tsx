import { Tabs, TabsContent as TabsContent_ } from '@/components/ui/tabs'
import { useGetIndividualLeaderBoard } from '@/hooks/useReferral'
import { isMobile } from '@/lib/utils'
import { LeaderBoard } from '@/types/referral'
import LoaderCircle from './LoaderCircle'

/*
 * utils
 */
function truncateName(
  name: string,
  visibleCharsMobile: number = 15,
  visibleCharsPC: number = 25
): string {
  const visibleChars = isMobile() ? visibleCharsMobile : visibleCharsPC

  if (name.length <= visibleChars) return name
  const lastPartLength = visibleChars - 5
  const lastPart = name.slice(-lastPartLength)
  const firstPart = name.slice(0, visibleChars - lastPartLength)
  return `${firstPart}...${lastPart}`
}

/*
 * components
 */
export default function BoardTab() {
  const {
    data: individualLeaderBoardData,
    isLoading: isIndividualLeaderBoardLoading,
  } = useGetIndividualLeaderBoard()

  const errorLB: LeaderBoard[] = [
    {
      userId: 'error.cel',
      totalPoints: 500,
    },
  ]

  const lb: LeaderBoard[] =
    !isIndividualLeaderBoardLoading && individualLeaderBoardData
      ? individualLeaderBoardData
      : errorLB

  return (
    <Tabs defaultValue={'player'} className="w-full">
      <TabsContent value="player">
        <PlayerTabContent lb={lb} isLoading={isIndividualLeaderBoardLoading} />
      </TabsContent>
    </Tabs>
  )
}

const TabsContent = (props: React.ComponentProps<typeof TabsContent_>) => (
  <TabsContent_
    className="bg-light overlay-dot-ll p-6 rounded-xl mt-6 pb-10"
    {...props}
  />
)

const PlayerTabContent = ({
  lb,
  isLoading,
}: {
  lb: LeaderBoard[]
  isLoading: boolean
}) => {
  const rows = lb.map((data) => {
    return (
      <tr className="[&>td]:py-2 [&>td]:px-6" key={data.userId}>
        <td>{truncateName(data.userId)}</td>
        <td className="text-right">{data.totalPoints}</td>
      </tr>
    )
  })
  return (
    <>
      {isMobile() ? (
        <h2 className="centerline font-bold text-2xl py-4">Leaderboard</h2>
      ) : (
        <h2 className="centerline font-bold text-3xl py-4">Leaderboard</h2>
      )}
      {isLoading ? (
        <div className="m-8">
          <LoaderCircle />
        </div>
      ) : (
        <table className="bg-light border-dark border-2 font-title w-full mt-4">
          <tbody>
            <tr className="bg-dark text-light uppercase [&>th]:p-1">
              <th>Player</th>
              <th>Point</th>
            </tr>
            {rows}
          </tbody>
        </table>
      )}
    </>
  )
}
