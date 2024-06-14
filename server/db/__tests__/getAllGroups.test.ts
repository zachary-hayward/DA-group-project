import { it, describe, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import * as db from '../functions/groups'
import connection from '../connection'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

const fakeGroups = [
  { id: 1, name: 'eli', image: 'test.png' },
  { id: 2, name: 'eli', image: 'test.png' },
  { id: 3, name: 'eli', image: 'test.png' },
]
describe('getAllGroups', () => {
  it('is defined', async () => {
    //Arrange
    //Act
    const groups = await db.getAllGroups()
    //Assert
    expect(groups).not.toBeUndefined()
  })

  it('is an array', async () => {
    //Arrange

    //Act
    const groups = await db.getAllGroups()

    //Assert
    expect(groups).toBeInstanceOf(Array)
  })

  it('is the correct length', async () => {
    //Arrange

    //Act
    const groups = await db.getAllGroups()
    //Assert
    expect(groups.length).toBe(fakeGroups.length)
  })
})

afterAll(async () => {
  await connection.destroy()
})
