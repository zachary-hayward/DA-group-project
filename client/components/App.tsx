import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import LandingPage from './LandingPage'

function App() {
  return (
    <>
      <IfAuthenticated>
        <Nav />
        <Outlet />
        <Footer />
      </IfAuthenticated>
      <IfNotAuthenticated>
        <LandingPage/>
      </IfNotAuthenticated>
    </>
  )
}

export default App
