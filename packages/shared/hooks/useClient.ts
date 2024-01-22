import { Client } from 'mycel-client-ts'
import { OfflineSigner } from '@cosmjs/proto-signing'
import { env } from '~/env'
import useWallet from '~/hooks/useWallet'

const useClientInstance = (signer?: OfflineSigner) => {
  const { mycelOfflineSigner } = useWallet()
  return new Client(env, signer ?? mycelOfflineSigner)
}
let clientInstance: ReturnType<typeof useClientInstance>

export const useClient = (signer?: OfflineSigner) => {
  clientInstance = useClientInstance(signer)
  return clientInstance
}
