// `usePageContext` allows us to access `pageContext` in any React component.
// See https://vike.dev/pageContext-anywhere

import React, { useContext } from 'react'
import type { PageContext } from 'vike/types'

export { PageContextProvider }
// eslint-disable-next-line react-refresh/only-export-components
export { usePageContext }

const Context = React.createContext<PageContext>(
  undefined as unknown as PageContext
)

function PageContextProvider({
  pageContext,
  children,
}: {
  pageContext: PageContext
  children: React.ReactNode
}) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>
}

function usePageContext() {
  const pageContext = useContext(Context)
  if (!pageContext)
    throw new Error(
      '<PageContextProvider> is needed for being able to use usePageContext()'
    )
  return pageContext
}
