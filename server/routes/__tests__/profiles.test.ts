import { it, expect, describe, vi, afterAll, beforeAll } from 'vitest'
import request from 'supertest'
import * as usersDb from '../../db/functions/users'
import server from '../../server.ts'
import checkJwt, { JwtRequest } from '../../auth0.ts'
import { Response, NextFunction } from 'express'

vi.mock('../../db/functions/users')
vi.mock('../../auth0.ts')

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

describe('GET api/v1/profiles/username', () => {
  it('returns a 401 status on lack of auth', async () => {
    vi.mocked(checkJwt).mockImplementation(
      async (req: JwtRequest, res: Response, next: NextFunction) => {
        next()
      },
    )

    const result = await request(server).get('/api/v1/profiles/paige')

    expect(result.statusCode).toBe(401)
  })
})
