import { Link } from 'react-router-dom'

function Nav() {
  const user = {
    username: 'ida',
  }

  return (
    <>
      <nav className="flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
        <div className="mb-2 sm:mb-0">
          <Link
            to="/"
            className="text-2xl no-underline text-grey-darkest hover:text-sky-700"
          >
            Home
          </Link>
        </div>
        <div>
          <Link
            to="/post"
            className="text-lg no-underline text-grey-darkest hover:text-sky-700"
          >
            Post
          </Link>
          <Link
            to="/groups"
            className="text-lg no-underline text-grey-darkest hover:text-sky-700 ml-6"
          >
            Groups
          </Link>
          <Link
            to={`/profiles/${user.username}`}
            className="text-lg no-underline text-grey-darkest hover:text-sky-700 ml-6"
          >
            Profile
          </Link>
          <Link
            to="/login"
            className="text-lg no-underline text-grey-darkest hover:text-sky-700 ml-6"
          >
            Log Off
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Nav
