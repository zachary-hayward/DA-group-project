import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import { routes } from './routes'

// import './styles/index.css'

const queryClient = new QueryClient()
export const router = createBrowserRouter(routes)

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="joelcallan.au.auth0.com"
      clientId="KrVMkEZiM3xB4q7VKRGcmjF1QMBgOVEH"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://keskesey/api',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})
