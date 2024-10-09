import { http, createConfig, WagmiProvider } from 'wagmi'
import { mainnet, holesky, sepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const wagmiConfig = createConfig({
  chains: [mainnet, holesky, sepolia],
  connectors: [
    injected(),
    walletConnect({
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
      metadata: {
        icons: [''],
        name: 'SPORE',
        description: 'spore',
        url: 'https://spore.ooo',
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`,
      {
        key: 'alchemy',
      }
    ),
    [holesky.id]: http(
      `https://eth-holesky.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`,
      {
        key: 'alchemy',
      }
    ),
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_KEY}`,
      {
        key: 'alchemy',
      }
    ),
  },
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
