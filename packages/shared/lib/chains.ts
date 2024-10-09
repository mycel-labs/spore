import {
  Chain,
  mainnet,
  sepolia,
  holesky,
  polygon,
  polygonMumbai,
  bsc,
  bscTestnet,
  avalanche,
  avalancheFuji,
  gnosis,
  gnosisChiado,
  optimism,
  optimismGoerli,
  arbitrum,
  arbitrumGoerli,
  shardeumSphinx,
} from 'wagmi/chains'
import { RegistryNetworkName } from 'mycel-client-ts/mycel.resolver/rest'

const zetaAthens: Chain = {
  id: 7001,
  name: 'Zeta Athens 3',
  network: 'zeta-athens-3',
  nativeCurrency: { name: 'aZeta', symbol: 'aZETA', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://zetachain-athens-evm.blockpi.network/v1/rpc/public'],
    },
    public: {
      http: ['https://zetachain-athens-evm.blockpi.network/v1/rpc/public'],
    },
  },
  blockExplorers: {
    default: {
      name: 'ZetaScan',
      url: 'https://athens3.explorer.zetachain.com/ ',
    },
  },
}

export const chains: Chain[] = [
  mainnet,
  sepolia,
  holesky,
  polygon,
  polygonMumbai,
  bsc,
  bscTestnet,
  avalanche,
  avalancheFuji,
  gnosis,
  gnosisChiado,
  optimism,
  optimismGoerli,
  arbitrum,
  arbitrumGoerli,
  shardeumSphinx,
  zetaAthens,
]

export const getConnectedNetworkName = (chainId: number) => {
  switch (chainId) {
    case mainnet.id:
      return RegistryNetworkName.ETHEREUM_MAINNET_MAINNET
    case holesky.id:
      return RegistryNetworkName.ETHEREUM_TESTNET_HOLESKY
    case sepolia.id:
      return RegistryNetworkName.ETHEREUM_TESTNET_SEPOLIA
    case polygon.id:
      return RegistryNetworkName.POLYGON_MAINNET_MAINNET
    case polygonMumbai.id:
      return RegistryNetworkName.POLYGON_TESTNET_MUMBAI
    case bsc.id:
      return RegistryNetworkName.BNB_MAINNET_MAINNET
    case bscTestnet.id:
      return RegistryNetworkName.BNB_TESTNET_TESTNET
    case avalanche.id:
      return RegistryNetworkName.AVALANCHE_MAINNET_CCHAIN
    case avalancheFuji.id:
      return RegistryNetworkName.AVALANCHE_TESTNET_FUJI
    case gnosis.id:
      return RegistryNetworkName.GNOSIS_MAINNET_MAINNET
    case gnosisChiado.id:
      return RegistryNetworkName.GNOSIS_TESTNET_CHIADO
    case optimism.id:
      return RegistryNetworkName.OPTIMISM_MAINNET_MAINNET
    case optimismGoerli.id:
      return RegistryNetworkName.OPTIMISM_TESTNET_GOERLI
    case arbitrum.id:
      return RegistryNetworkName.ARBITRUM_MAINNET_MAINNET
    case arbitrumGoerli.id:
      return RegistryNetworkName.ARBITRUM_TESTNET_GOERLI
    case shardeumSphinx.id:
      return RegistryNetworkName.SHARDEUM_BETANET_SPHINX
    case zetaAthens.id:
      return RegistryNetworkName.ZETA_TESTNET_ATHENS
    default:
      throw new Error(`Unknown chainId: ${chainId}`)
  }
}
