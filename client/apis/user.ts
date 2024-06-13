import request from 'superagent'
import { User, UserData } from '../../models/user'

const rootURL = new URL(`/api/v1`, document.baseURI).toString()

export async function getUser(token: string): Promise<{ user: User }> {
  return request
    .get(`${rootURL}/users/checkRegistered`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
}

interface AddUserFunction {
  userData: UserData
  token: string
}

export async function addUser({ userData, token }: AddUserFunction) {
  return await request
    .post(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send({ userData })
    .then((res) => res)
}

export async function editUser({ user, token }: { user: User; token: string }) {
  return await request
    .patch(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send({ user })
    .then((res) => res)
}

export async function getUserByUsername({
  username,
  token,
}: {
  username: string
  token: string
}) {
  return await request
    .get(`${rootURL}/profiles/${username}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
}
