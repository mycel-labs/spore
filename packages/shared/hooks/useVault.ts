import { useCallback, useEffect, useState, useMemo } from 'react'
import { useWallet } from './useWallet'
import { ethers, FixedNumber } from 'ethers'
import {
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { toast } from '../components/ui/sonner'
import { convertUnixToUTC } from '../lib/converter'

import { VAULT_ADDRESS, VAULT_ABI } from '../constants/vault'
import { USDC_ADDRESS, USDC_ABI } from '../constants/testUSDC'
import { FAUCET_ADDRESS, FAUCET_ABI } from '../constants/faucet'

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
  const [currentDrawId, setCurrentDrawId] = useState<number | undefined>(0)

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

  /* Read contract*/
  const depositedAmountData = useReadContract({
    address: VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: 'balanceOf',
    args: [evmAddress],
  })

  const poolbalanceData = useReadContract({
    address: VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: 'totalSupply',
  })

  const currentDrawIdData = useReadContract({
    address: VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: 'currentDrawId',
  })

  const currentDrawData = useReadContract({
    address: VAULT_ADDRESS,
    abi: VAULT_ABI,
    functionName: 'getDraw',
    args: [1], //TODO: change to currentDrawId
  })

  const approvalData = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: 'allowance',
    args: [evmAddress, VAULT_ADDRESS],
  })

  const usdcBalance = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: 'balanceOf',
    args: [evmAddress],
  })
  const decimals = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: 'decimals',
  })

  /* Async functions */
  async function depositUSDC(amount: number) {
    if (!amount || amount == 0) return
    const fixedAmount = amount * 1e6
    deposit(
      {
        address: VAULT_ADDRESS,
        abi: VAULT_ABI,
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
        address: VAULT_ADDRESS,
        abi: VAULT_ABI,
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
      address: VAULT_ADDRESS,
      abi: VAULT_ABI,
      functionName: 'claimPrize',
      args: [amount],
    })
  }

  async function approveUSDC() {
    const fixedAmount = 1000000 * 1e6
    approve(
      {
        address: USDC_ADDRESS,
        abi: USDC_ABI,
        functionName: 'approve',
        args: [VAULT_ADDRESS, fixedAmount],
      },
      {
        onSuccess: () => toast('Transaction sent!'),
        onError: (err) => toast(`Approval error! ${err}`),
      }
    )
  }

  async function faucetUSDC() {
    faucet({
      address: FAUCET_ADDRESS,
      abi: FAUCET_ABI,
      functionName: 'drip',
      args: [USDC_ADDRESS],
    })
  }

  useEffect(() => {
    if (!decimals.data) return
    const fixedBalance = FixedNumber.fromValue(
      usdcBalance?.data as ethers.BigNumberish,
      decimals?.data as ethers.Numeric
    )
    const fixedDepositedAmount = FixedNumber.fromValue(
      depositedAmountData?.data as ethers.BigNumberish,
      decimals?.data as ethers.Numeric
    )
    const fixedApproval = FixedNumber.fromValue(
      approvalData?.data as ethers.BigNumberish,
      decimals?.data as ethers.Numeric
    )
    const fixedPoolBalance = FixedNumber.fromValue(
      poolbalanceData?.data as ethers.BigNumberish,
      decimals?.data as ethers.Numeric
    )
    setUserBalance(fixedBalance.toString())
    setDepositedAmount(fixedDepositedAmount.toString())
    setApproval(fixedApproval)
    setPoolBalance(fixedPoolBalance.toString())
    setDrawData(convertUnixToUTC(currentDrawData.data.drawEndTime))
    setCurrentDrawId(Number(currentDrawIdData.data))
  }, [])

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
  }
}
