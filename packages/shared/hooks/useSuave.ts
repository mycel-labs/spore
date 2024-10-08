import { useQuery, useMutation } from '@tanstack/react-query'

type HealthResponse = {
  ok: boolean
}

type CreateAccountResponse = {
  accountId: string
  address: string
}

export type GetSignatureRequest = {
  recipient: string
  accountId: string
}

export type GetSignatureResponse = {
  signature: string
  v: string
  r: string
  s: string
}

export type Network = 'sepolia'

export type MintRequest = {
  recipient: string
  accountId: string
  network?: Network // if empty, default to holesky
}

export type MintResponse = {
  txHash: string
}

type path = 'createAccount' | 'getSignature' | 'health' | 'mint'

// TODO: make this accept env variable only
const SUAVE_API_URL =
  import.meta.env.VITE_SUAVE_API_URL || 'https://nft.api.spore.shugyo.mycel.id'

async function apiClient(path: path, body: any) {
  const response = await fetch(`${SUAVE_API_URL}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()
  return data
}

export const useHealth = () => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ['queryHealth'],
    queryFn: () => apiClient('health', {}),
  })

  return {
    data: data as HealthResponse,
    error,
    isError,
    isLoading,
    status,
  }
}

export const useCreateAccount = () => {
  const mutation = useMutation({
    mutationFn: async (): Promise<CreateAccountResponse> =>
      await apiClient('createAccount', {}),
  })

  return {
    ...mutation,
    mutateAsync: mutation.mutateAsync,
  }
}

export const useGetSignature = () => {
  const mutation = useMutation({
    mutationFn: async (
      body: GetSignatureRequest
    ): Promise<GetSignatureResponse> => await apiClient('getSignature', body),
  })

  return {
    ...mutation,
    mutateAsync: mutation.mutateAsync,
  }
}

export const useMint = () => {
  const mutation = useMutation({
    mutationFn: async (body: MintRequest): Promise<MintResponse> =>
      await apiClient('mint', body),
  })

  return {
    ...mutation,
    mutateAsync: mutation.mutateAsync,
  }
}
