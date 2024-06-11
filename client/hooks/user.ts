import { User, useAuth0 } from '@auth0/auth0-react'
import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import * as API from '../apis/user'

export function useUser() {
  const { getAccessTokenSilently } = useAuth0()
  const token = getAccessTokenSilently()

  const query = useQuery({
    queryKey: ['users'],
    queryFn: async () => await API.getUser(token),
  })

  return {
    ...query,
    add: useAddUser(),
  }
}

export function useUserMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
  return mutation
}

export function useAddUser() {
  return useUserMutation(API.addUser)
}
