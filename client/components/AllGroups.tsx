import { useQuery } from '@tanstack/react-query'
import getAllGroups from '../apis/groups'

export default function AllGroups() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['groups'],
    queryFn: getAllGroups,
  })

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Something went wrong...: {String(error)}</p>
  }

  return (
    <div>
      {data.map((group) => (
        <div
          key={group.id}
          className="w-40 m-auto text-center hover:scale-125 transition ease-in-out cursor-pointer"
        >
          <img
            src={`/images/icons/${group.image}`}
            alt={group.image}
            className="h-10 w-10 m-auto mt-5"
          ></img>
          <p key={group.id} className="mb-5">
            {group.name}
          </p>
        </div>
      ))}
    </div>
  )
}

///testing?? or pinot time?
