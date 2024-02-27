import { GrazProvider, WalletType as WalletTypeCosmos } from 'graz'
import { http, createConfig, WagmiProvider } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MYCEL_CHAIN_INFO } from '../lib/wallets'

const queryClient = new QueryClient()

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    // TODO: set url for alchemy etc.
    [mainnet.id]: http(),
  },
})

const grazOptions = {
  chains: [MYCEL_CHAIN_INFO],
  defaultWallet: WalletTypeCosmos.KEPLR,
  walletConnect: {
    options: {
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    },
  },
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <GrazProvider grazOptions={grazOptions}>{children}</GrazProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
