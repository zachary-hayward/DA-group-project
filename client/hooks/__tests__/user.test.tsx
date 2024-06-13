// @vitest-environment jsdom
import {
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  vi,
  beforeEach,
} from 'vitest'
import * as auth0 from '@auth0/auth0-react'
import nock from 'nock'
import { renderRoute } from '../../test-utils.tsx'
import userEvent from '@testing-library/user-event'

vi.mock('@auth0/auth0-react')

beforeAll(() => nock.disableNetConnect())

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
    getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
    isAuthenticated: true,
    isLoading: false,
    user: { sub: '100%' },
  })
})

afterEach(() => nock.cleanAll())

describe('user hook tests', () => {
  it('can handle load states on the home page', async () => {
    nock(document.baseURI)
      .persist()
      .get('/api/v1/users/checkRegistered')
      .reply(200, {
        user: {
          id: 1,
          auth0Id: 'auth0|123',
          username: 'paige',
          full_name: 'Paige turner',
          location: 'Auckland',
          image: 'ava-03.png',
        },
      })

    const screen = renderRoute('/')
    const postButton = await screen.findByTestId('post-button')

    expect(postButton).toBeVisible()
  })
  it('can fetch a user', async () => {
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

    const re = await screen.findByTestId('nextButton')

    expect(re).not.toBeNull()
  })

  it('can add a user', async () => {
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
    nock(document.baseURI).persist().post('/api/v1/users').reply(201)

    const { ...screen } = renderRoute('/register')

    const submitButton = await screen.findByTestId('submit-button')

    await userEvent.click(submitButton)

    const successText = await screen.findByText('Profile Updated!')

    expect(successText).not.toBeNull()
  })

  it('fails when trying to add a user with existing username', async () => {
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

    nock(document.baseURI)
      .persist()
      .post('/api/v1/users')
      .reply(200, { status: 409, errorMessage: 'duplicate username' })

    // nock(document.baseURI)

    const { ...screen } = renderRoute('/register')

    const submitButton = await screen.findByTestId('submit-button')

    await userEvent.click(submitButton)

    const errorText = await screen.findByText('Username already in use!')

    expect(errorText).not.toBeNull()
  })

  it('fetches data for a user profile', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
      isAuthenticated: true,
      isLoading: false,
      user: { sub: 'test-user' },
    })
    nock(document.baseURI)
      .persist()
      .get('/api/v1/users/checkRegistered')
      .reply(200, {
        id: 1,
        auth0Id: 'test-user',
        username: 'paige',
        full_name: 'Paige turner',
        location: 'Auckland',
        image: 'ava-03.png',
      })
    nock(document.baseURI)
      .persist()
      .get('/api/v1/profiles/paige')
      .reply(200, {
        user: {
          id: 1,
          auth0Id: 'test-user',
          username: 'paige',
          full_name: 'Paige turner',
          location: 'Auckland',
          image: 'ava-03.png',
        },
      })

    nock(document.baseURI).persist().patch('/api/v1/users').reply(204, {})

    const { ...screen } = renderRoute('/profiles/paige')

    const onScreen = await screen.findByText('paige')

    expect(onScreen).toBeVisible()
  })
  it('can edit a user', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
      isAuthenticated: true,
      isLoading: false,
      user: { sub: 'test-user' },
    })
    nock(document.baseURI)
      .persist()
      .get('/api/v1/users/checkRegistered')
      .reply(200, {
        id: 1,
        auth0Id: 'test-user',
        username: 'paige',
        full_name: 'Paige turner',
        location: 'Auckland',
        image: 'ava-03.png',
      })
    nock(document.baseURI)
      .get('/api/v1/profiles/paige')
      .reply(200, {
        user: {
          id: 1,
          auth0Id: 'test-user',
          username: 'paige',
          full_name: 'Paige turner',
          location: 'Auckland',
          image: 'ava-03.png',
        },
      })

    nock(document.baseURI).persist().patch('/api/v1/users').reply(204, {})

    const { ...screen } = renderRoute('/profiles/paige')

    const onScreen = await screen.findByTestId('edit-button')
    await userEvent.click(onScreen)

    const nameLabel = await screen.findByLabelText('User Name:')
    await userEvent.click(nameLabel)
    await userEvent.keyboard('ee')

    nock(document.baseURI)
      .persist()
      .get('/api/v1/profiles/paige')
      .reply(200, {
        user: {
          id: 1,
          auth0Id: 'test-user',
          username: 'paigeee',
          full_name: 'Paige turner',
          location: 'Auckland',
          image: 'ava-03.png',
        },
      })

    const submit = await screen.findByTestId('submit-button')
    await userEvent.click(submit)

    const newUserName = await screen.findByText('paigeee')

    expect(newUserName).toBeVisible()
  })
})
