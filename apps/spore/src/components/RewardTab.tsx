import {
  Tabs,
  TabsList,
  TabsTrigger as TabsTrigger_,
  TabsContent as TabsContent_,
} from '@/components/ui/tabs'
import useConfetti from '@/hooks/useConfetti'
import { useVault } from '@/hooks/useVault'
import { convertToDecimalString } from '@/lib/coin'
import { convertUnixToUTC } from '@/lib/converter'
import React, { useState } from 'react'
import Button from './Button'

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
        <TabsTrigger value="claim">
          <span className="btn-inner" />
          Claim
        </TabsTrigger>
      </TabsList>
      <TabsContent value="deposit">
        <DepositTabContent />
      </TabsContent>
      <TabsContent value="withdraw">
        <WithdrawTabContent />
      </TabsContent>
      <TabsContent value="claim">
        <ClaimTabContent />
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
  const { runConfetti } = useConfetti()
  const [amount, setAmount] = useState<string>('')
  const {
    depositUSDC,
    approveUSDC,
    poolbalanceData,
    availableYieldData,
    currentDrawData,
    approvalData,
    usdcBalance,
    decimals,
    isLoadingDeposit,
    isLoadingApproval,
    chainId,
    defaultChainId,
    switchChainId,
  } = useVault()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const regex = /^[0-9]*[.,]?[0-9]*$/
    if (regex.test(value) || value === '') {
      setAmount(value)
    }
  }

  return (
    <>
      <ul className="list-table bg-light">
        <li className="p-0">
          <div className="header">Estimated Reward</div>
          <div className="text-right font-bold text-3xl">
            $
            {convertToDecimalString(availableYieldData?.data, decimals?.data) ||
              '0'}
          </div>
        </li>
        <li>
          <div className="header">Total Pool</div>
          <div className="text-right font-bold text-3xl">
            $
            {convertToDecimalString(poolbalanceData?.data, decimals?.data) ||
              '0'}
          </div>
        </li>
        <li>
          <div className="header">Payout Date</div>
          {currentDrawData?.data == BigInt(0) ? (
            <div className="text-right font-bold text-3xl">not started</div>
          ) : (
            <div className="text-right font-bold text-3xl">
              {convertUnixToUTC(currentDrawData?.data) || 'not started'}
            </div>
          )}
        </li>
      </ul>
      <div className="border-dark bg-light border-2 rounded px-6 py-8 mt-6">
        <h2 className="centerline text-3xl font-bold pb-2">Deposit</h2>
        <p
          className="text-right p-1 cursor-pointer"
          onClick={() =>
            setAmount(
              convertToDecimalString(usdcBalance?.data, decimals?.data)
                .replace(/,/g, '')
                .toString()
            )
          }
        >
          Balance:
          {convertToDecimalString(usdcBalance?.data, decimals?.data) || '0'}
        </p>
        <input
          type="number"
          value={amount}
          onChange={(e) => handleInput(e)}
          className="w-full text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {approvalData.data >= BigInt(Number(amount) * 1e6) &&
        BigInt(Number(amount) * 1e6) !== BigInt(0) ? (
          <Button
            className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
            isLoading={isLoadingDeposit}
            disabled={Number(amount) === 0 || isLoadingDeposit}
            onClick={async (e: React.ChangeEvent<HTMLInputElement>) => {
              await depositUSDC(BigInt(Number(amount) * 1e6))
              runConfetti(e)
            }}
          >
            <span className="btn-inner" />
            Deposit
          </Button>
        ) : (
          <>
            {chainId !== defaultChainId ? (
              <button
                type="button"
                className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
                onClick={() => switchChainId(defaultChainId)}
              >
                <span className="btn-inner" />
                Switch to Optimism sepolia
              </button>
            ) : (
              <Button
                type="button"
                className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
                isLoading={isLoadingApproval}
                disabled={
                  Number(amount) === 0 ||
                  BigInt(Number(amount) * 1e6) > usdcBalance?.data ||
                  isLoadingApproval
                }
                onClick={async (e: React.ChangeEvent<HTMLInputElement>) => {
                  await approveUSDC(BigInt(Number(amount) * 1e6))
                  runConfetti(e)
                }}
              >
                <span className="btn-inner" />
                {BigInt(Number(amount) * 1e6) > usdcBalance?.data
                  ? 'Insufficient Balance'
                  : Number(amount) === 0
                    ? 'Enter Amount'
                    : 'Approve'}
              </Button>
            )}
          </>
        )}
      </div>
    </>
  )
}

const WithdrawTabContent = () => {
  const { runSparkles } = useConfetti()
  const {
    depositedAmountData,
    decimals,
    withdrawUSDC,
    isLoadingWithdraw,
    chainId,
    switchChainId,
    defaultChainId,
  } = useVault()
  const [amount, setAmount] = useState<string>('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const regex = /^[0-9]*[.,]?[0-9]*$/
    if (regex.test(value) || value === '') {
      setAmount(value)
    }
  }
  return (
    <>
      <div className="border-dark bg-light border-2 rounded px-6 pb-8">
        <h2 className="centerline font-bold text-2xl pt-6 pb-4">Withdraw</h2>
        <p
          className="text-right p-1 cursor-pointer"
          onClick={() =>
            setAmount(
              convertToDecimalString(depositedAmountData?.data, decimals?.data)
                .replace(/,/g, '')
                .toString()
            )
          }
        >
          Balance:
          {convertToDecimalString(depositedAmountData?.data, decimals?.data) ||
            '0'}
        </p>
        <input
          type="number"
          value={amount}
          onChange={(e) => handleInput(e)}
          className="w-full text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <>
          {chainId !== defaultChainId ? (
            <button
              type="button"
              className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
              onClick={() => switchChainId(defaultChainId)}
            >
              <span className="btn-inner" />
              Switch to Optimism sepolia
            </button>
          ) : (
            <Button
              className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
              isLoading={isLoadingWithdraw}
              disabled={
                Number(amount) === 0 ||
                BigInt(Number(amount) * 1e6) > depositedAmountData?.data ||
                isLoadingWithdraw
              }
              onClick={async (e: React.ChangeEvent<HTMLInputElement>) => {
                await withdrawUSDC(BigInt(Number(amount) * 1e6))
                runSparkles(e)
              }}
            >
              <span className="btn-inner" />
              {BigInt(Number(amount) * 1e6) > depositedAmountData?.data
                ? 'Insufficient Balance'
                : Number(amount) === 0
                  ? 'Enter Amount'
                  : 'Withdraw'}
            </Button>
          )}
        </>
      </div>
    </>
  )
}
const ClaimTabContent = () => {
  const { runSparkles } = useConfetti()
  const {
    claimablePrizeData,
    claimPrizeUSDC,
    decimals,
    isLoadingClaimPrize,
    chainId,
    defaultChainId,
    switchChainId,
  } = useVault()
  const [amount, setAmount] = useState<string>('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const regex = /^[0-9]*[.,]?[0-9]*$/
    if (regex.test(value) || value === '') {
      setAmount(value)
    }
  }

  return (
    <>
      <div className="border-dark bg-light border-2 rounded px-6 pb-8">
        <h2 className="centerline font-bold text-2xl pt-6 pb-4">Claim Prize</h2>
        <p
          className="text-right p-1 cursor-pointer"
          onClick={() =>
            setAmount(
              convertToDecimalString(claimablePrizeData?.data, decimals?.data)
                .replace(/,/g, '')
                .toString()
            )
          }
        >
          Balance:
          {convertToDecimalString(claimablePrizeData?.data, decimals?.data) ||
            '0'}
        </p>
        <input
          type="text"
          pattern="^[0-9]*[.,]?[0-9]*$"
          value={amount}
          onChange={(e) => handleInput(e)}
          className="w-full text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <>
          {chainId !== defaultChainId ? (
            <button
              type="button"
              className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
              onClick={() => switchChainId(defaultChainId)}
            >
              <span className="btn-inner" />
              Switch to Optimism sepolia
            </button>
          ) : (
            <Button
              className="btn bg-secondary h-14 pt-1 px-10 font-title font-bold w-full mt-6"
              isLoading={isLoadingClaimPrize}
              disabled={
                Number(amount) === 0 ||
                BigInt(Number(amount) * 1e6) > claimablePrizeData?.data ||
                isLoadingClaimPrize
              }
              onClick={async (e: React.ChangeEvent<HTMLInputElement>) => {
                await claimPrizeUSDC(BigInt(Number(amount) * 1e6))
                runSparkles(e)
              }}
            >
              <span className="btn-inner" />
              {BigInt(Number(amount) * 1e6) > claimablePrizeData?.data
                ? 'Insufficient Balance'
                : Number(amount) === 0
                  ? 'Enter Amount'
                  : 'Claim Prize'}
            </Button>
          )}
        </>
      </div>
    </>
  )
}
