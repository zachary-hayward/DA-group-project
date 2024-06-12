// @vitest-environment jsdom
import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  vi,
} from 'vitest'
import '@testing-library/jest-dom/vitest'
import { renderRoute, renderComponent } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { render, screen, renderHook  } from '@testing-library/react'
import nock from 'nock'
import { ChangeEvent } from 'react'
import UserProfileForm from '../UserProfileForm.tsx'
import { UserData } from '../../../models/user.ts'
import Register from '../Register.tsx'
import * as auth0 from '@auth0/auth0-react'
import * as useUser from '../../hooks/user.ts'

vi.mock('@auth0/auth0-react')
vi.mock('../../hooks/user.ts')

beforeAll(() => {
  nock.disableNetConnect()
  
})

//https://stackoverflow.com/questions/74930606/mock-react-router-dom-useparams-hook-in-vitest
//https://vitest.dev/api/vi.html#vi-mock

//https://stackoverflow.com/questions/72732768/vue-how-to-mock-auth0-for-testing-with-vitest
// If you need to use variables inside the factory, try vi.doMock. 
// It works the same way but isn't hoisted. Beware that it only mocks subsequent imports.

afterEach(() => nock.cleanAll())

describe('User Registration', () => {
  it('Displays a loading indicator', ()=> {       
    (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd'
    });
    (useUser as any).useUser = vi.fn().mockReturnValue({
      isLoading:true
    })

    const screen = renderComponent(<Register/>)

    const loading = screen.getByText("Loading...")

    expect(loading).not.toBeNull()
  })
  it('Displays an error message',()=>{
    (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd'
    });
    (useUser as any).useUser = vi.fn().mockReturnValue({
      isError:true,
      error:'testing'
    })
    
    const screen = renderComponent(<Register/>)

    const errorMessage = screen.getByText("Issue trying to retrieve user testing")

    expect(errorMessage).not.toBeNull()

  })
  it('Returns a message if no data found', () => {
    (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd'
    });
    (useUser as any).useUser = vi.fn().mockReturnValue({
      data:undefined
    })
    
    const screen = renderComponent(<Register/>)

    const errorMessage = screen.getByText("No Data Found")

    expect(errorMessage).not.toBeNull()
  })

  it('Tries to add a user when child form is submitted', async () => {

    let submissionAttempted = false;

    (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd'
    });
    (useUser as any).useUser = vi.fn().mockReturnValue({
      add: {
        mutate: () => {submissionAttempted = true}
      },
      data:{
        user:{
          
        }
      }
    })
    
    const screen = renderComponent(<Register/>)

    const submitButton = await screen.findByTestId('submit-button')
    await userEvent.click(submitButton)

    expect(submissionAttempted).toEqual(true)
  })
  it('Has a child form that gives feedback on avatar scrolling', async() => {
    let submissionAttempted = false;

    (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd'
    });
    (useUser as any).useUser = vi.fn().mockReturnValue({
      add: {
        mutate: () => {submissionAttempted = true}
      },
      data:{
        user:{
          
        }
      }
    })
    const screen = renderComponent(<Register/>)

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
    let submissionAttempted = false;

    (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd'
    });
    (useUser as any).useUser = vi.fn().mockReturnValue({
      add: {
        mutate: () => {submissionAttempted = true}
      },
      data:{
        user:{
          
        }
      }
    })
    const screen = renderComponent(<Register/>)
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

  it('selects an avatar on click', async() => {
    let submissionAttempted = false;

    (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user:{sub:'100%'},
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd'
    });
    (useUser as any).useUser = vi.fn().mockReturnValue({
      add: {
        mutate: () => {submissionAttempted = true}
      },
      data:{
        user:{
          sub:'this is a test token'
        }
      }
    })
    const screen = renderComponent(<Register/>)

    const avatarOneAlt = `Avatar number 1`
    const buttonOneTestId = 'button number 1'
    let formImage = ''

    const circledUnclicked = await screen.findByTestId(buttonOneTestId)

    await userEvent.click(circledUnclicked)

    expect(circledUnclicked).toHaveClass('transform')

  })

})
