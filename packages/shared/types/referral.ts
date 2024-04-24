export interface User {
  id?: string
  address?: string
  teamId?: string
  issuedReferralCodes?: string[]
  redeemedReferralCode?: string
  invitedUserCount?: number
}

export interface Team {
  id?: string
  name?: string
  captainUserId?: string
  memberUserIds?: string[]
}

export interface ReferralCode {
  id?: string
  issuerUserId?: string
  teamId?: string
  redeemedUserIds?: string[]
  maxRedemptions?: number
  active?: boolean
}
export interface LeaderBoard {
  rank?: number
  userId: string
  userAddress?: string
  evmAddress?: string
  totalPoints: number
  countIssuedReferralCodes?: number
}

export interface TotalLeaderBoard {
  teamId: string
  teamName: string
  totalPoints: number
}
