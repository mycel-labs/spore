import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import type { EvmAddress, MycelAddress } from '@/utils/wallets'
import { ONBOARDING_CONFIG } from '@/hooks/useOnboarding'

export type Dialog = 'wallet' | 'wallet2' | 'tx' | 'editRecord' | undefined

export type OnboardingStatus = typeof ONBOARDING_CONFIG

export type EvmDerivedAddresses = {
  version?: string
  [EvmAddress: EvmAddress]: {
    encryptedSignature?: string
    mycelAddress?: MycelAddress
  }
}

type StoreState = {
  evmAddress: EvmAddress | undefined
  mycelAddress: MycelAddress | undefined
  // eslint-disable-next-line @typescript-eslint/ban-types
  evmDerivedAddresses: EvmDerivedAddresses | {}
  currentWalletType: string | undefined
  dialog: Dialog
  onboardingStatus: typeof ONBOARDING_CONFIG | undefined | false
}

type StoreSAction = {
  updateEvmAddress: (address: StoreState['evmAddress']) => void
  updateMycelAddress: (address: StoreState['mycelAddress']) => void
  updateCurrentWalletType: (address: StoreState['currentWalletType']) => void
  updateEvmDerivedAddress: ({
    evmAddress,
    mycelAddress,
    encryptedSignature,
  }: {
    evmAddress: EvmAddress
    mycelAddress?: MycelAddress
    encryptedSignature?: string
  }) => void
  updateDialog: (dialog: StoreState['dialog']) => void
  updateOnboardingStatus: (payload: StoreState['onboardingStatus']) => void
}

export const useStore = create<StoreState & StoreSAction>()(
  devtools(
    persist(
      (set) => ({
        evmAddress: undefined,
        mycelAddress: undefined,
        currentWalletType: undefined,
        evmDerivedAddresses: {},
        dialog: undefined,
        onboardingStatus: undefined,
        updateEvmAddress: (payload: EvmAddress | undefined) =>
          set((state) => ({ ...state, evmAddress: payload })),
        updateMycelAddress: (payload: MycelAddress | undefined) =>
          set((state) => ({ ...state, mycelAddress: payload })),
        updateEvmDerivedAddress: ({
          evmAddress,
          mycelAddress,
          encryptedSignature,
        }) =>
          set((state) => ({
            ...state,
            evmDerivedAddresses: {
              ...state.evmDerivedAddresses,
              version: 'v1',
              [evmAddress]: {
                mycelAddress,
                encryptedSignature,
              },
            },
          })),
        updateCurrentWalletType: (payload: string | undefined) =>
          set((state) => ({ ...state, currentWalletType: payload })),
        updateDialog: (payload: Dialog) =>
          set((state) => ({ ...state, dialog: payload })),
        updateOnboardingStatus: (
          payload: typeof ONBOARDING_CONFIG | undefined | false
        ) => set((state) => ({ ...state, onboardingStatus: payload })),
      }),
      {
        name: 'mycel',
        partialize: (state) => ({
          evmAddress: state.evmAddress,
          mycelAddress: state.mycelAddress,
          evmDerivedAddresses: state.evmDerivedAddresses,
          onboardingStatus: state.onboardingStatus,
        }),
      }
    )
  )
)
