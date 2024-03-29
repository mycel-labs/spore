import { useQuery } from '@tanstack/react-query'
import { FirebaseOptions, initializeApp } from 'firebase/app'
import {
  connectFunctionsEmulator,
  Functions,
  getFunctions,
  httpsCallable,
} from 'firebase/functions'
import { env } from '../lib/env'

export const useFirebaseFunction = (firebaseOptions: FirebaseOptions) => {
  const app = initializeApp(firebaseOptions)
  const functions = getFunctions(app)
  if (env.isDev) {
    connectFunctionsEmulator(functions, 'localhost', 5001)
  }
  return functions
}

export const useCreateUser = async (
  fns: Functions,
  referralCode: string,
  userId: string,
  address: string
) => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ['queryCreateUser', userId],
    queryFn: async () => {
      const fn = httpsCallable(fns, 'createUser')
      const res = await fn({
        code: referralCode,
        uid: userId,
        address,
      })
      return res.data
    },
  })
  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}

export const useGetUser = (fns: Functions, uid: string) => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ['queryGetUser', fns],
    queryFn: async () => {
      const fn = httpsCallable(fns, 'getUser')
      const res = await fn({ uid })
      return res.data
    },
  })
  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}

export const useGetUserByReferralCode = (
  fns: Functions,
  referralCode: string
) => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ['queryGetUserByReferralCode', fns],
    queryFn: async () => {
      const fn = httpsCallable(fns, 'getUserByReferralCode')
      const res = await fn({ code: referralCode })
      return res.data
    },
  })
  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}

// Referral Codes
export const useGetReferralCodeByIssuerUserId = (
  fns: Functions,
  issuerUserId: string
) => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ['queryGetReferralCodeByIssuerUserId', fns],
    queryFn: async () => {
      const fn = httpsCallable(fns, 'getReferralCodeByIssuerUserId')
      const res = await fn({ uid: issuerUserId })
      return res.data
    },
  })
  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}

// Leader Boards
export const useGetIndividualLeaderBoard = (fns: Functions) => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ['queryGetIndividualLeaderBoard', fns],
    queryFn: async () => {
      const fn = httpsCallable(fns, 'getIndividualLeaderBoard')
      const res = await fn()
      return res.data
    },
  })
  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}

export const useGetTeamLeaderBoardByUserId = (fns: Functions, uid: string) => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ['queryGetTeamLeaderBoardByUserId', fns],
    queryFn: async () => {
      const fn = httpsCallable(fns, 'getTeamLeaderBoardByUserId')
      const res = await fn({ uid })
      return res.data
    },
  })
  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}

export const useGetTotalLeaderBoard = (fns: Functions) => {
  const { data, error, isError, isLoading, status } = useQuery({
    queryKey: ['queryGetTotalLeaderBoard', fns],
    queryFn: async () => {
      const fn = httpsCallable(fns, 'getTotalLeaderBoard')
      const res = await fn()
      return res.data
    },
  })
  return {
    data,
    error,
    isError,
    isLoading,
    status,
  }
}
