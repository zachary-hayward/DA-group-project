import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import { routes } from './routes'

// import './styles/index.css'

const queryClient = new QueryClient()
export const router = createBrowserRouter(routes)


// const Auth0ProviderWithRedirectCallback = ({children, ...props}: PropsWithChildren<Auth0ProviderOptions>) => {
//   const navigate = useNavigate()
  // find if user exists from api call  
  // get 
//   const userExists = true
//   const onRedirectCallback = () => {
//     navigate(userExists ? '/': '/register')
//   }
//   return (
//     <Auth0Provider onRedirectCallback={onRedirectCallback}    
//       domain="joelcallan.au.auth0.com"
//       clientId="KrVMkEZiM3xB4q7VKRGcmjF1QMBgOVEH"    
//       authorizationParams={{
//         redirect_uri: window.location.origin,
//         audience: 'https://keskesey/api',
//       }}
//       {...props}
//       >{children}
//     </Auth0Provider>
//   )
// }
  //  <Auth0ProviderWithRedirectCallback>
  //  </Auth0ProviderWithRedirectCallback>



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
    </Auth0Provider>
  )
})
