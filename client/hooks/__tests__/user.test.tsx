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
import * as auth0 from '@auth0/auth0-react'
import nock from 'nock'
import { useUser } from '../user.ts'
import { renderRoute, renderComponent } from '../../test-utils.tsx'
import Register from '../../components/Register.tsx'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
vi.mock('@auth0/auth0-react')

beforeAll(() => nock.disableNetConnect())

describe('user hook tests', ()=>{
  it('can fetch a user', ()=> {
    (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
      isAuthenticated: false,
      isLoading: false,
      user:{sub:'100%'},
    });

    const scope = nock('http://localhost').persist().get('/api/v1/users').reply(200, {
      id: 1,
      auth0Id: 'auth0|123',
      username: 'paige',
      full_name: 'Paige turner',
      location: 'Auckland',
      image: 'ava-03.png',})

      const queryClient = new QueryClient()
      const screen = renderComponent(<QueryClientProvider client={queryClient}><Register/></QueryClientProvider>)

      const paige = screen.findByText('paige')

      queryClient.invalidateQueries({ queryKey: ['users'] })
      
    expect(paige).not.toBeNull()
  })
  it('can add a user', async () => {
    (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
      getAccessTokenSilently: () => 'sdsdsdsdsdsdsdsdsd',
      isAuthenticated: false,
      isLoading: false,
      user:{sub:'100%'},
    });

    const scope = nock('http://localhost').persist().post('/api/v1/users').reply(201)

    const queryClient = new QueryClient()
    const screen = renderComponent(<QueryClientProvider client={queryClient}><Register/></QueryClientProvider>)

    
  //
  })
})

