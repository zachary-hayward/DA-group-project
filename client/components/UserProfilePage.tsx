import { useState } from 'react'
import { useEditUser, useUserByUsername } from '../hooks/user'
import { useParams } from 'react-router-dom'
import UserProfileForm from './UserProfileForm'
import { useAuth0 } from '@auth0/auth0-react'
import { UserData } from '../../models/user'

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const { user, getAccessTokenSilently } = useAuth0()
  const params = useParams()
  const username = params.username ?? 'but how else could you get here'

  const { data, isLoading, isError } = useUserByUsername(username)
  const editUser = useEditUser()

  const handleEdit = () => {
    setIsEditing(() => true)
  }

  const handleSubmit = async (userData: UserData) => {
    const token = await getAccessTokenSilently()
    await editUser.mutateAsync({
      user: { ...userData, auth0Id: user?.sub ?? '', id: data.user.id },
      token,
    })
    setIsEditing(() => false)
  }

  if (isLoading) {
    return <p>Baguettes Baking...</p>
  }

  if (isError || !data) {
    return <p>Baguettes Burned!</p>
  }

  return (
    <>
      {isEditing ? (
        <div className="md:border md:border-2 md:border-black md:bg-kks-grey sm:w-[380px] p-2 mx-auto">
          <UserProfileForm
            onSubmit={handleSubmit}
            auth0Id={''}
            username={data.user.username}
            fullName={data.user.fullName}
            location={data.user.location}
            image={data.user.image}
          />
        </div>
      ) : (
        <>
          <div className="space-y-16 justify-items-center">
            <img
              className="max-w-fit "
              src={`/images/avatars/${data.user.image}`}
              alt={`Avatar number ${data.user.image}`}
            />
            <div className="flex gap-2">
              <h2>{data.user.username}</h2>
            </div>
            <div className="flex gap-2">
              <h2>{data.user.fullName}</h2>
            </div>
            <div className="flex gap-2">
              <h2>{data.user.location}</h2>
            </div>
          </div>
          {data.user.auth0Id === user?.sub ? (
            <>
              {' '}
              <button
                className="btn-blue px-8 mx-8"
                data-testid="edit-button"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  )
}
