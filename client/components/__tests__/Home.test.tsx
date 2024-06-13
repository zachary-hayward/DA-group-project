// @vitest-environment jsdom
import {describe, it, expect, beforeAll, afterEach, vi  } from 'vitest'
import '@testing-library/jest-dom/vitest'
import * as auth0 from '@auth0/auth0-react'
import * as useUser from '../../hooks/user.ts'
import nock from 'nock'
import { renderRoute } from '../../test-utils.tsx'

vi.mock('@auth0/auth0-react')
vi.mock('../../hooks/user.ts')

beforeAll(() => {
  nock.disableNetConnect()
})

afterEach(() => nock.cleanAll())

describe('Home.tsx', () => {
  it('Can return isLoading: true on api query', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: true,
      // isLoading: false,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUser = vi.fn().mockReturnValue({
      isLoading:true,
      user:undefined,
      isError:false
    })

    const screen = renderRoute('/')

    const loading = screen.getByText('Loading...')

    expect(loading).not.toBeNull()
  })
  it('Can retun isError: true on api query', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: true,
      // isLoading: false,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUser = vi.fn().mockReturnValue({
      isLoading:false,
      isError:true,
    })

    const screen = renderRoute('/')

    const isError = screen.getByText('Whooooooops')

    console.log(isError)

    expect(isError).not.toBeNull()
  })
  it('Redirects a user that has not registered to the register page', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: true,
      // isLoading: false,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUser = vi.fn().mockReturnValue({
      isLoading:false,
      isError:false,
      data: {stuff: true}
    })

    const screen = renderRoute('/')

    const nextButton = await screen.findByTestId('nextButton')

    expect(nextButton).toBeVisible()
    
    expect(true).toBe(true)
  })
})