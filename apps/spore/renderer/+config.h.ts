import type { Config } from 'vike/types'
import vikeReact from 'vike-react/config'
import vikeReactQuery from 'vike-react-query/config'

// https://vike.dev/config
export default {
  /* To enable Client-side Routing:
  clientRouting: true,
  // !! WARNING !! Before doing so, read https://vike.dev/clientRouting */
  clientRouting: true,
  meta: {
    renderMode: {
      env: { config: true },
      effect({ configDefinedAt, configValue }) {
        let env: ConfigEnv | undefined
        if (configValue === 'HTML') env = { server: true }
        if (configValue === 'SPA') env = { client: true }
        if (configValue === 'SSR') env = { server: true, client: true }
        if (!env)
          throw new Error(
            `${configDefinedAt} should be 'SSR', 'SPA', or 'HTML'`
          )
        return {
          meta: {
            Page: { env },
          },
        }
      },
    },
  },
  // See https://vike.dev/data-fetching
  passToClient: ['pageProps'],
  extends: [vikeReact, vikeReactQuery],
} satisfies Config
