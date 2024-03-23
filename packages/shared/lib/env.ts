const apiURL = import.meta.env.VITE_API_COSMOS ?? 'http://localhost:1317'
const rpcURL = import.meta.env.VITE_WS_TENDERMINT ?? 'http://localhost:26657'
const prefix = import.meta.env.VITE_ADDRESS_PREFIX ?? 'mycel'
const firebaseAPIKey = import.meta.env.FIREBASE_API_KEY ?? ''
const firebaseProjectId = import.meta.env.FIREBASE_PROJECT_ID ?? ''

export const env = {
  apiURL,
  rpcURL,
  prefix,
  firebaseAPIKey,
  firebaseProjectId,
}
