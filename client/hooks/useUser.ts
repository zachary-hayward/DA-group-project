import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'
import request from 'superagent'

const rootUrl = '/api/v1/users'

export function useUser(token){
  console.log('queried')
  const{getAccessTokenSilently} = useAuth0()

  return useQuery({
    queryKey:['user'],
    queryFn:async() => {
      const token = await getAccessTokenSilently()
      const data = await request.get(`${rootUrl}/checkauth`).set('Authorization', `Bearer ${token}`)
      return data.body
    },
    enabled : token !== undefined
  })
}