import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function Home() {
  const navigate = useNavigate()
  const isAuth = true

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth, navigate])

  return (
    <>    
      <div className='relative flex flex-grow justify-center'>
        <div className='absolute inset-0 z-0 bg-kks-wine w-full'></div>
        <div className='absolute inset-0 z-0 bg-kks-blue w-1/2'></div>
        <div className="relative container z-10 bg-white flex flex-col w-full sm:max-w-[640px] md:max-w-[800px] lg:max-w-[960px] border border-1 border-black">
          <div className='absolute inset-0 z-0 bg-kks-wine w-full sm:hidden'></div>
          <div className='absolute inset-0 z-0 bg-white w-2/3 sm:hidden'></div>
          <div className='absolute inset-0 z-0 bg-kks-blue w-1/3 sm:hidden'></div>
          <div className='flex flex-grow flex-col z-10'>
            <div className="flex flex-row-reverse">
              <button className="btn-blue bg-kks-blue m-2 scale-75 sm:scale-100">Post</button>
            </div>
            <div className='flex flex-grow border sm:border-1 md:border-2 border-black w-4/5 max-w-[800px] mx-auto bg-white'>
              
            </div>

          </div>
          <br/>
        </div>
      </div>
    </>
  )
}
