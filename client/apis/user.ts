import request from 'superagent'
import { User, UserData } from '../../models/user'

//for tests:
//const rootUrl = 'http://localhost/api/v1/users'
//for rendering server:
const rootUrl = '/api/v1/users'

export async function getUser(token: Promise<string>): Promise<{ user: User }> {
  const tvalue = await token

  return request
    .get(`${rootUrl}/checkAuth`)
    .set('Authorization', `Bearer ${tvalue}`)
    .then((res) => res.body)
}

interface AddUserFunction {
  userData: UserData
  token: string
}

export async function addUser({
  userData,
  token,
}: AddUserFunction): Promise<User> {
  return await request
    .post(`${rootUrl}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ userData })
    .then((res) => res.body.user)
}
