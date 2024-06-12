import { it, expect, describe, vi, afterAll, beforeAll } from 'vitest'
import request from 'supertest'

import * as usersDb from '../../db/functions/users'
import server from '../../server.ts'
import checkJwt, { JwtRequest } from '../../auth0.ts'
import { Request, Response, NextFunction } from 'express'

vi.mock('../../db/functions/users')
vi.mock('../../auth0.ts')

const mockUsers = [
  {
    id: 1,
    auth0_id: 'auth0|123',
    username: 'paige',
    full_name: 'Paige Turner',
    location: 'Auckland',
    image: 'ava-03.png',
  },
  {
    id: 2,
    auth0_id: 'auth0|234',
    username: 'ida',
    full_name: 'Ida Dapizza',
    location: 'Auckland',
    image: 'ava-02.png',
  },
]

const mockAuthenticatedUser = {
  id: 'auth0|123',
}

beforeAll(() => {
  vi.mocked(checkJwt).mockImplementation(
    async (req: JwtRequest, res: Response, next: NextFunction) => {
      req.auth = {
        sub: mockAuthenticatedUser.id,
      }
      next()
    },
  )
})

afterAll(() => {
  vi.restoreAllMocks()
})

describe('GET api/v1/users/checkAuth', () => {
  it('should return a user, if one matches', async () => {
    vi.mocked(usersDb.getUserByAuthId).mockResolvedValue(mockUsers[0])

    const res = await request(server).get('/api/v1/users/checkAuth')

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchInlineSnapshot(`
      {
        "user": {
          "auth0_id": "auth0|123",
          "full_name": "Paige Turner",
          "id": 1,
          "image": "ava-03.png",
          "location": "Auckland",
          "username": "paige",
        },
      }
    `)
  })

  it('should return a status 500 if an error occurs', async () => {
    vi.mocked(usersDb.getUserByAuthId).mockRejectedValue('fake')
    const res = await request(server).get('/api/v1/users/checkAuth')

    expect(res.statusCode).toBe(500)
  })
})

describe('POST api/v1/users', () => {
  it('should add a user', async () => {
    const newUser = {
      userData: {
        auth0Id: 'auth0|232321',
        username: 'fake',
        fullName: 'fake user',
        image: 'ava-09.png',
        location: 'the moon',
      },
    }
    vi.mocked(usersDb.addUser).mockResolvedValue({ id: 3 })

    const addUserSpy = vi.spyOn(usersDb, 'addUser')

    const res = await request(server)
      .post('/api/v1/users')
      .set('Authorization', 'Bearer mock-token')
      .send(newUser)

    expect(res.statusCode).toBe(201)
    expect(addUserSpy).toHaveBeenLastCalledWith(newUser.userData)
    expect(res.body).toStrictEqual({ location: '/api/v1/users/3' })
  })

  it('should return a 500 if there is an error', async () => {
    vi.mocked(usersDb.addUser).mockRejectedValue('fake')

    const res = await request(server)
      .post('/api/v1/users')
      .set('Authorization', 'Bearer mock-token')
      .send({})
    expect(res.statusCode).toBe(500)
  })
})
