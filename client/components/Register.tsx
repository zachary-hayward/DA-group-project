import { UserData } from '../../models/user'
import { useUser } from '../hooks/user'
import UserProfileForm from './UserProfileForm'
import { useAuth0 } from '@auth0/auth0-react'

export default function Register() {
  const { user, getAccessTokenSilently } = useAuth0()
  const users = useUser()

  const handleAdd = async (userData: UserData) => {
    //mutate here
    const token = await getAccessTokenSilently()
    users.add.mutate({ userData, token })
  }

  if (users.isLoading) {
    return <span>Loading...</span>
  }
  if (users.isError)
    return <span>Issue trying to retrieve user {`${users.error}`}</span>

  if (!users.data) {
    return <p>No Data Found</p>
  }

  return (
    <>
      <p className='text-center pt-2'>Welcome! Lets give your details to Jean-Pierre. It&apos;l be great!</p>
      <UserProfileForm
        onSubmit={handleAdd}
        {...{
          auth0Id: user?.sub ?? '',
          username: '',
          fullName: '',
          location: '',
          image: '',
        }}
      />
    </>
  )
}
