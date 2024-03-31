import { initializeApp } from 'firebase/app'
import { Functions, getFunctions, httpsCallable } from 'firebase/functions'
import { env } from '../lib/env'

const firebaseConfig = {
  projectId: env.firebaseProjectId,
  apiKey: env.firebaseAPIKey,
}

const app = initializeApp(firebaseConfig)
const fns: Functions = getFunctions(app)

const callFn = (fn: string): Function => httpsCallable(fns, fn)

export { app, callFn }
