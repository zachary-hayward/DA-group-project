import React from 'react'


function MockHomepage() {
 
  return (
    <>
    <div className="h-screen" data-testid="homepage-background-container">
      <div className="w-full h-full bg-no-repeat bg-cover bg-center" style={{backgroundImage: `url(/images/hero/hero-1.png)`}} data-testid="homepage-background-image">
          <div className="ml-40 w-1/3">
            <h1 className="bg-red-900 p-4" data-testid="homepage-title">Kes-Ke-Say</h1>
            <h2 data-testid="homepage-subheading">This is a test</h2>
            <p data-testid="homepage-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ex velit, varius vel augue ac, bibendum iaculis ante. Vivamus feugiat scelerisque nulla vitae aliquet. Fusce quis ultrices est, sit amet luctus nunc. Ut varius sed lorem fringilla efficitur. Curabitur quam risus, interdum sed neque vel, laoreet fermentum mi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis quis posuere sapien. Donec nec elementum metus, quis placerat massa. Nunc in bibendum tellus. Integer vel purus dui. Morbi et ullamcorper eros. Etiam id dolor lacus.</p>
            <button className="btn-blue" data-testid="homepage-button">This is a test too</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MockHomepage