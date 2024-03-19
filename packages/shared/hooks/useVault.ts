import { useEffect, useState } from 'react'
import { useWallet } from './useWallet'
import { ethers, FixedNumber } from 'ethers'
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
  const [approval, setApproval] = useState<ethers.FixedNumber>()
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
    const decimalValue = decimals.data as ethers.Numeric
    const fixedBalance = FixedNumber.fromValue(
      usdcBalance?.data as ethers.BigNumberish,
      decimalValue
    )
    const fixedDepositedAmount = FixedNumber.fromValue(
      depositedAmountData?.data as ethers.BigNumberish,
      decimalValue
    )
    const fixedApproval = FixedNumber.fromValue(
      approvalData?.data as ethers.BigNumberish,
      decimalValue
    )
    const fixedPoolBalance = FixedNumber.fromValue(
      poolbalanceData?.data as ethers.BigNumberish,
      decimalValue
    )
    const fixedYield = FixedNumber.fromValue(
      availableYieldData?.data as ethers.BigNumberish,
      decimalValue
    )
    setUserBalance(fixedBalance.toString())
    setDepositedAmount(fixedDepositedAmount.toString())
    setApproval(fixedApproval)
    setPoolBalance(Number(fixedPoolBalance).toFixed(2).toString())
    setDrawData(convertUnixToUTC(currentDrawData.data))
    setAvailableYield(Number(fixedYield).toFixed(2).toString())
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
