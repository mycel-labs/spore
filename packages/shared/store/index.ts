import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import type { EvmAddress, MycelAddress } from '../lib/wallets'

export type EvmDerivedAddresses = {
  version?: string
  [EvmAddress: EvmAddress]: {
    encryptedSignature?: string
    mycelAddress?: MycelAddress
    mycelName?: string
  }
}

export type Authenticator = {
  id: string
  credentialID: Uint8Array
  credentialPublicKey: Uint8Array
  counter: number
  credentialDeviceType: string
  transports?: AuthenticatorTransport[]
}

type StoreState = {
  isHydrated: boolean
  isLoading: boolean
  refCode: string | undefined
  evmAddress: EvmAddress | undefined
  mycelAddress: MycelAddress | undefined
  mycelName: string | undefined
  // eslint-disable-next-line @typescript-eslint/ban-types
  evmDerivedAddresses: EvmDerivedAddresses | {}
  currentWalletType: string | undefined
  authenticator: Authenticator | undefined
}

type StoreSAction = {
  updateIsHydrated: (isHydrated: boolean) => void
  updateIsLoading: (isLoading: boolean) => void
  updateRefCode: (refCode: StoreState['refCode']) => void
  updateEvmAddress: (address: StoreState['evmAddress']) => void
  updateMycelAddress: (address: StoreState['mycelAddress']) => void
  updateMycelName: (name: StoreState['mycelName']) => void
  updateCurrentWalletType: (address: StoreState['currentWalletType']) => void
  updateEvmDerivedAddress: ({
    evmAddress,
    mycelAddress,
    mycelName,
    encryptedSignature,
  }: {
    evmAddress: EvmAddress
    mycelAddress?: MycelAddress
    mycelName?: string
    encryptedSignature?: string
  }) => void
  updateAuthenticator: (payload: StoreState['authenticator']) => void
}

export const useStore = create<StoreState & StoreSAction>()(
  devtools(
    persist(
      (set) => ({
        isHydrated: false,
        isLoading: false,
        refCode: undefined,
        evmAddress: undefined,
        mycelAddress: undefined,
        mycelName: undefined,
        currentWalletType: undefined,
        evmDerivedAddresses: {},
        dialog: undefined,
        onboardingStatus: undefined,
        authenticator: undefined,
        updateIsHydrated: (payload: boolean) =>
          set((state) => ({ ...state, isHydrated: payload })),
        updateIsLoading: (payload: boolean) =>
          set((state) => ({ ...state, isLoading: payload })),
        updateRefCode: (payload: string | undefined) =>
          set((state) => ({ ...state, refCode: payload })),
        updateEvmAddress: (payload: EvmAddress | undefined) =>
          set((state) => ({ ...state, evmAddress: payload })),
        updateMycelAddress: (payload: MycelAddress | undefined) =>
          set((state) => ({ ...state, mycelAddress: payload })),
        updateMycelName: (payload: string | undefined) =>
          set((state) => ({ ...state, mycelName: payload })),
        updateEvmDerivedAddress: ({
          evmAddress,
          mycelAddress,
          mycelName,
          encryptedSignature,
        }) =>
          set((state) => ({
            ...state,
            evmDerivedAddresses: {
              ...state.evmDerivedAddresses,
              version: 'v1',
              [evmAddress]: {
                mycelAddress,
                mycelName,
                encryptedSignature,
              },
            },
          })),
        updateCurrentWalletType: (payload: string | undefined) =>
          set((state) => ({ ...state, currentWalletType: payload })),
        updateAuthenticator: (payload: Authenticator | undefined) =>
          set((state) => ({ ...state, authenticator: payload })),
      }),
      {
        name: import.meta.env.VITE_LOCAL_STORAGE_KEY ?? 'mycel',
        onRehydrateStorage: () => (state) => {
          state?.updateIsHydrated(true)
        },
        partialize: (state) => ({
          refCode: state.refCode,
          evmAddress: state.evmAddress,
          mycelAddress: state.mycelAddress,
          mycelName: state.mycelName,
          evmDerivedAddresses: state.evmDerivedAddresses,
        }),
      }
    )
  )
)
