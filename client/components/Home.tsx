import { useNavigate } from 'react-router'
import { useUser } from '../hooks/useUser.ts'
import { useAuth0 } from '@auth0/auth0-react'

export default function Home() {
  const navigate = useNavigate()
  const {user} = useAuth0()


  const {data, isLoading, isError} = useUser(user)//here lives jwt magic)


  if (isLoading) return <span>Loading...</span>

  if (isError)  return <span>Issue trying to retrieve user</span>

  if (!data.user) navigate('/register')

  if (data) console.log('Confirmed user:',data) //yay, confirmed user, i think

  return <div>Home</div>
}
