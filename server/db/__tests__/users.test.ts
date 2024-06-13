import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../connection.js'
import * as userDb from '../functions/users.js'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => await connection.destroy())

describe('getUserByAuthId tests', () => {
  it('returns undefined if no user matches the id', async () => {
    const result = await userDb.getUserByAuthId('this token does not exist')

    expect(result).toBeUndefined()
  })

  it('return the correct user', async () => {
    const result = await userDb.getUserByAuthId('auth0|234')
    const expected = {
      id: 2,
      auth0_id: 'auth0|234',
      username: 'ida',
      full_name: 'Ida Dapizza',
      location: 'Auckland',
      image: 'ava-02.png',
    }

    expect(result).not.toBeUndefined()
    expect(result).toEqual(expected)
  })
})

describe('getUserByUsername tests', () => {
  it('returns a user by username', async () => {
    const result = await userDb.getUserByUsername('paige')

    expect(result).toMatchInlineSnapshot(`
      {
        "auth0Id": "auth0|123",
        "fullName": "Paige Turner",
        "id": 1,
        "image": "ava-03.png",
        "location": "Auckland",
        "username": "paige",
      }
    `)
  })
})

describe('addUser tests', () => {
  it('fails to add when matching username', async () => {
    const addNewUser = {
      auth0Id: 'auth0|92235',
      username: 'paige',
      fullName: 'jean pierre; not a real person',
      location: 'Not Christchurch',
      image: 'ava-13.png',
    }

    const { id } = await userDb.addUser(addNewUser)

    expect(id).toBe(-1)
  })
  it('adds a user', async () => {
    const toAdd = {
      auth0Id: 'auth0|987654',
      username: 'jean',
      fullName: 'jean pierre; a real person',
      location: 'Christchurch',
      image: 'ava-12.png',
    }

    await userDb.addUser(toAdd)
    const addedUser = await userDb.getUserByAuthId('auth0|987654')

    expect(addedUser).toMatchInlineSnapshot(`
      {
        "auth0_id": "auth0|987654",
        "full_name": "jean pierre; a real person",
        "id": 5,
        "image": "ava-12.png",
        "location": "Christchurch",
        "username": "jean",
      }
    `)
  })

  it('adds a user with default values', async () => {
    const toAdd = {
      auth0Id: 'auth0|987654',
      username: null,
      fullName: null,
      location: null,
      image: null,
    }
    await userDb.addUser(toAdd)
    const addedUser = await userDb.getUserByAuthId('auth0|987654')

    expect(addedUser).toMatchInlineSnapshot(`
      {
        "auth0_id": "auth0|987654",
        "full_name": "New User",
        "id": 6,
        "image": "ava-01.png",
        "location": "Earth",
        "username": "User",
      }
    `)
  })
})

describe('editUser tests', () => {
  it('edits a user', async () => {
    const editData = {
      id: 1,
      auth0Id: 'auth0|123',
      username: 'jeannie',
      fullName: 'jean pearson',
      location: 'Christchurch',
      image: 'ava-10.png',
    }
    const originalUser = await userDb.getUserByAuthId(editData.auth0Id)

    await userDb.editUser(editData)

    const updatedUser = await userDb.getUserByAuthId(editData.auth0Id)

    expect(originalUser).not.toEqual(updatedUser)
    expect(updatedUser).toMatchInlineSnapshot(`
      {
        "auth0_id": "auth0|123",
        "full_name": "jean pearson",
        "id": 1,
        "image": "ava-10.png",
        "location": "Christchurch",
        "username": "jeannie",
      }
    `)
  })
})
