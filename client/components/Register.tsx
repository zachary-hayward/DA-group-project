import { useEffect, useState } from 'react'
import { UserData } from '../../models/user'
import { useAddUser } from '../hooks/user'
import UserProfileForm from './UserProfileForm'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const successMessage = {
  text: 'Now get out there and drink some wine',
  messageBody: 'Profile Updated!',
  colour: 'green',
}
const errorMessage = {
  messageBody: 'Notify Jean Pierre!',
  text: 'Something Went Wrong!',
  colour: 'red',
}
const duplicateNameMessage = {
  messageBody: 'Be more original!',
  text: 'Username already in use!',
  colour: 'orange',
}

export default function Register() {
  const [alert, setAlert] = useState(false)
  const [alertData, setAlertData] = useState({
    text: '',
    messageBody: '',
    colour: '',
  })

  const { user, getAccessTokenSilently } = useAuth0()
  const users = useAddUser()

  const navigate = useNavigate()

  const handleAdd = async (userData: UserData) => {
    //mutate here
    const token = await getAccessTokenSilently()
    let v
    try {
      v = await users.mutateAsync({ userData, token })
      if (v?.status === 500) {
        setAlertData(() => errorMessage)
      } else if (v.status === 201) {
        setAlertData(() => successMessage)
      } else if (v.body.status === 409) {
        setAlertData(() => duplicateNameMessage)
      }
      setAlert(() => true)
    } catch (error: unknown) {
      setAlertData(() => errorMessage)

      setAlert(() => true)
    } finally {
      setTimeout(() => {
        setAlert(() => false);
      }, 2000)
    }
  }

  //This is screwy because of the navigate('/register') in Home, I think. Pretty sure it goes to / then back to /register
  useEffect(() => {
    if (!alert && alertData.messageBody === successMessage.messageBody) {
      navigate('/login') 
    }
  }, [alert, alertData])

  if (!user) {
    return <p>No User Found</p>
  }

  return (
    <div className="relative flex flex-grow justify-center">
      <div className="absolute inset-0 z-0 bg-kks-wine w-full"></div>
      <div className="absolute inset-0 z-0 bg-kks-blue w-1/2"></div>
      <div className="relative container z-10 bg-white flex flex-col space-y-2 sm:space-y-4 lg:space-y-8 xl:space-y-12 w-full sm:max-w-[640px] border border-1 border-black">
        <div className="flex flex-row-reverse">
          <button className="btn-blue bg-kks-blue m-2 ">
            View All Profiles
          </button>
        </div>
        <p className="hidden md:block text-center">
          Welcome! Give Jean-Pierre your details.
          <br />
          It&apos;ll be great!
        </p>
        <div className="md:border md:border-2 md:border-black md:bg-kks-grey sm:w-[380px] p-2 mx-auto">
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
        </div>
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
    </div>
  )
}
