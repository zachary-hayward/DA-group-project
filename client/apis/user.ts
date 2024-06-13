import request from 'superagent'
import { User, UserData } from '../../models/user'

const rootURL = new URL(`api/v1/users`, document.baseURI).toString()

export async function getUser(token: string): Promise<{ user: User }> {
  // const tvalue = await token

  return request
    .get(`${rootURL}/checkRegistered`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
}

interface AddUserFunction {
  userData: UserData
  token: string
}

export async function addUser({ userData, token }: AddUserFunction) {
  return await request
    .post(`${rootURL}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ userData })
    .then((res) => res)
}
