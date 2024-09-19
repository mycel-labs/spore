import {
  Tabs,
  TabsList,
  TabsTrigger as TabsTrigger_,
  TabsContent as TabsContent_,
} from '@/components/ui/tabs'
import {
  useGetIndividualLeaderBoard,
  useGetTeamLeaderBoardByUserId,
  useGetTotalLeaderBoard,
} from '@/hooks/useReferral'
import { useStore } from '@/store'
import { LeaderBoard, TotalLeaderBoard } from '@/types/referral'
import LoaderCircle from './LoaderCircle'

/*
 * utils
 */
function truncateName(name: string, visibleChars: number = 10): string {
  if (name.length <= visibleChars) return name
  const lastPart = name.slice(-5)
  const firstPart = name.slice(0, visibleChars - 5)
  return `${firstPart}...${lastPart}`
}

/*
 * components
 */
export default function BoardTab({
  tab,
}: {
  tab: 'total' | 'team' | 'player' | undefined
}) {
  const mycelName = useStore((state) => state.mycelName)
  const {
    data: individualLeaderBoardData,
    isLoading: isIndividualLeaderBoardLoading,
  } = useGetIndividualLeaderBoard()
  const { data: teamLeaderBoardData, isLoading: isTeamLeaderBoardLoading } =
    useGetTeamLeaderBoardByUserId(mycelName ?? '')
  const { data: totalLeaderBoardData, isLoading: isTotalLeaderBoardLoading } =
    useGetTotalLeaderBoard()

  const errorLB: LeaderBoard[] = [
    {
      userId: 'error.cel',
      totalPoints: 500,
    },
  ]

  const errorTLB: TotalLeaderBoard[] = [
    {
      teamId: 'error.cel',
      teamName: 'Error: failed to fetch leaderboard',
      totalPoints: 500,
    },
  ]

  const lb: LeaderBoard[] =
    !isIndividualLeaderBoardLoading && individualLeaderBoardData
      ? individualLeaderBoardData
      : errorLB

  const teamlb: LeaderBoard[] =
    !isTeamLeaderBoardLoading && teamLeaderBoardData
      ? teamLeaderBoardData
      : errorLB

  const totallb: TotalLeaderBoard[] =
    !isTotalLeaderBoardLoading && totalLeaderBoardData
      ? totalLeaderBoardData
      : errorTLB

  return (
    <Tabs defaultValue={tab ?? 'total'} className="w-full">
      <TabsList className="text-xl bg-transparent space-x-3 font-title">
        <TabsTrigger value="total">
          <span className="btn-inner" />
          Total
        </TabsTrigger>
        <TabsTrigger value="team">
          <span className="btn-inner" />
          Team
        </TabsTrigger>
        <TabsTrigger value="player">
          <span className="btn-inner" />
          Player
        </TabsTrigger>
      </TabsList>
      <TabsContent value="total">
        <TotalTabContent tlb={totallb} isLoading={isTotalLeaderBoardLoading} />
      </TabsContent>
      <TabsContent value="team">
        <TeamTabContent lb={teamlb} isLoading={isTeamLeaderBoardLoading} />
      </TabsContent>
      <TabsContent value="player">
        <PlayerTabContent lb={lb} isLoading={isIndividualLeaderBoardLoading} />
      </TabsContent>
    </Tabs>
  )
}
const TabsTrigger = (props: React.ComponentProps<typeof TabsTrigger_>) => (
  <TabsTrigger_
    className="btn flex-1 data-[state=inactive]:bg-light h-14 data-[state=active]:bg-secondary data-[state=active]:translate-y-2 data-[state=active]:shadow-solid-xxs uppercase font-bold py-2 px-2.5 relative text-nowrap tracking-tight"
    {...props}
  />
)

const TabsContent = (props: React.ComponentProps<typeof TabsContent_>) => (
  <TabsContent_
    className="bg-light overlay-dot-ll p-6 rounded-xl mt-6 pb-10"
    {...props}
  />
)

const TotalTabContent = ({
  tlb,
  isLoading,
}: {
  tlb: TotalLeaderBoard[]
  isLoading: boolean
}) => {
  const rows = tlb.map((data) => {
    return (
      <tr className="[&>td]:py-2 [&>td]:px-6" key={data.teamId}>
        <td>{data.teamName}</td>
        <td className="text-right">{data.totalPoints}</td>
      </tr>
    )
  })
  return (
    <>
      <h2 className="centerline text-3xl py-4 font-bold">Total Board</h2>
      {isLoading ? (
        <div className="m-8">
          <LoaderCircle />
        </div>
      ) : (
        <table className="bg-light border-dark border-2 font-title w-full mt-8">
          <tbody>
            <tr className="bg-dark text-light uppercase [&>th]:p-1">
              <th>Team Rank</th>
              <th>Point</th>
            </tr>
            {rows}
          </tbody>
        </table>
      )}
    </>
  )
}

const TeamTabContent = ({
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
      <h2 className="centerline text-3xl py-4 font-bold">Team Board</h2>
      {isLoading ? (
        <div className="m-8">
          <LoaderCircle />
        </div>
      ) : (
        <table className="bg-light border-dark border-2 font-title w-full mt-8">
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
      <h2 className="centerline font-bold text-3xl py-4">Player Board</h2>
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
