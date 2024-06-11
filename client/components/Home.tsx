import { useNavigate } from 'react-router'
import { useUser } from '../hooks/user.ts'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const { user, getAccessTokenSilently } = useAuth0()

  const { data, isLoading, isError, error } = useUser() //here lives jwt magic)

  useEffect(() => {
    if (!isLoading && !isError && data && !data.user) {
      console.log(data)
      navigate('/register')
    }
  }, [data, user, navigate])

  if (isLoading) return <span>Loading...</span>

  if (isError) return <span>Issue trying to retrieve user {`${error}`}</span>

  return (
    <>
      <p>Home</p>
    </>
  )
}
