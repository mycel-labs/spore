import BitcoinIcon from './bitcoin-btc-logo.svg'
import EthereumIcon from './ethereum-eth-logo.svg'
import SolanaIcon from './solana-sol-logo.svg'
import SuiIcon from './sui-logo.svg'
import { NetworkName } from 'mycel-client-ts/mycel.registry/types/mycel/registry/network_name'

export type Network = {
  networkType: string
  id: number
  chainName?: string
  icon: string
}

// https://cryptologos.cc/
export const Networks: Network[] = [
  {
    networkType: 'BITCOIN_DEFAULT_DEFAULT',
    id: NetworkName.BITCOIN_DEFAULT_DEFAULT,
    chainName: 'Bitcoin (Default)',
    icon: BitcoinIcon,
  },
  {
    networkType: 'EVM_DEFAULT_DEFAULT',
    id: NetworkName.EVM_DEFAULT_DEFAULT,
    chainName: 'EVM (Default)',
    icon: EthereumIcon,
  },
  {
    networkType: 'SOLANA_MAINNET_MAINNET',
    id: NetworkName.SOLANA_MAINNET_MAINNET,
    chainName: 'Solana Mainnet',
    icon: SolanaIcon,
  },
  {
    networkType: 'SUI_MAINNET_MAINNET',
    id: NetworkName.SUI_MAINNET_MAINNET,
    chainName: 'Sui Mainnet',
    icon: SuiIcon,
  },
]
