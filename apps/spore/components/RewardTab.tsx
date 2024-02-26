import {
  Tabs,
  TabsList,
  TabsTrigger as TabsTrigger_,
  TabsContent as TabsContent_,
} from '@/components/ui/tabs'
import useConfetti from '@/hooks/useConfetti'
import { usePageContext } from '~/renderer/usePageContext'

export default function RewardTab() {
  const { urlParsed } = usePageContext()

  return (
    <Tabs
      defaultValue={urlParsed?.hash === 'withdraw' ? 'withdraw' : 'deposit'}
      className="w-full"
    >
      <TabsList className="h-12 text-xl font-title bg-transparent space-x-px font-bold">
        <TabsTrigger value="deposit">Deposit</TabsTrigger>
        <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
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
    className="flex-1 border-b border-blue-800/20 bg-light data-[state=inactive]:opacity-85 h-full rounded-tr rounded-tl-3xl data-[state=active]:border-transparent uppercase"
    {...props}
  />
)

const TabsContent = ({ ...props }) => (
  <TabsContent_ className="bg-light p-6 rounded-b-xl mt-0" {...props} />
)

const DepositTabContent = () => {
  const { runConfetti, runSparkles } = useConfetti()
  return (
    <>
      <ul className="list-table">
        <li className="p-0">
          <div className="header bg-dark text-light">Estimated Reward</div>
          <div className="text-right text-3xl mt-4 mb-2">$123,000</div>
        </li>
        <li>
          <div className="header">Total Pool</div>
          <div className="text-right">$100,000,000</div>
        </li>
        <li>
          <div className="header">Payout Date</div>
          <div className="text-right">23:55:10</div>
        </li>
      </ul>
      <div className="border-dark border rounded px-6 py-8 mt-6">
        <h2 className="centerline text-2xl font-bold pb-2">Deposit</h2>
        <p className="text-right p-1">Balance:100</p>
        <input
          type="number"
          value="123"
          className="border-dark border rounded w-full text-2xl text-right px-6 pt-2 pb-1 font-title bg-transparent"
        />
        <button
          className="btn bg-secondary h-14 pt-1 px-10 font-title w-full mt-6"
          onClick={(e) => runConfetti(e)}
        >
          <span className="btn-inner h-2/3 w-1/3 font-bold" />
          Deposit
        </button>
      </div>
    </>
  )
}

const WithdrawTabContent = () => (
  <>
    <div className="border-dark border rounded px-6 pb-8">
      <h2 className="centerline font-bold text-2xl pt-6 pb-4">Withdraw</h2>
      <p className="text-right p-1">Balance:100</p>
      <input
        type="number"
        value="123"
        className="border-dark border rounded w-full text-2xl text-right px-6 pt-2 pb-1 font-title bg-transparent"
      />
      <button
        className="btn bg-secondary h-14 pt-1 px-10 font-title w-full mt-6"
        onClick={(e) => console.log(e)}
      >
        <span className="btn-inner h-2/3 w-1/3 font-bold" />
        Withdraw
      </button>
    </div>
  </>
)
