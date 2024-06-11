import Croissants from './Croissants'
import styles from './LandingPage.module.css'
import { useAuth0 } from '@auth0/auth0-react'

function LandingPage() {

  const { loginWithRedirect } = useAuth0()

  const handleSignUp = () => {
    loginWithRedirect()
    // loginWithRedirect({authorizationParams: {
    //   redirect_uri: `${window.location.origin}/register`
    // }})
  }
  
  const handleLogIn = () => {
    loginWithRedirect()
  }

  return (
    <>
      <div className="absolute h-screen w-screen">
        <Croissants />
      </div>
      <div className="h-screen">
        <div className={`${styles.deconstructed} ${styles.centered}`}>
          Kes-Ke-Say
          <div>Kes-Ke-Say</div>
          <div>Kes-Ke-Say</div>
          <div>Kes-Ke-Say</div>
          <div>Kes-Ke-Say</div>
        </div>
        <div className="flex justify-center relative">
          <button className="btn-blue px-8 mx-8" onClick={handleSignUp}>Sign Up</button>
          <button className="btn-blue px-8 mx-8" onClick={handleLogIn}>Log In</button>
        </div>
      </div>
    </>
  )
}

export default LandingPage
