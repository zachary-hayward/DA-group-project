import React from 'react'


function Nav() {
  return (
    <>
        <nav class="flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
            <div class="mb-2 sm:mb-0">
                <a href="/" class="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Home</a>
            </div>
            <div>
                <a href="/" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Post</a>
                <a href="/" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Groups</a>
                <a href="/" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Profile</a>
                <a href="/" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Sign Up</a>
                <a href="/" class="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Log In</a>
            </div>
        </nav>
    </>
  )
}

export default Nav