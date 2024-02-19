import React from 'react'
import { PageContextProvider } from '~/renderer/usePageContext'
import type { PageContext } from 'vike/types'
import '~/renderer/global.css'
import NavMenu from '~/components/NavMenu'
import { ChevronLeft } from 'lucide-react'

export { PageShell, FullLayout, BaseLayout }

function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode
  pageContext: PageContext
}) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        {children}
      </PageContextProvider>
    </React.StrictMode>
  )
}

type PageHeaderProps = {
  title?: string
  backUrl?: string
}

type BaseLayoutProps = PageHeaderProps & {
  children: React.ReactNode
  hideNav?: boolean
  backUrl?: string
}

function BaseLayout({
  title,
  hideNav = false,
  children,
  backUrl = '',
}: BaseLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNav && <NavMenu />}
      <PageHeader title={title} backUrl={backUrl} />
      <main className="flex-grow">{children}</main>
    </div>
  )
}

function PageHeader({ title, backUrl }: PageHeaderProps) {
  return title ? (
    <div className="bg-smoke opacity-95 backdrop-blur z-30 flex items-center h-14 sticky top-0 sm:relative sm:top-auto sm:h-60 w-full px-4 border-b border-piano">
      <div className="w-6">
        {backUrl && (
          <a
            type="button"
            className="bg-samon rounded-full btn flex sm:hidden w-6 h-6"
            href={backUrl}
          >
            <ChevronLeft />
          </a>
        )}
      </div>
      <div className="flex-1 text-center lg:text-left lg:container lg:max-w-md lg:mx-auto sm:mt-20 lg:mt-0">
        {title && <h1 className="font-title text-xl sm:text-3xl">{title}</h1>}
      </div>
      <div className="w-6 flex sm:hidden" />
    </div>
  ) : null
}

function FullLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
    </div>
  )
}
