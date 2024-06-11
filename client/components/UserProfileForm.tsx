import { property } from 'three/examples/jsm/nodes/Nodes.js'
import { UserData } from '../../models/user'
import { ChangeEvent, FormEvent, useState } from 'react'

interface Props extends UserData {
  onSubmit: (_: UserData) => void
}

export default function UserProfileForm(props: Props) {
  const [formState, setFormState] = useState({
    username: props.username,
    fullName: props.fullName,
    location: props.location,
    image: props.image,
    auth0Id: props.auth0Id,
  })

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    props.onSubmit(formState)
    console.log('submitted')
  }

  const handleChange = (
    evt: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = evt.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="username">User Name</label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Enter a user name"
        value={formState.username}
        onChange={handleChange}
      />
      <label htmlFor="fullname">Full Name</label>
      <input
        type="text"
        name="fullName"
        id="fullName"
        placeholder="Enter your full name"
        value={formState.fullName}
        onChange={handleChange}
      />
      <label htmlFor="location">Location</label>
      <input
        type="text"
        name="location"
        id="location"
        placeholder="Enter your location"
        value={formState.location}
        onChange={handleChange}
      />
      //TODO:Avatar.tsx stuff
      <br />
      <button>Submit</button>
    </form>
  )
}
