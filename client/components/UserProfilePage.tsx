import { useState } from 'react'

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <div className="flex gap-2">
        <label htmlFor="username">User Name:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter a user name"
          value={formState.username}
          onChange={handleChange}
          className="border-2 border-black rounded"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="fullname">Full Name:</label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Enter your full name"
          value={formState.fullName}
          onChange={handleChange}
          className="border-2 border-black rounded"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="location">&nbsp;Location:</label>{' '}
        {/* &nbsp; How else do I get this to line up nicely :D */}
        <input
          type="text"
          name="location"
          id="location"
          value={formState.location}
          onChange={handleChange}
          className="border-2 border-black rounded"
        />
      </div>
      <div className="">
        <Avatar formImage={formState.image} handleChange={handleChange} />
      </div>
    </>
  )
}
