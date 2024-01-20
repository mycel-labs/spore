// https://vike.dev/onRenderHtml
export { onRenderHtml }

import ReactDOMServer from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import { PageShell } from '@/renderer/PageShell'
import logoUrl from '@/assets/logo.svg'
import appleTouchIconUrl from '@/assets/icons/apple-touch-icon-180x180.png'
import maskIconUrl from '@/assets/icons/maskable-icon-512x512.png'
import type { OnRenderHtmlAsync } from 'vike/types'

const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  let pageHtml
  if (!pageContext.Page) {
    // SPA
    pageHtml = ''
  } else {
    // SSR / HTML-only
    const { Page, pageProps } = pageContext
    if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined')
    const pageHtml = ReactDOMServer.renderToString(
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>
    )
  }

  // See https://vike.dev/head
  const { documentProps } = pageContext.exports
  const title = documentProps?.title || 'mycel.id'
  const desc = documentProps?.description || 'Get mycel.id, use anywhere'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="${appleTouchIconUrl}" sizes="180x180">
        <link rel="mask-icon" href="${maskIconUrl}" color="#ff8aa0">
        <meta name="theme-color" content="#ff8aa0">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inconsolata&family=Inter:wght@400;600;700&family=Paytone+One&display=swap" rel="stylesheet">
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    }
  }
}
