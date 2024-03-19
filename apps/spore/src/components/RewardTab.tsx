import {
  Tabs,
  TabsList,
  TabsTrigger as TabsTrigger_,
  TabsContent as TabsContent_,
} from '@/components/ui/tabs'
import useConfetti from '@/hooks/useConfetti'
import { useVault } from '@/hooks/useVault'
import { useState } from 'react'

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
  const [amount, setAmount] = useState(0)
  const {
    depositUSDC,
    approveUSDC,
    drawData,
    userBalance,
    poolBalance,
    approvalData,
  } = useVault()

  return (
    <>
      <ul className="list-table bg-light">
        <li className="p-0">
          <div className="header">Estimated Reward</div>
          <div className="text-right font-bold text-3xl">$123,000</div>
        </li>
        <li>
          <div className="header">Total Pool</div>
          <div className="text-right font-bold text-3xl">
            $ {poolBalance || '0'}
          </div>
        </li>
        <li>
          <div className="header">Payout Date</div>
          <div className="text-right font-bold text-3xl">{drawData}</div>
        </li>
      </ul>
      <div className="border-dark bg-light border-2 rounded px-6 py-8 mt-6">
        <h2 className="centerline text-3xl font-bold pb-2">Deposit</h2>
        <p
          className="text-right p-1 cursor-pointer"
          onClick={() => setAmount(Number(userBalance))}
        >
          Balance:
          {userBalance?.toString() || '0'}
        </p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {Number(approvalData.data) > Number(amount * 1e6) ? (
          <button
            className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
            onClick={(e) => {
              depositUSDC(amount)
              runConfetti(e)
            }}
          >
            <span className="btn-inner" />
            Deposit
          </button>
        ) : (
          <button
            className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
            onClick={(e) => {
              approveUSDC()
              runConfetti(e)
            }}
          >
            <span className="btn-inner" />
            Approve
          </button>
        )}
      </div>
    </>
  )
}

const WithdrawTabContent = () => {
  const { runSparkles } = useConfetti()
  const { depositedAmount, withdrawUSDC } = useVault()
  const [amount, setAmount] = useState(0)

  return (
    <>
      <div className="border-dark bg-light border-2 rounded px-6 pb-8">
        <h2 className="centerline font-bold text-2xl pt-6 pb-4">Withdraw</h2>
        <p
          className="text-right p-1 cursor-pointer"
          onClick={() => setAmount(Number(depositedAmount))}
        >
          Balance: {depositedAmount || '0'}
        </p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
          onClick={(e) => {
            withdrawUSDC(amount)
            runSparkles(e)
          }}
        >
          <span className="btn-inner" />
          Withdraw
        </button>
      </div>
    </>
  )
}
