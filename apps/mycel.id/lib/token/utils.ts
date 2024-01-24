import BitcoinIcon from './bitcoin-btc-logo.svg'
import EthereumIcon from './ethereum-eth-logo.svg'
import PolygonIcon from './polygon-matic-logo.svg'
export type Network = {
  networkType: string
  id: number
  chainName?: string
  icon: string
}

export enum NetworkName {
  NO_NETWORK = 0,
  /** BITCOIN_MAINNET_MAINNET - BTC 1xxx */
  BITCOIN_MAINNET_MAINNET = 10000,
  BITCOIN_TESTNET_TESTNET = 10001,
  /** BITCOIN_DEFAULT_DEFAULT - DEFAULT */
  BITCOIN_DEFAULT_DEFAULT = 19999,
  /**
   * ETHEREUM_MAINNET_MAINNET - EVM 2xxxx
   * Etheruem
   */
  ETHEREUM_MAINNET_MAINNET = 20000,
  ETHEREUM_TESTNET_GOERLI = 20001,
  ETHEREUM_TESTNET_SEPOLIA = 20002,
  /** POLYGON_MAINNET_MAINNET - Polygon */
  POLYGON_MAINNET_MAINNET = 20003,
  POLYGON_TESTNET_MUMBAI = 20004,
  /** BNB_MAINNET_MAINNET - BNB Chain */
  BNB_MAINNET_MAINNET = 20005,
  BNB_TESTNET_TESTNET = 20006,
  /** AVALANCHE_MAINNET_CCHAIN - Avalanche */
  AVALANCHE_MAINNET_CCHAIN = 20007,
  AVALANCHE_TESTNET_FUJI = 20008,
  /** GNOSIS_MAINNET_MAINNET - Gnosis */
  GNOSIS_MAINNET_MAINNET = 20009,
  GNOSIS_TESTNET_CHIADO = 20010,
  /** OPTIMISM_MAINNET_MAINNET - Optimism */
  OPTIMISM_MAINNET_MAINNET = 20011,
  OPTIMISM_TESTNET_GOERLI = 20012,
  /** ARBITRUM_MAINNET_MAINNET - Arbitrum */
  ARBITRUM_MAINNET_MAINNET = 20013,
  ARBITRUM_TESTNET_GOERLI = 20014,
  /**
   * SHARDEUM_BETANET_SPHINX - Shardeum
   * SHARDEUM_MAINNET_ = 20015;
   * SHARDEUM_TESTNET_ = 20016;
   */
  SHARDEUM_BETANET_SPHINX = 20017,
  /**
   * ZETA_TESTNET_ATHENS - Zetachain
   * ZETA_MAINNET_MAINNET = 20018;
   */
  ZETA_TESTNET_ATHENS = 20019,
  /** EVM_DEFAULT_DEFAULT - DEFAULT */
  EVM_DEFAULT_DEFAULT = 29999,
  /**
   * APTOS_MAINNET_MAINNET - MOVE 3xxxx
   * Aptos
   */
  APTOS_MAINNET_MAINNET = 30000,
  APTOS_TESTNET_TESTNET = 30001,
  /** SUI_MAINNET_MAINNET - Sui */
  SUI_MAINNET_MAINNET = 30002,
  SUI_TESTNET_TESTNET = 30003,
  /** MOVE_DEFAULT_DEFAULT - DEFAULT */
  MOVE_DEFAULT_DEFAULT = 39999,
  /** SOLANA_MAINNET_MAINNET - SOLANA 4xxxx */
  SOLANA_MAINNET_MAINNET = 40000,
  SOLANA_TESTNET_TESTNET = 40001,
  /** SOLANA_DEFAULT_DEFAULT - DEFAULT */
  SOLANA_DEFAULT_DEFAULT = 49999,
  UNRECOGNIZED = -1,
}
// TODO: Add icons, load from mycel-client-ts
// https://cryptologos.cc/
export const Networks: Network[] = [
  {
    networkType: 'BITCOIN',
    id: NetworkName.BITCOIN_MAINNET_MAINNET,
    chainName: 'Bitcoin',
    icon: BitcoinIcon,
  },
  {
    networkType: 'BITCOIN',
    id: NetworkName.BITCOIN_TESTNET_TESTNET,
    chainName: 'Bitcoin Testnet',
    icon: BitcoinIcon,
  },
  {
    networkType: 'ETHEREUM',
    id: NetworkName.ETHEREUM_MAINNET_MAINNET,
    chainName: 'Ethereum',
    icon: EthereumIcon,
  },
  {
    networkType: 'ETHEREUM',
    id: NetworkName.ETHEREUM_TESTNET_GOERLI,
    chainName: 'Ethereum Goerli',
    icon: EthereumIcon,
  },
  {
    networkType: 'ETHEREUM',
    id: NetworkName.ETHEREUM_TESTNET_SEPOLIA,
    chainName: 'Ethereum Sepolia',
    icon: EthereumIcon,
  },
  {
    networkType: 'POLYGON',
    id: NetworkName.POLYGON_MAINNET_MAINNET,
    chainName: 'Polygon',
    icon: PolygonIcon,
  },
  {
    networkType: 'POLYGON',
    id: NetworkName.POLYGON_TESTNET_MUMBAI,
    chainName: 'Polygon Mumbai',
    icon: PolygonIcon,
  },
]
