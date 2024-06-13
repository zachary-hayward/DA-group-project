// @vitest-environment jsdom
import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { renderComponent, renderRoute } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import nock from 'nock'
import Register from '../Register.tsx'
import * as auth0 from '@auth0/auth0-react'
import * as useUser from '../../hooks/user.ts'

vi.mock('@auth0/auth0-react')
vi.mock('../../hooks/user.ts')

beforeAll(() => {
  nock.disableNetConnect()
})

afterEach(() => nock.cleanAll())

describe('User Registration', () => {
  it('Displays a loading indicator', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: { sub: 'test id' },
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUser = vi.fn().mockReturnValue({
      isLoading: true,
    })

    const screen = renderComponent(<Register />)
    //const screen = renderRoute('/register')

    const loading = screen.getByText('Loading...')

    expect(loading).not.toBeNull()
  })
  it('Displays an error message', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: { sub: 'test id' },
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUser = vi.fn().mockReturnValue({
      isError: true,
      error: 'testing',
    })

    const screen = renderComponent(<Register />)

    const errorMessage = screen.getByText(
      'Issue trying to retrieve user testing',
    )

    expect(errorMessage).not.toBeNull()
  })
  it('Returns a message if no data found', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: { sub: 'test id' },
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUser = vi.fn().mockReturnValue({
      data: undefined,
    })

    const screen = renderComponent(<Register />)

    const errorMessage = screen.getByText('No Data Found')

    expect(errorMessage).not.toBeNull()
  })
  it('can return code 500 and display red alert message', async () => {
    //ARRANGE
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      isError: false,
      data: { user: { stuff: true } },
      user: { sub: 'test id' },
      getAccessTokenSilently: () => 'fake',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUser = vi.fn().mockReturnValue({
      isLoading: false,
      isError: false,
      data: { user: true },
      add: {
        mutateAsync: () => {
          return { status: 500 }
        },
      },
    })

    //ACT
    const screen = renderRoute('/register')

    const submitButton = await screen.findByTestId('submit-button')

    await userEvent.click(submitButton)

    //ASSERT
    const alertMessage = await screen.findByText('Notify Jean Pierre!')

    expect(alertMessage).toBeVisible()
  })
  it('can return code 409 and display user-name-in-use message', async () => {
    //ARRANGE
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      isError: false,
      data: { user: { stuff: true } },
      user: { sub: 'test id' },
      getAccessTokenSilently: () => 'fake',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUser = vi.fn().mockReturnValue({
      isLoading: false,
      isError: false,
      data: { user: true },
      add: {
        mutateAsync: () => {
          return { body: { status: 409, errorMessage: 'duplicate username' } }
        },
      },
    })

    //ACT
    const screen = renderRoute('/register')

    const submitButton = await screen.findByTestId('submit-button')

    await userEvent.click(submitButton)

    //ASSERT
    const alertMessage = await screen.findByText('Be more original!')

    expect(alertMessage).toBeVisible()
  })

  it('can return code 201 and display successful addUser message', async () => {
    //ARRANGE
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      isError: false,
      data: { user: { stuff: true } },
      user: { sub: 'test id' },
      getAccessTokenSilently: () => 'fake',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUser = vi.fn().mockReturnValue({
      isLoading: false,
      isError: false,
      data: { user: true },
      add: {
        mutateAsync: () => {
          return { status: 201 }
        },
      },
    })

    //ACT
    const screen = renderRoute('/register')

    const submitButton = await screen.findByTestId('submit-button')

    await userEvent.click(submitButton)

    //ASSERT
    const alertMessage = await screen.findByText('Profile Updated!')

    expect(alertMessage).toBeVisible()
  })
  it('Tries to add a user when child form is submitted', async () => {
    let submissionAttempted = false

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUser = vi.fn().mockReturnValue({
      add: {
        mutateAsync: () => {
          submissionAttempted = true
        },
      },
      data: {
        user: {},
      },
    })

    const screen = renderComponent(<Register />)

    const submitButton = await screen.findByTestId('submit-button')
    await userEvent.click(submitButton)

    expect(submissionAttempted).toEqual(true)
  })
  it('Has a child form that gives feedback on avatar scrolling', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUser = vi.fn().mockReturnValue({
      add: {
        mutate: () => {},
      },
      data: {
        user: {},
      },
    })
    const screen = renderComponent(<Register />)

    const edgeClassName = 'font-thin'
    const maxRightScroll = 11

    const nextButton = await screen.findByTestId('nextButton')
    const prevButton = await screen.findByTestId('prevButton')

    expect(prevButton).toHaveClass(edgeClassName)

    for (let i = 0; i < maxRightScroll - 1; i++) {
      await userEvent.click(nextButton)
      expect(nextButton).not.toHaveClass(edgeClassName)
      expect(prevButton).not.toHaveClass(edgeClassName)
    }

    await userEvent.click(nextButton)
    expect(nextButton).toHaveClass(edgeClassName)
  })
  it('scrolls avatars on click', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUser = vi.fn().mockReturnValue({
      add: {
        mutate: () => {},
      },
      data: {
        user: {},
      },
    })
    const screen = renderComponent(<Register />)
    const avatarOneAlt = `Avatar number 1`
    const avatarEightAlt = 'Avatar number 8'

    const nextButton = await screen.findByTestId('nextButton')
    const prevButton = await screen.findByTestId('prevButton')

    const ava_one = await screen.findByAltText(avatarOneAlt)
    expect(ava_one).toBeVisible()

    await userEvent.click(nextButton)
    const avaOneAfterClick = screen.queryByAltText(avatarOneAlt)
    expect(avaOneAfterClick).toBeNull()

    const avaEight = await screen.findByAltText(avatarEightAlt)
    expect(avaEight).toBeVisible()

    await userEvent.click(prevButton)
    const avaEightAfterClick = screen.queryByAltText(avatarEightAlt)
    expect(avaEightAfterClick).toBeNull()
  })

  it('selects an avatar on click', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: { sub: '100%' },
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUser = vi.fn().mockReturnValue({
      add: {
        mutate: () => {},
      },
      data: {
        user: {
          sub: 'this is a test token',
        },
      },
    })
    const screen = renderComponent(<Register />)

    const buttonOneTestId = 'button number 1'

    const circledUnclicked = await screen.findByTestId(buttonOneTestId)

    await userEvent.click(circledUnclicked)

    expect(circledUnclicked).toHaveClass('transform')
  })
})
