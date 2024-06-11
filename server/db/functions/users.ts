import connection from "../connection"

const db = connection

export function getUserByAuthId(authId: string | undefined) {
  return db('users').where('auth0_id', authId).first()
}