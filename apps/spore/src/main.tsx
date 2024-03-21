import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import Providers from '@/components/Providers'
import AppRouter from '~/AppRouter'
import { HelmetProvider } from 'react-helmet-async'

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <HelmetProvider>
        <Providers>
          <AppRouter />
        </Providers>
      </HelmetProvider>
    </StrictMode>
  )
}
