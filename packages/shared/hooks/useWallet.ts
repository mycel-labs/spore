import { useCallback, useEffect, useState, useMemo } from 'react'
import {
  useConnect as useConnectWagmi,
  useAccount as useAccountWagmi,
  useDisconnect as useDisconnectWagmi,
  // usePublicClient as usePublicClientWagmi,
  useWalletClient as useWalletClientWagmi,
  useSignTypedData,
  useNetwork as useNetworkWagmi,
  useSwitchNetwork as useSwitchNetworkWagmi,
} from 'wagmi'
import {
  useSuggestChainAndConnect as useConnectGraz,
  useAccount as useAccountGraz,
  useDisconnect as useDisconnectGraz,
  useOfflineSigners as useOfflineSignersGraz,
  WalletType as CosmosWalletType,
} from 'graz'
import { LocalWallet, onboarding } from '@dydxprotocol/v4-client-js'
import { DirectSecp256k1HdWallet, OfflineSigner } from '@cosmjs/proto-signing'
import {
  WALLET_CONFIG,
  MYCEL_CHAIN_INFO,
  getSignTypedData,
  BECH32_PREFIX,
  EVM_CHAINID,
  type EvmAddress,
  type MycelAddress,
  type PrivateInformation,
  type WalletType,
} from '../utils/wallets'
import { AES, enc } from 'crypto-js'
import { useStore } from '../store'

export const useWallet = () => {
  // EVM
  const evmAddress = useStore((state) => state.evmAddress)
  const updateEvmAddress = useStore((state) => state.updateEvmAddress)
  const { address: evmAddressWagmi, isConnected: isConnectedWagmi } =
    useAccountWagmi()
  // const publicClientWagmi = usePublicClientWagmi();
  const { data: signerWagmi } = useWalletClientWagmi()
  const { disconnectAsync: disconnectWagmi } = useDisconnectWagmi()

  // Cosmos
  const mycelAddress = useStore((state) => state.mycelAddress)
  const updateMycelAddress = useStore((state) => state.updateMycelAddress)
  const { data: mycelAccountGraz, isConnected: isConnectedGraz } =
    useAccountGraz()
  const { data: signerGraz } = useOfflineSignersGraz()
  const { disconnectAsync: disconnectGraz } = useDisconnectGraz()
  const mycelAddressGraz = mycelAccountGraz?.bech32Address as
    | MycelAddress
    | undefined

  // current wallet
  const currentWalletType = useStore((state) => state.currentWalletType)
  const updateCurrentWalletType = useStore(
    (state) => state.updateCurrentWalletType
  )

  const { connectAsync: connectWagmi, connectors: connectorsWagmi } =
    useConnectWagmi()
  const { suggestAndConnect: connectGraz } = useConnectGraz()

  // EVM → mycel account derivation
  const evmDerivedAddresses = useStore((state) => state.evmDerivedAddresses)
  const updateEvmDerivedAddress = useStore(
    (state) => state.updateEvmDerivedAddress
  )
  const staticEncryptionKey = import.meta.env.VITE_PK_ENCRYPTION_KEY

  const connectWallet = useCallback(
    async ({ walletType }: { walletType: WalletType }) => {
      try {
        if (WALLET_CONFIG[walletType].chainType === 'cosmos') {
          if (!isConnectedGraz) {
            connectGraz({
              chainInfo: MYCEL_CHAIN_INFO,
              walletType: WALLET_CONFIG[walletType].id,
            })
          }
        } else if (WALLET_CONFIG[walletType].chainType === 'evm') {
          if (!isConnectedWagmi) {
            await connectWagmi({
              connector: connectorsWagmi.find(
                (cn: any) => cn.name === WALLET_CONFIG[walletType].name
              ),
            })
          }
        }
        updateCurrentWalletType(walletType)
      } catch (error) {
        console.log(error)
      }
    },
    [isConnectedGraz, signerGraz, isConnectedWagmi, signerWagmi]
  )

  // Disconnect
  const disconnectLocalWallet = () => {
    setLocalMycelWallet(undefined)
    setHdKey(undefined)
  }

  const disconnectWallet = useCallback(async () => {
    if (isConnectedWagmi) await disconnectWagmi()
    if (isConnectedGraz) await disconnectGraz()
    updateEvmAddress(undefined)
    updateMycelAddress(undefined)
    disconnectLocalWallet()
    // forgetEvmSignature();
    updateCurrentWalletType(undefined)
  }, [isConnectedGraz, isConnectedWagmi])

  // mycel wallet
  const [localMycelWallet, setLocalMycelWallet] = useState<LocalWallet>()
  const [mycelOfflineSigner, setMycelOfflineSigner] = useState<OfflineSigner>()
  const [hdKey, setHdKey] = useState<PrivateInformation>()

  const mycelAccounts = useMemo(
    () => localMycelWallet?.accounts,
    [localMycelWallet]
  )

  const getWalletFromEvmSignature = async ({
    signature,
  }: {
    signature: string
  }) => {
    const { mnemonic, privateKey, publicKey } =
      onboarding.deriveHDKeyFromEthereumSignature(signature)

    return {
      wallet: await LocalWallet.fromMnemonic(mnemonic, BECH32_PREFIX),
      mnemonic,
      privateKey,
      publicKey,
    }
  }

  const setWalletFromEvmSignature = async (signature: string) => {
    const { wallet, mnemonic, privateKey, publicKey } =
      await getWalletFromEvmSignature({
        signature,
      })
    setLocalMycelWallet(wallet)
    setHdKey({ mnemonic, privateKey, publicKey })
    setMycelOfflineSigner(
      await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: BECH32_PREFIX,
      })
    )
  }

  const saveEvmSignature = useCallback(
    (encryptedSignature: string) => {
      if (evmAddress) {
        updateEvmDerivedAddress({
          evmAddress,
          mycelAddress,
          encryptedSignature,
        })
      }
    },
    [evmDerivedAddresses, evmAddress]
  )

  const forgetEvmSignature = useCallback(
    (_evmAddress = evmAddress) => {
      if (_evmAddress) {
        updateEvmDerivedAddress({
          evmAddress: _evmAddress,
          mycelAddress,
          encryptedSignature: undefined,
        })
      }
    },
    [evmDerivedAddresses, evmAddress]
  )

  const signTypedData = getSignTypedData()
  const { signTypedDataAsync } = useSignTypedData({
    ...signTypedData,
    domain: {
      ...signTypedData.domain,
      chainId: EVM_CHAINID,
    },
  })

  const deriveKeys = async () => {
    const signature = await signTypedDataAsync()
    await setWalletFromEvmSignature(signature)
    const encryptedSignature = AES.encrypt(
      signature,
      staticEncryptionKey
    ).toString()
    saveEvmSignature(encryptedSignature)
  }

  const decryptSignature = (encryptedSignature: string | undefined) => {
    if (!staticEncryptionKey) throw new Error('No decryption key found')
    if (!encryptedSignature) throw new Error('No signature found')

    const decrypted = AES.decrypt(encryptedSignature, staticEncryptionKey)
    const signature = decrypted.toString(enc.Utf8)
    return signature
  }

  useEffect(() => {
    if (evmAddressWagmi) {
      if (evmAddress && evmAddress !== evmAddressWagmi) {
        disconnectLocalWallet()
        forgetEvmSignature(evmAddressWagmi)
      }
      updateEvmAddress(evmAddressWagmi)
    }
    if (mycelAddressGraz) {
      updateMycelAddress(mycelAddressGraz)
    }
  }, [evmAddressWagmi, mycelAddressGraz])

  // Change EVM network
  const { chain: chainWagmi } = useNetworkWagmi()
  const { switchNetworkAsync: switchNetworkAsyncWagmi } = useSwitchNetworkWagmi(
    { chainId: EVM_CHAINID }
  )
  const switchEvmNetworkAsync = useCallback(() => {
    if (chainWagmi?.id !== EVM_CHAINID) {
      switchNetworkAsyncWagmi && switchNetworkAsyncWagmi()
    }
  }, [chainWagmi?.id])

  // LocalWallet
  const updateDialog = useStore((state) => state.updateDialog)
  useEffect(() => {
    ;(async () => {
      if (mycelAddress && signerGraz?.offlineSigner) {
        try {
          setLocalMycelWallet(
            await LocalWallet.fromOfflineSigner(signerGraz?.offlineSigner)
          )
          setMycelOfflineSigner(signerGraz?.offlineSigner)
        } catch (error) {
          console.log(error)
        }
      } else if (evmAddress) {
        if (!localMycelWallet) {
          const evmDerivedAccount = evmDerivedAddresses[evmAddress]
          if (evmDerivedAccount?.encryptedSignature) {
            try {
              const signature = decryptSignature(
                evmDerivedAccount.encryptedSignature
              )
              await setWalletFromEvmSignature(signature)
            } catch (error) {
              console.log(error)
              forgetEvmSignature()
            }
          } else {
            updateDialog('wallet2')
          }
        }
      }
    })()
  }, [evmAddress, evmDerivedAddresses, signerWagmi, mycelAddress, signerGraz])

  return {
    // Wallet connection
    isConnected: isConnectedGraz || isConnectedWagmi,
    isConnectedGraz,
    isConnectedWagmi,
    connectWallet,
    disconnectWallet,
    currentWalletType,
    // EVM
    evmAddress,
    evmAddressWagmi,
    signerWagmi,
    connectorsWagmi,
    evmChainId: chainWagmi?.id,
    switchEvmNetworkAsync,
    // Cosmos
    mycelAddress,
    mycelAddressGraz,
    signerGraz,
    // EVM → mycel account derivation
    setWalletFromEvmSignature,
    saveEvmSignature,
    // forgetEvmSignature,
    deriveKeys,
    // mycel accounts
    hdKey,
    localMycelWallet,
    mycelOfflineSigner,
    mycelAccount: mycelAccounts?.[0],
  }
}

export default useWallet
