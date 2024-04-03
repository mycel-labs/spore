import { useCallback, useEffect, useState, useMemo } from 'react'
import { useStore } from '../store/index'
import {
  useConnect as useConnectWagmi,
  useDisconnect as useDisconnectWagmi,
  useWalletClient as useWalletClientWagmi,
  useSignTypedData,
  useAccount as useAccountWagmi,
  useSwitchChain as useSwitchChainWagmi,
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
import { Secp256k1HdWallet } from '@cosmjs/amino'
import {
  WALLET_CONFIG,
  MYCEL_CHAIN_INFO,
  getTypedData,
  BECH32_PREFIX,
  EVM_CHAINID,
  getSignDomainData,
  type EvmAddress,
  type MycelAddress,
  type PrivateInformation,
  type WalletType,
} from '../lib/wallets'
import { AES, enc } from 'crypto-js'

export const useWallet = () => {
  // EVM
  const evmAddress = useStore((state) => state.evmAddress)
  const updateEvmAddress = useStore((state) => state.updateEvmAddress)
  const {
    address: evmAddressWagmi,
    isConnected: isConnectedWagmi,
    status: statusWagmi,
    isConnecting: isConnectingWagmi,
    isReconnecting: isReconnectingWagmi,
  } = useAccountWagmi()
  // const publicClientWagmi = usePublicClientWagmi();
  const { data: signerWagmi } = useWalletClientWagmi()
  const { disconnectAsync: disconnectWagmi } = useDisconnectWagmi()

  // Cosmos
  const mycelAddress = useStore((state) => state.mycelAddress)
  const updateMycelAddress = useStore((state) => state.updateMycelAddress)
  const {
    data: mycelAccountGraz,
    isConnected: isConnectedGraz,
    status: statusGraz,
    isConnecting: isConnectingGraz,
    isReconnecting: isReconnectingGraz,
  } = useAccountGraz()
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
                (cn: any) => cn.id === WALLET_CONFIG[walletType].id
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
  const [mycelOfflineSignerAmino, setMycelOfflineSignerAmino] =
    useState<OfflineSigner>()
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
    setMycelOfflineSignerAmino(
      await Secp256k1HdWallet.fromMnemonic(mnemonic, {
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

  const { signTypedDataAsync } = useSignTypedData()
  const types = getTypedData()

  const deriveKeys = async () => {
    const signature = await signTypedDataAsync({
      ...types,
      domain: {
        ...types.domain,
        chainId: EVM_CHAINID,
      },
    })
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

  const signDomainName = useCallback(
    async (domainName: string) => {
      if (mycelOfflineSignerAmino) {
        const account = await mycelOfflineSignerAmino.getAccounts()
        const signData = getSignDomainData(account[0].address, domainName)
        const signature = await mycelOfflineSignerAmino.signAmino(
          account[0].address,
          signData
        )
        return signature
      }
    },
    [mycelOfflineSignerAmino]
  )

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
  const { chain: chainWagmi } = useAccountWagmi()
  const { switchChainAsync } = useSwitchChainWagmi({ chainId: EVM_CHAINID })
  const switchEvmNetworkAsync = useCallback(async () => {
    if (chainWagmi?.id !== EVM_CHAINID) {
      switchChainAsync && (await switchChainAsync())
    }
  }, [chainWagmi?.id])

  // LocalWallet
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
          }
        }
      }
    })()
  }, [evmAddress, evmDerivedAddresses, signerWagmi, mycelAddress, signerGraz])

  return {
    // Wallet connection
    isConnected: isConnectedGraz || isConnectedWagmi,
    isConnectedGraz,
    isConnectingGraz,
    isReconnectingGraz,
    isConnectedWagmi,
    isConnectingWagmi,
    isReconnectingWagmi,
    connectWallet,
    disconnectWallet,
    currentWalletType,
    // EVM
    evmAddress,
    evmAddressWagmi,
    signerWagmi,
    connectorsWagmi,
    evmChainId: chainWagmi?.id,
    // switchEvmNetworkAsync,
    // Cosmos
    mycelAddress,
    mycelAddressGraz,
    signerGraz,
    // EVM → mycel account derivation
    setWalletFromEvmSignature,
    saveEvmSignature,
    // forgetEvmSignature,
    deriveKeys,
    signDomainName,
    // mycel accounts
    hdKey,
    localMycelWallet,
    mycelOfflineSigner,
    mycelAccount: mycelAccounts?.[0],
  }
}
