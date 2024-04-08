// @ts-nocheck
let isDev = ''
let apiURL = ''
let rpcURL = ''
let prefix = ''
let firebaseAPIKey = ''
let firebaseProjectId = ''

const isNodeEnvironment = typeof process !== 'undefined'

if (isNodeEnvironment && !!process.env.NEXT_RUNTIME) {
  isDev = String(process.env.NODE_ENV !== 'production')
  apiURL = process.env.NEXT_PUBLIC_API_COSMOS ?? 'http://localhost:1317'
  rpcURL = process.env.NEXT_PUBLIC_WS_TENDERMINT ?? 'http://localhost:26657'
  prefix = process.env.NEXT_PUBLIC_ADDRESS_PREFIX ?? 'mycel'
  firebaseAPIKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? ''
  firebaseProjectId =
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'spore-testnet'
} else {
  isDev = import.meta.env.DEV
  apiURL = import.meta.env.VITE_API_COSMOS ?? 'http://localhost:1317'
  rpcURL = import.meta.env.VITE_WS_TENDERMINT ?? 'http://localhost:26657'
  prefix = import.meta.env.VITE_ADDRESS_PREFIX ?? 'mycel'
  firebaseAPIKey = import.meta.env.VITE_FIREBASE_API_KEY ?? ''
  firebaseProjectId =
    import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'spore-testnet'
}

export const env = {
  isDev,
  apiURL,
  rpcURL,
  prefix,
  firebaseAPIKey,
  firebaseProjectId,
}
