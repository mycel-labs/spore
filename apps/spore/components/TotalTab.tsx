import {
  Tabs,
  TabsList,
  TabsTrigger as TabsTrigger_,
  TabsContent as TabsContent_,
} from '@/components/ui/tabs'
import ImgEnoki from '@/assets/enoki.svg'

export default function TotalTab() {
  return (
    <Tabs defaultValue="total" className="w-full">
      <TabsList className="h-12 text-2xl bg-transparent space-x-px font-title">
        <TabsTrigger value="total">Total</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="player">Player</TabsTrigger>
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
    className="flex-1 border-b border-blue-800/20 bg-light data-[state=inactive]:opacity-85 h-full rounded-tr rounded-tl-3xl pt-2 data-[state=active]:border-transparent uppercase"
    {...props}
  />
)

const TabsContent = ({ ...props }) => (
  <TabsContent_ className="bg-light p-6 rounded-b-xl mt-0" {...props} />
)

const TotalTabContent = () => (
  <>
    <h2 className="centerline text-3xl py-4">Total Board</h2>
    <div className="grid grid-cols-4 gap-4">
      <img src={ImgEnoki} />
      <div className="col-span-3 pt-2">
        <ul className="border-dark border rounded font-title">
          <li className="border-b border-dark w-full">
            <div className="text-xl bg-dark text-light px-4">POOL VALUE</div>
            <div className="text-3xl text-right px-4 pt-4 pb-2">
              $100,000,000
            </div>
          </li>
          <li className="border-b border-dark w-full">
            <div className="text-xl bg-dark text-light px-4">
              TOTAL ESTIMATED REWARD
            </div>
            <div className="text-3xl text-right px-4 pt-4 pb-2">$123,000</div>
          </li>
          <li className="w-full">
            <div className="text-xl bg-dark text-light px-4">PAYOUT DATE</div>
            <div className="text-3xl text-right px-4 pt-4 pb-2">23:59:59</div>
          </li>
        </ul>
      </div>
    </div>
    <table className="border-dark border font-title w-full mt-8">
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
    </table>
  </>
)

const TeamTabContent = () => (
  <>
    <h2 className="centerline text-3xl py-4">Team Board</h2>
    <div className="grid grid-cols-4 gap-4">
      <img src={ImgEnoki} />
      <div className="col-span-3 pt-2">
        <ul className="border-dark border rounded font-title">
          <li className="border-b border-dark w-full">
            <div className="text-xl bg-dark text-light px-4 uppercase">
              Pool Value
            </div>
            <div className="text-3xl text-right px-4 pt-4 pb-2">$9,100,000</div>
          </li>
          <li className="border-b border-dark w-full">
            <div className="text-xl bg-dark text-light px-4 uppercase">
              Team member
            </div>
            <div className="text-3xl text-right px-4 pt-4 pb-2">123</div>
          </li>
          <li className="w-full">
            <div className="text-xl bg-dark text-light px-4 uppercase">
              Bonus
            </div>
            <div className="text-3xl text-right px-4 pt-4 pb-2">x 2.15</div>
          </li>
        </ul>
      </div>
    </div>
    <table className="border-dark border font-title w-full mt-8">
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
    </table>
  </>
)

const PlayerTabContent = () => (
  <>
    <h2 className="centerline text-3xl py-4">Player Board</h2>
    <table className="border-dark border font-title w-full mt-8">
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
    </table>
  </>
)
