import { useEffect, useState, useCallback } from 'react'
import {
  http,
  createPublicClient,
  createWalletClient,
  Address,
  custom,
  encodeFunctionData,
  decodeEventLog,
  encodeAbiParameters,
  keccak256,
  toBytes,
  zeroAddress,
  Hex,
  Abi,
} from '@flashbots/suave-viem'
import {
  getSuaveProvider,
  getSuaveWallet,
  type TransactionRequestSuave,
} from '@flashbots/suave-viem/chains/utils'
import { suaveToliman, sepolia } from '@flashbots/suave-viem/chains'
import deployment from './deployment.json'
import { useQuery, useMutation } from '@tanstack/react-query'

declare global {
  interface Window {
    ethereum?: any
  }
}

// Constants
const KETTLE_ADDRESS = '0xf579de142d98f8379c54105ac944fe133b7a17fe'
const GAS_PRICE = 10n * 10n ** 9n
const GAS_LIMIT = 10000000n

function extractSignatureFromSignedMessage(signedMessage: Hex): {
  v: number
  r: Hex
  s: Hex
} {
  const signature = signedMessage.startsWith('0x')
    ? signedMessage.slice(2)
    : signedMessage
  if (signature.length !== 130) {
    // 0x + 64 bytes
    throw new Error(`Signature must be 65 bytes long, got ${signature.length}`)
  }

  // Extract r, s, and v
  const r = `0x${signature.slice(0, 64)}` as Hex // First 32 bytes
  const s = `0x${signature.slice(64, 128)}` as Hex // Next 32 bytes
  let v = parseInt(signature.slice(128), 16) // Last byte

  // Adjust v if necessary (Ethereum signatures are [R || S || V])
  // Where V is 0 or 1, it must be adjusted to 27 or 28
  if (v === 0 || v === 1) {
    v += 27
  }

  return { r, s, v }
}

export function useSuave() {
  // State management
  const [state, setState] = useState({
    ethereum: null as any,
    suaveProvider: null as ReturnType<typeof getSuaveProvider> | null,
    connected: false,
    account: null as Hex | null,
    // accountId: localStorage.getItem('accountId') || '',
    // taAddress: (localStorage.getItem('taAddress') as Address) || zeroAddress,
    accountId: null as string | null,
    taAddress: null as Address | null,
    waitingForReceipt: false,
    mintTxHash: null as Hex | null,
    mintTxSuccess: false,
    signedMessage: null as Hex | null,
    isSepoliaNetwork: false,
    chainId: null as string | null,
    balance: null as bigint | null,
  })

  const [balanceUpdateTrigger, setBalanceUpdateTrigger] = useState(0)

  useEffect(() => {
    if (!state.suaveProvider) {
      setState((prevState) => ({
        ...prevState,
        suaveProvider: getSuaveProvider(
          http(suaveToliman.rpcUrls.default.http[0])
        ),
      }))
    }
    if ('ethereum' in window && !state.ethereum) {
      setState((prevState) => ({ ...prevState, ethereum: window.ethereum }))
    }
    if (state.ethereum && (!state.connected || !state.account)) {
      state.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setState((prevState) => ({
              ...prevState,
              account: accounts[0] as Hex,
            }))
          } else {
            state.ethereum
              .request({
                method: 'wallet_requestPermissions',
                params: [
                  {
                    eth_accounts: {},
                  },
                ],
              })
              .then((result: any) => {
                console.log('result', result)
                if (
                  result.length > 0 &&
                  result[0].parentCapability === 'eth_accounts'
                ) {
                  setState((prevState) => ({ ...prevState, connected: true }))
                }
              })
          }
        })
    }
  }, [state.ethereum, state.connected])

  useEffect(() => {
    const fetchBalance = async () => {
      if (state.suaveProvider && state.account) {
        try {
          const balance = await state.suaveProvider.getBalance({
            address: state.account,
          })
          console.log(`balance: ${balance}`)
          setState((prevState) => ({ ...prevState, balance }))
        } catch (error) {
          console.error('Failed to fetch balance:', error)
        }
      }
    }

    fetchBalance()
  }, [state.suaveProvider, state.account, balanceUpdateTrigger])

  const refreshBalance = useCallback(() => {
    setBalanceUpdateTrigger((prev) => prev + 1)
  }, [])

  // useEffect(() => {
  //   localStorage.setItem('accountId', state.accountId)
  // }, [state.accountId])

  // useEffect(() => {
  //   localStorage.setItem('taAddress', state.taAddress)
  // }, [state.taAddress])

  const updateState = useCallback((newState: Partial<typeof state>) => {
    setState((prevState) => ({ ...prevState, ...newState }))
  }, [])

  const { data: chainId } = useQuery({
    queryKey: ['chainId'],
    queryFn: async () => {
      if (!state.ethereum) return null
      return await state.ethereum.request({ method: 'eth_chainId' })
    },
    enabled: !!state.ethereum,
  })

  useEffect(() => {
    if (chainId) {
      updateState({
        isSepoliaNetwork: chainId === `0x${sepolia.id.toString(16)}`,
        chainId: chainId,
      })
    }
  }, [chainId, updateState])

  const switchToSepolia = useCallback(async () => {
    try {
      await state.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${sepolia.id.toString(16)}` }],
      })
    } catch (error) {
      console.error('Failed to switch to Sepolia:', error)
      alert(
        'Failed to switch to Sepolia. Please switch manually in your wallet.'
      )
    }
  }, [state.ethereum])

  const createTransactionRequest = useCallback(
    (to: Address, data: Hex, nonce: number): TransactionRequestSuave => {
      return {
        to,
        data,
        confidentialInputs: encodeAbiParameters([{ type: 'uint256' }], [0n]),
        kettleAddress: KETTLE_ADDRESS,
        type: '0x43',
        nonce,
        gas: GAS_LIMIT,
        gasPrice: GAS_PRICE,
      }
    },
    []
  )

  const sendTransactionMutation = useMutation({
    mutationFn: async (tx: TransactionRequestSuave) => {
      const { account, suaveProvider } = state
      if (!account || !suaveProvider) {
        throw new Error('Account or provider not available')
      }

      const wallet = getSuaveWallet({
        transport: custom(state.ethereum),
        jsonRpcAccount: account,
      })

      const signedTx = await wallet.signTransaction(tx)
      const txHash = await suaveProvider.sendRawTransaction({
        serializedTransaction: signedTx,
      })

      updateState({ waitingForReceipt: true })
      const receipt = await suaveProvider.waitForTransactionReceipt({
        hash: txHash,
      })

      return receipt
    },
    onSuccess: () => {
      updateState({ waitingForReceipt: false })
    },
    onError: (error) => {
      console.error('Transaction error:', error)
      updateState({ waitingForReceipt: false })
    },
  })

  const populateCreateAndApproveAccountTx = useCallback(
    async (nonce: number) => {
      const abi = [
        {
          name: 'createAndApproveAccount',
          type: 'function',
          inputs: [{ name: 'approvedAddress', type: 'address' }],
          outputs: [],
        },
      ] as const

      const data = encodeFunctionData({
        abi: abi as unknown as Abi[],
        functionName: 'createAndApproveAccount',
        args: [deployment.emitter as Address],
      })

      console.log(data)

      const tx = createTransactionRequest(
        deployment.af as Hex,
        data as Hex,
        nonce
      )
      return tx
    },
    [createTransactionRequest]
  )

  const populateSignL1MintApprovalTx = useCallback(
    async (nonce: number, recipient: Address, accountId: string) => {
      const abi = [
        {
          name: 'signL1MintApprovalFA',
          type: 'function',
          inputs: [
            { name: 'recipient', type: 'address' },
            { name: 'accountId', type: 'string' },
          ],
          outputs: [],
        },
      ] as const

      const data = encodeFunctionData({
        abi: abi as unknown as Abi[],
        functionName: 'signL1MintApprovalFA',
        args: [recipient, accountId],
      })

      console.log(data)

      const tx = createTransactionRequest(
        deployment.emitter as Hex,
        data as Hex,
        nonce
      )
      return tx
    },
    [createTransactionRequest]
  )

  const sendCreateAccountCCR = useCallback(async () => {
    try {
      const { account, suaveProvider } = state
      if (!account || !suaveProvider) {
        throw new Error('Account or provider not available')
      }

      const nonce = await suaveProvider.getTransactionCount({
        address: account,
        blockTag: 'latest',
      })

      const tx = await populateCreateAndApproveAccountTx(nonce)
      const receipt = await sendTransactionMutation.mutateAsync(tx)

      if (receipt.status === 'success') {
        const eventTopic = keccak256(toBytes('AddressApproved(string,address)'))
        const eventTopicCreateAccount = keccak256(
          toBytes('AccountCreated(string,address)')
        )

        const addressApprovedEvent = receipt.logs.find(
          (log: any) => log.topics[0] === eventTopic
        )
        const accountCreatedEvent = receipt.logs.find(
          (log: any) => log.topics[0] === eventTopicCreateAccount
        )

        console.log('addressApprovedEvent', addressApprovedEvent)
        console.log('accountCreatedEvent', accountCreatedEvent)

        const decodedAddressApprovedLog = decodeEventLog({
          abi: [
            {
              type: 'event',
              name: 'AddressApproved',
              inputs: [
                { type: 'string', name: 'accountId', indexed: false },
                { type: 'address', name: 'approvedAddress', indexed: false },
              ],
            },
          ],
          data: addressApprovedEvent?.data,
          topics: addressApprovedEvent?.topics as any,
        })

        const decodedAccountCreatedLog = decodeEventLog({
          abi: [
            {
              type: 'event',
              name: 'AccountCreated',
              inputs: [
                { type: 'string', name: 'accountId', indexed: false },
                { type: 'address', name: 'ethereumAddress', indexed: false },
              ],
            },
          ],
          data: accountCreatedEvent?.data,
          topics: accountCreatedEvent?.topics as any,
        })

        console.log('decodedAddressApprovedLog', decodedAddressApprovedLog)
        console.log('decodedAccountCreatedLog', decodedAccountCreatedLog)

        updateState({
          accountId: decodedAccountCreatedLog.args.accountId,
          taAddress: decodedAccountCreatedLog.args.ethereumAddress,
        })
      } else {
        throw new Error('Transaction failed')
      }
    } catch (error) {
      console.error('Error in sendCreateAccountCCR:', error)
      alert(
        error instanceof Error ? error.message : 'An unknown error occurred'
      )
    } finally {
      updateState({ waitingForReceipt: false })
    }
  }, [
    state,
    populateCreateAndApproveAccountTx,
    sendTransactionMutation,
    updateState,
  ])

  const sendSignL1MintApprovalFA = useCallback(async () => {
    try {
      const { account, suaveProvider } = state
      if (!account || !suaveProvider) {
        throw new Error('Account or provider not available')
      }

      const nonce = await suaveProvider.getTransactionCount({
        address: account,
        blockTag: 'latest',
      })

      const tx = await populateSignL1MintApprovalTx(
        nonce,
        account,
        state.accountId as string
      )
      const receipt = await sendTransactionMutation.mutateAsync(tx)
      console.log(receipt)

      if (receipt.status === 'success') {
        const eventTopic = keccak256(toBytes('NFTEEApproval(bytes)'))
        const event = receipt.logs.find(
          (log: any) => log.topics[0] === eventTopic
        )

        const decodedEvent = decodeEventLog({
          abi: [
            {
              type: 'event',
              name: 'NFTEEApproval',
              inputs: [{ type: 'bytes', name: 'signedMessage' }],
            },
          ],
          data: event?.data,
          topics: event?.topics as any,
        })
        updateState({ signedMessage: decodedEvent.args.signedMessage })
        console.log('signedMessage', decodedEvent.args.signedMessage)
      } else {
        throw new Error('Transaction failed')
      }
    } catch (error) {
      console.error('Error in sendSignL1MintApprovalFA:', error)
      alert(
        error instanceof Error ? error.message : 'An unknown error occurred'
      )
    } finally {
      updateState({ waitingForReceipt: false })
    }
  }, [
    state,
    populateSignL1MintApprovalTx,
    sendTransactionMutation,
    updateState,
  ])

  const mintNFTWithSignature = useCallback(async () => {
    try {
      const { account, signedMessage, taAddress } = state
      if (!account || !signedMessage || !taAddress) {
        throw new Error('Required data not available')
      }

      const { v, r, s } = extractSignatureFromSignedMessage(signedMessage)

      const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(),
      })

      const walletClient = createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum),
      })

      const { request } = await publicClient.simulateContract({
        address: deployment.l1Nft as Address,
        abi: [
          {
            name: 'mintNFTWithSignature',
            type: 'function',
            inputs: [
              { name: 'recipient', type: 'address' },
              { name: 'v', type: 'uint8' },
              { name: 'r', type: 'bytes32' },
              { name: 's', type: 'bytes32' },
            ],
            outputs: [],
            stateMutability: 'nonpayable',
          },
        ],
        functionName: 'mintNFTWithSignature',
        args: [account, v, r, s],
        account: account,
      })

      const hash = await walletClient.writeContract(request)
      console.log('Mint transaction sent:', hash)
      updateState({ mintTxHash: hash })

      let receipt = null
      const maxAttempts = 10
      const attemptInterval = 1000 // 1sec

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
          receipt = await publicClient.waitForTransactionReceipt({
            hash,
            timeout: 10000,
          })
          console.log('Mint transaction confirmed:', receipt.transactionHash)
          break
        } catch (err) {
          console.warn(`Attempt ${attempt + 1} failed: ${err}`)
          if (attempt < maxAttempts - 1) {
            console.log(`Waiting ${attemptInterval / 1000} seconds...`)
            await new Promise((resolve) => setTimeout(resolve, attemptInterval))
          } else {
            throw new Error(
              'Max attempts reached. Please check the transaction status manually.'
            )
          }
        }
      }

      if (!receipt) {
        throw new Error(
          'Failed to get transaction receipt after multiple attempts'
        )
      }

      const nftMintedEvent = receipt.logs.find(
        (log) =>
          log.topics[0] ===
          keccak256(toBytes('NFTMintedEvent(address,uint256)'))
      )

      if (nftMintedEvent) {
        const [recipient, tokenId] = nftMintedEvent.topics.slice(1)
        console.log(
          `NFT minted to ${recipient} with token ID ${BigInt(tokenId)}`
        )
        updateState({
          mintTxHash: receipt.transactionHash,
          mintTxSuccess: true,
        })
      } else {
        console.warn('NFTMintedEvent not found in transaction receipt')
      }
    } catch (error) {
      console.error('Error in mintNFTWithSignature:', error)
      updateState({
        mintTxSuccess: false,
      })
    }
  }, [state, updateState])

  const { data: accountData } = useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      if (!state.ethereum) return null
      const accounts = await state.ethereum.request({ method: 'eth_accounts' })
      return accounts.length > 0 ? (accounts[0] as Hex) : null
    },
    enabled: !!state.ethereum,
  })

  useEffect(() => {
    if (accountData) {
      updateState({ account: accountData })
    }
  }, [accountData, updateState])

  return {
    state,
    updateState,
    switchToSepolia,
    sendCreateAccountCCR,
    sendSignL1MintApprovalFA,
    mintNFTWithSignature,
    refreshBalance,
  }
}
