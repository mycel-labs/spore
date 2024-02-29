import {
  Tabs,
  TabsList,
  TabsTrigger as TabsTrigger_,
  TabsContent as TabsContent_,
} from '@/components/ui/tabs'
import ImgEnoki from '@/assets/enoki.svg'

export default function BoardTab({
  tab,
}: {
  tab: 'total' | 'team' | 'player' | undefined
}) {
  return (
    <Tabs defaultValue={tab ?? 'total'} className="w-full">
      <TabsList className="text-xl bg-transparent space-x-3 font-title">
        <TabsTrigger value="total">
          <span className="btn-inner h-1/3 w-2/5" />
          Total
        </TabsTrigger>
        <TabsTrigger value="team">
          <span className="btn-inner h-1/3 w-2/5" />
          Team
        </TabsTrigger>
        <TabsTrigger value="player">
          <span className="btn-inner h-1/3 w-2/5" />
          Player
        </TabsTrigger>
      </TabsList>
      <TabsContent value="total">
        <TotalTabContent />
      </TabsContent>
      <TabsContent value="team">
        <TeamTabContent />
      </TabsContent>
      <TabsContent value="player">
        <PlayerTabContent />
      </TabsContent>
    </Tabs>
  )
}

const TabsTrigger = ({ ...props }) => (
  <TabsTrigger_
    className="btn flex-1 data-[state=inactive]:bg-light h-14 data-[state=active]:bg-secondary data-[state=active]:translate-y-2 data-[state=active]:shadow-solid-xxs uppercase font-bold py-2 relative"
    {...props}
  />
)

const TabsContent = ({ ...props }) => (
  <TabsContent_
    className="bg-light overlay-dot-ll p-6 rounded-xl mt-8"
    {...props}
  />
)

const TotalTabContent = () => (
  <>
    <h2 className="centerline text-2xl py-4 font-bold">Total Board</h2>
    <div className="grid grid-cols-4 gap-4">
      <img src={ImgEnoki} />
      <div className="col-span-3 pt-2">
        <ul className="list-table bg-light">
          <li>
            <div className="header">Pool Value</div>
            <div className="text-right">$100,000,000</div>
          </li>
          <li>
            <div className="header">Total Estimated Reward</div>
            <div className="text-right">$123,000</div>
          </li>
          <li>
            <div className="header">Payout Date</div>
            <div className="text-right">23:55:10</div>
          </li>
        </ul>
      </div>
    </div>
    <table className="bg-light border-dark border font-title w-full mt-8">
      <tbody>
        <tr className="bg-dark text-light uppercase [&>th]:p-1">
          <th>Team Rank</th>
          <th>Point</th>
        </tr>
        <tr className="[&>td]:py-2 [&>td]:px-6">
          <td>Team A</td>
          <td className="text-right">1,000</td>
        </tr>
        <tr className="[&>td]:py-2 [&>td]:px-6">
          <td>Team B</td>
          <td className="text-right">900</td>
        </tr>
        <tr className="[&>td]:py-2 [&>td]:px-6">
          <td>Team C</td>
          <td className="text-right">750</td>
        </tr>
      </tbody>
    </table>
  </>
)

const TeamTabContent = () => (
  <>
    <h2 className="centerline text-2xl py-4 font-bold">Team Board</h2>
    <div className="grid grid-cols-4 gap-4">
      <img src={ImgEnoki} />
      <div className="col-span-3 pt-2">
        <ul className="list-table bg-light">
          <li>
            <div className="header">Pool Value</div>
            <div className="text-right">$9,100,000</div>
          </li>
          <li>
            <div className="header">Team member</div>
            <div className="text-right">123</div>
          </li>
          <li>
            <div className="header">Bonus</div>
            <div className="text-right">x 2.15</div>
          </li>
        </ul>
      </div>
    </div>
    <table className="bg-light border-dark border font-title w-full mt-8">
      <tbody>
        <tr className="bg-dark text-light uppercase [&>th]:p-1">
          <th>Player</th>
          <th>Point</th>
        </tr>
        <tr className="[&>td]:py-2 [&>td]:px-6">
          <td>akira.cel</td>
          <td className="text-right">200</td>
        </tr>
        <tr className="[&>td]:py-2 [&>td]:px-6">
          <td>taro.cel</td>
          <td className="text-right">190</td>
        </tr>
        <tr className="[&>td]:py-2 [&>td]:px-6">
          <td>yosui.cel</td>
          <td className="text-right">140</td>
        </tr>
      </tbody>
    </table>
  </>
)

const PlayerTabContent = () => (
  <>
    <h2 className="centerline font-bold text-2xl py-4">Player Board</h2>
    <table className="bg-light border-dark border font-title w-full mt-8">
      <tbody>
        <tr className="bg-dark text-light uppercase [&>th]:p-1">
          <th>Player</th>
          <th>Point</th>
        </tr>
        <tr className="[&>td]:py-2 [&>td]:px-6">
          <td>akira.cel</td>
          <td className="text-right">200</td>
        </tr>
        <tr className="[&>td]:py-2 [&>td]:px-6">
          <td>taro.cel</td>
          <td className="text-right">190</td>
        </tr>
        <tr className="[&>td]:py-2 [&>td]:px-6">
          <td>yosui.cel</td>
          <td className="text-right">140</td>
        </tr>
        <tr className="[&>td]:py-2 [&>td]:px-6">
          <td>xxxx.cel</td>
          <td className="text-right">100</td>
        </tr>
        <tr className="[&>td]:py-2 [&>td]:px-6">
          <td>xxxx.cel</td>
          <td className="text-right">90</td>
        </tr>
        <tr className="[&>td]:py-2 [&>td]:px-6">
          <td>xxxx.cel</td>
          <td className="text-right">80</td>
        </tr>
      </tbody>
    </table>
  </>
)
