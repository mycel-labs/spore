import { useEffect, useState } from 'react'
import { useWallet } from './useWallet'
import { formatUnits } from 'viem'
import {
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { toast } from '../components/ui/sonner'
import { convertUnixToUTC } from '../lib/converter'

import { usdcContract } from '../constants/testUSDC'
import { vaultContract } from '../constants/vault'
import { faucetContract } from '../constants/faucet'

export const useVault = () => {
  const { evmAddress } = useWallet()

  /* Write contract*/
  const { data: depositHash, writeContract: deposit } = useWriteContract()
  const { data: withdrawHash, writeContract: withdraw } = useWriteContract()
  const { data: approvalHash, writeContract: approve } = useWriteContract()
  const { data: faucetHash, writeContract: faucet } = useWriteContract()
  const { data: claimPrizeHash, writeContract: claimPrize } = useWriteContract()

  const [userBalance, setUserBalance] = useState<string>()
  const [approval, setApproval] = useState<string>()
  const [depositedAmount, setDepositedAmount] = useState<string>()
  const [poolBalance, setPoolBalance] = useState<string>()
  const [drawData, setDrawData] = useState<string>()
  const [currentDrawId, setCurrentDrawId] = useState<number | undefined>(
    undefined
  )
  const [availableYield, setAvailableYield] = useState<string>()

  const { isLoading: isLoadingDeposit, isSuccess: isSuccessDeposit } =
    useWaitForTransactionReceipt({
      hash: depositHash,
    })

  const { isLoading: isLoadingWithdraw, isSuccess: isSuccessWithdraw } =
    useWaitForTransactionReceipt({
      hash: withdrawHash,
    })

  const { isLoading: isLoadingApproval, isSuccess: isSuccessApproval } =
    useWaitForTransactionReceipt({
      hash: approvalHash,
    })

  /* Read contract*/
  const depositedAmountData = useReadContract({
    ...vaultContract,
    functionName: 'balanceOf',
    args: [evmAddress],
  })

  const poolbalanceData = useReadContract({
    ...vaultContract,
    functionName: 'totalSupply',
  })

  const availableYieldData = useReadContract({
    ...vaultContract,
    functionName: 'availableYieldBalance',
  })
  const currentDrawIdData = useReadContract({
    ...vaultContract,
    functionName: 'currentDrawId',
  })

  const currentDrawData = useReadContract({
    ...vaultContract,
    functionName: 'getCurrentDrawEndTime',
  })

  const approvalData = useReadContract({
    ...usdcContract,
    functionName: 'allowance',
    args: [evmAddress, vaultContract.address],
  })

  const usdcBalance = useReadContract({
    ...usdcContract,
    functionName: 'balanceOf',
    args: [evmAddress],
  })
  const decimals = useReadContract({
    ...usdcContract,
    functionName: 'decimals',
  })

  /* Async functions */
  async function depositUSDC(amount: number) {
    if (!amount || amount == 0) return
    const fixedAmount = amount * 1e6
    deposit(
      {
        ...vaultContract,
        functionName: 'deposit',
        args: [fixedAmount, evmAddress],
      },
      {
        onSuccess: () => toast('Transaction sent!'),
        onError: (err) => toast(`Deposit error! ${err}`),
      }
    )
  }

  async function withdrawUSDC(amount: number) {
    if (!amount || amount == 0) return
    const fixedAmount = amount * 1e6
    withdraw(
      {
        ...vaultContract,
        functionName: 'withdraw',
        args: [fixedAmount, evmAddress, evmAddress],
      },
      {
        onSuccess: () => toast('Transaction sent!'),
        onError: (err) => toast(`Withdraw error! ${err}`),
      }
    )
  }

  async function claimPrizeUSDC(amount: number) {
    claimPrize({
      ...vaultContract,
      functionName: 'claimPrize',
      args: [amount],
    })
  }

  async function approveUSDC() {
    const fixedAmount = 1000000 * 1e6
    approve(
      {
        ...usdcContract,
        functionName: 'approve',
        args: [vaultContract.address, fixedAmount],
      },
      {
        onSuccess: () => toast('Transaction sent!'),
        onError: (err) => toast(`Approval error! ${err}`),
      }
    )
  }

  async function faucetUSDC() {
    faucet({
      ...faucetContract,
      functionName: 'drip',
      args: [usdcContract.address],
    })
  }

  useEffect(() => {
    if (!decimals.data) return
    const decimalValue = decimals.data as number
    const fixedBalance = formatUnits(usdcBalance.data as bigint, decimalValue)
    const fixedDepositedAmount = formatUnits(
      depositedAmountData.data as bigint,
      decimalValue
    )
    const fixedPoolBalance = formatUnits(
      poolbalanceData.data as bigint,
      decimalValue
    )
    const fixedYield = formatUnits(
      availableYieldData.data as bigint,
      decimalValue
    )
    const fixedApproval = formatUnits(approvalData.data as bigint, decimalValue)

    setUserBalance(fixedBalance)
    setDepositedAmount(fixedDepositedAmount)
    setApproval(fixedApproval)
    setPoolBalance(Number(fixedPoolBalance).toFixed(2).toString())
    setAvailableYield(Number(fixedYield).toFixed(2).toString())
    setDrawData(convertUnixToUTC(currentDrawData.data as BigInt))
  }, [evmAddress])

  useEffect(() => {
    if (isSuccessDeposit) {
      toast('Deposit successful')
    }
  }, [isSuccessDeposit])

  useEffect(() => {
    if (isSuccessWithdraw) {
      toast('Withdraw successful')
    }
  }, [isSuccessWithdraw])

  useEffect(() => {
    if (isSuccessApproval) {
      toast('Approval successful')
    }
  }, [isSuccessApproval])

  return {
    depositUSDC,
    withdrawUSDC,
    claimPrizeUSDC,
    approveUSDC,
    faucetUSDC,
    drawData,
    poolBalance,
    depositedAmount,
    approval,
    approvalData,
    userBalance,
    availableYield,
  }
}
