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
import '@testing-library/jest-dom/vitest'
import { renderComponent, renderRoute } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import nock from 'nock'
import Register from '../Register.tsx'
import * as auth0 from '@auth0/auth0-react'
import * as useUser from '../../hooks/user.ts'
import UserProfilePage from '../UserProfilePage.tsx'

vi.mock('@auth0/auth0-react')
vi.mock('../../hooks/user.ts')

beforeAll(() => {
  nock.disableNetConnect()
})

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(auth0 as any).useAuth0 = vi.fn().mockReturnValue({
    isAuthenticated: false,
    isLoading: false,
    user: { sub: 'mockID' },
    getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
  })
})

afterEach(() => nock.cleanAll())
describe('User Profile Page', () => {
  it('Can see an edit button for own profile', async () => {
    // let submissionAttempted = false

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUserByUsername = vi.fn().mockReturnValue({
      mutateAsync: () => {
        // submissionAttempted = true
      },

      data: {
        user: { auth0Id: 'mockID' },
      },
    })

    const screen = renderComponent(<UserProfilePage />)

    const editButton = await screen.findByTestId('edit-button')

    expect(editButton).toBeVisible()
  })
  it('Has a child form that gives feedback on avatar scrolling', async () => {
    // let submissionAttempted = false

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUserByUsername = vi.fn().mockReturnValue({
      mutateAsync: () => {
        // submissionAttempted = true
      },

      data: {
        user: { auth0Id: 'mockID' },
      },
    })

    const screen = renderComponent(<UserProfilePage />)

    const editButton = await screen.findByTestId('edit-button')
    await userEvent.click(editButton)

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

  it('shows that the user has been edited', async () => {
    // let submissionAttempted = false

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUserByUsername = vi.fn().mockReturnValue({
      mutateAsync: () => {
        ;(useUser as any).useUserByUsername = vi
          .fn()
          .mockReturnValue({ data: { user: { username: 'brenda_(evil)' } } })
      },

      data: {
        user: { auth0Id: 'mockID', username: 'brenda' },
      },
    })
    ;(useUser as any).useEditUser = vi.fn().mockReturnValue({
      mutateAsync: () => {
        ;(useUser as any).useUserByUsername = vi
          .fn()
          .mockReturnValue({ data: { user: { username: 'brenda_(evil)' } } })
      },

      data: {
        user: { auth0Id: 'mockID', username: 'brenda' },
      },
    })

    const screen = renderComponent(<UserProfilePage />)

    const editButton = await screen.findByTestId('edit-button')
    await userEvent.click(editButton)

    const nameEdit = await screen.findByLabelText('User Name:')
    await userEvent.click(nameEdit)
    await userEvent.keyboard('_(evil)')

    const submit = await screen.findByTestId('submit-button')
    await userEvent.click(submit)

    const newName = await screen.findByText('brenda_(evil)')

    expect(newName).toBeVisible()
  })
  it('scrolls avatars on click', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(useUser as any).useUserByUsername = vi.fn().mockReturnValue({
      mutateAsync: () => {
        // submissionAttempted = true
      },

      data: {
        user: { auth0Id: 'mockID' },
      },
    })

    const screen = renderComponent(<UserProfilePage />)

    const editButton = await screen.findByTestId('edit-button')
    await userEvent.click(editButton)
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
})
