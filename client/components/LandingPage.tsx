import Croissants from './Croissants'
import styles from './LandingPage.module.css'

function LandingPage() {
  return (
    <>
       <div className='absolute h-screen w-screen'>
          <Croissants />
      </div>
      <div className="h-screen">
        {/* <div
          className="w-full h-full bg-no-repeat bg-cover bg-center"
          // style={{ backgroundImage: `url(/images/hero/hero-2.png)` }}
        > */}
          <div className={`${styles.deconstructed} ${styles.centered}`}>
            Kes-Ke-Say
            <div>Kes-Ke-Say</div>
            <div>Kes-Ke-Say</div>
            <div>Kes-Ke-Say</div>
            <div>Kes-Ke-Say</div>
          </div>
          <div className="flex justify-center relative">
            <button className="btn-blue px-8 mx-8">Sign Up</button>
            <button className="btn-blue px-8 mx-8">Log In</button>
          </div>
        {/* </div> */}
      </div>
    </>
  )
}

export default LandingPage
