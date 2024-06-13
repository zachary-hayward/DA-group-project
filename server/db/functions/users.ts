import { User, UserData, UserSnakeCase } from '../../../models/user'
import connection from '../connection'

const db = connection
const cols = [
  'auth0_id as auth0Id',
  'username',
  'full_name as fullName',
  'location',
  'image',
  'id',
]

export async function getUserByAuthId(authId: string | undefined) {
  return await db('users').where('auth0_id', authId).first()
}

export async function addUser(data: UserData): Promise<{ id: number }> {
  const snakeCase: UserSnakeCase = {
    auth0_id: data.auth0Id,
    username: data.username ?? 'User',
    full_name: data.fullName ?? 'New User',
    location: data.location ?? 'Earth',
    image: data.image ?? 'ava-01.png',
  }

  const matchingUser = await db('users')
    .where({ username: data.username })
    .first()

  if (!matchingUser) {
    return await db('users').insert(snakeCase).returning('id')
  }
  return { id: -1 } //-1 is a failure state
}

export async function editUser(user: User) {
  const snakeCase: UserSnakeCase = {
    auth0_id: user.auth0Id,
    username: user.username,
    full_name: user.fullName,
    location: user.location,
    image: user.image,
    id: user.id,
  }
  return await db('users')
    .where({ auth0_id: user.auth0Id })
    .first()
    .update(snakeCase)
}

export async function getUserByUsername(username: string): Promise<User> {
  return await db('users').where({ username }).first().select(cols)
}
