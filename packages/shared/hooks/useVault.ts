import { useEffect } from 'react'
import { useWallet } from './useWallet'
import {
  useChainId,
  useSwitchChain,
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

  const chainId = useChainId()
  const defaultChainId = 11155420
  const { switchChain } = useSwitchChain()

  function switchChainId(
    id: number,
    onSuccess?: () => void,
    onError?: () => void
  ) {
    switchChain({ chainId: id }, { onSuccess, onError })
  }

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
    chainId: defaultChainId,
    query: {
      refetchInterval: 5000,
    },
  })

  const poolbalanceData = useReadContract({
    ...vaultContract,
    functionName: 'totalSupply',
    chainId: defaultChainId,
    query: {
      refetchInterval: 5000,
    },
  })

  const availableYieldData = useReadContract({
    ...vaultContract,
    functionName: 'availableYieldBalance',
    chainId: defaultChainId,
    query: {
      refetchInterval: 5000,
    },
  })

  const currentDrawData = useReadContract({
    ...vaultContract,
    functionName: 'getCurrentDrawEndTime',
    chainId: defaultChainId,
  })
  const claimablePrizeData = useReadContract({
    ...vaultContract,
    functionName: '_claimablePrize',
    args: [evmAddress as `0x${string}`],
    chainId: defaultChainId,
    query: {
      refetchInterval: 1000,
    },
  })

  const approvalData = useReadContract({
    ...usdcContract,
    functionName: 'allowance',
    args: [evmAddress as `0x${string}`, vaultContract.address],
    chainId: defaultChainId,
    query: {
      refetchInterval: 1000,
    },
  })

  const usdcBalance = useReadContract({
    ...usdcContract,
    functionName: 'balanceOf',
    args: [evmAddress as `0x${string}`],
    chainId: defaultChainId,
    query: {
      refetchInterval: 1000,
    },
  })
  const decimals = useReadContract({
    ...usdcContract,
    functionName: 'decimals',
    chainId: defaultChainId,
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
        chainId: defaultChainId,
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
        chainId: defaultChainId,
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
      chainId: defaultChainId,
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
        chainId: defaultChainId,
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
    refetch,
    switchChainId,
    chainId,
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
