import {
  Tabs,
  TabsList,
  TabsTrigger as TabsTrigger_,
  TabsContent as TabsContent_,
} from '@/components/ui/tabs'
import useConfetti from '@/hooks/useConfetti'

export default function RewardTab({ tab }: { tab: 'withdraw' | undefined }) {
  return (
    <Tabs
      defaultValue={tab === 'withdraw' ? 'withdraw' : 'deposit'}
      className="w-full"
    >
      <TabsList className="text-xl bg-transparent space-x-3 font-title">
        <TabsTrigger value="deposit">
          <span className="btn-inner" />
          Deposit
        </TabsTrigger>
        <TabsTrigger value="withdraw">
          <span className="btn-inner" />
          Withdraw
        </TabsTrigger>
      </TabsList>
      <TabsContent value="deposit">
        <DepositTabContent />
      </TabsContent>
      <TabsContent value="withdraw">
        <WithdrawTabContent />
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
    className="bg-light overlay-dot-ll p-6 rounded-xl mt-6"
    {...props}
  />
)

const DepositTabContent = () => {
  const { runConfetti, runSparkles } = useConfetti()
  return (
    <>
      <ul className="list-table bg-light">
        <li className="p-0">
          <div className="header">Estimated Reward</div>
          <div className="text-right font-bold text-3xl">$123,000</div>
        </li>
        <li>
          <div className="header">Total Pool</div>
          <div className="text-right font-bold text-3xl">$100,000,000</div>
        </li>
        <li>
          <div className="header">Payout Date</div>
          <div className="text-right font-bold text-3xl">23:55:10</div>
        </li>
      </ul>
      <div className="border-dark bg-light border-2 rounded px-6 py-8 mt-6">
        <h2 className="centerline text-3xl font-bold pb-2">Deposit</h2>
        <p className="text-right p-1">Balance:100</p>
        <input
          type="number"
          value="123"
          readOnly
          className="w-full text-right"
        />
        <button
          className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
          onClick={(e) => runConfetti(e)}
        >
          <span className="btn-inner" />
          Deposit
        </button>
      </div>
    </>
  )
}

const WithdrawTabContent = () => (
  <>
    <div className="border-dark bg-light border-2 rounded px-6 pb-8">
      <h2 className="centerline font-bold text-2xl pt-6 pb-4">Withdraw</h2>
      <p className="text-right p-1">Balance:100</p>
      <input type="number" value="123" readOnly className="w-full text-right" />
      <button
        className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
        onClick={(e) => console.log(e)}
      >
        <span className="btn-inner" />
        Withdraw
      </button>
    </div>
  </>
)
