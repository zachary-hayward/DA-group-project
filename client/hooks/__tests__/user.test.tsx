// @vitest-environment jsdom
import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import * as auth0 from '@auth0/auth0-react'
import nock from 'nock'
import { renderRoute } from '../../test-utils.tsx'
import userEvent from '@testing-library/user-event'

vi.mock('@auth0/auth0-react')

beforeAll(() => nock.disableNetConnect())

afterEach(() => nock.cleanAll())

describe('user hook tests', () => {
  it('can fetch a user', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
      isAuthenticated: false,
      isLoading: false,
      user: { sub: '100%' },
    })

    nock(document.baseURI)
      .persist()
      .get('/api/v1/users/checkRegistered')
      .reply(200, {
        id: 1,
        auth0Id: 'auth0|123',
        username: 'paige',
        full_name: 'Paige turner',
        location: 'Auckland',
        image: 'ava-03.png',
      })
    const screen = renderRoute('/register')

    const paige = screen.findByText('paige')

    expect(paige).not.toBeNull()
  })

  it('can add a user', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
      isAuthenticated: true,
      isLoading: false,
      user: { sub: 'this is a test value' },
    })

    
    nock(document.baseURI).persist().get('/api/v1/users/checkRegistered')
    .reply(200, {
      id: 1,
      auth0Id: 'auth0|123',
      username: 'paige',
      full_name: 'Paige turner',
      location: 'Auckland',
      image: 'ava-03.png',
    })
    nock(document.baseURI).persist().post('/api/v1/users').reply(201)

    const { ...screen } = renderRoute('/register')

    const submitButton = await screen.findByTestId('submit-button')

    await userEvent.click(submitButton)

    const successText = await screen.findByText('Profile Updated!')

    expect(successText).not.toBeNull()
  })

  it('fails when trying to add a user with existing username', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
      isAuthenticated: true,
      isLoading: false,
      user: { sub: 'this is a test value' },
    })
    nock(document.baseURI).persist().get('/api/v1/users/checkRegistered')
    .reply(200, {
      id: 1,
      auth0Id: 'auth0|123',
      username: 'paige',
      full_name: 'Paige turner',
      location: 'Auckland',
      image: 'ava-03.png',
    })

    nock(document.baseURI).persist().post('/api/v1/users').reply(409)

    const { ...screen } = renderRoute('/register')

    const submitButton = await screen.findByTestId('submit-button')

    await userEvent.click(submitButton)

    const errorText = await screen.findByText('Username already in use!')

    expect(errorText).not.toBeNull()
  })
})
