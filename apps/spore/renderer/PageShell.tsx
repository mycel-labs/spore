import React from 'react'
import { PageContextProvider } from '~/renderer/usePageContext'
import type { PageContext } from 'vike/types'
import '~/renderer/global.css'
import NavMenu from '~/components/NavMenu'
import { ToastContainer } from 'react-toastify'
import { Toaster } from '@/components/ui/sonner'
import Providers from '@/components/Providers'
import 'react-toastify/dist/ReactToastify.css'

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
      <ToastContainer newestOnTop />
      <PageContextProvider pageContext={pageContext}>
        {children}
      </PageContextProvider>
      <Toaster />
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

function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="sm:max-w-4xl mx-auto flex px-4 sm:px-6">
          <NavMenu />
          <div className="flex-1 sm:ml-72 pt-16 sm:pt-0">{children}</div>
        </div>
      </main>
    </div>
  )
}

function FullLayout({
  children,
}: {
  children: React.ReactNode
  hideNav?: boolean
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
    </div>
  )
}
