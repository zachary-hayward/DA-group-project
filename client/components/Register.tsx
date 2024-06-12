import { useState } from 'react'
import { UserData } from '../../models/user'
import { useUser } from '../hooks/user'
import UserProfileForm from './UserProfileForm'
import { useAuth0 } from '@auth0/auth0-react'

export default function Register() {
  const [alert, setAlert] = useState(false)
  const [alertData, setAlertData] = useState({
    text: 'Now get out there and drink some wine',
    messageBody: 'Profile Updated!',
    colour: 'green',
  })

  const { user, getAccessTokenSilently } = useAuth0()
  const users = useUser()

  const handleAdd = async (userData: UserData) => {
    //mutate here
    const token = await getAccessTokenSilently()
    try {
      users.add.mutate({ userData, token })
      setAlertData((prev) => ({
        ...prev,
        messageBody: 'Now get out there and drink some wine',
        text: 'Profile Updated!',
        colour: 'green',
      }))

      setAlert(() => true)
    } catch (error) {
      setAlertData((prev) => ({
        ...prev,
        messageBody: 'Notify Jean Pierre!',
        text: 'Something Went Wrong!',
        colour: 'red',
      }))
      setAlert(() => true)
    } finally {
      setTimeout(() => {
        setAlert(() => false)
      }, 2000)
    }
  }

  //now need to notify there was update

  if (users.isLoading) {
    return <span>Loading...</span>
  }
  if (users.isError)
    return <span>Issue trying to retrieve user {`${users.error}`}</span>

  if (!users.data) {
    return <p>No Data Found</p>
  }

  return (
    <div className="border-2 border-black w-3/5 mx-auto pt-2 pb-2">
      <div className="flex flex-column justify-center">
        <p className="text-center pt-2">
          Welcome! Give Jean-Pierre your details. It&apos;l be great!
        </p>
        <button className="btn-blue px-2 mx-6">View All Profiles</button>
      </div>
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
      <div
        className={`flex ${alertData.colour === 'green' ? 'bg-green-100' : 'bg-red-100'} rounded-lg p-4 mb-4 text-sm ${alertData.colour === 'green' ? 'text-green-700' : 'text-red-700'} ${alert ? '' : 'hidden'}`}
        role="alert"
      >
        <svg
          className="w-5 h-5 inline mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <div>
          <span className="font-medium">{alertData.text}</span>{' '}
          {alertData.messageBody}
        </div>
      </div>
    </div>
  )
}
