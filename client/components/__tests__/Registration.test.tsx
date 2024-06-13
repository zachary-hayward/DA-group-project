// @vitest-environment jsdom
import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { renderComponent, renderRoute } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import nock from 'nock'
import Register from '../Register.tsx'
import * as auth0 from '@auth0/auth0-react'
import * as useUser from '../../hooks/user.ts'
import * as reactRouterDom from 'react-router-dom'

vi.mock('@auth0/auth0-react')
vi.mock('../../hooks/user.ts')
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => vi.fn()
  };
})

beforeAll(() => {
  nock.disableNetConnect()
})

afterEach(() => nock.cleanAll())

describe('User Registration', () => {
  it('display an error if no user found', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: undefined,
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUser = vi.fn().mockReturnValue({
      isError: true,
      error: 'testing',
    })

    const screen = renderComponent(<Register />)

    const errorMessage = screen.getByText('No User Found')
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
    ;(useUser as any).useAddUser = vi.fn().mockReturnValue({
      isLoading: false,
      isError: false,
      data: { user: true },

      mutateAsync: () => {
        return { status: 500 }
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
    ;(useUser as any).useAddUser = vi.fn().mockReturnValue({
      isLoading: false,
      isError: false,
      data: { user: true },

      mutateAsync: () => {
        return { body: { status: 409, errorMessage: 'duplicate username' } }
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
    ;(useUser as any).useAddUser = vi.fn().mockReturnValue({
      isLoading: false,
      isError: false,
      data: { user: true },

      mutateAsync: () => {
        return { status: 201 }
      },
    })

    const screen = renderRoute('/register')

    const submitButton = await screen.findByTestId('submit-button')

    //ACT
    await userEvent.click(submitButton)

    //ASSERT
    const alertMessage = await screen.findByText('Profile Updated!')

    expect(alertMessage).toBeVisible()
    
    const spy = vi.spyOn(reactRouterDom, 'useNavigate')

    const didNavigate = await vi.waitFor(async () => {
        expect(spy).toHaveBeenCalled()    
        return true
      },
      {
        timeout: 2500
      }
    )
    expect(didNavigate).toBe(true)
  })
  it('Tries to add a user when child form is submitted', async () => {
    let submissionAttempted = false

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: true,
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useAddUser = vi.fn().mockReturnValue({
      mutateAsync: () => {
        submissionAttempted = true
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
      user: true,
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
      user: true,
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
