//@vitest-environment jsdom
import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { within } from '@testing-library/react/pure'
import nock from 'nock'

import { renderRoute, renderComponent } from '../../test-utils.tsx'
import AllGroups from '../AllGroups.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

beforeAll(() => {
  nock.disableNetConnect()
})

const fakeGroups = [
  { id: 1, name: 'eli', image: 'test.png' },
  { id: 2, name: 'eli', image: 'test.png' },
  { id: 3, name: 'eli', image: 'test.png' },
]

describe('<AllGroups />', () => {
  it('should render a loading indicator', async () => {
    // Arrange
    const scope = nock('http://localhost')
      .get(`/api/v1/groups`)
      .reply(200, fakeGroups)

    // Act
    const screen = renderRoute('/groups')

    // Assert
    const loading = screen.getByText('Loading...')
    expect(loading).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })

  it('should render a group name', async () => {
    // Arrange
    const scope = nock('http://localhost')
      .persist()
      .get(`/api/v1/groups`)
      .reply(200, fakeGroups)

    // Act
    const queryClient = new QueryClient()
    const screen = renderComponent(
      <QueryClientProvider client={queryClient}>
        <AllGroups />
      </QueryClientProvider>,
    )
    // const screen = renderRoute('/groups')

    // Assert
    const name = await screen.findByText('eli')
    expect(name).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})

afterEach(() => nock.cleanAll())
