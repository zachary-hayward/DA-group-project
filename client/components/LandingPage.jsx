import React from 'react'

function LandingPage() {
 
  return (
    <>
        <div className="h-screen">
            <div className="w-full h-full bg-no-repeat bg-cover bg-center" style={{backgroundImage: `url(/images/hero/hero-2.png)`}}>
                <div className="deconstructed flex items-center max-w-fit mx-auto">
                    Kes-Ke-Say
                    <div>Kes-Ke-Say</div>
                    <div>Kes-Ke-Say</div>
                    <div>Kes-Ke-Say</div>
                    <div>Kes-Ke-Say</div>
                </div>
                <button className="btn-blue flex items-center max-w-fit mx-auto">Sign Up</button>
            </div>
        </div>
    </>
  )
}

export default LandingPage