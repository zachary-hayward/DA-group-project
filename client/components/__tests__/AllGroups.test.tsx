// @vitest-environment jsdom
import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import nock from 'nock'

import { renderRoute } from '../../test-utils.tsx'

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
