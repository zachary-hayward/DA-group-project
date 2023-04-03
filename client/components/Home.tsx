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

  return <div>Home</div>
}
