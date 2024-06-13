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

  const { data, isFetching, isLoading, isError } = useUserByUsername(username)
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

  if (isFetching || isLoading) {
    return <p>Baguettes Baking...</p>
  }

  if (isError || !data) {
    return <p>Baguettes Burned!</p>
  }

  return (
    <>
      <div className="relative flex flex-grow justify-center">
        <div className="absolute inset-0 z-0 bg-kks-wine w-full"></div>
        <div className="absolute inset-0 z-0 bg-kks-blue w-1/2"></div>
        <div className="relative container z-10 bg-white flex flex-col w-full sm:max-w-[640px] md:max-w-[800px] lg:max-w-[960px] border border-1 border-black">
          <div className="absolute inset-0 z-0 bg-kks-wine w-full sm:hidden"></div>
          <div className="absolute inset-0 z-0 bg-white w-2/3 sm:hidden"></div>
          <div className="absolute inset-0 z-0 bg-kks-blue w-1/3 sm:hidden"></div>
          <div className="flex flex-grow flex-col z-10">
            <div className='flex flex-row-reverse gap-3 p-1'>
              <button className='btn-blue bg-kks-blue'>View All Profiles</button>
              <button className='btn-blue bg-kks-blue'>View All Posts by User</button>
            </div>
            {isEditing ? (
              <div className="flex md:border md:border-2 md:border-black md:bg-kks-grey sm:w-[380px] p-2 mx-auto">
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
                <div className="flex flex-grow flex-col border sm:border-1 md:border-2 border-black w-4/5 max-w-[800px] mx-auto bg-white">
                  <div className="flex space-y-16 justify-center">
                    <img
                      className="max-w-fit "
                      src={`/images/avatars/${data.user.image}`}
                      alt={`Avatar number ${data.user.image}`}
                    />
                    <div className="flex flex-col gap-2">
                      <p>UserName: <strong>{data.user.username}</strong></p>
                      <p>FullName: <strong>{data.user.fullName}</strong></p>
                      <p>Location: <strong>{data.user.location}</strong></p>
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
                </div>
            )}
              </div>
            <br />
          </div>
        </div>
    </>
  )
}
