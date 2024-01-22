import useSWR from 'swr'
import { useClient } from '~/hooks/useClient'
import { Domain } from '~/types/domain'
import { useWallet } from '~/hooks/useWallet'

export const useAllRecords = (domain: Domain | undefined) => {
  const client = useClient()
  const { data, error, isLoading, isValidating } = useSWR(domain ? ['queryAllRecords', domain] : null, () =>
    client.MycelResolver.query.queryAllRecords(domain.name, domain.parent).then((res) => res.data)
  )

  return {
    data,
    error,
    isLoading,
    isValidating,
  }
}

export const useDomainOwnership = (address: string | undefined) => {
  const client = useClient()
  const { data, error, isLoading, isValidating } = useSWR(address ? ['queryDomainOwnership', address] : null, () =>
    client.MycelRegistry.query.queryDomainOwnership(address).then((res) => res.data)
  )

  return {
    data,
    error,
    isLoading,
    isValidating,
  }
}

export const useBalance = (address?: string | undefined, denom = 'umycel') => {
  const client = useClient()
  const { mycelAccount } = useWallet()
  const _address = address ?? mycelAccount?.address ?? null
  const { data, error, isLoading, isValidating } = useSWR(_address ? ['queryBalance', _address] : null, () =>
    client.CosmosBankV1Beta1.query.queryBalance(_address, { denom }).then((res) => res.data)
  )

  return {
    data,
    error,
    isLoading,
    isValidating,
  }
}

export const useAllBalances = (address: string | undefined) => {
  const client = useClient()
  const { mycelAccount } = useWallet()
  const _address = address ?? mycelAccount?.address ?? null
  const { data, error, isLoading, isValidating } = useSWR(_address ? ['queryAllBalances', _address] : null, () =>
    client.CosmosBankV1Beta1.query.queryAllBalances(_address).then((res) => res.data)
  )

  return {
    data,
    error,
    isLoading,
    isValidating,
  }
}
