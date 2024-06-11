import { useQuery } from '@tanstack/react-query'
import getAllGroups from '../apis/groups'

export default function AllGroups() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['groups'],
    queryFn: getAllGroups,
  })

  if (isError) {
    return <p>Something went wrong...</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  console.log(data)

  return (
    <div>
      {data.map((group) => (
        <p key={group.id}>{group.name}</p>
      ))}
    </div>
  )
}
