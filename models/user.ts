export interface UserSnakeCase {
  id?: number
  auth0_id: string
  username: string
  full_name: string
  location: string
  image: string
}

export interface User extends UserData {
  id: number
}

export interface UserData {
  auth0Id: string
  username: string
  fullName: string
  location: string
  image: string
}
