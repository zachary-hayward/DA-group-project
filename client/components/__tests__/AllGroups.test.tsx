// @vitest-environment jsdom
import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import nock from 'nock'

import { renderRoute } from '../../test-utils.tsx'
import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react'
import { getUser } from '../../apis/user.ts'
import { User } from '../../../models/user.ts'

vi.mock('@auth0/auth0-react')
vi.mock('../../apis/user')

const useAuth0Mock = vi.mocked(useAuth0)

beforeEach(async () => {
  useAuth0Mock.mockReturnValue({
    isAuthenticated: true,
    user: { sub: 'auth0|123' },
    logout: vi.fn(),
    loginWithRedirect: vi.fn(),
  } as unknown as Auth0ContextInterface<User>)
  vi.mocked(getUser).mockResolvedValue({
    user: {
      id: 1,
      auth0Id: 'auth0|123',
      username: 'paige',
      fullName: 'Paige Turner',
      location: 'Auckland',
      image: 'ava-03.png',
    },
  })
})

beforeAll(() => {
  nock.disableNetConnect()
})

const fakeGroups = [
  { id: 1, name: 'eli', image: 'test.png' },
  { id: 2, name: 'jimmy', image: 'test.png' },
  { id: 3, name: 'krenko', image: 'test.png' },
]

describe('<AllGroups />', () => {
  it('should render a loading indicator', async () => {
    // Arrange
    nock('http://localhost:3000').get(`/api/v1/groups`).reply(200, fakeGroups)

    // Act
    const screen = renderRoute('/groups')

    // Assert
    const loading = screen.getByText('Loading...')
    expect(loading).toBeVisible()
    // ! we could waitFor this, but it's not something that's
    //   user visible so I don't care about testing it
    // expect(scope.isDone()).toBe(true)
  })

  it('should render a group name', async () => {
    // Arrange
    const scope = nock(document.baseURI)
      .get(`/api/v1/groups`)
      .reply(200, fakeGroups)

    // Act
    const screen = renderRoute('/groups')

    // Assertt
    const name = await screen.findByText('eli')
    expect(name).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})

afterEach(() => nock.cleanAll())
