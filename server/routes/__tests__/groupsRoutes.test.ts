import {
  it,
  describe,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
  vi,
} from 'vitest'
import connection from '../../db/connection'
import server from '../../server'
import * as db from '../../db/functions/groups'
import request from 'supertest'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

vi.mock('../../db/functions/groups')

const fakeGroups = [
  { id: 1, name: 'eli', image: 'test.png' },
  { id: 2, name: 'eli', image: 'test.png' },
  { id: 3, name: 'eli', image: 'test.png' },
]

describe('returns correct status code', () => {
  it('correct url returns 200', async () => {
    // ARRANGE
    vi.mocked(db.getAllGroups).mockResolvedValue(fakeGroups)
    // ACT
    const res = await request(server).get('/api/v1/groups')
    // ASSERT
    expect(res.status).toBe(200)
  })
  it('incorrect url returns 404', async () => {
    // ARRANGE
    vi.mocked(db.getAllGroups).mockResolvedValue(fakeGroups)
    // ACT
    const res = await request(server).get('/wrongurl')
    // ASSERT
    expect(res.status).toBe(404)
  })
  it('rejected value returns 500', async () => {
    // ARRANGE
    vi.mocked(db.getAllGroups).mockRejectedValue(fakeGroups)
    // ACT
    const res = await request(server).get('/api/v1/groups')
    // ASSERT
    expect(res.status).toBe(500)
  })
})

afterAll(async () => {
  await connection.destroy()
})
