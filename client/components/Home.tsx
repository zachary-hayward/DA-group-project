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
        <div className="relative container z-10 bg-white flex flex-col space-y-2 sm:space-y-4 lg:space-y-8 xl:space-y-12 w-full sm:max-w-[640px] border border-1 border-black">
          <div className="flex flex-row-reverse">
            <button className="btn-blue bg-kks-blue m-2 ">View All Profiles</button>
          </div>
        </div>
      </div>
    </>
  )
}
