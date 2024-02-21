// https://vike.dev/onRenderClient
export { onRenderClient }

import { createRoot, hydrateRoot } from 'react-dom/client'
import { PageShell } from '~/renderer/PageShell'
import type { OnRenderClientAsync } from 'vike/types'

// This onRenderClient() hook only supports SSR, see https://vike.dev/render-modes for how to modify onRenderClient()
// to support SPA
let root: Root

const onRenderClient: OnRenderClientAsync = async (
  pageContext
): ReturnType<OnRenderClientAsync> => {
  const { Page, data, pageProps } = pageContext
  if (!Page)
    throw new Error(
      'Client-side render() hook expects pageContext.Page to be defined'
    )
  const rootEl = document.getElementById('react-root')
  if (!rootEl) {
    throw new Error('DOM element #react-root not found')
  }

  const page = (
    <PageShell pageContext={pageContext} data={data}>
      <Page {...pageProps} />
    </PageShell>
  )

  // SPA
  if (rootEl.innerHTML === '' || !pageContext.isHydration) {
    if (!root) {
      root = createRoot(rootEl)
    }
    root.render(page)
    // SSR
  } else {
    root = hydrateRoot(rootEl, page)
  }

  root.render(
    <PageShell pageContext={pageContext} data={data}>
      <Page {...pageProps} />
    </PageShell>
  )
}
