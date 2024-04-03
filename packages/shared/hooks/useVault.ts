import { useEffect } from 'react'
import { useWallet } from './useWallet'
import {
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { toast } from '../components/ui/sonner'

import { usdcContract } from '../constants/testUSDC'
import { vaultContract } from '../constants/vault'
import { useQueryClient } from '@tanstack/react-query'

export const useVault = () => {
  const { evmAddress } = useWallet()
  const queryClient = useQueryClient()
  const { queryKey } = useReadContract()

  /* Write contract*/
  const { data: depositHash, writeContract: deposit } = useWriteContract()
  const { data: withdrawHash, writeContract: withdraw } = useWriteContract()
  const { data: approvalHash, writeContract: approve } = useWriteContract()
  const { data: claimPrizeHash, writeContract: claimPrize } = useWriteContract()

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

  const { isLoading: isLoadingClaimPrize, isSuccess: isSuccessClaimPrize } =
    useWaitForTransactionReceipt({
      hash: claimPrizeHash,
    })

  /* Read contract*/
  const depositedAmountData = useReadContract({
    ...vaultContract,
    functionName: 'balanceOf',
    args: [evmAddress as `0x${string}`],
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
  const claimablePrizeData = useReadContract({
    ...vaultContract,
    functionName: '_claimablePrize',
    args: [evmAddress as `0x${string}`],
  })

  const approvalData = useReadContract({
    ...usdcContract,
    functionName: 'allowance',
    args: [evmAddress as `0x${string}`, vaultContract.address],
  })

  const usdcBalance = useReadContract({
    ...usdcContract,
    functionName: 'balanceOf',
    args: [evmAddress as `0x${string}`],
  })
  const decimals = useReadContract({
    ...usdcContract,
    functionName: 'decimals',
  })

  /* Async functions */
  async function refetch() {
    await queryClient.invalidateQueries({ queryKey })
  }

  async function depositUSDC(amount: number) {
    if (!amount || amount == 0 || !evmAddress) return
    const fixedAmount = BigInt(amount * 1e6)
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
    if (!amount || amount == 0 || !evmAddress) return
    const fixedAmount = BigInt(amount * 1e6)
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
    if (!amount || amount == 0) return
    const fixedAmount = BigInt(amount * 1e6)
    claimPrize({
      ...vaultContract,
      functionName: 'claimPrize',
      args: [fixedAmount],
    })
  }

  async function approveUSDC(amount: number) {
    if (!amount || amount == 0) return
    const fixedAmount = BigInt(amount * 1e6)
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

  useEffect(() => {
    if (isSuccessDeposit) {
      refetch()
      toast('Deposit successful')
    }
  }, [isSuccessDeposit])

  useEffect(() => {
    if (isSuccessWithdraw) {
      refetch()
      toast('Withdraw successful')
    }
  }, [isSuccessWithdraw])

  useEffect(() => {
    if (isSuccessApproval) {
      refetch()
      toast('Approval successful')
    }
  }, [isSuccessApproval])

  useEffect(() => {
    if (isSuccessClaimPrize) {
      refetch()
      toast('Claim Prize successful')
    }
  }, [isSuccessClaimPrize])

  return {
    depositUSDC,
    withdrawUSDC,
    claimPrizeUSDC,
    approveUSDC,
    depositedAmountData,
    poolbalanceData,
    availableYieldData,
    currentDrawData,
    claimablePrizeData,
    approvalData,
    usdcBalance,
    decimals,
  }
}
