import { useQuery, useMutation } from '@tanstack/react-query'
import { useClient } from '../hooks/useClient'
import { Domain } from '../types/domain'
import { useWallet } from '../hooks/useWallet'

export const useAllRecords = (domain: Domain | undefined) => {
  const client = useClient()
  const { data, error, isError, isLoading, status } = useQuery({
    enabled: !!domain,
    queryKey: ['queryAllRecords', domain],
    queryFn: () =>
      client.MycelRegistry.query
        .queryAllRecords(domain.name, domain.parent)
        .then((res) => res.data),
  })

  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}

export const useDomainOwnership = (address: string | undefined) => {
  const client = useClient()
  const { data, error, isError, isLoading, status } = useQuery({
    enabled: !!address,
    queryKey: ['queryDomainOwnership', address],
    queryFn: () =>
      client.MycelRegistry.query
        .queryDomainOwnership(address)
        .then((res) => res.data),
  })

  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}

export const useBalance = (address?: string | undefined, denom = 'umycel') => {
  const client = useClient()
  const { mycelAccount } = useWallet()
  const _address = address ?? mycelAccount?.address ?? null

  const { data, error, isError, isLoading, status } = useQuery({
    enabled: !!_address,
    queryKey: ['queryBalance', _address],
    queryFn: () =>
      client.CosmosBankV1Beta1.query
        .queryBalance(_address, { denom })
        .then((res) => res.data),
  })

  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}

export const useAllBalances = (address: string | undefined) => {
  const client = useClient()
  const { mycelAccount } = useWallet()
  const _address = address ?? mycelAccount?.address ?? null

  const { data, error, isError, isLoading, status } = useQuery({
    enabled: !!_address,
    queryKey: ['queryBalance', _address],
    queryFn: () =>
      client.CosmosBankV1Beta1.query
        .queryAllBalances(_address)
        .then((res) => res.data),
  })

  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}

export const useRegisterSecondLevelDomain = () => {
  const client = useClient()
  const { mycelAccount } = useWallet()

  const {
    data,
    error,
    isError,
    isPending,
    isSuccess,
    mutate,
    onMutate,
    onSettled,
    onSuccess,
    onError,
    status,
  } = useMutation({
    mutationKey: [
      'sendMsgRegisterSecondLevelDomain',
      mycelAccount?.address ?? '',
      name,
    ],
    mutationFn: (name, parent = 'cel') =>
      client.MycelRegistry.tx
        .sendMsgRegisterSecondLevelDomain({
          value: {
            creator: mycelAccount?.address ?? '',
            name,
            parent,
            registrationPeriodInYear: 1,
          },
        })
        .then((res) => res.data).catch((e) => { console.log(e) }),
  })

  return {
    data,
    error,
    mutate,
    isError,
    isPending,
    isSuccess,
    onMutate,
    onSettled,
    onSuccess,
    onError,
    status,
  }
}
