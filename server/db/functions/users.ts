import { User, UserData, UserSnakeCase } from '../../../models/user'
import connection from '../connection'

const db = connection

export async function getUserByAuthId(authId: string | undefined) {
  return await db('users').where('auth0_id', authId).first()
}

export async function addUser(data: UserData) {
  console.log(data)
  const snakeCase: UserSnakeCase = {
    auth0_id: data.auth0Id,
    username: data.username ?? 'User',
    full_name: data.fullName ?? 'New User',
    location: data.location ?? 'Earth',
    image: data.image ?? 'ava-01.png',
  }
  return await db('users').insert(snakeCase)
}

export async function editUser(user: User) {
  const snakeCase: UserSnakeCase = {
    auth0_id: user.auth0Id,
    username: user.username,
    full_name: user.fullName,
    location: user.location,
    image: user.image,
  }
  return await db('users')
    .where({ auth0_id: user.auth0Id })
    .first()
    .update(snakeCase)
}
