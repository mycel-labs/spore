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

export default function BoardTab({
  tab,
}: {
  tab: 'total' | 'team' | 'player' | undefined
}) {
  const mycelName = useStore((state) => state.mycelName)
  const {
    data: individualLeaderBoardData,
    isLoading: individualLeaderBoardLoading,
  } = useGetIndividualLeaderBoard()
  const { data: teamLeaderBoardData, isLoading: teamLeaderBoardLoading } =
    useGetTeamLeaderBoardByUserId(mycelName ?? '')
  const { data: totalLeaderBoardData, isLoading: totalLeaderBoardLoading } =
    useGetTotalLeaderBoard()

  const mockLB: LeaderBoard[] = [
    {
      userId: 'akira.cel',
      totalPoints: 200,
    },
    {
      userId: 'taro.cel',
      totalPoints: 190,
    },
    {
      userId: 'yosui.cel',
      totalPoints: 140,
    },
    {
      userId: 'anon.cel',
      totalPoints: 10,
    },
  ]
  const mockTeamLB: LeaderBoard[] = [
    {
      userId: 'akira.cel',
      totalPoints: 200,
    },
    {
      userId: 'taro.cel',
      totalPoints: 190,
    },
    {
      userId: 'yosui.cel',
      totalPoints: 140,
    },
  ]
  const mockTLB: TotalLeaderBoard[] = [
    {
      teamId: 'O2EYDIUcRcVmL5pMehRESerN11LIr6QK',
      teamName: 'Team Awesome',
      totalPoints: 1000,
    },
    {
      teamId: 'H8c1mGSptHxbYLWH51U4Ts4jkLLiXkW6',
      teamName: 'Team Blavo',
      totalPoints: 900,
    },
    {
      teamId: 'oSL4GXoibQ7dJdnAuFoRMvrVGjRzqx5J',
      teamName: 'Team Cool',
      totalPoints: 750,
    },
  ]

  const lb: LeaderBoard[] =
    !individualLeaderBoardLoading && individualLeaderBoardData
      ? individualLeaderBoardData
      : mockLB

  const teamlb: LeaderBoard[] =
    !teamLeaderBoardLoading && teamLeaderBoardData
      ? teamLeaderBoardData
      : mockTeamLB

  const totallb: TotalLeaderBoard[] =
    !totalLeaderBoardLoading && totalLeaderBoardData
      ? totalLeaderBoardData
      : mockTLB

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
        <TotalTabContent tlb={totallb} />
      </TabsContent>
      <TabsContent value="team">
        <TeamTabContent lb={teamlb} />
      </TabsContent>
      <TabsContent value="player">
        <PlayerTabContent lb={lb} />
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

const TotalTabContent = ({ tlb }: { tlb: TotalLeaderBoard[] }) => {
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
      <table className="bg-light border-dark border-2 font-title w-full mt-8">
        <tbody>
          <tr className="bg-dark text-light uppercase [&>th]:p-1">
            <th>Team Rank</th>
            <th>Point</th>
          </tr>
          {rows}
        </tbody>
      </table>
    </>
  )
}

const TeamTabContent = ({ lb }: { lb: LeaderBoard[] }) => {
  const rows = lb.map((data) => {
    return (
      <tr className="[&>td]:py-2 [&>td]:px-6" key={data.userId}>
        <td>{data.userId}</td>
        <td className="text-right">{data.totalPoints}</td>
      </tr>
    )
  })

  return (
    <>
      <h2 className="centerline text-3xl py-4 font-bold">Team Board</h2>
      <table className="bg-light border-dark border-2 font-title w-full mt-8">
        <tbody>
          <tr className="bg-dark text-light uppercase [&>th]:p-1">
            <th>Player</th>
            <th>Point</th>
          </tr>
          {rows}
        </tbody>
      </table>
    </>
  )
}

const PlayerTabContent = ({ lb }: { lb: LeaderBoard[] }) => {
  const rows = lb.map((data) => {
    return (
      <tr className="[&>td]:py-2 [&>td]:px-6" key={data.userId}>
        <td>{data.userId}</td>
        <td className="text-right">{data.totalPoints}</td>
      </tr>
    )
  })
  return (
    <>
      <h2 className="centerline font-bold text-3xl py-4">Player Board</h2>
      <table className="bg-light border-dark border-2 font-title w-full mt-4">
        <tbody>
          <tr className="bg-dark text-light uppercase [&>th]:p-1">
            <th>Player</th>
            <th>Point</th>
          </tr>
          {rows}
        </tbody>
      </table>
    </>
  )
}
