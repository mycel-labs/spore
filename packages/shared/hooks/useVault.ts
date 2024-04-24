import { useEffect } from 'react'
import { useWallet } from './useWallet'
import {
  useSwitchChain,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
  useAccount,
} from 'wagmi'
import { toast } from '../components/ui/sonner'
import { usdcContract } from '../constants/testUSDC'
import { vaultContract } from '../constants/vault'
import { useStore } from '../store'
import { useGetTeamLeaderBoardByUserId } from './useReferral'
import { mappedLeaderBoard } from '../types/referral'
import { useQueryClient } from '@tanstack/react-query'

export const useVault = () => {
  const defaultChainId = 11155420
  const { evmAddress } = useWallet()
  const queryClient = useQueryClient()
  const { queryKey } = useReadContract()
  const { chainId } = useAccount()
  const { switchChain } = useSwitchChain()

  const mycelName = useStore((state) => state.mycelName)
  const { data: teamLeaderBoardData } = useGetTeamLeaderBoardByUserId(
    mycelName!
  )
  const teamAddresses: `0x${string}`[] =
    teamLeaderBoardData?.data?.leaderBoard.map(
      (item: mappedLeaderBoard) =>
        item.evmAddress || '0x0000000000000000000000000000000000000000'
    )
  function switchChainId(
    id: number,
    onSuccess?: () => void,
    onError?: () => void
  ) {
    switchChain(
      {
        chainId: id,
      },
      {
        onSuccess: onSuccess || (() => toast('Switch chain success')),
        onError: onError || ((e) => toast(`${e}`)),
      }
    )
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
  const currentDrawIdData = useReadContract({
    ...vaultContract,
    functionName: 'currentDrawId',
    chainId: defaultChainId,
  })

  const teamPoolValueData = useReadContract({
    ...vaultContract,
    functionName: 'calculateTeamTwabBetween',
    args: [teamAddresses, currentDrawIdData?.data as number],
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

  async function depositUSDC(amount: bigint) {
    if (!amount || !evmAddress) return
    deposit(
      {
        ...vaultContract,
        functionName: 'deposit',
        args: [amount, evmAddress],
        chainId: defaultChainId,
      },
      {
        onSuccess: () => toast('Transaction sent!'),
        onError: (err) => toast(`Deposit error! ${err}`),
      }
    )
  }

  async function withdrawUSDC(amount: bigint) {
    if (!amount || !evmAddress) return
    withdraw(
      {
        ...vaultContract,
        functionName: 'withdraw',
        args: [amount, evmAddress, evmAddress],
        chainId: defaultChainId,
      },
      {
        onSuccess: () => toast('Transaction sent!'),
        onError: (err) => toast(`Withdraw error! ${err}`),
      }
    )
  }

  async function claimPrizeUSDC(amount: bigint) {
    if (!amount || !evmAddress) return
    claimPrize({
      ...vaultContract,
      functionName: 'claimPrize',
      args: [amount],
      chainId: defaultChainId,
    })
  }

  async function approveUSDC(amount: bigint) {
    if (!amount || !evmAddress) return
    approve(
      {
        ...usdcContract,
        functionName: 'approve',
        args: [vaultContract.address, amount],
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
    defaultChainId,
    isLoadingDeposit,
    isLoadingApproval,
    isLoadingWithdraw,
    isLoadingClaimPrize,
    chainId,
    depositedAmountData,
    poolbalanceData,
    availableYieldData,
    currentDrawData,
    teamPoolValueData,
    claimablePrizeData,
    approvalData,
    usdcBalance,
    decimals,
  }
}
